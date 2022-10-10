import { Type } from "class-transformer";
import { IsBoolean, IsNotEmpty, IsOptional, ValidateNested } from "class-validator";
import { PaginationQueryDto } from "src/utils/PaginationDto/pagination-query.dto";
import { Tags } from "./template.dto";

// 这个改成搜索的dto
export class SearchTemplateDto extends PaginationQueryDto {
  @IsNotEmpty()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => Tags)
  tags: Tags;

  @IsBoolean()
  @IsOptional()
  isOfficial: boolean;

  // design name
  // designer name
  // updateAt
  // description
}
