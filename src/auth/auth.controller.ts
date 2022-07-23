import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from "@nestjs/common";
import { ObjectId } from "mongoose";
import { GetCurrentAdmin, GetCurrentAdminId } from "src/common/decorators";
import { AccessTokenGuard, RefreshTokenGuard } from "src/common/guards";
import { CreateUserDto } from "src/users/dto/createUser.dto";
import { User } from "src/users/schemas/user.schema";
import { AuthService } from "./auth.service";
import { Tokens } from "./types";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  //User can login with their Google accounts
  @Post("google")
  async googleLogin(@Body() body): Promise<any> {
    return this.authService.googleLogin(body.code);
  }

  @Post("register")
  async clientRegister(@Body() body): Promise<any> {
    return this.authService.clientRegister(body);
  }

  @Post("login")
  @HttpCode(HttpStatus.OK)
  adminSignIn(@Body() body): Promise<Tokens> {
    return this.authService.userLogin(body);
  }

  @UseGuards(AccessTokenGuard)
  @Post("logout")
  @HttpCode(HttpStatus.OK)
  adminLogout(@GetCurrentAdminId() userId: ObjectId) {
    return this.authService.userLogout(userId);
  }

  @UseGuards(RefreshTokenGuard)
  @Post("refresh")
  @HttpCode(HttpStatus.OK)
  refreshTokens(
    @GetCurrentAdminId() userId: ObjectId,
    @GetCurrentAdmin("refreshToken") refreshToken: string,
  ) {
    return this.authService.refreshTokens(userId, refreshToken);
  }

  @Post("verifyOTP")
  async verifyOTP(@Body() body): Promise<any> {
    return this.authService.verifyOTP(body);
  }
}
