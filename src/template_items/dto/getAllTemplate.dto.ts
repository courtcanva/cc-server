import { IsNotEmpty, IsString } from "class-validator";
import { PaginationQueryDto } from "../../utils/PaginationDto/pagination-query.dto";

export class getAllTemplatesDto extends PaginationQueryDto {
  @IsString()
  @IsNotEmpty()
  user_id: string;
}
