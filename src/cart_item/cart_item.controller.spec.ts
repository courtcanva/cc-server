import { Test, TestingModule } from "@nestjs/testing";
import { CartItemController } from "./cart_item.controller";
import { CartItemService } from "./cart_item.service";
import { mockCartItem } from "./cart_item.testData";
import { CreateCartItemDto } from "./dto/create-cart_item.dto";
import { UpdateCartItemDto } from "./dto/update-cart_item.dto";
import { FindAllCartItemDto } from "./dto/findAll-cart_item.dto";

describe("ShoppingCartController", () => {
  let controller: CartItemController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CartItemController],
      providers: [
        {
          provide: CartItemService,
          useValue: {
            findAll: jest.fn().mockImplementation(() => Promise.resolve([mockCartItem])),
            findOne: jest.fn().mockImplementation(() => Promise.resolve(mockCartItem)),
            create: jest
              .fn()
              .mockImplementation((createCartItemDto: CreateCartItemDto) =>
                Promise.resolve({ _id: "1", ...createCartItemDto }),
              ),
            update: jest
              .fn()
              .mockImplementation((_id: string, updateCartItemDto: UpdateCartItemDto) =>
                Promise.resolve({ _id: "1", ...updateCartItemDto }),
              ),
            remove: jest.fn().mockResolvedValue({ isDeleted: true }),
          },
        },
      ],
    }).compile();

    controller = module.get<CartItemController>(CartItemController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  describe("findAll", () => {
    it("should get all cart items in a given user id with pagination", () => {
      const user_Id = "107705953378907352660";
      const findAllCartItemDto: FindAllCartItemDto = { userId: user_Id, limit: 3, offset: 1 };
      expect(controller.findAll(findAllCartItemDto)).resolves.toEqual([mockCartItem]);
    });
  });

  describe("findOne", () => {
    it("should get a cart item in a given objectId", () => {
      expect(controller.findOne(Object("1"))).resolves.toEqual(mockCartItem);
    });
  });

  describe("create()", () => {
    it("should create a new cart item", async () => {
      const createCartItemDto: CreateCartItemDto = {
        ...mockCartItem,
        image: "url12345566778aaaaaa",
      };

      expect(controller.create(createCartItemDto)).resolves.toEqual({
        _id: "1",
        ...createCartItemDto,
      });
    });
  });

  describe("update cart item", () => {
    it("should update a cart item", () => {
      const updateCartItemDto: UpdateCartItemDto = mockCartItem;
      const updateDesign = {
        ...updateCartItemDto,
        designName: mockCartItem.designName,
        tileColor: mockCartItem.tileColor,
        courtSize: mockCartItem.courtSize,
      };
      expect(controller.update(Object("1"), updateDesign)).resolves.toEqual({
        _id: "1",
        ...updateCartItemDto,
      });
    });
  });

  describe("delete a cart item", () => {
    it("should return a cart item deleted successfully", () => {
      expect(controller.remove(Object("1"))).resolves.toEqual({
        isDeleted: true,
      });
    });
  });
});
