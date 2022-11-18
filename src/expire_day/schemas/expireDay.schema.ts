import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type ExpireDayDocument = ExpireDay & Document;

@Schema({
  timestamps: true,
})
export class ExpireDay {
  @Prop({
    type: Number,
    required: true,
  })
  expireDays: number;
}

export const ExpireDaySchema = SchemaFactory.createForClass(ExpireDay);
