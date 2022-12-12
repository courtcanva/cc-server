import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { MongooseModule } from "@nestjs/mongoose";
import { Admin, AdminSchema } from "src/admin/schemas/admin.schema";
import { Order, OrderSchema } from "src/orders/schemas/order.schema";
import { PaymentInfo, PaymentInfoSchema } from "src/stripe/schemas/payment-information.schema";
import { User, UserSchema } from "src/users/schemas/user.schema";
import { TemplateItem, TemplateSchema } from "src/template_items/schemas/template.schema";
import { AdminDashboardController } from "./adminDashboard.controller";
import { AdminDashboardService } from "./adminDashboard.service";

@Module({
  imports: [
    JwtModule.register({}),
    MongooseModule.forFeature([
      {
        name: Admin.name,
        schema: AdminSchema,
      },
      {
        name: Order.name,
        schema: OrderSchema,
      },
      {
        name: PaymentInfo.name,
        schema: PaymentInfoSchema,
      },
      {
        name: User.name,
        schema: UserSchema,
      },
      {
        name: TemplateItem.name,
        schema: TemplateSchema,
      },
    ]),
  ],
  controllers: [AdminDashboardController],
  providers: [AdminDashboardService],
})
export class AdminDashboardModule {}
