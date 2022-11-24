import { IsNotEmpty, IsPositive, Min } from "class-validator";

export class ExpireDayDto {
  @IsNotEmpty()
  @IsPositive()
  @Min(1)
  readonly expireDays: number;
}
