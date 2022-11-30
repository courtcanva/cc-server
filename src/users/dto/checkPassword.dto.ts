import { IsNotEmpty, IsString } from "class-validator";

export class CheckPasswordDto {
  @IsNotEmpty()
  @IsString()
  readonly userId: string;

  @IsString()
  readonly password: string;
}
