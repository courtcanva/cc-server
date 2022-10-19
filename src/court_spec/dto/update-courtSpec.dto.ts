import { IsOptional, IsString, IsBoolean } from "class-validator";
import { CreateCourtSpecDto } from "./create-courtSpec.dto";
export class UpdateCourtSpecDto extends CreateCourtSpecDto {
  @IsString()
  @IsOptional()
  readonly name: string;

  @IsOptional()
  @IsBoolean()
  readonly isHidden: boolean;

  readonly createdAt: Date;
  readonly updatedAt: Date;
}
