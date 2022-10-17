import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class AdminDto {
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  readonly password: string;

  readonly hashedRefreshToken: string;

  readonly createdAt: Date;

  readonly updatedAt: Date;

  readonly permission: string;

  readonly isDeleted: boolean;

  @IsNotEmpty()
  @IsString()
  readonly name: string;
}
