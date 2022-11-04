import { IsNotEmpty, IsUrl } from "class-validator";

export class CheckoutSessionUrlDto {
  @IsUrl()
  @IsNotEmpty()
  sessionUrl: string;
}
