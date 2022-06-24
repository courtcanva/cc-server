import { BadRequestException, Body, Injectable, NotFoundException, Req, Res } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateUserDto } from "./dto/createUser.dto";
import { UpdateUserDto } from "./dto/updateUser.dto";
import { User } from "./schemas/user.schema";
import { OAuth2Client } from "google-auth-library";

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {}

  async googleLogin(code): Promise<any> {
    //TODO: Error Catch here.
    const client = new OAuth2Client(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_SECRET,
      "postmessage",
    );
    console.log("code------", code);

    //Use one-time code from client side to exchange tokens from Google
    //TODO: Error Catch here.
    const { tokens } = await client.getToken(code);
    const ticket = await client.verifyIdToken({
      idToken: tokens.id_token,
      audience: process.env.CLIENT_ID,
    });
    const { sub, email, given_name, family_name } = ticket.getPayload();
    const user = await this.userModel.findOne({ googleId: sub }).exec();
    if (!user) {
      const newUser = {
        googleId: sub,
        email: email,
        firstName: given_name,
        lastName: family_name,
      };
      await this.userModel.create(newUser);
      return newUser;
    }
    return user;

    console.log("info-----", given_name, family_name, email);
    // const test = await client.verifyIdToken
    // client.setCredentials(r.tokens);
    console.log("client-----", client);
    console.log("code------", code);
    console.log("token", tokens);
  }

  async getAllUsers(): Promise<User[]> {
    const users = await this.userModel.find().exec();
    return users.filter((item) => !item.isDeleted);
  }

  async getUserById(id: string): Promise<User> {
    try {
      const user = await this.userModel.findOne({ _id: id }).exec();
      if (!user) {
        throw new NotFoundException(`User ${id} not found`);
      }
      return user;
    } catch (err) {
      throw new BadRequestException({ status: 400, message: "User not found!" });
    }
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = await this.userModel.create(createUserDto);
    return user;
  }

  async updateUserById(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    try {
      const existingUser = await this.userModel
        .findOneAndUpdate({ _id: id }, { $set: updateUserDto }, { new: true })
        .exec();

      // if (!existing) {
      //   throw new NotFoundException(`User ${id} not found`);
      // }
      return existingUser;
    } catch (err) {
      throw new BadRequestException({ status: 400, message: "User not found!" });
    }
  }

  async removeUserById(id: string): Promise<{ user: User; message?: string }> {
    const user = await this.userModel.findById(id).exec();
    if (!user || user.isDeleted) {
      throw new NotFoundException("court not found");
    }
    const DeletedUser = await this.userModel.findByIdAndUpdate(id, {
      isDeleted: true,
      updatedAt: new Date(),
    });

    // return { message: `Court ${DeletedCount.name.toUpperCase()} deleted successfully` };
    return { user: DeletedUser, message: `User deleted successfully` };
  }
}
