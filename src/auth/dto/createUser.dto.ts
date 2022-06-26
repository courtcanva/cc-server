import { IsObject, IsOptional, IsString } from "class-validator";
export class CreateUserDto {
  @IsString()
  readonly googleId: string;

  @IsString()
  readonly email: string;

  @IsString()
  @IsOptional()
  readonly password: string;

  @IsString()
  readonly firstName: string;

  @IsString()
  readonly lastName: string;

  @IsString()
  readonly isDeleted: boolean;

  readonly createdAt: Date;

  readonly updatedAt: Date;
}
