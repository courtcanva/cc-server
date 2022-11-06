import { Injectable, NotFoundException } from "@nestjs/common";
import { Stripe } from "stripe";
import { StripeWebhookHandler } from "@golevelup/nestjs-stripe";
import { CreatePaymentInfoDto } from "./dto/create-payment-information.dto";
import { OrderService } from "src/orders/order.service";
import { Model, ObjectId } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { PaymentInfo, PaymentInfoDocument } from "./schemas/payment-information.schema";
import { Order } from "src/orders/schemas/order.schema";
import mongoose from "mongoose";

@Injectable()
export class StripeService {
  constructor(
    @InjectModel(PaymentInfo.name) private readonly paymentInfoModel: Model<PaymentInfoDocument>,
    private readonly orderService: OrderService,
  ) {}

  /**
   * handle stripe checkout complete event.
   * @param event stripe webhook event
   */
  @StripeWebhookHandler("checkout.session.completed")
  stripeWebhookHandler(event: Stripe.Event) {
    const dataObject = event.data.object as Stripe.Checkout.Session;
    console.log(`order:${dataObject.metadata.orderId} payment completed`);
    this.completeOrderInformation(dataObject);
  }

  /**
   * Helper function of stripeWebhookHandler, generate the payment information
   * from stripe webhook event and create new a paymentInfo document.
   * @param data payment information from webhook event
   */
  async completeOrderInformation(data: Stripe.Checkout.Session) {
    const orderId = new mongoose.Types.ObjectId(data.metadata.orderId) as unknown as ObjectId;
    const updateOrderStatus = await this.orderService.update(orderId, { status: "completed" });
    if (!updateOrderStatus)
      throw new NotFoundException(`Order: ${data.metadata.orderId} does not exist.`);

    const paymentInfo: CreatePaymentInfoDto = {
      orderId: data.metadata.orderId,
      email: data.customer_details.email,
      name: data.customer_details.name,
      phone: data.customer_details.phone,
      currency: data.currency,
      sessionId: data.id,
      amountTotal: data.amount_total.toString(),
      constructionAddress: {
        city: data.shipping_details.address.city,
        country: data.shipping_details.address.country,
        line1: data.shipping_details.address.line1,
        line2: data.shipping_details.address.line2,
        state: data.shipping_details.address.state,
        postalCode: data.shipping_details.address.postal_code,
      },
      billingAddress: {
        city: data.customer_details.address.city,
        country: data.customer_details.address.country,
        line1: data.customer_details.address.line1,
        line2: data.customer_details.address.line2,
        state: data.customer_details.address.state,
        postalCode: data.customer_details.address.postal_code,
      },
    };
    const newPayment = await this.createPaymentInfo(paymentInfo);
    if (!newPayment) throw new Error("fail to create payment information for order!");
  }

  /**
   * Create a new payment information document.
   * @param data payment information from webhook event
   * @returns new paymentInfo document created
   */
  async createPaymentInfo(data: CreatePaymentInfoDto): Promise<PaymentInfo> {
    const newPaymentInfo = await this.paymentInfoModel.create(data);
    return newPaymentInfo;
  }

  /**
   * Find a payment information document and its relative order document.
   * @param id paymentInfo Id
   * @returns an object contains documents of paymentInfo and order
   */
  async findPaymentInfoById(id: ObjectId): Promise<{ paymentInfo?: PaymentInfo; order?: Order }> {
    const order = await this.orderService.findOne(id);
    const paymentInfo = await this.paymentInfoModel.findOne({ orderId: id }).exec();
    return {
      paymentInfo,
      order,
    };
  }
}
