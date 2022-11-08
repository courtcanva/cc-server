import { PartialType, OmitType } from "@nestjs/mapped-types";
import { CreateOrderDto } from "./createOrder.dto";

export class UpdateOrderDto extends PartialType(OmitType(CreateOrderDto, ["user_id"] as const)) {}
