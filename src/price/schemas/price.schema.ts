import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({ timestamps: true })
export class Price extends Document {
  @Prop({ required: true })
  cementFloorPrice: number;

  @Prop({ type: Array, ref: "tiles", required: true })
  tilePrices: [
    {
      tile_id: string;
      tileName: string;
      deliveryPrice: number;
      price: number;
      isDeleted: boolean;
    },
  ];

  @Prop({ type: Boolean, default: false })
  isDeleted: boolean;
}

export const PriceSchema = SchemaFactory.createForClass(Price);
