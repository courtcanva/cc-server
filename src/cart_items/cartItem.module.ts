import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "../users/schemas/user.schema";
import { CartItemController } from "./cartItem.controller";
import { CartItemService } from "./cartItem.service";
import { CartItem, CartItemSchema } from "./schemas/cartItem.schema";

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
    ]),
  ],
  controllers: [CartItemController],
  providers: [CartItemService],
})
export class CartItemModule {}
