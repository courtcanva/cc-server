import { IsEmpty, IsNotEmpty, IsString } from "class-validator";

export class ConnectAccountDto {
  @IsString()
  @IsNotEmpty()
  readonly googleId: string;

  @IsString()
  @IsNotEmpty()
  readonly email: string;

  @IsEmpty()
  readonly updatedAt: Date;
}
