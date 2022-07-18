import { IsArray, IsNumber, IsPositive } from "class-validator";
export class CreatePriceDto {
  @IsArray()
  readonly deliveryPrice: { tile_id: string; price: number }[];

  @IsNumber()
  @IsPositive()
  readonly tilePrice: number;

  readonly createdAt: Date;
  readonly updatedAt: Date;
}
