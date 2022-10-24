import { IsBoolean, IsNotEmpty, IsOptional } from "class-validator";
import { PaginationQueryDto } from "../../utils/PaginationDto/pagination-query.dto";

export class GetAllTeamMembersDto extends PaginationQueryDto {
  @IsBoolean()
  @IsNotEmpty()
  @IsOptional()
  isSorted: boolean;
}
