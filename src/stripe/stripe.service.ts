import { Injectable } from "@nestjs/common";
import { UserService } from "src/users/user.service";
import { Stripe } from "stripe";
import { InjectStripeClient } from "@golevelup/nestjs-stripe";
import mongoose from "mongoose";

@Injectable()
export class StripeService {
  constructor(
    @InjectStripeClient() private readonly stripeClient: Stripe,
    private readonly userService: UserService,
  ) {}

  async getUserEmail(id: string): Promise<string> {
    const userId = new mongoose.Types.ObjectId(id);
    console.log(userId);
    // const user = await this.userService.getUserById(userId);
    // if (!user.email) return "";
    // return user.email;
    return;
  }
}
