import { PartialType } from "@nestjs/mapped-types";
import { Exclude } from "class-transformer";
import { CreateCartItemDto } from "./create-cart_item.dto";

export class UpdateCartItemDto extends PartialType(CreateCartItemDto) {
  @Exclude()
  user_id: string;
}
