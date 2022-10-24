import { PartialType } from "@nestjs/mapped-types";
import { Exclude } from "class-transformer";
import { CreateOrderDto } from "./createOrder.dto";

export class UpdateOrderDto extends PartialType(CreateOrderDto) {
  @Exclude()
  user_id: string;
}
