import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, ObjectId } from "mongoose";
import { CreateUserDto } from "../users/dto/createUser.dto";
import { UpdateUserDto } from "../users/dto/updateUser.dto";
import { User } from "../users/schemas/user.schema";
import { OAuth2Client } from "google-auth-library";
import { ReturnUserInfo } from "./ReturnUserInfo";

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {}

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
}
