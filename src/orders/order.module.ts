import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Order, OrderSchema } from "./schemas/order.schema";
import { OrderController } from "./order.controller";
import { OrderService } from "./order.service";
import { ExpireDay, ExpireDaySchema } from "src/expire_day/schemas/expireDay.schema";
import { ExpireDayService } from "src/expire_day/expireDay.service";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [
    JwtModule,
    MongooseModule.forFeature([
      {
        name: Order.name,
        schema: OrderSchema,
      },
      {
        name: ExpireDay.name,
        schema: ExpireDaySchema,
      },
    ]),
  ],
  controllers: [OrderController],
  providers: [OrderService, ExpireDayService],
  exports: [OrderService],
})
export class OrderModule {}
