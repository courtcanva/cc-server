import { Optional } from "@nestjs/common";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class AdminDto {
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  readonly password: string;

  @Optional()
  readonly hashedRefreshToken: string;

  readonly createdAt: Date;

  readonly updatedAt: Date;
}
