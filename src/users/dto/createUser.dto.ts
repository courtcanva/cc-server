import { IsBoolean, IsOptional, IsString } from "class-validator";
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

  @IsBoolean()
  readonly isDeleted: boolean;

  @IsBoolean()
  readonly isActivated: boolean;

  readonly createdAt: Date;

  readonly updatedAt: Date;
}
