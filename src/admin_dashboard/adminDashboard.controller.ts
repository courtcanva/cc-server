import { Controller, Get, UseGuards } from "@nestjs/common";
import { HasPermissions } from "src/auth/hasPermission.decorator";
import { permissionType } from "src/admin/schemas/admin.schema";
import { AuthGuard } from "@nestjs/passport";
import { PermissionsGuard } from "src/auth/permission.guard";
import { AdminDashboardService } from "./adminDashboard.service";

@Controller("admin-dashboard")
export class AdminDashboardController {
  constructor(private readonly adminDashboardService: AdminDashboardService) {}

  @Get()
  // @HasPermissions(permissionType.SUPER)
  // @UseGuards(AuthGuard("jwt"), PermissionsGuard)
  async getDashboardData(): Promise<any> {
    return await this.adminDashboardService.getDashboardData();
  }
}
