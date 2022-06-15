import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class CourtSpec extends Document {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: Number, required: true })
  length: number;

  @Prop({ type: Number, required: true })
  width: number;

  @Prop({ type: Number, required: true })
  centre_circle_radius: number;

  @Prop({ type: Number, required: true })
  three_point_radius: number;

  @Prop({ type: Number, required: true })
  three_point_line: number;

  @Prop({ type: Number, required: true })
  length_of_corner: number;

  @Prop({ type: Number, required: true })
  restricted_area_length: number;

  @Prop({ type: Number, required: true })
  restricted_area_width: number;

  @Prop({ type: Number, required: true })
  side_border_width: number;

  @Prop({ type: Number, required: true })
  line_border_width: number;

  @Prop()
  description: string;

  // @Prop()
  // created_at: {
  //   type: timestamp;
  //   default: new Date();
  // };

  // @Prop()
  // updated_at: {
  //   type: timestamp;
  //   default: new Date();
  // }
}

export const CourtSpecSchema = SchemaFactory.createForClass(CourtSpec);
