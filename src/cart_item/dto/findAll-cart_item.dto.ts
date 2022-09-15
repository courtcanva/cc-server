import { IsOptional, IsString } from "class-validator";
import { PaginationQueryDto } from "../../utils/PaginationDto/pagination-query.dto";

export class FindAllCartItemDto extends PaginationQueryDto {
  @IsString()
  @IsOptional()
  userId: string;
}
