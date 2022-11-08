import { Controller, Get, Post, Body, HttpException, HttpStatus, Param } from "@nestjs/common";
import { Stripe } from "stripe";
import { InjectStripeClient } from "@golevelup/nestjs-stripe";
import { StripeService } from "./stripe.service";
import { CheckoutSessionResponseDto } from "./dto/checkout-session-response.dto";
import { CreateCheckoutSessionDto } from "./dto/create-checkout-session.dto";
import { ObjectId } from "mongoose";
import { Order } from "src/orders/schemas/order.schema";
import { PaymentInfo } from "./schemas/payment-information.schema";
import { UpdatePaymentInfoDto } from "./dto/update-payment-information.dto";

@Controller("stripe")
export class StripeController {
  constructor(
    @InjectStripeClient() private readonly stripeClient: Stripe,
    private readonly stripeService: StripeService,
  ) {}

  /**
   * Create new Checkout Session for the order and return the session url
   * @param createCheckoutSession an object which contains the order details
   * @returns session url (string) of the new order
   */
  @Post("create-checkout-session")
  async createCheckoutSession(
    @Body() createCheckoutSession: CreateCheckoutSessionDto,
  ): Promise<CheckoutSessionResponseDto> {
    const { items, depositRatio, order_Id } = createCheckoutSession;

    const line_items = items.map((item) => {
      const { quotation, design, image } = item;

      return {
        quantity: 1,
        price_data: {
          currency: "aud",
          // TO DO: use price id instead of real number to calculate the total amount
          unit_amount: Math.round(Number(quotation) * depositRatio * 100),
          product_data: {
            name: design.designName,
            description: `Court type: ${design.courtSize.name};  Size: ${
              design.courtSize.length / 1000
            }m x ${design.courtSize.width / 1000}m.`,
            images: [image],
          },
        },
      };
    });

    try {
      const session = await this.stripeClient.checkout.sessions.create({
        line_items,
        metadata: { orderId: order_Id },
        payment_method_types: ["card"],
        mode: "payment",
        success_url: `${process.env.DOMAIN}/payment?status=success&orderId=${order_Id}`,
        cancel_url: `${process.env.DOMAIN}/payment?status=failure&orderId=${order_Id}`,
        billing_address_collection: "required",
        shipping_address_collection: { allowed_countries: ["AU"] },
        phone_number_collection: { enabled: true },
      });
      return { sessionUrl: session.url };
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_GATEWAY);
    }
  }

  @Get("paymentInfo/:orderId")
  async getPaymentInfoAndOrderByOrderId(
    @Param("orderId") orderId: ObjectId,
  ): Promise<{ paymentInfo?: PaymentInfo; order: Order }> {
    return await this.stripeService.findPaymentInfoByOrderId(orderId);
  }

  @Post("paymentInfo/:orderId")
  async updatePaymentInfo(
    @Param("orderId") orderId: ObjectId,
    @Body() updatePaymentInfo: UpdatePaymentInfoDto,
  ): Promise<PaymentInfo> {
    return await this.stripeService.updatePaymentInfo(orderId, updatePaymentInfo);
  }

  // TO DO: get all paymentInfo+Order with pagination
}
