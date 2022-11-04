import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { StripeController } from "./stripe.controller";
import { StripeService } from "./stripe.service";
import { StripeModule as Stripe } from "@golevelup/nestjs-stripe";
import {
  applyRawBodyOnlyTo,
  JsonBodyMiddleware,
  RawBodyMiddleware,
} from "@golevelup/nestjs-webhooks";
import { MongooseModule } from "@nestjs/mongoose";
import { OrderModule } from "src/orders/order.module";
import { UserModule } from "src/users/user.module";
import { PaymentInfo, PaymentInfoSchema } from "./schemas/payment-information.schema";

@Module({
  imports: [
    JsonBodyMiddleware,
    RawBodyMiddleware,
    Stripe.forRoot(Stripe, {
      apiKey: process.env.STRIPE_SECRET_KEY,
      webhookConfig: {
        stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET_KEY,
      },
    }),
    MongooseModule.forFeature([
      {
        name: PaymentInfo.name,
        schema: PaymentInfoSchema,
      },
    ]),
    OrderModule,
    UserModule,
  ],
  controllers: [StripeController],
  providers: [StripeService],
})
export class StripeModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    applyRawBodyOnlyTo(consumer, {
      method: RequestMethod.ALL,
      path: "stripe/webhook",
    });
  }
}
