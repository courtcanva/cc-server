import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class UpdateAdminDto {
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  readonly password: string;

  readonly hashedRefreshToken: string;

  readonly createdAt: Date;

  readonly updatedAt: Date;

  @IsNotEmpty()
  @IsString()
  readonly permission: string;

  readonly isDeleted: boolean;

  @IsNotEmpty()
  @IsString()
  readonly name: string;
}
