import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type TemplateDocument = TemplateItem & Document;

// export enum StatusType {
//   PUBLISHED = "published",
//   UNAVAILABLE = "unavailable",
// }

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

export enum CourtCategory {
  ProFullCourt,
  FullCourt,
  SmallCourt,
  HalfCourt,
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

  // 考虑下多层enum怎么写
  @Prop({ type: String, enum: CourtCategory })
  tags: CourtCategory;

  @Prop({ type: Boolean, default: false })
  isOfficial: boolean;

  // 有没有通过审核
  @Prop({ type: Boolean, default: false })
  isCensored: boolean;

  //   @Prop({ type: StatusType, default: StatusType.UNAVAILABLE })
  //   status: StatusType;

  @Prop({ type: String, default: "" })
  description: string;

  @Prop({ type: Date, default: new Date() })
  createdAt: Date;

  @Prop({ type: Date, default: new Date() })
  updatedAt: Date;

  @Prop({ type: Boolean, default: false })
  isDeleted: boolean;
}

export const TemplateSchema = SchemaFactory.createForClass(TemplateItem);
