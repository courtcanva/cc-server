import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

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

export class Address extends Document {
  @Prop({ type: String, required: true })
  country: string;

  @Prop({ type: String, required: true })
  state: string;

  @Prop({ type: String, required: true })
  city: string;

  @Prop({ type: String, required: true })
  line1: string;

  @Prop({ type: String })
  line2: string;

  @Prop({ type: String, required: true })
  postCode: string;
}

@Schema()
export class Order extends Document {
  @Prop({ type: String, required: true })
  user_id: string;

  @Prop({ type: Boolean, default: false })
  isPaid: boolean;

  @Prop({ type: Array, required: true })
  items: [
    {
      quotation: string;
      image: string;
      constructionDrawing: string;
      needLevelGround: boolean;
      design: Design;
      quotationDetails: [{ color: string; quantity: number }];
      constructionAddress: Address;
    },
  ];

  @Prop({ type: Object })
  userInfo: { email: string; phone: string; billingAddress: Address };

  @Prop({ type: String })
  stripeSessionId: string;

  @Prop({ type: Array })
  discount: [{ discountType: string; discountRatio: number; discountAmount: string }];

  @Prop({ type: String })
  currency: string;

  @Prop({ type: Number })
  totalPrice: number;

  @Prop({ type: Date, default: new Date() })
  createdAt: Date;

  @Prop({ type: Date, default: new Date() })
  updatedAt: Date;

  @Prop({ type: Boolean, default: false })
  isDeleted: boolean;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
