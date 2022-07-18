import { IsOptional, IsNumber, IsPositive, IsArray } from "class-validator";
export class UpdatePriceDto {
  @IsArray()
  @IsOptional()
  readonly deliveryPrice: { tile_id: string; price: number }[];

  @IsNumber()
  @IsOptional()
  @IsPositive()
  readonly tilePrice: number;
}
