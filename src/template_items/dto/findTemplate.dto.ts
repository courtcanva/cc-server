import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { PaginationQueryDto } from "src/utils/PaginationDto/pagination-query.dto";
import { CourtCategory } from "../schemas/template.schema";

export class findAllUsersTemplateDto extends PaginationQueryDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  userId: string;

  @IsNotEmpty()
  @IsEnum(CourtCategory)
  @IsOptional()
  tags: string;
}
