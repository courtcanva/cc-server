import { IsOptional, IsString } from "class-validator";
import { PaginationQueryDto } from "../../utils/PaginationDto/pagination-query.dto";

export class SearchUserDto extends PaginationQueryDto {
  @IsString()
  @IsOptional()
  user_id: string;

  @IsString()
  @IsOptional()
  email: string;

  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  sort: string;

  @IsOptional()
  desc: string;
}
