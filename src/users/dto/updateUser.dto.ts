import { CreateUserDto } from "./createUser.dto";
import { IsString } from "class-validator";

export class UpdateUserDto extends CreateUserDto {
  @IsString()
  readonly googleId: string;

  @IsString()
  readonly email: string;
}
