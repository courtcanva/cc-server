import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString } from "class-validator";
export class UpdateTileDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsArray()
  @IsNotEmpty()
  readonly colors: { name: string; value: string }[];

  @IsOptional()
  @IsNumber()
  @IsPositive()
  length: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  width: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  height: number;
}
