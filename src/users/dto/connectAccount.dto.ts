import { IsString } from "class-validator";

export class ConnectAccountDto {
  @IsString()
  readonly googleId: string;

  @IsString()
  readonly email: string;

  readonly updatedAt: Date;
}
