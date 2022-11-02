import { IsNotEmpty, IsString } from "class-validator";

export class CheckoutSessionDto {
  @IsNotEmpty()
  @IsString()
  sessionId: string;
}
