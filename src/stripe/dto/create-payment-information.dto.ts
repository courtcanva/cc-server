import { Type } from "class-transformer";
import { IsNotEmpty, IsObject, IsPhoneNumber, IsString, ValidateNested } from "class-validator";

export class Address {
  @IsString()
  city: string;

  @IsString()
  country: string;

  @IsString()
  @IsNotEmpty()
  line1: string;

  @IsString()
  line2: string;

  @IsString()
  @IsNotEmpty()
  postalCode: string;

  @IsString()
  @IsNotEmpty()
  state: string;
}

export class createPaymentInfoDto {
  @IsString()
  @IsNotEmpty()
  orderId: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsPhoneNumber("AU")
  phone: string;

  @IsString()
  @IsNotEmpty()
  currency: string;

  @IsString()
  @IsNotEmpty()
  sessionId: string;

  @IsString()
  @IsNotEmpty()
  amountTotal: string;

  @IsObject()
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => Address)
  billingAddress: Address;

  @IsObject()
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => Address)
  constructionAddress: Address;
}
