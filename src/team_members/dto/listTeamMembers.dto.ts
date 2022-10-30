import { IsBoolean, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { PaginationQueryDto } from "../../utils/PaginationDto/pagination-query.dto";

export class ListTeamMembersDto extends PaginationQueryDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  isGrouped: string;
}
