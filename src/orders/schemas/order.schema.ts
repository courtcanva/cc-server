import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export enum StatusType {
  UNPAID = "unpaid",
  PROCESSING = "processing",
  COMPLETED = "completed",
  CANCELLED = "cancelled",
}

export class Design extends Document {
  @Prop({ type: String, required: true })
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

@Schema({ timestamps: true })
export class Order extends Document {
  @Prop({ type: String, required: true })
  user_id: string;

  @Prop({ type: String, enum: StatusType, default: StatusType.UNPAID })
  status: string;

  @Prop({ type: Array, required: true })
  items: [
    {
      quotation: string;
      image: string;
      constructionDrawing: string;
      design: Design;
      quotationDetails: [{ color: string; quantity: number }];
    },
  ];
}

export const OrderSchema = SchemaFactory.createForClass(Order);
