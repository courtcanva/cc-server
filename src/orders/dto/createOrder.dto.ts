import { Type } from "class-transformer";
import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  IsBoolean,
  Min,
  ValidateNested,
} from "class-validator";

export class Color {
  @IsString()
  @IsNotEmpty()
  location: string;

  @IsString()
  @IsNotEmpty()
  color: string;
}

export class CourtSize {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  length: number;

  @IsNumber()
  @IsNotEmpty()
  width: number;

  @IsNumber()
  centreCircleRadius: number;

  @IsNumber()
  threePointRadius: number;

  @IsNumber()
  threePointLine: number;

  @IsNumber()
  lengthOfCorner: number;

  @IsNumber()
  restrictedAreaLength: number;

  @IsNumber()
  restrictedAreaWidth: number;

  @IsNumber()
  sideBorderWidth: number;

  @IsNumber()
  lineBorderWidth: number;
}

export class Design {
  @IsString()
  @IsNotEmpty()
  readonly designName: string;

  @IsArray()
  @IsNotEmpty()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => Color)
  readonly tileColor: Color[];

  @IsObject()
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CourtSize)
  readonly courtSize: CourtSize;
}

export class QuotationDetail {
  @IsString()
  @IsNotEmpty()
  color: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  quantity: number;
}

export class Address {
  @IsString()
  @IsNotEmpty()
  country: string;

  @IsString()
  @IsNotEmpty()
  state: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  line1: string;

  @IsString()
  @IsOptional()
  postCode: string;
}

export class Items {
  @IsString()
  @IsNotEmpty()
  quotation: string;

  @IsString()
  @IsOptional()
  image: string;

  @IsString()
  @IsOptional()
  constructionDrawing: string;

  @IsBoolean()
  @IsOptional()
  needLevelGround: boolean;

  @IsObject()
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => Design)
  design: Design;

  @IsArray()
  @IsNotEmpty()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => QuotationDetail)
  quotationDetails: QuotationDetail[];

  @IsObject()
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => Address)
  constructionAddress: Address;
}

export class Discount {
  @IsString()
  discountType: string;

  @IsNumber()
  discountRatio: number;

  @IsString()
  discountAmount: string;
}

export class CreateOrderDto {
  @IsString()
  @IsNotEmpty()
  readonly user_id: string;

  @IsArray()
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => Items)
  readonly items: Items[];

  @IsObject()
  @ValidateNested({ each: true })
  @IsOptional()
  @Type(() => Discount)
  readonly discount: Discount;
}
