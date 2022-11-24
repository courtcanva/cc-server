import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { MongooseModule } from "@nestjs/mongoose";
import { Admin, AdminSchema } from "src/admin/schemas/admin.schema";
import { ExpireDayController } from "./expireDay.controller";
import { ExpireDayService } from "./expireDay.service";
import { ExpireDay, ExpireDaySchema } from "./schemas/expireDay.schema";

@Module({
  imports: [
    JwtModule.register({}),
    MongooseModule.forFeature([
      {
        name: ExpireDay.name,
        schema: ExpireDaySchema,
      },
      {
        name: Admin.name,
        schema: AdminSchema,
      },
    ]),
  ],
  controllers: [ExpireDayController],
  providers: [ExpireDayService],
})
export class ExpireDayModule {}
