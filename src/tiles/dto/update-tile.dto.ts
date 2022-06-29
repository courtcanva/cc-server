import { IsNotEmpty, IsNumber, IsObject, IsOptional, IsPositive, IsString } from "class-validator";
export class UpdateTileDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsObject()
  @IsNotEmpty()
  colors: object;

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
