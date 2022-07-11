import { IsArray, IsString, IsNotEmpty, IsObject } from "class-validator";
export class CreatePriceDto {
  @IsObject()
  readonly tiles: {
    tile_id: string;
    deliveryPrice: number;
    tilePrice: { color: string; price: number }[];
  };

  @IsArray()
  readonly court_spec: {
    court: string;
    installationPrice: number;
  }[];

  readonly createdAt: Date;
  readonly updatedAt: Date;
}
