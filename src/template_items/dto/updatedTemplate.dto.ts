import { IsString, IsNotEmpty } from "class-validator";

export class UpdateTemplateDto {
  @IsString()
  @IsNotEmpty()
  tags: string;
}
