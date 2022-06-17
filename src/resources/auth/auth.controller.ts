import { Controller, Get, UseGuards, Req } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthGuard } from "@nestjs/passport";

@Controller("google")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get("auth")
  @UseGuards(AuthGuard("google"))
  async googleAuth(@Req() req) {
    console.log(req);
  }

  @Get("redirect")
  @UseGuards(AuthGuard("google"))
  googleAuthRedirect(@Req() req) {
    return this.authService.googleLogin(req);
  }
}
