import { IsBoolean, IsOptional, IsString } from "class-validator";
export class CreateUserDto {
  @IsString()
  @IsOptional()
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

  readonly hashedRefreshToken: string;

  @IsBoolean()
  readonly isActivated: boolean;

  readonly createdAt: Date;

  readonly updatedAt: Date;

  @IsString()
  readonly otp: string;

  readonly otpCreatedAt: Date;

  readonly otpExpiresAt: Date;
}
