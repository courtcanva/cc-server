import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { PaginationQueryDto } from "../../utils/PaginationDto/pagination-query.dto";

export class GetAllTemplatesDto extends PaginationQueryDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  user_id: string;
}
