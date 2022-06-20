import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./schemas/user.schema";

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {}
  googleLogin(req) {
    if (!req.user) {
      return "No user from google";
    }

    return {
      message: "User information from google",
      user: req.user,
    };
  }

  googleLogout(req, res) {
    if (req.user) {
      // req.logout();
      res.send("done");
    }
  }

  async getAllGoogleUsers(): Promise<User[]> {
    const googleUsers = await this.userModel.find().exec();
    return googleUsers.filter((item) => !item.isDeleted);
  }

  async getGoogleUserById(id: string): Promise<User> {
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

  // async updateGoogleUserById(id: string, updateUserDto: UpdateUserDto): Promise<User> {
  //   try {
  //     const existingUser = await this.userModel
  //       .findOneAndUpdate({ _id: id }, { $set: updateUserDto }, { new: true })
  //       .exec();

  //     // if (!existing) {
  //     //   throw new NotFoundException(`User ${id} not found`);
  //     // }
  //     return existingUser;
  //   } catch (err) {
  //     throw new BadRequestException({ status: 400, message: "User not found!" });
  //   }
  // }

  async removeGoogleUserById(id: string): Promise<{ deleted: boolean; message?: string }> {
    try {
      await this.userModel.remove({ id });
      return { deleted: true };
    } catch (err) {
      return { deleted: false, message: err.message };
    }
  }
}
