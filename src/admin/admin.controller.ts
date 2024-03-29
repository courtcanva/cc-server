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
import { Tokens } from "./types/tokens.type";
import { AccessTokenGuard, RefreshTokenGuard } from "src/common/guards";
import { GetCurrentAdmin, GetCurrentAdminId } from "src/common/decorators";
import { ParseObjectIdPipe } from "src/utils/ParseObjectIdPipe";
import { Admin } from "./schemas/admin.schema";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { UpdateAdminDto } from "./dto/update-admin.dto";
import { LoginAdminDto } from "./dto/login-admin.dto";
import { PaginationQueryDto } from "../utils/PaginationDto/pagination-query.dto";
import { SetAdminPermissionDto } from "./dto/set-admin-permission.dto";
import { AuthGuard } from "@nestjs/passport";
import { HasPermissions } from "src/auth/hasPermission.decorator";
import { permissionType } from "src/admin/schemas/admin.schema";
import { PermissionsGuard } from "src/auth/permission.guard";

@Controller("admin")
export class AdminController {
  constructor(private adminService: AdminService) {}

  @Get()
  async findAllAdmin(@Query() paginationQuery: PaginationQueryDto): Promise<Admin[]> {
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

  @HasPermissions(permissionType.SUPER)
  @UseGuards(AuthGuard("jwt"), PermissionsGuard)
  @Patch(":adminId/setPermission")
  async setAdminPermissionById(
    @Param("adminId", ParseObjectIdPipe) adminId: ObjectId,
    @Body() setAdminPermissionDto: SetAdminPermissionDto,
  ): Promise<boolean> {
    return await this.adminService.setPermission(adminId, setAdminPermissionDto);
  }

  @HasPermissions(permissionType.SUPER)
  @UseGuards(AuthGuard("jwt"), PermissionsGuard)
  @Delete(":adminId")
  async deleteAdminById(@Param("adminId", ParseObjectIdPipe) adminId: ObjectId): Promise<boolean> {
    return await this.adminService.remove(adminId);
  }

  @HasPermissions(permissionType.SUPER)
  @UseGuards(AuthGuard("jwt"), PermissionsGuard)
  @Patch(":adminId/restore")
  async restoreAdminById(@Param("adminId", ParseObjectIdPipe) adminId: ObjectId): Promise<boolean> {
    return await this.adminService.restore(adminId);
  }

  @Post("register")
  @HttpCode(HttpStatus.CREATED)
  adminRegister(@Body() dto: CreateAdminDto): Promise<Tokens> {
    return this.adminService.adminRegister(dto);
  }

  @Post("login")
  @HttpCode(HttpStatus.OK)
  adminSignIn(@Body() dto: LoginAdminDto): Promise<Tokens> {
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
