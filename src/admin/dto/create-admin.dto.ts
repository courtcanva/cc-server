import { IsEmail, IsNotEmpty, IsString, IsEnum } from "class-validator";
import { permissionType } from "../schemas/admin.schema";

export class CreateAdminDto {
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  readonly password: string;

  readonly hashedRefreshToken: string;

  @IsNotEmpty()
  @IsEnum(permissionType)
  readonly permission: string;

  @IsNotEmpty()
  @IsString()
  readonly name: string;
}
