import { IsBoolean, IsEnum, IsNotEmpty, IsOptional } from "class-validator";
import { StatusType } from "../schemas/template.schema";

export class updateTemplate {
  @IsOptional()
  @IsEnum(StatusType)
  @IsNotEmpty()
  status: string;

  @IsOptional()
  @IsBoolean()
  isOfficial: boolean;
}
