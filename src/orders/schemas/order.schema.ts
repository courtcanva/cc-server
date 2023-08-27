import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Schema as MongooseSchema, Document } from "mongoose";
import { PaymentInfo } from "src/stripe/schemas/payment-information.schema";

export enum StatusType {
  UNPAID = "unpaid",
  PROCESSING = "processing",
  COMPLETED = "completed",
  CANCELLED = "cancelled",
  EXPIRED = "expired",
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

  @Prop({ type: Boolean, default: false })
  isExpired: boolean;

  @Prop({ type: Date })
  expiredAt: Date;

  @Prop({ type: Number })
  expireDay: number;

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

  @Prop({ type: Number, required: true })
  depositRatio: number;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: PaymentInfo.name })
  paymentInfo: PaymentInfo;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
