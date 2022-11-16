import { Body, Controller, Get, Patch, UseGuards } from "@nestjs/common";
import { permissionType } from "src/admin/schemas/admin.schema";
import { HasPermissions } from "src/auth/hasPermission.decorator";
import { PermissionsGuard } from "src/auth/permission.guard";
import { AccessTokenGuard } from "src/common/guards";
import { DepositService } from "./deposit.service";
import { DepositDto } from "./dto/deposit.dto";
import { Deposit } from "./schemas/deposit.schema";

@Controller("deposit")
export class DepositController {
  constructor(private readonly depositService: DepositService) {}

  @Get()
  async getDeopsit(): Promise<Deposit> {
    return await this.depositService.findOne();
  }

  @HasPermissions(permissionType.SUPER)
  @UseGuards(AccessTokenGuard, PermissionsGuard)
  @Patch()
  async changeDeposit(@Body() deposit: DepositDto): Promise<Deposit> {
    return await this.depositService.update(deposit);
  }
}
