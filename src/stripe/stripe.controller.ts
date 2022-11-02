import {
  Controller,
  Get,
  Query,
  Post,
  Body,
  HttpException,
  HttpStatus,
  Param,
} from "@nestjs/common";
import { Stripe } from "stripe";
import { InjectStripeClient } from "@golevelup/nestjs-stripe";
import { CheckoutSessionDto } from "./dto/checkout-session.dto";
import { CreateOrderDto } from "src/orders/dto/createOrder.dto";
import { OrderService } from "src/orders/order.service";
import { StripeService } from "./stripe.service";
import { ObjectId } from "mongoose";
import { UserService } from "src/users/user.service";

@Controller("stripe")
export class StripeController {
  constructor(
    @InjectStripeClient() private readonly stripeClient: Stripe,
    private readonly orderService: OrderService,
    private readonly stripeService: StripeService, // private readonly userService: UserService,
  ) {}

  /**
   * Fetch the Checkout Session to display the JSON result on the success page
   * @param sessionId the id of the checkout session, the type must be string
   * @returns the stripe checkout session (object)
   */
  @Get("checkout-session")
  async getCheckoutSession(
    @Query() { sessionId }: CheckoutSessionDto,
  ): Promise<Stripe.Response<Stripe.Checkout.Session>> {
    return await this.stripeClient.checkout.sessions.retrieve(sessionId);
  }

  /**
   * Create new Checkout Session for the order and return the session id
   * @param createCheckoutSession an object which contains the order details
   * @returns session id (string) of the new order
   */
  @Post("create-checkout-session")
  async createCheckoutSession(
    @Body() createCheckoutSession: CreateOrderDto,
    // ): Promise<CheckoutSessionDto> {
  ) {
    let userEmail = "";
    this.stripeService.getUserEmail(createCheckoutSession.user_id).then((res) => (userEmail = res));
    const line_items = createCheckoutSession.items.map((item) => {
      console.log("image url: ", item.image);
      return {
        quantity: 1,
        price_data: {
          currency: "aud",
          // 不能传数字，有安全隐患
          unit_amount: Math.round(Number(item.quotation) * 100),
          product_data: {
            name: item.design.designName,
            description: `Court type: ${item.design.courtSize.name};  Size: ${
              item.design.courtSize.length / 1000
            }m x ${item.design.courtSize.width / 1000}m.`,
            images: [item.image],
          },
        },
      };
    });
    try {
      const session = await this.stripeClient.checkout.sessions.create({
        line_items,
        payment_method_types: ["card", "au_becs_debit"],
        mode: "payment",
        success_url: `${process.env.DOMAIN}/success`,
        cancel_url: `${process.env.DOMAIN}/cancel`,
        billing_address_collection: "required",
      });
      // return { sessionId: session.id };
      return { url: session.url };
    } catch (error) {
      console.log(`Error is: ${error}`);
      throw new HttpException(`Error is: ${error}`, HttpStatus.BAD_GATEWAY);
    }
  }
}
