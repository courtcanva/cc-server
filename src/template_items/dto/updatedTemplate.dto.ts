import { IsString, IsNotEmpty } from "class-validator";

// 可删除，应该不需要这个，不考虑更新tag
export class UpdateTemplateDto {
  @IsString()
  @IsNotEmpty()
  tags: string;
}
