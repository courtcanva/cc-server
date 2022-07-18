import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Price extends Document {
  @Prop({ type: Array, required: true })
  deliveryPrice: [{ tile_id: string; price: number }];

  @Prop({ required: true })
  tilePrice: number;

  @Prop({ type: Date, default: new Date() })
  createdAt: Date;

  @Prop({ type: Date, default: new Date() })
  updatedAt: Date;

  @Prop({ type: Boolean, default: false })
  isDeleted: boolean;
}

export const PriceSchema = SchemaFactory.createForClass(Price);
