import { IsBoolean, IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { PaginationQueryDto } from "src/utils/PaginationDto/pagination-query.dto";
import { CourtCategory } from "../schemas/template.schema";

// 这个改成搜索的dto
export class SearchTemplateDto extends PaginationQueryDto {
  @IsNotEmpty()
  @IsEnum(CourtCategory)
  @IsOptional()
  tags: string;

  @IsBoolean()
  @IsOptional()
  isOfficial: boolean;

  // design name
  // designer name
  // updateAt
  // description
}
