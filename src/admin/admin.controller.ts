import { Body, Controller, HttpCode, HttpStatus, Post, Req, UseGuards } from "@nestjs/common";
import { ObjectId } from "mongoose";
import { AdminService } from "./admin.service";
import { AdminDto } from "./dto/admin.dto";
import { Tokens } from "./types/tokens.type";
import { AuthGuard } from "@nestjs/passport";
import { AccessTokenGuard, RefreshTokenGuard } from "src/common/guards";
import { GetCurrentAdmin, GetCurrentAdminId } from "src/common/decorators";

@Controller("admin")
export class AdminController {
  constructor(private adminService: AdminService) {}

  //Register new admin
  @Post("register")
  @HttpCode(HttpStatus.CREATED)
  adminRegister(@Body() dto: AdminDto): Promise<Tokens> {
    return this.adminService.adminRegister(dto);
  }

  //Login
  @Post("login")
  @HttpCode(HttpStatus.OK)
  adminSignIn(@Body() dto: AdminDto): Promise<Tokens> {
    return this.adminService.adminLogin(dto);
  }

  //Logout
  @UseGuards(AccessTokenGuard)
  @Post("logout")
  @HttpCode(HttpStatus.OK)
  adminLogout(@GetCurrentAdminId() adminId: ObjectId) {
    return this.adminService.adminLogout(adminId);
  }

  //Use refresh token to exchange new token pair
  @UseGuards(RefreshTokenGuard)
  @Post("refresh")
  @HttpCode(HttpStatus.OK)
  refreshTokens(
    @GetCurrentAdminId() adminId: ObjectId,
    @GetCurrentAdmin("refreshToken") refreshToken: string,
  ) {
    return this.adminService.refreshTokens(adminId, refreshToken);
  }
}
