import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

/* maps our cat class to our mongoDB collection of the same name */
@Schema()
export class Cat extends Document {
  @Prop()
  name: string;

  @Prop()
  age: number;

  @Prop()
  breed: string;

  @Prop([String])
  tags: string[];
}

export const CatSchema = SchemaFactory.createForClass(Cat);
