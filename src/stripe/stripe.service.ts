import { Injectable, NotFoundException } from "@nestjs/common";
import { Stripe } from "stripe";
import { StripeWebhookHandler } from "@golevelup/nestjs-stripe";
import { CreatePaymentInfoDto } from "./dto/create-payment-information.dto";
import { OrderService } from "src/orders/order.service";
import { Model, ObjectId } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { PaymentInfo, PaymentInfoDocument } from "./schemas/payment-information.schema";
import { Order, StatusType } from "src/orders/schemas/order.schema";
import mongoose from "mongoose";
import { UpdatePaymentInfoDto } from "./dto/update-payment-information.dto";

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
    this.completeOrderInformation(dataObject);
  }

  /**
   * Helper function of stripeWebhookHandler, generate the payment information
   * from stripe webhook event and create new a paymentInfo document.
   * @param data payment information from webhook event
   */
  async completeOrderInformation(data: Stripe.Checkout.Session) {
    const paymentInfo: CreatePaymentInfoDto = {
      orderId: data.metadata.orderId,
      email: data.customer_details.email,
      name: data.customer_details.name,
      phone: data.customer_details.phone,
      currency: data.currency,
      sessionId: data.id,
      amountTotal: data.amount_total,
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

    const orderId = new mongoose.Types.ObjectId(data.metadata.orderId) as unknown as ObjectId;
    const { _id: newPaymentInfoId } = await this.paymentInfoModel.findOne({ orderId }).exec();
    if (!newPaymentInfoId) throw new Error("fail to create payment information for order!");

    const updateOrderStatus = await this.orderService.updatePayment(orderId, {
      status: StatusType.COMPLETED,
      paymentInfo: newPaymentInfoId,
    });
    if (!updateOrderStatus)
      throw new NotFoundException(`Order: ${data.metadata.orderId} does not exist.`);
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
   * @param id order Id, not paymentInfp id
   * @returns an object contains documents of paymentInfo and order
   */
  async findPaymentInfoByOrderId(
    id: ObjectId,
  ): Promise<{ paymentInfo?: PaymentInfo; order: Order }> {
    const order = await this.orderService.findOne(id);
    const paymentInfo = await this.paymentInfoModel.findOne({ orderId: id }).exec();
    if (!order) throw new NotFoundException(`order #${id} not found`);
    return {
      paymentInfo,
      order,
    };
  }

  /**
   * Return an object of updated payment information.
   * @param orderId order id
   * @param updatePaymentInfo updated infomation
   * @returns updated paymentInfo document
   */
  async updatePaymentInfo(
    orderId: ObjectId,
    updatePaymentInfo: UpdatePaymentInfoDto,
  ): Promise<PaymentInfo> {
    const paymentInfo = await this.paymentInfoModel
      .findOneAndUpdate({ orderId }, { $set: updatePaymentInfo }, { new: true })
      .exec();
    if (!paymentInfo)
      throw new NotFoundException(`Payment information of order #${orderId} not found`);
    return paymentInfo;
  }
}
