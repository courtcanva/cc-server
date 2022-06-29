import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  //User can login with their Google accounts
  @Post("google")
  async googleLogin(@Body() body): Promise<any> {
    return this.authService.googleLogin(body.code);
  }
}
