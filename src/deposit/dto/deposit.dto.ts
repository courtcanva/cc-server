import { IsNotEmpty, IsPositive } from "class-validator";

export class DepositDto {
  @IsNotEmpty()
  @IsPositive()
  readonly depositRatio: number;
}
