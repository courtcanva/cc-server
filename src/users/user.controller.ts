import { Body, Controller, Get, HttpStatus, Post } from "@nestjs/common";
import { CheckEmailDto } from "./dto/checkEmail.dto";
import { CreateUserDto } from "./dto/createUser.dto";
import { User } from "./schemas/user.schema";
import { UserService } from "./user.service";

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
  async getAllUsers(): Promise<User[]> {
    return await this.userService.getAllUsers();
  }
}
