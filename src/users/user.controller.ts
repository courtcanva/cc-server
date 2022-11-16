import { Body, Controller, Get, Post, Put, Query } from "@nestjs/common";
import { PaginationQueryDto } from "src/utils/PaginationDto/pagination-query.dto";
import { CheckEmailDto } from "./dto/checkEmail.dto";
import { CreateUserDto } from "./dto/createUser.dto";
import { User } from "./schemas/user.schema";
import { UserService } from "./user.service";
import { ConnectAccountDto } from "./dto/connectAccount.dto";
import { ReturnUserInfo } from "../auth/ReturnUserInfo";
import { UpdateUserDto } from "./dto/updateUser.dto";
import { SearchUserDto } from "./dto/searchUser.dto";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post("status")
  async checkEmail(@Body() emailDto: CheckEmailDto): Promise<{
    findUser: boolean;
    needPwd?: boolean;
    emailRes?: {
      status: string;
      message: string;
    };
    userId?: string;
  }> {
    return await this.userService.checkEmail(emailDto);
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.userService.create(createUserDto);
  }
  @Get()
  async listUsersByAdmin(
    @Query() searchUserDto: SearchUserDto,
  ): Promise<{ data: User[]; total: number }> {
    console.log(searchUserDto);
    return await this.userService.getUserBySearch(searchUserDto);
  }
  // @Get()
  // async listAllUsers(@Query() paginationQuery: PaginationQueryDto): Promise<{
  //   total: number;
  //   data: User[];
  // }> {
  //   return await this.userService.getAllUsers(paginationQuery);
  // }

  @Put()
  async updateUserById(@Body() updateUserDto: UpdateUserDto): Promise<User> {
    return await this.userService.updateUserById(updateUserDto);
  }

  @Put("connect")
  async connectAccount(@Body() connectAccountDto: ConnectAccountDto): Promise<ReturnUserInfo> {
    return await this.userService.connectAccount(connectAccountDto);
  }
}
