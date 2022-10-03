import { ForbiddenException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, ObjectId } from "mongoose";
import { User } from "../users/schemas/user.schema";
import { OAuth2Client } from "google-auth-library";
import { ReturnUserInfo } from "./ReturnUserInfo";
import * as argon from "argon2";
import { JwtService } from "@nestjs/jwt";
import { CreateUserDto } from "src/users/dto/createUser.dto";
import { sendEmail } from "./emailHelpers";

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  /**
   * Use one-time code from client side to exchange tokens
   * and get user information from Google
   * @param {string} code The one-time code got from client side.
   * @returns {User}
   */
  async googleLogin(code: string): Promise<ReturnUserInfo> {
    // Initialize the Oauth2 Client
    const client = new OAuth2Client(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_SECRET,
      "postmessage",
    );
    //Exchange tokens with code which acquired from front-end.
    const { tokens } = await client.getToken(code);
    //Get id_token from Google
    const ticket = await client.verifyIdToken({
      idToken: tokens.id_token,
      audience: process.env.CLIENT_ID,
    });
    // Get user info from the payload
    const { sub, email, given_name, family_name } = ticket.getPayload();
    const user = await this.userModel.findOne({ email: email }).exec();
    if (!user) {
      //Create new user in the database
      const newUser = await this.userModel.create({
        googleId: sub,
        email: email,
        firstName: given_name,
        lastName: family_name,
        isActivated: true,
      });
      const newUserInfo: ReturnUserInfo = {
        userId: newUser._id,
        googleId: sub,
        email: email,
        firstName: given_name,
        lastName: family_name,
        needConnection: false,
      };
      // Return the user info who has been created when logging
      return newUserInfo;
    } else {
      const userInfo: ReturnUserInfo = {
        userId: user._id,
        googleId: sub,
        email: email,
        firstName: user.firstName,
        lastName: user.lastName,
        needConnection: !user.googleId,
      };
      // Return the user who has already existed in the database
      return userInfo;
    }
  }

  async userRegister(body): Promise<any> {
    const hashedPassword = await argon.hash(body.password);
    // generate user without otp info
    const newUserInfo = {
      ...body,
      password: hashedPassword,
    };
    const newUser = await this.userModel.create(newUserInfo);
    const { _id, email } = newUser;
    const response = await this.sendOTPVerificationEmail(_id, email);
    return response;
  }

  async userLogin(userDto: CreateUserDto): Promise<any> {
    const user = await this.userModel.findOne({ email: userDto.email }).exec();
    if (!user) {
      throw new ForbiddenException("Access Denied");
    }

    const passwordMatches = await argon.verify(user.password, userDto.password);
    if (!passwordMatches) {
      throw new ForbiddenException("Access Denied");
    }

    const tokens = await this.getTokens(user._id, user.email);
    await this.updateRtHash(user._id, tokens.refreshToken);
    const { _id, email, firstName, lastName, isActivated } = user;
    const respond = {
      userId: _id,
      email,
      firstName,
      lastName,
      tokens,
      isActivated,
    };

    return respond;
  }

  async userLogout(userId: ObjectId) {
    const user = await this.userModel.findById(userId);
    user.hashedRefreshToken &&
      (await this.userModel.findByIdAndUpdate(userId, { hashedRefreshToken: null }));
  }

  // one-time-password(OTP) Generator
  async generateOTP() {
    const otp = `${Math.floor(100000 + Math.random() * 900000)}`;
    // hash the otp
    const hashedOTP = await argon.hash(otp);
    const otpCreatedAt = Date.now();
    const EXPIRATION_TIME = 900000; // 15min
    const otpExpiresAt = Date.now() + EXPIRATION_TIME;
    return { otp, hashedOTP, otpCreatedAt, otpExpiresAt };
  }

  async sendOTPVerificationEmail(_id: string, email: string) {
    try {
      // generate otp and related info
      const { otp, hashedOTP, otpCreatedAt, otpExpiresAt } = await this.generateOTP();
      // send email using AWS SES
      const { status } = await sendEmail(email, otp);
      if (status === "Success") {
        await this.userModel.updateOne({ _id }, { otp: hashedOTP, otpCreatedAt, otpExpiresAt });
        const response = {
          status: "PENDING",
          message: "Verification code sent to user email.",
          data: {
            userId: _id,
            email,
          },
        };
        return response;
      } else {
        throw new Error("Failed to send email.");
      }
    } catch (err) {
      const response = {
        status: "FAILED",
        message: err.message,
      };
      return response;
    }
  }

  // verify user input otp
  async verifyOTP(body): Promise<any> {
    try {
      const { userId, otp } = body;
      const user = await this.userModel.findById(userId);
      const { otp: userOTPRecord, otpExpiresAt, _id, email, firstName, lastName } = user;
      if (otpExpiresAt.getTime() < Date.now()) {
        await this.userModel.updateOne(
          { _id },
          { otp: "", otpCreatedAt: null, otpExpiresAt: null },
        );
        throw new Error("Verification code expired.");
      } else {
        const isValidOTP = await argon.verify(userOTPRecord, otp);
        if (!isValidOTP) {
          // wrong otp input
          throw new Error("Verification code is invalid.");
        } else {
          // successful, clear otp
          await this.userModel.updateOne(
            { _id },
            { isActivated: true, otp: "", otpCreatedAt: null, otpExpiresAt: null },
          );
          // return tokens after verified, equals auto-login
          const tokens = await this.getTokens(_id, email);
          await this.updateRtHash(_id, tokens.refreshToken);
          const response = {
            userId: _id,
            email,
            firstName,
            lastName,
            tokens,
            isActivated: true,
          };

          return response;
        }
      }
    } catch (error) {
      const response = {
        status: "FAILED",
        message: error.message,
      };
      return response;
    }
  }

  // Resend OTP
  async resendOTP(body): Promise<any> {
    try {
      const { userId, email } = body;
      if (!userId || !email) {
        throw Error("Empty user details are not allowed.");
      } else {
        // delete old otp
        await this.userModel.updateOne(
          { _id: userId },
          { otp: "", otpCreatedAt: null, otpExpiresAt: null },
        );
        const response = await this.sendOTPVerificationEmail(userId, email);
        return response;
      }
    } catch (error) {
      const response = {
        status: "FAILED",
        message: error.message,
      };
      return response;
    }
  }

  //Jwt
  async refreshTokens(userId: ObjectId, rt: string) {
    const user = await this.userModel.findById(userId);
    if (!user || !user.hashedRefreshToken) {
      throw new ForbiddenException("Access Denied");
    }

    const rtMatches = await argon.verify(user.hashedRefreshToken, rt);
    if (!rtMatches) {
      throw new ForbiddenException("Access Denied");
    }

    const tokens = await this.getTokens(user._id, user.email);
    await this.updateRtHash(user._id, tokens.refreshToken);

    return tokens;
  }

  async getTokens(adminId: ObjectId, email: string) {
    const payload = {
      sub: adminId,
      email,
    };
    const atExp = {
      secret: process.env.ACCESS_TOKEN_SECRET,
      expiresIn: 60 * 15, //15 min expiration
    };

    const rtExp = {
      secret: process.env.REFRESH_TOKEN_SECRET,
      expiresIn: 60 * 60 * 24 * 7, //one week expiration
    };

    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(payload, atExp),
      this.jwtService.signAsync(payload, rtExp),
    ]);

    return {
      accessToken: at,
      refreshToken: rt,
    };
  }

  async updateRtHash(userId: ObjectId, rt: string) {
    const hashedRefreshToken = await argon.hash(rt);
    const updateUserDto = {
      ...CreateUserDto,
      hashedRefreshToken: hashedRefreshToken,
      updatedAt: new Date(),
    };
    await this.userModel
      .findByIdAndUpdate({ _id: userId }, { $set: updateUserDto }, { new: true })
      .exec();
  }
}
