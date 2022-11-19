import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "../users/schemas/user.schema";
import { CartItemController } from "./cartItem.controller";
import { CartItemService } from "./cartItem.service";
import { CartItem, CartItemSchema } from "./schemas/cartItem.schema";
import { ExpireDay, ExpireDaySchema } from "src/expire_day/schemas/expireDay.schema";
import { ExpireDayService } from "src/expire_day/expireDay.service";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: CartItem.name,
        schema: CartItemSchema,
      },
      {
        name: User.name,
        schema: UserSchema,
      },
      {
        name: ExpireDay.name,
        schema: ExpireDaySchema,
      },
    ]),
  ],
  controllers: [CartItemController],
  providers: [CartItemService, ExpireDayService],
})
export class CartItemModule {}
