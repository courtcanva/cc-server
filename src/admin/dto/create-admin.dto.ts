import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateAdminDto {
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  readonly password: string;

  readonly hashedRefreshToken: string;

  readonly createdAt: Date;

  readonly updatedAt: Date;

  @IsNotEmpty()
  readonly permission: string;

  readonly isDeleted: boolean;

  @IsNotEmpty()
  @IsString()
  readonly name: string;
}
