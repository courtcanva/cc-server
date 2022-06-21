import { IsNumber, IsObject, IsOptional, IsPositive, IsString, IsNotEmpty } from "class-validator";
export class UpdateTileDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsOptional()
  @IsNotEmpty()
  @IsObject()
  readonly colors: object;

  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  readonly length: number;

  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  readonly width: number;

  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  readonly height: number;
}
