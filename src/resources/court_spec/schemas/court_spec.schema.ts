import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type CourtSpecDocument = CourtSpec & Document;

@Schema()
export class CourtSpec extends Document {
  // user need to name their court name
  @Prop({ required: true, minLength: 5, maxLength: 50 })
  name: string;

  // if not input , will get default value of 28m
  @Prop({ default: 28000 })
  length: number;

  // if not input , will get default value of 15m
  @Prop({ default: 15000 })
  width: number;

  // constant, will get this value based on court size
  @Prop({ default: 1800 })
  centre_circle_radius: number;

  @Prop({ default: 6750 })
  three_point_radius: number;

  @Prop({ default: 900 })
  three_point_line: number;

  // constant, will get this value based on court size
  @Prop({ default: 2990 })
  length_of_corner: number;

  // constant
  @Prop({ default: 5800 })
  restricted_area_length: number;

  // constant
  @Prop({ default: 4900 })
  restricted_area_width: number;

  // constant, will get this value based on court size
  @Prop({ default: 1000 })
  side_border_width: number;

  // constant
  @Prop({ default: 50 })
  line_border_width: number;

  @Prop({ default: "" })
  description: string;

  @Prop({ default: new Date() })
  created_at: Date;

  @Prop({ default: new Date() })
  updated_at: Date;

  @Prop({ default: false })
  isDeleted: boolean;
}

export const CourtSpecSchema = SchemaFactory.createForClass(CourtSpec);
