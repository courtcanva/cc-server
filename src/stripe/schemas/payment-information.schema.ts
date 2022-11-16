import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Schema as MongooseSchema } from "mongoose";

export type PaymentInfoDocument = PaymentInfo & Document;

class Address {
  @Prop({
    type: String,
  })
  city: string;

  @Prop({
    type: String,
  })
  country: string;

  @Prop({
    type: String,
  })
  line1: string;

  @Prop({
    type: String,
  })
  line2: string;

  @Prop({
    type: String,
  })
  postalCode: string;

  @Prop({
    type: String,
  })
  state: string;
}

@Schema({
  timestamps: true,
})
export class PaymentInfo {
  @Prop({
    type: MongooseSchema.Types.ObjectId,
    required: true,
    ref: "Order",
  })
  orderId: MongooseSchema.Types.ObjectId;

  @Prop({
    type: String,
    required: true,
  })
  name: string;

  @Prop({
    type: String,
    required: true,
  })
  email: string;

  @Prop({
    type: String,
    required: true,
  })
  phone: string;

  @Prop({
    required: true,
  })
  billingAddress: Address;

  @Prop({
    required: true,
  })
  constructionAddress: Address;

  @Prop({
    type: String,
    required: true,
  })
  currency: string;

  @Prop({
    type: Number,
    required: true,
  })
  amountTotal: number;

  @Prop({
    type: String,
    required: true,
  })
  sessionId: string;
}

export const PaymentInfoSchema = SchemaFactory.createForClass(PaymentInfo);
