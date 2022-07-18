import { IsEmail, IsNotEmpty } from "class-validator";

export class CheckEmailDto {
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;
}
