import { IsNotEmpty, IsString } from "class-validator";

export class findAllUsersTemplateDto {
  @IsString()
  @IsNotEmpty()
  userId: string;
}
