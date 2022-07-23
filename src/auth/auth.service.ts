import { ForbiddenException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, ObjectId } from "mongoose";
import { User } from "../users/schemas/user.schema";
import { OAuth2Client } from "google-auth-library";
import { ReturnUserInfo } from "./ReturnUserInfo";
import * as argon from "argon2";
import { MailerService } from "@nestjs-modules/mailer";
import { JwtService } from "@nestjs/jwt";
import { CreateUserDto } from "src/users/dto/createUser.dto";
import { Tokens } from "./types";

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private mailerService: MailerService,
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
    const user = await this.userModel.findOne({ googleId: sub }).exec();
    if (!user) {
      //Create new user in the database
      const newUser = {
        googleId: sub,
        email: email,
        firstName: given_name,
        lastName: family_name,
        isActivated: true,
      };
      await this.userModel.create(newUser);
      const newUserInfo = {
        googleId: sub,
        email: email,
        firstName: given_name,
        lastName: family_name,
      };
      // Return the user info who has been created when logging
      return newUserInfo;
    }
    const userInfo = {
      googleId: sub,
      email: email,
      firstName: given_name,
      lastName: family_name,
    };
    // Return the user who has already existed in the database
    return userInfo;
  }

  async clientRegister(body): Promise<any> {
    const hashedPassword = await argon.hash(body.password);
    const { otp, hashedOTP, otpCreatedAt, otpExpiresAt } = await this.generateOTP();
    const newUserInfo = {
      ...body,
      password: hashedPassword,
      otp: hashedOTP,
      otpCreatedAt,
      otpExpiresAt,
    };

    const newUser = await this.userModel.create(newUserInfo);

    const tokens = await this.getTokens(newUser._id, newUser.email);
    await this.updateRtHash(newUser._id, tokens.refreshToken);

    const { _id, email } = newUser;
    this.sendOTPVerificationEmail(email, otp);
    const response = {
      status: "PENDING",
      message: "Verification code sent to user email.",
      data: {
        userId: _id,
        email,
      },
      tokens,
    };
    return response;
  }

  async userLogin(userDto: CreateUserDto): Promise<Tokens> {
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
    return tokens;
  }

  async userLogout(userId: ObjectId) {
    const user = await this.userModel.findById(userId);
    user.hashedRefreshToken &&
      (await this.userModel.findByIdAndUpdate(userId, { hashedRefreshToken: null }));
  }

  //Email
  async generateOTP() {
    const otp = `${Math.floor(100000 + Math.random() * 900000)}`;
    // hash the otp
    const hashedOTP = await argon.hash(otp);
    const otpCreatedAt = Date.now();
    const EXPIRATION_TIME = 900000; // 15min
    const otpExpiresAt = Date.now() + EXPIRATION_TIME;
    return { otp, hashedOTP, otpCreatedAt, otpExpiresAt };
  }

  async sendOTPVerificationEmail(email: string, otp: string) {
    //email options
    const mailOptions = {
      to: email,
      subject: "Verify your email",
      html: `<p>Enter <b>${otp}</b> in the website to verify your email address and complete the sign up.</p><p>This code <b>expires in 15 min</b>.</p>`,
    };
    // sendMail(mailOptions);
    await this.mailerService.sendMail(mailOptions);
  }

  async verifyOTP(body): Promise<any> {
    try {
      const { userId, otp } = body;
      const user = await this.userModel.findById(userId);
      const { otp: userOTPRecord, otpExpiresAt } = user;
      if (otpExpiresAt.getTime() < Date.now()) {
        await this.userModel.updateOne(
          { _id: userId },
          { otp: "", otpCreatedAt: "", otpExpiresAt: "" },
        );
        throw new Error("Verification code expired.");
      } else {
        const isValidOTP = await argon.verify(userOTPRecord, otp);
        if (!isValidOTP) {
          // wrong otp input
          throw new Error("Verification code is invalid.");
        } else {
          // successful
          await this.userModel.updateOne(
            { _id: userId },
            { isActivated: true, otp: "", otpCreatedAt: "", otpExpiresAt: "" },
          );
          const response = {
            status: "VERIFIED",
            message: "User email verified successfully.",
          };
          return response;
        }
      }
    } catch (error) {
      const response = {
        status: "FAILD",
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
      expiresIn: 60 * 15, //15 mins expiration
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
