import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Price extends Document {
  @Prop({ type: Object, required: true })
  tiles: {
    tile_id: string;
    deliveryPrice: number;
    tilePrice: { colorName: string; price: number }[];
  };

  @Prop({ type: Array, required: true })
  court_spec: [{ court_id: string; installationPrice: number }];

  @Prop({ type: Date, default: new Date() })
  createdAt: Date;

  @Prop({ type: Date, default: new Date() })
  updatedAt: Date;

  @Prop({ type: Boolean, default: false })
  isDeleted: boolean;
}

export const PriceSchema = SchemaFactory.createForClass(Price);
