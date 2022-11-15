import { Body, Controller, Get, Patch } from "@nestjs/common";
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

  @Patch()
  async changeDeposit(@Body() deposit: DepositDto): Promise<Deposit> {
    return await this.depositService.update(deposit);
  }
}
