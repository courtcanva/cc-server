import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from "@nestjs/common";
import { ObjectId } from "mongoose";
import { GetCurrentClient, GetCurrentClientId } from "src/common/decorators";
import { RefreshTokenGuard } from "src/common/guards";
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
    return this.authService.userRegister(body);
  }

  @Post("login")
  @HttpCode(HttpStatus.OK)
  clientSignIn(@Body() body): Promise<Tokens> {
    return this.authService.userLogin(body);
  }

  @Post("logout")
  @HttpCode(HttpStatus.OK)
  clientLogout(@Body() body) {
    return this.authService.userLogout(body);
  }

  @UseGuards(RefreshTokenGuard)
  @Post("refresh")
  @HttpCode(HttpStatus.OK)
  refreshTokens(
    @GetCurrentClientId() userId: ObjectId,
    @GetCurrentClient("refreshToken") refreshToken: string,
  ) {
    return this.authService.refreshTokens(userId, refreshToken);
  }

  @Post("verifyOTP")
  async verifyOTP(@Body() body): Promise<any> {
    return this.authService.verifyOTP(body);
  }

  @Post("resendOTP")
  async resendOTP(@Body() body): Promise<any> {
    return this.authService.resendOTP(body);
  }
}
