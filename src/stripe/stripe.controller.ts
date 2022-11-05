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
import { OrderService } from "src/orders/order.service";
import { StripeService } from "./stripe.service";
import { CheckoutSessionResponseDto } from "./dto/checkout-session-response.dto";
import { CreateCheckoutSessionDto } from "./dto/create-checkout-session.dto";
import { ObjectId } from "mongoose";
import { Order } from "src/orders/schemas/order.schema";
import { PaymentInfo } from "./schemas/payment-information.schema";

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
   * @returns session url (string) of the new order
   */
  @Post("create-checkout-session")
  async createCheckoutSession(
    @Body() createCheckoutSession: CreateCheckoutSessionDto,
  ): Promise<CheckoutSessionResponseDto> {
    const line_items = createCheckoutSession.items.map((item) => {
      return {
        quantity: 1,
        price_data: {
          currency: "aud",
          // TO DO: use price id instead of real number to calculate the total amount
          unit_amount: Math.round(
            Number(item.quotation) * 100 * createCheckoutSession.depositRatio,
          ),
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
        metadata: { orderId: createCheckoutSession.order_Id },
        payment_method_types: ["card"],
        mode: "payment",
        success_url: `${process.env.DOMAIN}/success?orderId=${createCheckoutSession.order_Id}`,
        cancel_url: `${process.env.DOMAIN}/cancel?orderId=${createCheckoutSession.order_Id}`,
        billing_address_collection: "required",
        shipping_address_collection: { allowed_countries: ["AU"] },
        phone_number_collection: { enabled: true },
      });
      return { sessionUrl: session.url };
    } catch (error) {
      console.log(error);
      throw new HttpException(error, HttpStatus.BAD_GATEWAY);
    }
  }

  @Get("paymentInfo/:id")
  async getPaymentInfoAndOrderById(
    @Param(":id") id: ObjectId,
  ): Promise<{ paymentInfo: PaymentInfo; order: Order }> {
    return await this.stripeService.findPaymentInfoById(id);
  }
}
