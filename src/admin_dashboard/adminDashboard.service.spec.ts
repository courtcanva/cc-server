import { getModelToken } from "@nestjs/mongoose";
import { Test, TestingModule } from "@nestjs/testing";
import { Order } from "src/orders/schemas/order.schema";
import { PaymentInfo } from "src/stripe/schemas/payment-information.schema";
import { TemplateItem } from "src/template_items/schemas/template.schema";
import { User } from "src/users/schemas/user.schema";
import { AdminDashboardService } from "./adminDashboard.service";

describe("AdminDashboardService", () => {
  let service: AdminDashboardService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AdminDashboardService,
        {
          provide: getModelToken(Order.name),
          useValue: {
            aggregate: jest.fn(),
            countDocuments: jest.fn(),
            find: jest.fn(),
            populate: jest.fn(),
            sort: jest.fn(),
            limit: jest.fn(),
            exec: jest.fn(),
          },
        },
        {
          provide: getModelToken(PaymentInfo.name),
          useValue: {
            aggregate: jest.fn(),
          },
        },
        {
          provide: getModelToken(User.name),
          useValue: {
            countDocuments: jest.fn(),
          },
        },
        {
          provide: getModelToken(TemplateItem.name),
          useValue: {
            countDocuments: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AdminDashboardService>(AdminDashboardService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
