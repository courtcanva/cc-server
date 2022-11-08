import { PartialType, OmitType } from "@nestjs/mapped-types";
import { IsEnum, IsNotEmpty } from "class-validator";
import { StatusType } from "../schemas/order.schema";
import { CreateOrderDto } from "./createOrder.dto";

export class UpdateOrderDto extends PartialType(OmitType(CreateOrderDto, ["user_id"] as const)) {}
