import { Body, Controller, Post } from "@nestjs/common";
import { User } from "src/users/schemas/user.schema";
import { AuthService } from "./auth.service";

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

  @Post("verifyOTP")
  async verifyOTP(@Body() body): Promise<any> {
    return this.authService.verifyOTP(body);
  }
}
