import { Type } from "class-transformer";
import {
  IsEmail,
  IsNotEmpty,
  IsObject,
  IsPositive,
  IsString,
  ValidateNested,
} from "class-validator";

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

export class CreatePaymentInfoDto {
  @IsString()
  @IsNotEmpty()
  readonly orderId: string;

  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly phone: string;

  @IsString()
  @IsNotEmpty()
  readonly currency: string;

  @IsString()
  @IsNotEmpty()
  readonly sessionId: string;

  @IsPositive()
  @IsNotEmpty()
  readonly amountTotal: number;

  @IsObject()
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => Address)
  readonly billingAddress: Address;

  @IsObject()
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => Address)
  readonly constructionAddress: Address;
}
