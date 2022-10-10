import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type TemplateDocument = TemplateItem & Document;

export enum StatusType {
  PUBLISHED = "published",
  UNAVAILABLE = "unavailable",
  CENSORING = "censoring",
  ILLEGAL = "illegal",
}

export type CourtCategory = "proFullCourt" | "fullCourt" | "smallCourt" | "halfCourt";

export type CourtSubcategory = "28m×15m" | "10m×7m" | "9m×5m";

type TagsOptions = CourtCategory | CourtSubcategory;

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
  CourtCategory: TagsOptions;

  @Prop({ type: String })
  CourtSize: TagsOptions;
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
  // 考虑下多层enum怎么写
  @Prop({ type: Tags })
  tags: Tags;

  @Prop({ type: Boolean, default: false })
  isOfficial: boolean;

  // 不确定是不是这么写，status仍然待讨论
  @Prop({
    type: String,
    enum: [StatusType.CENSORING, StatusType.ILLEGAL, StatusType.PUBLISHED, StatusType.UNAVAILABLE],
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
