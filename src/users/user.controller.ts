import { Body, Controller, Get, Post, Put, Query } from "@nestjs/common";
import { PaginationQueryDto } from "src/utils/PaginationDto/pagination-query.dto";
import { CheckEmailDto } from "./dto/checkEmail.dto";
import { CreateUserDto } from "./dto/createUser.dto";
import { User } from "./schemas/user.schema";
import { UserService } from "./user.service";
import { ConnectAccountDto } from "./dto/connectAccount.dto";
import { ReturnUserInfo } from "../auth/ReturnUserInfo";
import { UpdateUserDto } from "./dto/updateUser.dto";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post("status")
  async checkEmail(@Body() emailDto: CheckEmailDto): Promise<{
    findUser: boolean;
    needPwd: boolean;
    emailRes: {
      status: string;
      message: string;
    };
  }> {
    return await this.userService.checkEmail(emailDto);
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.userService.create(createUserDto);
  }

  @Get()
  async getAllUsers(@Query() paginationQuery: PaginationQueryDto): Promise<User[]> {
    const { limit, offset } = paginationQuery;
    return await this.userService.getAllUsers(paginationQuery);
  }

  @Put()
  async updateUser(@Body() updateUserDto: UpdateUserDto): Promise<User> {
    return await this.userService.updateUser(updateUserDto);
  }

  @Put("connect")
  async connectAccount(@Body() connectAccountDto: ConnectAccountDto): Promise<ReturnUserInfo> {
    return await this.userService.connectAccount(connectAccountDto);
  }
}
