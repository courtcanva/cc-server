import { forwardRef, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, ObjectId, SortOrder } from "mongoose";
import { CheckEmailDto } from "./dto/checkEmail.dto";
import { CreateUserDto } from "./dto/createUser.dto";
import { UpdateUserDto } from "./dto/updateUser.dto";
import { User } from "./schemas/user.schema";
import { PaginationQueryDto } from "src/utils/PaginationDto/pagination-query.dto";
import { ConnectAccountDto } from "./dto/connectAccount.dto";
import { ReturnUserInfo } from "../auth/ReturnUserInfo";
import { AuthService } from "src/auth/auth.service";
import * as argon from "argon2";
import { SearchUserDto } from "./dto/searchUser.dto";
import { CheckPasswordDto } from "./dto/checkPassword.dto";

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
    total: number;
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

    const total = await this.userModel.countDocuments({ isDeleted: false });
    return { data: users, total };
  }

  async getUserBySearch(searchUserDto: SearchUserDto): Promise<{ data: User[]; total: number }> {
    let users = [];
    let optionalQuery = {};
    let splitName: string[];
    let qFirstName, qLastName, qName, qEmail: RegExp;
    const { user_id, email, name, limit = 0, offset = 0, sort, desc } = searchUserDto;
    const sorting = sort ? { [sort]: desc } : { createdAt: -1 };
    // eslint-disable-next-line prefer-const
    qEmail = new RegExp(`.*${email}.*`, "i");
    if (name && name.includes(" ")) {
      splitName = name.split(" ");
      qFirstName = new RegExp(`.*${splitName[0]}.*`, "i");
      qLastName = new RegExp(`.*${splitName[1]}.*`, "i");
      optionalQuery = {
        $and: [{ firstName: qFirstName }, { lastName: qLastName }],
      };
    }
    if (name && !name.includes(" ")) {
      qName = new RegExp(`.*${name}.*`, "i");
      if (!email && !user_id) {
        optionalQuery = {
          $or: [{ firstName: qName }, { lastName: qName }],
        };
      } else {
        user_id.match(/^[0-9a-fA-F]{24}$/)
          ? (optionalQuery = {
              $or: [{ firstName: qName }, { lastName: qName }, { _id: user_id }, { email: qEmail }],
            })
          : (optionalQuery = {
              $or: [{ firstName: qName }, { lastName: qName }, { email: qEmail }],
            });
      }
    }
    if (user_id && !email && !name) {
      user_id.match(/^[0-9a-fA-F]{24}$/)
        ? (optionalQuery = { _id: user_id })
        : (optionalQuery = { email: user_id + "@wrong" });
    }
    if (email && !user_id && !name) {
      optionalQuery = { email: qEmail };
    }
    users = await this.userModel
      .find(optionalQuery, { isDeleted: false })
      .sort(sorting as { [key: string]: SortOrder | { $meta: "textScore" } })
      .skip(offset)
      .limit(limit)
      .exec();
    const total = await this.userModel.countDocuments({
      $and: [{ isDeleted: false }],
      $or: [optionalQuery],
    });
    return { data: users, total };
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
  /**
   * check password is valid or not
   * @param CheckPasswordDto
   * @returns {boolean}
   */

  async checkPassword(checkPassword: CheckPasswordDto): Promise<boolean> {
    const id = checkPassword.userId;
    const user = await this.userModel.findById(id).exec();
    if (!user || user.isDeleted) {
      throw new NotFoundException(`User not found`);
    }
    const passwordMatches = await argon.verify(user.password, checkPassword.password);

    return passwordMatches;
  }
}
