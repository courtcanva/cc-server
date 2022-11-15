import { Test, TestingModule } from "@nestjs/testing";
import { Connection, Model, Query } from "mongoose";
import { OrderService } from "./order.service";
import { createMock } from "@golevelup/ts-jest";
import { Order, StatusType } from "./schemas/order.schema";
import { getModelToken } from "@nestjs/mongoose";
import { mockOrder, mockOrderArray, mockOrderInDatabase } from "./order.testData";
import { User } from "src/users/schemas/user.schema";

describe("OrderService", () => {
  let service: OrderService;
  let model: Model<Order>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrderService,
        { provide: Connection, useValue: {} },
        {
          provide: getModelToken(Order.name),
          useValue: {
            new: jest.fn().mockResolvedValue(mockOrder),
            constructor: jest.fn().mockResolvedValue(mockOrder),
            findAll: jest.fn(),
            findOne: jest.fn(),
            find: jest.fn(),
            create: jest.fn(),
            findByIdAndUpdate: jest.fn(),
            findOneAndUpdate: jest.fn(),
            remove: jest.fn(),
            sort: jest.fn(),
            skip: jest.fn(),
            limit: jest.fn(),
            save: jest.fn(),
            exec: jest.fn(),
            populate: jest.fn,
            countDocuments: jest.fn(),
          },
        },
        {
          provide: getModelToken(User.name),
          useValue: {
            find: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<OrderService>(OrderService);
    model = module.get<Model<Order>>(getModelToken(Order.name));
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should return orders in one user ID, within given pagination", async () => {
    jest.spyOn(model, "find").mockReturnValue({
      populate: jest.fn().mockReturnValue({
        sort: jest.fn().mockReturnValue({
          skip: jest.fn().mockReturnValue({
            limit: jest.fn().mockReturnValue({
              exec: jest.fn().mockResolvedValueOnce(mockOrderArray),
            }),
          }),
        }),
      }),
    } as any);
    jest.spyOn(model, "countDocuments").mockResolvedValueOnce(mockOrderArray.length);
    const user_Id = "user123";
    expect(await service.findAll({ user_id: user_Id, limit: 3, offset: 1 })).toEqual({
      data: mockOrderArray,
      total: mockOrderArray.length,
    });
  });

  it("should return a order in given object ID", async () => {
    jest.spyOn(model, "findOne").mockReturnValueOnce(
      createMock<Query<any, any>>({
        exec: jest.fn().mockResolvedValueOnce(mockOrder),
      }) as any,
    );
    const id = Object("6321e2b4d65d0ab88eaefb13");
    const expectedOrder = mockOrder;

    const order = await service.findOne(id);
    expect(order).toEqual(expectedOrder);
  });

  it("should return a order created", async () => {
    jest.spyOn(model, "create").mockImplementationOnce(() => Promise.resolve(mockOrder));
    expect(await service.create(mockOrder)).toEqual(mockOrder);
  });

  it("should update a order item", async () => {
    const updateOrder = {
      ...mockOrder,
      isPaid: true,
    };
    jest.spyOn(model, "findByIdAndUpdate").mockReturnValueOnce(
      createMock<Query<any, any>>({
        exec: jest.fn().mockResolvedValueOnce(updateOrder),
      }) as any,
    );
    const updatedOrder = await service.update(Object("632336d9529f634ce9bd0833"), updateOrder);
    expect(updatedOrder).toEqual(updateOrder);
  });

  it("should update a order's status", async () => {
    const updateOrder = {
      ...mockOrder,
      isPaid: true,
      status: "completed",
    };
    jest.spyOn(model, "findByIdAndUpdate").mockReturnValueOnce(
      createMock<Query<any, any>>({
        exec: jest.fn().mockResolvedValueOnce(updateOrder),
      }) as any,
    );
    const updatedOrder = await service.updatePayment(Object("632336d9529f634ce9bd0833"), {
      status: StatusType.COMPLETED,
    });
    expect(updatedOrder).toEqual(updateOrder);
  });

  it("should cancel a order", async () => {
    jest.spyOn(model, "findOneAndUpdate").mockResolvedValueOnce(
      createMock<Query<any, any>>({
        exec: jest.fn().mockResolvedValueOnce(mockOrderInDatabase),
      }) as any,
    );
    expect(await service.remove(Object("6320bd57f3dee2ee6deeecf2"))).toEqual(true);
  });
});
