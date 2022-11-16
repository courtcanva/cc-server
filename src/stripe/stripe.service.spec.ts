import { createMock } from "@golevelup/ts-jest";
import { getModelToken } from "@nestjs/mongoose";
import { Test, TestingModule } from "@nestjs/testing";
import { Connection, FilterQuery, Model, Query } from "mongoose";
import { OrderService } from "src/orders/order.service";
import { Order } from "src/orders/schemas/order.schema";
import { PaymentInfo } from "./schemas/payment-information.schema";
import { StripeService } from "./stripe.service";
import {
  mockPaymentInfo,
  mockPaymentInfoDb,
  mockPaymentOrderData,
  mockUpdatePaymentInfo,
  mockOrder,
} from "./stripe.testData";

describe("StripeService", () => {
  let service: StripeService;
  let filterQuery: FilterQuery<PaymentInfo>;
  let paymentInfoModel: Model<PaymentInfo>;
  let orderModel: Model<Order>;

  const mockOrderModel = {
    findOne: jest.fn().mockReturnValueOnce(
      createMock<Query<any, any>>({
        exec: jest.fn().mockResolvedValueOnce(mockOrder),
      }) as any,
    ),
    findByIdAndUpdate: jest.fn().mockReturnValueOnce(
      createMock<Query<any, any>>({
        exec: jest.fn().mockResolvedValueOnce(mockOrder),
      }) as any,
    ),
  };

  const mockPaymentInfoModel = {
    new: jest.fn().mockResolvedValue(mockPaymentInfo),
    constructor: jest.fn().mockResolvedValue(mockPaymentInfo),
    findOne: jest.fn().mockReturnValueOnce(
      createMock<Query<any, any>>({
        exec: jest.fn().mockResolvedValueOnce(mockPaymentOrderData),
      }) as any,
    ),
    create: jest.fn().mockResolvedValueOnce(mockPaymentInfoDb),
    findOneAndUpdate: jest.fn().mockReturnValueOnce(
      createMock<Query<any, any>>({
        exec: jest.fn().mockResolvedValueOnce(mockPaymentInfoDb),
      }) as any,
    ),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StripeService,
        OrderService,
        { provide: Connection, useValue: {} },
        {
          provide: getModelToken(PaymentInfo.name),
          useValue: mockPaymentInfoModel,
        },
        {
          provide: getModelToken(Order.name),
          useValue: mockOrderModel,
        },
      ],
    }).compile();

    service = module.get<StripeService>(StripeService);
    paymentInfoModel = module.get<Model<PaymentInfo>>(getModelToken(PaymentInfo.name));
    orderModel = module.get<Model<Order>>(getModelToken(Order.name));
    filterQuery = {
      orderId: mockPaymentInfo.orderId,
    };

    jest.clearAllMocks();
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should return the new created paymentInfo", async () => {
    const paymentInfo: PaymentInfo = await service.createPaymentInfo(mockPaymentInfo);
    const createSpy: jest.SpyInstance = jest.spyOn(paymentInfoModel, "create");

    expect(createSpy).toHaveBeenCalled();
    expect(paymentInfo).toEqual(mockPaymentInfoDb);
  });

  it("should return the updated paymentInfo", async () => {
    const paymentInfo: PaymentInfo = await service.updatePaymentInfo(
      filterQuery.orderId,
      mockUpdatePaymentInfo,
    );
    const updateSpy: jest.SpyInstance = jest.spyOn(paymentInfoModel, "findOneAndUpdate");

    expect(updateSpy).toHaveBeenCalled();
    expect(paymentInfo).toEqual(mockPaymentInfoDb);
  });

  it("should return the order and paymentInfo through a given orderId", async () => {
    const findOneSpy_P: jest.SpyInstance = jest.spyOn(paymentInfoModel, "findOne");
    const findOneSpy_O: jest.SpyInstance = jest.spyOn(orderModel, "findOne");
    await service.findPaymentInfoByOrderId(filterQuery.orderId);

    expect(findOneSpy_P).toHaveBeenCalled();
    expect(findOneSpy_O).toHaveBeenCalled();
  });
});
