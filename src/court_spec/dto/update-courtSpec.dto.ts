import { IsOptional, IsString } from "class-validator";
import { CreateCourtSpecDto } from "./create-courtSpec.dto";
export class UpdateCourtSpecDto extends CreateCourtSpecDto {
  @IsString()
  @IsOptional()
  readonly name: string;

  readonly createdAt: Date;
  readonly updatedAt: Date;
}
