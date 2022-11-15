import { IsBoolean, IsEmpty, IsOptional, IsString, IsUrl } from "class-validator";

export class UpdateUserDto {
  @IsString()
  readonly userId: string;

  @IsString()
  @IsOptional()
  readonly googleId?: string;

  @IsString()
  @IsOptional()
  readonly email?: string;

  @IsString()
  @IsOptional()
  readonly password?: string;

  @IsString()
  @IsOptional()
  readonly firstName?: string;

  @IsString()
  @IsOptional()
  readonly lastName?: string;

  @IsUrl()
  @IsOptional()
  readonly profileImgUrl?: string;

  @IsBoolean()
  @IsOptional()
  readonly isActivated?: boolean;
}
