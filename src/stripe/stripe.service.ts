import { Injectable } from "@nestjs/common";
import { UserService } from "src/users/user.service";
import { Stripe } from "stripe";
import { InjectStripeClient } from "@golevelup/nestjs-stripe";

@Injectable()
export class StripeService {
  constructor(
    @InjectStripeClient() private readonly stripeClient: Stripe,
    private readonly userService: UserService,
  ) {}
}
