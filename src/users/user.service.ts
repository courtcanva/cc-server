import { forwardRef, Inject, Injectable, NotFoundException } from "@nestjs/common";
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
    @Inject(forwardRef(() => AuthService)) private readonly authService: AuthService,
  ) {}

  /**
   * Get all users from database
   * @returns {[]:User}
   */
  async getAllUsers(paginationQueryDto: PaginationQueryDto): Promise<{
    offset: number;
    total: number;
    totalPages: number;
    data: User[];
  }> {
    const { limit = 0, offset = 0 } = paginationQueryDto;
    const optionalQuery: { [key: string]: any } = {};
    const users = await this.userModel
      .find({ isDeleted: false, ...optionalQuery })
      .sort({ createdAt: 1 })
      .skip(offset)
      .limit(limit)
      .exec();

    const results = await this.userModel.find({ isDeleted: false, ...optionalQuery }).exec();
    const total = results.filter((item) => !item.isDeleted).length;
    const totalPages = Math.ceil(total / limit);

    return { data: users, offset, total, totalPages };
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
   * Update user by id
   * @param updateUserDto
   * @returns {User}
   */
  async updateUserById(updateUserDto: UpdateUserDto): Promise<User> {
    const id = updateUserDto.userId;
    const user = await this.userModel.findById(id).exec();

    // if there is no such a user or the user has been deleted, then throw an error.
    if (!user || user.isDeleted) {
      throw new NotFoundException(`User not found`);
    }
    if (updateUserDto.password) {
      updateUserDto = { ...updateUserDto, password: await argon.hash(updateUserDto.password) };
    }
    const updatedUser = await this.userModel
      .findByIdAndUpdate({ _id: id }, { $set: updateUserDto }, { new: true })
      .exec();
    // return the user info which has been updated.
    return updatedUser;
  }

  /**
   * connect account
   * @param accountToConnectDto
   * @returns {User}
   */
  async connectAccount(accountToConnectDto: ConnectAccountDto): Promise<ReturnUserInfo> {
    const existingUser = await this.userModel.findOne({ email: accountToConnectDto.email }).exec();
    if (!existingUser || existingUser.isDeleted) {
      throw new NotFoundException(`User not found`);
    }
    const id = existingUser._id;
    const connectedAccount = await this.userModel
      .findByIdAndUpdate({ _id: id }, { $set: accountToConnectDto }, { new: true })
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
    });
    //return the user who has been deleted
    return { message: `User deleted successfully` };
  }

  /**
   * @findUser false if the user needs registration
   * @needPwd true if the user registered through google and does not have passwords
   * @param checkEmailDto
   */
  async checkEmail(checkEmailDto: CheckEmailDto): Promise<{
    findUser: boolean;
    needPwd?: boolean;
    emailRes?: {
      status: string;
      message: string;
    };
    userId?: string;
  }> {
    const user = await this.userModel.findOne({ email: checkEmailDto.email }).exec();
    if (user) {
      const needPwd = !user.password;
      const emailRes = needPwd
        ? await this.authService.sendOTPVerificationEmail(user._id, user.email)
        : null;
      return {
        findUser: user.isActivated && !user.isDeleted,
        needPwd: needPwd,
        emailRes: emailRes,
        userId: user._id,
      };
    }
    return {
      findUser: false,
    };
  }
}
