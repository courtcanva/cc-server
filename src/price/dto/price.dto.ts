import { Type } from "class-transformer";
import { IsArray, IsNumber, IsPositive } from "class-validator";

export class TilesPrice {
  tile_id: string;
  tileName: string;
  deliveryPrice: number;
  tilePrice: number;
  isDeleted: boolean;
}
export class PriceDto {
  @IsNumber()
  @IsPositive()
  readonly cementFloorPrice: number;

  @IsArray()
  @Type(() => TilesPrice)
  readonly tilesPrice: TilesPrice[];
}
