import { Type } from "class-transformer";
import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  MaxLength,
  ValidateNested,
} from "class-validator";

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

class Tags {
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  CourtCategory: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  CourtSize: string;
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

  // automaticly generate the tags??? or manual input？
  // @IsString()
  // @IsEnum(CourtCategory)
  @IsObject()
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => Tags)
  readonly tags: Tags;
}
