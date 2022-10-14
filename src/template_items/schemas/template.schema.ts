import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type TemplateDocument = TemplateItem & Document;

export enum StatusType {
  PUBLISHED = "published",
  UNAVAILABLE = "unavailable",
  CENSORING = "censoring",
  ILLEGAL = "illegal",
}

export enum CourtCategory {
  PFC = "proFullCourt",
  FC = "fullCourt",
  SC = "smallCourt",
  HF = "halfCourt",
}

export enum CourtType {
  BASKETBALL = "basketball",
  TENNIS = "tennis",
}

export class Design extends Document {
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

@Schema()
export class TemplateItem {
  @Prop({ required: true })
  user_id: string;

  // 为啥这个是必须的
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

  @Prop({ type: Date, default: new Date() })
  createdAt: Date;

  @Prop({ type: Date, default: new Date() })
  updatedAt: Date;

  @Prop({ type: Boolean, default: false })
  isDeleted: boolean;
}

export const TemplateSchema = SchemaFactory.createForClass(TemplateItem);
