import { IsOptional, IsString, IsNumber, IsPositive } from "class-validator";
export class UpdatePriceDto {
  @IsString()
  readonly tile_id: string;

  @IsNumber()
  @IsOptional()
  @IsPositive()
  readonly deliveryPrice: number;

  @IsNumber()
  @IsOptional()
  @IsPositive()
  readonly tilePrice: number;
}
