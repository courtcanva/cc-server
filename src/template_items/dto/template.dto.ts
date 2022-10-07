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
import { CourtCategory } from "../schemas/template.schema";

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

export class TemplateItemDto {
  @IsString()
  @IsNotEmpty()
  readonly userId: string;

  @IsString()
  @IsNotEmpty()
  readonly image: string;

  @IsObject()
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => Design)
  readonly design: Design;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  readonly description: string;

  // automaticly generate the tags??? or manual input？
  @IsString()
  @IsEnum(CourtCategory)
  readonly tags: string;
}
