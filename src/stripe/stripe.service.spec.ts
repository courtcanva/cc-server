import { getModelToken } from "@nestjs/mongoose";
import { Test, TestingModule } from "@nestjs/testing";
import { Connection } from "mongoose";
import { OrderService } from "src/orders/order.service";
import { Order } from "src/orders/schemas/order.schema";
import { PaymentInfo } from "./schemas/payment-information.schema";
import { StripeService } from "./stripe.service";
import { mockPaymentInfo, mockPaymentOrderData, mockStripeSessionData } from "./stripe.testData";

describe("StripeService", () => {
  let service: StripeService;

  const mockPaymentInfoModel = {
    create: jest.fn().mockImplementation((data) =>
      Promise.resolve({
        ...data,
        createdAt: "2022-11-07T19:50:04.076Z",
        updatedAt: Date.now().toString().substring(0, -1),
        _v: "0",
        _id: Object("123"),
      }),
    ),
    findOne: jest.fn().mockResolvedValue(() => Promise.resolve(mockPaymentOrderData)),
    findOneAndUpdate: jest.fn().mockImplementationOnce((orderId, data) => {
      if (orderId !== mockPaymentInfo.orderId) return Promise.reject("err");
      return Promise.resolve({
        ...mockPaymentInfo,
        ...data,
      });
    }),
  };

  const mockOrderModel = {
    findOneAndUpdate: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StripeService,
        OrderService,
        {
          provide: Connection,
          useValue: {},
        },
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
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should return the new created paymentInfo", async () => {
    expect(await service.createPaymentInfo(mockPaymentInfo)).toEqual({
      ...mockPaymentInfo,
      createdAt: "2022-11-07T19:50:04.076Z",
      updatedAt: Date.now().toString().substring(0, -1),
      _v: "0",
      _id: Object("123"),
    });
    expect(mockPaymentInfoModel.create).toHaveBeenCalled();
  });

  // it("should return the updated paymentInfo", async () => {
  //   const updateInfo = {
  //     name: "Yajuu Senpai"
  //   }
  //   expect(await service.updatePaymentInfo(Object("6320bd57f3dee2ee6deeecf2"), updateInfo))
  //     .toEqual({...mockPaymentInfo, name: "Yajuu Senpai"});
  //   expect(mockPaymentInfoModel.findOneAndUpdate).toHaveBeenCalled();
  // });

  // it("should return the paymentInfo and order", async () => {
  //   expect(await service.findPaymentInfoByOrderId(Object("1"))).toEqual(mockPaymentOrderData);
  //   expect(mockPaymentInfoModel.findOne).toHaveBeenCalled();
  // });

  it("should update order and call create paymentInfo function", () => {
    service.completeOrderInformation(mockStripeSessionData);
    expect(mockPaymentInfoModel.create).toHaveBeenCalled();
  });
});
