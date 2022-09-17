import { PartialType } from "@nestjs/mapped-types";
import { Exclude } from "class-transformer";
import { CreateCartItemDto } from "./create-cartItem.dto";

export class UpdateCartItemDto extends PartialType(CreateCartItemDto) {
  @Exclude()
  user_id: string;
}
