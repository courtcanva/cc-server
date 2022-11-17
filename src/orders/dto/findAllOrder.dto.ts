import { IsOptional, IsString } from "class-validator";
import { PaginationQueryDto } from "../../utils/PaginationDto/pagination-query.dto";

export class FindAllOrderDto extends PaginationQueryDto {
  @IsString()
  @IsOptional()
  user_id: string;
}

export class FindAllOrderDtoByAdmin {
  @IsString()
  @IsOptional()
  user_id: string;

  @IsString()
  @IsOptional()
  status: string;
}
