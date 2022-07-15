import { IsNotEmpty, IsNumber, IsPositive, IsString } from "class-validator";
export class CreatePriceDto {
  @IsString()
  @IsNotEmpty()
  readonly tile_id: string;

  @IsNumber()
  @IsPositive()
  readonly deliveryPrice: number;

  @IsNumber()
  @IsPositive()
  readonly tilePrice: number;

  readonly createdAt: Date;
  readonly updatedAt: Date;
}
