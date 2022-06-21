import { IsOptional, IsString } from "class-validator";
import { CreateCourtSpecDto } from "./create-court_spec.dto";
export class UpdateCourtSpecDto extends CreateCourtSpecDto {
  @IsString()
  @IsOptional()
  readonly name: string;
}
