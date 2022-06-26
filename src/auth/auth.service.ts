import { BadRequestException, Body, Injectable, NotFoundException, Req, Res } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, ObjectId } from "mongoose";
import { CreateUserDto } from "./dto/createUser.dto";
import { UpdateUserDto } from "./dto/updateUser.dto";
import { User } from "./schemas/user.schema";
import { OAuth2Client } from "google-auth-library";

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {}

  /**
   * Use one-time code from client side to exchange tokens
   * and get user information from Google
   * @param {string} code The one-time code got from client side.
   * @returns {User}
   */
  async googleLogin(code: string): Promise<any> {
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

  /**
   * Get all users from database
   * @returns {[]:User}
   */
  async getAllUsers(): Promise<User[]> {
    const users = await this.userModel.find().exec();
    return users.filter((item) => !item.isDeleted);
  }

  /**
   * Get the corresponding user according to id
   * @param {ObjectId} id
   * @returns {User}
   */
  async getUserById(id: ObjectId): Promise<User> {
    const user = await this.userModel.findById({ _id: id }).exec();
    if (!user || user.isDeleted) {
      throw new NotFoundException(`User ${id} not found`);
    }
    return user;
  }

  /**
   * Create new user
   * @param {CreateUserDto} createUserDto
   * @returns {User}
   */
  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = await this.userModel.create(createUserDto);
    return user;
  }

  /**
   * Update user by ID
   * @param {CreateUserDto}id
   * @param updateUserDto
   * @returns {User}
   */
  async updateUserById(id: ObjectId, updateUserDto: UpdateUserDto): Promise<User> {
    const existingUser = await this.userModel.findById(id).exec();
    // if there is no such a user or the user has been deleted, then throw an error.
    if (!existingUser || existingUser.isDeleted) {
      throw new NotFoundException(`User ${id} not found`);
    }
    // Add new update date
    updateUserDto = { ...updateUserDto, updatedAt: new Date() };
    const updatedUser = await await this.userModel
      .findByIdAndUpdate({ _id: id }, { $set: updateUserDto }, { new: true })
      .exec();
    // return the user info which has been updated.
    return updatedUser;
  }

  /**
   * Remove user by Id
   * @param {ObjectId} id
   * @returns {User}
   */
  async removeUserById(id: ObjectId): Promise<{ message?: string }> {
    const user = await this.userModel.findById(id).exec();

    // if there is no such a user or the user has been deleted, then throw an error.
    if (!user || user.isDeleted) {
      throw new NotFoundException("court not found");
    }
    const DeletedUser = await this.userModel.findByIdAndUpdate(id, {
      isDeleted: true,
      updatedAt: new Date(),
    });
    //return the user who has been deleted
    return { message: `User deleted successfully` };
  }
}
