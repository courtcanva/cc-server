import { IsString } from "class-validator";
export class CreateUserDto {
  @IsString()
  readonly googleId: string;

  @IsString()
  readonly email: string;

  @IsString()
  readonly firstName: string;

  @IsString()
  readonly lastName: string;

  @IsString()
  readonly picture: string;

  @IsString()
  readonly isDeleted: boolean;
}
