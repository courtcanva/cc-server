import { IsNumber, IsPositive, IsString, IsNotEmpty, IsArray, IsOptional } from "class-validator";
export class CreateTileDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsArray()
  readonly colors: { name: string; value: string }[];

  @IsNumber()
  @IsPositive()
  readonly length: number;

  @IsNumber()
  @IsPositive()
  readonly width: number;

  @IsNumber()
  @IsPositive()
  readonly height: number;

  @IsString()
  @IsOptional()
  readonly price: string;
}
