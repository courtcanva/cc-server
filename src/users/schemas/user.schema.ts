import { Optional } from "@nestjs/common";
import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({ timestamps: true })
export class User extends Document {
  @Prop()
  googleId: string;

  @Prop({ unique: true })
  email: string;

  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  @Optional()
  password: string;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;

  @Prop({ default: false })
  isDeleted: boolean;

  @Prop({ default: false })
  isActivated: boolean;

  @Prop()
  otp: string;

  @Prop()
  otpCreatedAt: Date;

  @Prop()
  otpExpiresAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
