import { IsNotEmpty, IsArray, IsOptional, IsObject } from "class-validator";
export class UpdatePriceDto {
  @IsObject()
  @IsOptional()
  @IsNotEmpty()
  readonly tiles: {
    tile_id: string;
    deliveryPrice: number;
    tilePrice: { colorName: string; price: number }[];
  };

  @IsArray()
  @IsOptional()
  @IsNotEmpty()
  readonly court_spec: {
    court_id: string;
    installationPrice: number;
  }[];
}
