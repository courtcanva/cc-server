import { PartialType } from "@nestjs/mapped-types";
import { Type, Exclude } from "class-transformer";
import { CreateOrderDto, Address } from "./createOrder.dto";
import { IsObject, IsOptional, IsString, IsBoolean, ValidateNested } from "class-validator";

export class UserInfo {
  @IsString()
  email: string;

  @IsString()
  phone: string;

  @IsObject()
  @ValidateNested({ each: true })
  @Type(() => Address)
  billingAddress: Address;
}

export class UpdateOrderDto extends PartialType(CreateOrderDto) {
  @Exclude()
  user_id: string;

  @IsBoolean()
  @IsOptional()
  isPaid: boolean;

  @IsObject()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => UserInfo)
  userInfo: UserInfo;

  @IsString()
  @IsOptional()
  stripeSessionId: string;

  @IsString()
  @IsOptional()
  currency: string;

  @IsString()
  @IsOptional()
  totalPrice: string;
}
