import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  Param,
  Delete,
  Patch,
  Query,
} from "@nestjs/common";
import { ObjectId } from "mongoose";
import { AdminService } from "./admin.service";
import { AdminDto } from "./dto/admin.dto";
import { Tokens } from "./types/tokens.type";
import { AccessTokenGuard, RefreshTokenGuard } from "src/common/guards";
import { GetCurrentAdmin, GetCurrentAdminId } from "src/common/decorators";
import { ParseObjectIdPipe } from "src/utils/ParseObjectIdPipe";
import { Admin } from "./schemas/admin.schema";
import { UpdateAdminDto } from "./dto/update-admin.dto";
import { PaginationQueryDto } from "../utils/PaginationDto/pagination-query.dto";

@Controller("admin")
export class AdminController {
  constructor(private adminService: AdminService) {}

  @Get()
  async findAllAdmin(@Query() paginationQuery: PaginationQueryDto) {
    // const { limit, offset } = paginationQuery;
    return await this.adminService.findAll(paginationQuery);
  }

  @Get(":adminId")
  async getAdminById(@Param("adminId", ParseObjectIdPipe) adminId: ObjectId): Promise<Admin> {
    return await this.adminService.findOne(adminId);
  }

  @Patch(":adminId")
  async updateAdminById(
    @Param("adminId") adminId: ObjectId,
    @Body() updateAdminDto: UpdateAdminDto,
  ): Promise<Admin> {
    return await this.adminService.update(adminId, updateAdminDto);
  }

  @Delete(":adminId")
  async deleteAdminById(@Param("adminId", ParseObjectIdPipe) adminId: ObjectId): Promise<boolean> {
    return await this.adminService.remove(adminId);
  }

  @Post("register")
  @HttpCode(HttpStatus.CREATED)
  adminRegister(@Body() dto: AdminDto): Promise<Tokens> {
    return this.adminService.adminRegister(dto);
  }

  @Post("login")
  @HttpCode(HttpStatus.OK)
  adminSignIn(@Body() dto: AdminDto): Promise<Tokens> {
    return this.adminService.adminLogin(dto);
  }

  @UseGuards(AccessTokenGuard)
  @Post("logout")
  @HttpCode(HttpStatus.OK)
  adminLogout(@GetCurrentAdminId() adminId: ObjectId) {
    return this.adminService.adminLogout(adminId);
  }

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
