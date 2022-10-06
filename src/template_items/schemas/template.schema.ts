import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Design } from "src/cart_items/schemas/cartItem.schema";
import { Document } from "mongoose";

export type TemplateDocument = TemplateItem & Document;

// export enum StatusType {
//   PUBLISHED = "published",
//   UNAVAILABLE = "unavailable",
// }

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
  @Prop()
  tags: [];

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
