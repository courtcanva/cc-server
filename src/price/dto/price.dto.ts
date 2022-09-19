import { Type } from "class-transformer";
import { IsArray, IsNumber, IsPositive } from "class-validator";

export class TilePrice {
  tile_id: string;
  tileName: string;
  deliveryPrice: number;
  price: number;
  isDeleted: boolean;
}
export class PriceDto {
  @IsNumber()
  @IsPositive()
  readonly cementFloorPrice: number;

  @IsArray()
  @Type(() => TilePrice)
  tilePrices: TilePrice[];
}
