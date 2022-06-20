import { Controller, Get, UseGuards, Req, Post, Res, Next } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthGuard } from "@nestjs/passport";

@Controller("google")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  @UseGuards(AuthGuard("google"))
  async googleAuth(@Req() req) {
    console.log(req);
  }

  @Get("redirect")
  @UseGuards(AuthGuard("google"))
  googleAuthRedirect(@Req() req) {
    return this.authService.googleLogin(req);
  }
  @Post("logout")
  function(@Req() req, @Res() res, @Next() next) {
    req.logout(function (err) {
      if (err) {
        return next(err);
      }
      res.redirect("http://localhost:3000");
    });
  }
  // logout(@Req() req, @Res() res) {
  //   return this.authService.googleLogout(req, res);
  // }
}
