import { IsNotEmpty, IsUrl } from "class-validator";

export class CheckoutSessionResponseDto {
  @IsUrl()
  @IsNotEmpty()
  sessionUrl: string;
}
