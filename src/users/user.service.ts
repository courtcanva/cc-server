import { HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, ObjectId } from "mongoose";
import { CheckEmailDto } from "./dto/checkEmail.dto";
import { CreateUserDto } from "./dto/createUser.dto";
import { UpdateUserDto } from "./dto/updateUser.dto";
import { User } from "./schemas/user.schema";
import { PaginationQueryDto } from "src/utils/PaginationDto/pagination-query.dto";

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {}
  /**
   * Get all users from database
   * @returns {[]:User}
   */
  async getAllUsers(paginationQuery: PaginationQueryDto): Promise<User[]> {
    const { limit, offset } = paginationQuery;
    const users = await this.userModel.find().skip(offset).limit(limit).exec();
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
      throw new NotFoundException("User not found");
    }
    await this.userModel.findByIdAndUpdate(id, {
      isDeleted: true,
      updatedAt: new Date(),
    });
    //return the user who has been deleted
    return { message: `User deleted successfully` };
  }

  /**
   * Check user existence by email
   * @param {CheckEmailDto}
   */
  async checkEmail(emailDto: CheckEmailDto): Promise<boolean> {
    const foundUser = await this.userModel.find({ email: emailDto.email }).exec();
    return foundUser.length > 0 ? true : false;
  }
}
