import { STRIPE_CLIENT_TOKEN } from "@golevelup/nestjs-stripe";
import { Test, TestingModule } from "@nestjs/testing";
import { StripeController } from "./stripe.controller";
import { StripeService } from "./stripe.service";
import {
  mockCreateCheckoutSession,
  mockPaymentInfo,
  mockUpdatePaymentInfo,
  mockPaymentOrderData,
} from "./stripe.testData";

describe("StripeController", () => {
  let controller: StripeController;

  const mockStripeService = {
    findPaymentInfoByOrderId: jest
      .fn()
      .mockImplementation(() => Promise.resolve(mockPaymentOrderData)),
    updatePaymentInfo: jest.fn().mockImplementation(() => Promise.resolve(mockPaymentInfo)),
  };

  const mockStripeClient = {
    create: jest.fn().mockImplementation(() => Promise.resolve({ sessionUrl: "111" })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StripeController],
      providers: [
        {
          provide: StripeService,
          useValue: mockStripeService,
        },
        {
          provide: STRIPE_CLIENT_TOKEN,
          useValue: mockStripeClient,
        },
      ],
    }).compile();

    controller = module.get<StripeController>(StripeController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  // it("should return the session url", async () => {
  //   expect(await controller.createCheckoutSession(mockCreateCheckoutSession)).toEqual({
  //     sessionUrl: "111",
  //   });
  // });

  it("should return the paymentInfo and Order documents", async () => {
    expect(await controller.getPaymentInfoAndOrderByOrderId(Object("1"))).toEqual(
      mockPaymentOrderData,
    );
    expect(mockStripeService.findPaymentInfoByOrderId).toHaveBeenCalled();
  });

  it("should return the updated paymentInfo document", async () => {
    expect(await controller.updatePaymentInfo(Object("1"), mockUpdatePaymentInfo)).toEqual(
      mockPaymentInfo,
    );
    expect(mockStripeService.updatePaymentInfo).toHaveBeenCalled();
  });
});
