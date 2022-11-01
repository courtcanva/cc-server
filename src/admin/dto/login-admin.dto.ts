import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class LoginAdminDto {
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  readonly password: string;

  readonly hashedRefreshToken: string;

  readonly permission: string;

  readonly isDeleted: boolean;

  readonly name: string;
}
