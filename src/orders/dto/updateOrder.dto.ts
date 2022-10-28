import { PartialType } from "@nestjs/mapped-types";
import { Exclude } from "class-transformer";
import { IsEnum, IsNotEmpty } from "class-validator";
import { StatusType } from "../schemas/order.schema";
import { CreateOrderDto } from "./createOrder.dto";

export class UpdateOrderDto extends PartialType(CreateOrderDto) {
  @Exclude()
  user_id: string;

  @IsEnum(StatusType)
  @IsNotEmpty()
  status: string;
}
