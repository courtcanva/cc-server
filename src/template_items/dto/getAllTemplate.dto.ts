import { IsNotEmpty, IsOptional, IsString } from "class-validator";
export class GetAllTemplatesDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  user_id: string;
}
