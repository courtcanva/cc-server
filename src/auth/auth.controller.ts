import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
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

  @Post("refresh")
  @HttpCode(HttpStatus.OK)
  refreshTokens(@Body() body) {
    return this.authService.refreshTokens(body);
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
