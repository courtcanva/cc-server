import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

/* maps our cat class to our mongoDB collection of the same name */
@Schema()
export class Tile extends Document {
  @Prop({ type: String, required: true })
  tile_id: string;

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

  @Prop({ type: Date, default: new Date() })
  createdAt: Date;

  @Prop({ type: Date, default: new Date() })
  updatedAt: Date;

  @Prop({ type: Boolean, default: false })
  isDeleted: boolean;
}

export const TileSchema = SchemaFactory.createForClass(Tile);
