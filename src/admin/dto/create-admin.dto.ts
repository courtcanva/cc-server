import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateAdminDto {
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  readonly password: string;

  readonly hashedRefreshToken: string;

  @IsNotEmpty()
  @IsString()
  readonly name: string;
}
