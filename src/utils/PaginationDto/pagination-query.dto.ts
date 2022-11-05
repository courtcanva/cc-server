import { IsOptional, IsNumber, Min } from "class-validator";
export class PaginationQueryDto {
  @IsOptional()
  @IsNumber()
  @Min(0)
  limit: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  offset: number;
}
