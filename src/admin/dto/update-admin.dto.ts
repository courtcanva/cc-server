import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class UpdateAdminDto {
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsString()
  readonly password: string;

  readonly hashedRefreshToken: string;

  readonly createdAt: Date;

  readonly updatedAt: Date;

  readonly isDelete: boolean;
}
