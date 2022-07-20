import { Type } from "class-transformer";
import {
  IsNumber,
  IsPositive,
  IsString,
  IsNotEmpty,
  IsArray,
  ValidateNested,
} from "class-validator";

export class Color {
  name: string;
  value: string;
}

export class CreateTileDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsArray()
  @Type(() => Color)
  readonly colors: Color[];

  @IsNumber()
  @IsPositive()
  readonly length: number;

  @IsNumber()
  @IsPositive()
  readonly width: number;

  @IsNumber()
  @IsPositive()
  readonly height: number;
}
