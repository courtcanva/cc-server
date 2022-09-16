import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document, ObjectId } from "mongoose";
import { Tile } from "src/tiles/schemas/tile.schema";

@Schema()
export class Price extends Document {
  @Prop({ required: true })
  cementFloorPrice: number;

  @Prop({ type: Array, ref: "tiles", required: true })
  tilesPrice: [
    {
      tile_id: string;
      tileName: Tile;
      deliveryPrice: number;
      tilePrice: number;
      isDeleted: boolean;
    },
  ];

  @Prop({ type: Date, default: new Date() })
  createdAt: Date;

  @Prop({ type: Date, default: new Date() })
  updatedAt: Date;

  @Prop({ type: Boolean, default: false })
  isDeleted: boolean;
}

export const PriceSchema = SchemaFactory.createForClass(Price);
