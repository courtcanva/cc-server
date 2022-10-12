import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, ObjectId } from "mongoose";
import { CheckEmailDto } from "./dto/checkEmail.dto";
import { CreateUserDto } from "./dto/createUser.dto";
import { UpdateUserDto } from "./dto/updateUser.dto";
import { User } from "./schemas/user.schema";
import { PaginationQueryDto } from "src/utils/PaginationDto/pagination-query.dto";
import { ConnectAccountDto } from "./dto/connectAccount.dto";
import { ReturnUserInfo } from "../auth/ReturnUserInfo";
import { AuthService } from "src/auth/auth.service";
import * as argon from "argon2";

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly authService: AuthService,
  ) {}

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
   * Update user by id or email
   * @param updateUserDto
   * @returns {User}
   */
  async updateUser(updateUserDto: UpdateUserDto): Promise<User> {
    let id = updateUserDto.userId;
    const email = updateUserDto.email;
    const password = updateUserDto.password;
    let user = null;
    if (id) {
      user = await this.userModel.findById(id).exec();
    } else if (email) {
      user = await this.userModel.findOne({ email: email }).exec();
    }
    // if there is no such a user or the user has been deleted, then throw an error.
    if (!user || user.isDeleted) {
      throw new NotFoundException(`User not found`);
    }
    id = id ? id : user._id;
    const hashedPassword = password ? await argon.hash(password) : null;
    // Add new update date
    updateUserDto = { ...updateUserDto, updatedAt: new Date() };
    updateUserDto = hashedPassword ? { ...updateUserDto, password: hashedPassword } : updateUserDto;
    const updatedUser = await this.userModel
      .findByIdAndUpdate({ _id: id }, { $set: updateUserDto }, { new: true })
      .exec();
    // return the user info which has been updated.
    return updatedUser;
  }

  /**
   * connect account
   * @param accountToConnect
   * @returns {User}
   */
  async connectAccount(accountToConnect: ConnectAccountDto): Promise<ReturnUserInfo> {
    const existingUser = await this.userModel.findOne({ email: accountToConnect.email }).exec();
    const id = existingUser._id;
    if (!existingUser || existingUser.isDeleted) {
      throw new NotFoundException(`User ${id} not found`);
    }
    accountToConnect = { ...accountToConnect, updatedAt: new Date() };
    const connectedAccount = await this.userModel
      .findByIdAndUpdate({ _id: id }, { $set: accountToConnect }, { new: true })
      .exec();
    // get access token and refresh token
    const tokens = await this.authService.getTokens(connectedAccount._id, connectedAccount.email);
    await this.authService.updateRtHash(connectedAccount._id, tokens.refreshToken);
    const userInfo: ReturnUserInfo = {
      userId: connectedAccount._id,
      googleId: connectedAccount.googleId,
      email: connectedAccount.email,
      firstName: connectedAccount.firstName,
      lastName: connectedAccount.lastName,
      tokens,
      needConnection: false,
    };
    return userInfo;
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
   * @findUser false if the user needs registration, true if not
   * @needPwd
   * @param emailDto
   */
  async checkEmail(emailDto: CheckEmailDto): Promise<{
    findUser: boolean;
    needPwd: boolean;
  }> {
    const user = await this.userModel.findOne({ email: emailDto.email }).exec();
    if (user) {
      return {
        findUser: user.isActivated && !user.isDeleted,
        needPwd: !user.password,
      };
    }
    return {
      findUser: false,
      needPwd: false,
    };
  }
}
