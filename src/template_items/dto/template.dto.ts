import { Type } from "class-transformer";
import {
  ArrayMinSize,
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  MaxLength,
  ValidateNested,
} from "class-validator";
import { CourtCategory, CourtType } from "../schemas/template.schema";

class Color {
  @IsString()
  @IsNotEmpty()
  location: string;

  @IsString()
  @IsNotEmpty()
  color: string;
}

class CourtSize {
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

class Design {
  @IsString()
  @IsOptional()
  readonly designer?: string;

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

export class Tags {
  @IsEnum(CourtCategory)
  @IsOptional()
  @IsNotEmpty()
  CourtCategory: string;

  @IsOptional()
  @IsNotEmpty()
  @IsEnum(CourtType)
  // CourtSize: string;
  CourtType: string;
}

export class TemplateItemDto {
  @IsString()
  @IsNotEmpty()
  readonly user_id: string;

  @IsObject()
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => Design)
  readonly design: Design;

  @IsString()
  @IsNotEmpty()
  readonly image: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  readonly description: string;

  @IsObject()
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => Tags)
  readonly tags: Tags;
}
