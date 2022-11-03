import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type TemplateDocument = TemplateItem & Document;

export enum StatusType {
  PUBLISHED = "published",
  PRIVATE = "private",
  CENSORING = "censoring",
  ILLEGAL = "illegal",
}

export enum CourtCategory {
  PFC = "ProFullCourt",
  FC = "FullCourt",
  SC = "SmallCourt",
  HC = "HalfCourt",
  PHC = "ProHalfCourt",
  MC = "MediumCourt",
}

export enum CourtType {
  BASKETBALL = "basketball",
  TENNIS = "tennis",
}

class Design extends Document {
  @Prop({ type: String })
  designer: string;

  @Prop({ required: true })
  designName: string;

  @Prop({ type: Array, required: true })
  tileColor: [{ location: string; color: string }];

  @Prop({ type: Object, required: true })
  courtSize: {
    name: string;
    length: number;
    width: number;
    centreCircleRadius: number;
    threePointRadius: number;
    threePointLine: number;
    lengthOfCorner: number;
    restrictedAreaLength: number;
    restrictedAreaWidth: number;
    sideBorderWidth: number;
    lineBorderWidth: number;
  };
}

export class Tags extends Document {
  @Prop({ type: String })
  CourtCategory: CourtCategory;

  @Prop({ type: String })
  CourtType: CourtType;
}

@Schema({ timestamps: true })
export class TemplateItem {
  @Prop({ required: true })
  user_id: string;

  @Prop({ type: Design, required: true })
  design: Design;

  @Prop({ type: String })
  image: string;

  @Prop({ type: String })
  description: string;

  @Prop({ type: Tags })
  tags: Tags;

  @Prop({ type: Boolean, default: false })
  isOfficial: boolean;

  @Prop({
    type: String,
    enum: StatusType,
    default: StatusType.CENSORING,
  })
  status: string;

  @Prop({ type: Boolean, default: false })
  isDeleted: boolean;
}

export const TemplateSchema = SchemaFactory.createForClass(TemplateItem);
