import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { DepositController } from "./deposit.controller";
import { DepositService } from "./deposit.service";
import { Deposit, DepositSchema } from "./schemas/deposit.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Deposit.name,
        schema: DepositSchema,
      },
    ]),
  ],
  controllers: [DepositController],
  providers: [DepositService],
})
export class DepositModule {}
