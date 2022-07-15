import { IsArray, IsNumber, IsPositive } from "class-validator";
export class CreatePriceDto {
  @IsArray()
  readonly tilePrice: { tile_id: string; price: number }[];

  @IsNumber()
  @IsPositive()
  readonly deliveryPrice: number;

  readonly createdAt: Date;
  readonly updatedAt: Date;
}
