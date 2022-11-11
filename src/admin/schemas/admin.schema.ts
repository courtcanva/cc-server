import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export enum permissionType {
  SUPER = "super",
  NORMAL = "normal",
}

@Schema({ timestamps: true })
export class Admin extends Document {
  @Prop({ unique: true })
  email: string;

  @Prop()
  password: string;

  @Prop()
  hashedRefreshToken: string;

  @Prop({ default: false })
  isDeleted: boolean;

  @Prop({ type: String, enum: permissionType, default: "normal" })
  permission: string;

  @Prop()
  name: string;
}

export const AdminSchema = SchemaFactory.createForClass(Admin);
