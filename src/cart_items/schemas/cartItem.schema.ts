import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export enum CourtType {
  BASKETBALL = "basketball",
  TENNIS = "tennis",
}
export class Design extends Document {
  @Prop({ type: String })
  designer: string;

  @Prop({ required: true })
  designName: string;

  @Prop({ type: String })
  courtType: CourtType;

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

@Schema({ timestamps: true })
export class CartItem extends Document {
  @Prop({ type: String, required: true })
  quotation: string;

  @Prop({ type: String })
  image: string;

  @Prop({ type: Array, required: true })
  quotationDetails: [{ color: string; quantity: number }];

  @Prop({ type: Boolean })
  isExpired: boolean;

  @Prop({ required: true })
  user_id: string;

  @Prop({ type: Design, required: true })
  design: Design;

  @Prop({ type: Boolean, default: false })
  isDeleted: boolean;

  @Prop({ type: Number })
  expireDay: number;
}

export const CartItemSchema = SchemaFactory.createForClass(CartItem);
