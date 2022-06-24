import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  //Google Login
  @Post("google")
  async est(@Body() body): Promise<any> {
    return this.authService.googleLogin(body.code);
  }
}
