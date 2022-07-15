import { IsOptional, IsNumber, IsPositive, IsArray } from "class-validator";
export class UpdatePriceDto {
  @IsArray()
  @IsOptional()
  readonly tilePrice: { tile_id: string; price: number }[];

  @IsNumber()
  @IsOptional()
  @IsPositive()
  readonly deliveryPrice: number;
}
