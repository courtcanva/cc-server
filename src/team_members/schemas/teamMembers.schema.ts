import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export enum RoleType {
  DEVELOPER = "Developer",
  DEVOPS = "DevOps",
  BUSINESS_ANALYST = "Business Analyst",
  UIUX_DESINGER = "UI/UX Designer",
  TUTOR = "Tutor",
  PROJECT_OWNER = "PO",
}

@Schema({ timestamps: true })
export class TeamMember extends Document {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String })
  profileImgUrl: string;

  @Prop({ type: String, enum: RoleType, default: RoleType.DEVELOPER })
  role: string;

  @Prop({ type: String })
  linkedInUrl: string;

  @Prop({ type: String })
  githubUrl: string;

  @Prop({ type: String })
  emailAddress: string;

  @Prop({ type: Number, default: 1 })
  priority: number;

  @Prop({ type: Boolean, default: false })
  isDeleted: boolean;
}

export const TeamMemberSchema = SchemaFactory.createForClass(TeamMember);
