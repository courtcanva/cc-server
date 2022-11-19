import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type ExpireDayDocument = ExpireDay & Document;

@Schema({
  timestamps: true,
})
export class ExpireDay extends Document {
  @Prop({
    type: Number,
    required: true,
  })
  expireDays: number;
}

export const ExpireDaySchema = SchemaFactory.createForClass(ExpireDay);
