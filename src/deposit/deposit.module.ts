import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { MongooseModule } from "@nestjs/mongoose";
import { Admin, AdminSchema } from "src/admin/schemas/admin.schema";
import { DepositController } from "./deposit.controller";
import { DepositService } from "./deposit.service";
import { Deposit, DepositSchema } from "./schemas/deposit.schema";

@Module({
  imports: [
    JwtModule.register({}),
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
