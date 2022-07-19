import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class UserDesign extends Document {
  @Prop({ type: Object, required: true, unique: true })
  design_id: { user_id: string; design_name: string };

  @Prop({ type: Object, required: true, unique: true })
  tileColor: { location: string; color: string }[];

  @Prop({ type: Object, required: true, unique: true })
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

  @Prop({ type: Date, default: new Date() })
  createdAt: Date;

  @Prop({ type: Date, default: new Date() })
  updatedAt: Date;

  @Prop({ type: Boolean, default: false })
  isDeleted: boolean;
}

export const UserDesignSchema = SchemaFactory.createForClass(UserDesign);
