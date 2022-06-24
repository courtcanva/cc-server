import { Optional } from "@nestjs/common";
import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

/* maps our cat class to our mongoDB collection of the same name */
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
}

export const UserSchema = SchemaFactory.createForClass(User);
