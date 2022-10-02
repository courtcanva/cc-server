import { Body, Controller, Get, HttpStatus, Post, Put, Query } from "@nestjs/common";
import { PaginationQueryDto } from "src/utils/PaginationDto/pagination-query.dto";
import { CheckEmailDto } from "./dto/checkEmail.dto";
import { CreateUserDto } from "./dto/createUser.dto";
import { User } from "./schemas/user.schema";
import { UserService } from "./user.service";
import { ConnectAccountDto } from "./dto/connectAccount.dto";
import { ReturnUserInfo } from "../auth/ReturnUserInfo";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post()
  async checkEmail(@Body() emailDto: CheckEmailDto): Promise<boolean> {
    return await this.userService.checkEmail(emailDto);
  }

  @Post()
  async create(@Body() createUser: CreateUserDto): Promise<User> {
    return await this.userService.create(createUser);
  }

  @Get()
  async getAllUsers(@Query() paginationQuery: PaginationQueryDto): Promise<User[]> {
    const { limit, offset } = paginationQuery;
    return await this.userService.getAllUsers(paginationQuery);
  }

  @Put("connect")
  async connectAccount(@Body() accountToConnect: ConnectAccountDto): Promise<ReturnUserInfo> {
    return await this.userService.connectAccount(accountToConnect);
  }
}
