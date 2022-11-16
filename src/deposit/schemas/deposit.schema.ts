import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type DepositDocument = Deposit & Document;

@Schema({
  timestamps: true,
})
export class Deposit {
  @Prop({
    type: Number,
    required: true,
  })
  depositRatio: number;
}

export const DepositSchema = SchemaFactory.createForClass(Deposit);
