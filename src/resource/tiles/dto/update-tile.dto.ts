import { IsNumber, IsObject, IsPositive, IsString } from "class-validator";
export class UpdateTileDto {
  @IsString()
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
