import { Body, Controller, Get, Patch, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { permissionType } from "src/admin/schemas/admin.schema";
import { HasPermissions } from "src/auth/hasPermission.decorator";
import { PermissionsGuard } from "src/auth/permission.guard";
import { ExpireDayService } from "./expireDay.service";
import { ExpireDayDto } from "./dto/expireDay.dto";
import { ExpireDay } from "./schemas/expireDay.schema";

@Controller("expire-day")
export class ExpireDayController {
  constructor(private readonly expireDayService: ExpireDayService) {}

  @Get()
  async getExpireDay(): Promise<ExpireDay> {
    return await this.expireDayService.findOne();
  }

  @HasPermissions(permissionType.SUPER)
  @UseGuards(AuthGuard("jwt"), PermissionsGuard)
  @Patch()
  async changeExpireDay(@Body() expireDay: ExpireDayDto): Promise<ExpireDay> {
    return await this.expireDayService.update(expireDay);
  }
}
