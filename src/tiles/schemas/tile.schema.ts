import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as MongooseSchema } from "mongoose";
import { Price } from "../../price/schemas/price.schema";

@Schema()
export class Tile extends Document {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: Array, required: true })
  colors: [{ name: string; value: string }];

  @Prop({ type: Number, required: true })
  length: number;

  @Prop({ type: Number, required: true })
  width: number;

  @Prop({ type: Number, required: true })
  height: number;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: "Price" })
  price: Price;

  @Prop({ type: Date, default: new Date() })
  createdAt: Date;

  @Prop({ type: Date, default: new Date() })
  updatedAt: Date;

  @Prop({ type: Boolean, default: false })
  isDeleted: boolean;
}

export const TileSchema = SchemaFactory.createForClass(Tile);
