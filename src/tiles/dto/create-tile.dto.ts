import { IsNumber, IsObject, IsPositive, IsString, IsNotEmpty } from "class-validator";
export class CreateTileDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsObject()
  readonly colors: object;

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
