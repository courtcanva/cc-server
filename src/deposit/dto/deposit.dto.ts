import { IsNotEmpty, IsPositive, Max } from "class-validator";

export class DepositDto {
  @IsNotEmpty()
  @IsPositive()
  @Max(1)
  readonly depositRatio: number;
}
