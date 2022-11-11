import { IsOptional, IsString } from "class-validator";
import { PaginationQueryDto } from "../../utils/PaginationDto/pagination-query.dto";

export class FindAllCartItemDto extends PaginationQueryDto {
  @IsString()
  @IsOptional()
  user_id: string;
}

export class FindAllCartItemByAdminDto extends PaginationQueryDto {
  @IsString()
  @IsOptional()
  user_id: string;

  @IsString()
  @IsOptional()
  sort: string;

  @IsOptional()
  desc: number;
}
