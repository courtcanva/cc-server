import { Test, TestingModule } from "@nestjs/testing";
import { OrderController } from "./order.controller";
import { OrderService } from "./order.service";
import { mockOrder } from "./order.testData";
import { CreateOrderDto } from "./dto/createOrder.dto";
import { UpdateOrderDto } from "./dto/updateOrder.dto";
import { FindAllOrderDto } from "./dto/findAllOrder.dto";

describe("OrderController", () => {
  let controller: OrderController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [
        {
          provide: OrderService,
          useValue: {
            findAll: jest.fn().mockImplementation(() => Promise.resolve([mockOrder])),
            findOne: jest.fn().mockImplementation(() => Promise.resolve(mockOrder)),
            create: jest
              .fn()
              .mockImplementation((createOrderDto: CreateOrderDto) =>
                Promise.resolve({ _id: "1", ...createOrderDto }),
              ),
            update: jest
              .fn()
              .mockImplementation((_id: string, updateOrderDto: UpdateOrderDto) =>
                Promise.resolve({ _id: "1", ...updateOrderDto }),
              ),
            remove: jest.fn().mockResolvedValue({ isDeleted: true }),
          },
        },
      ],
    }).compile();

    controller = module.get<OrderController>(OrderController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  describe("findAll", () => {
    it("should get all orders in a given user id with pagination", () => {
      const user_Id = "user123";
      const findAllOrderDto: FindAllOrderDto = { user_id: user_Id, limit: 3, offset: 1 };
      expect(controller.findAll(findAllOrderDto)).resolves.toEqual([mockOrder]);
    });
  });

  describe("findOne", () => {
    it("should get a order in a given objectId", () => {
      expect(controller.findOne(Object("1"))).resolves.toEqual(mockOrder);
    });
  });

  describe("create()", () => {
    it("should create a new order", async () => {
      const createOrderDto: CreateOrderDto = {
        ...mockOrder,
      };

      expect(controller.create(createOrderDto)).resolves.toEqual({
        _id: "1",
        ...createOrderDto,
      });
    });
  });

  describe("update order", () => {
    it("should update a order", () => {
      const updateOrderDto: UpdateOrderDto = mockOrder;
      const updateItems = {
        ...updateOrderDto,
        items: mockOrder.items,
      };
      expect(controller.update(Object("1"), updateItems)).resolves.toEqual({
        _id: "1",
        ...updateOrderDto,
      });
    });
  });

  describe("delete a order", () => {
    it("should return a order deleted successfully", () => {
      expect(controller.remove(Object("1"))).resolves.toEqual({
        isDeleted: true,
      });
    });
  });
});
