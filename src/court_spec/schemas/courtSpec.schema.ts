import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type CourtSpecDocument = CourtSpec & Document;
@Schema()
export class CourtSpec extends Document {
  @Prop({ required: true, minLength: 5, maxLength: 50 })
  name: string;

  @Prop({ default: 28000 })
  length: number;

  @Prop({ default: 15000 })
  width: number;

  @Prop({ default: 1800 })
  centreCircleRadius: number;

  @Prop({ default: 6750 })
  threePointRadius: number;

  @Prop({ default: 900 })
  threePointLine: number;

  @Prop({ default: 2990 })
  lengthOfCorner: number;

  @Prop({ default: 5800 })
  restrictedAreaLength: number;

  @Prop({ default: 4900 })
  restrictedAreaWidth: number;

  @Prop({ default: 1000 })
  sideBorderWidth: number;

  @Prop({ default: 50 })
  lineBorderWidth: number;

  @Prop({ default: "" })
  description: string;

  @Prop({ timestamp: true })
  createdAt: Date;

  @Prop({ timestamp: true })
  updatedAt: Date;

  @Prop({ default: false })
  isDeleted: boolean;
}

export const CourtSpecSchema = SchemaFactory.createForClass(CourtSpec);
