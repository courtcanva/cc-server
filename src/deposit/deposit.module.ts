import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AdminModule } from "src/admin/admin.module";
import { Admin, AdminSchema } from "src/admin/schemas/admin.schema";
import { DepositController } from "./deposit.controller";
import { DepositService } from "./deposit.service";
import { Deposit, DepositSchema } from "./schemas/deposit.schema";

@Module({
  imports: [
    AdminModule,
    MongooseModule.forFeature([
      {
        name: Deposit.name,
        schema: DepositSchema,
      },
      {
        name: Admin.name,
        schema: AdminSchema,
      },
    ]),
  ],
  controllers: [DepositController],
  providers: [DepositService],
})
export class DepositModule {}
