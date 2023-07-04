import { Type } from "class-transformer";
import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
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
  @IsOptional()
  readonly designer?: string;

  @IsString()
  @IsNotEmpty()
  readonly designName: string;

  @IsString()
  @IsNotEmpty()
  readonly courtType: string;

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

export class CreateCartItemDto {
  @IsString()
  @IsNotEmpty()
  readonly user_id: string;

  @IsString()
  @IsNotEmpty()
  readonly quotation: string;

  @IsArray()
  @IsNotEmpty()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => QuotationDetail)
  readonly quotationDetails: QuotationDetail[];

  @IsString()
  @IsOptional()
  readonly image: string;

  @IsString()
  @IsOptional()
  readonly constructionDrawing: string;

  @IsObject()
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => Design)
  readonly design: Design;
}
