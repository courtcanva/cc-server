import { Test, TestingModule } from "@nestjs/testing";
import { Connection, Model, Query } from "mongoose";
import { CartItemService } from "./cartItem.service";
import { createMock } from "@golevelup/ts-jest";
import { CartItem } from "./schemas/cartItem.schema";
import { getModelToken } from "@nestjs/mongoose";
import {
  mockCartItem,
  mockCartItemArray,
  mockNewCartItem,
  mockCartItemInDatabase,
} from "./cartItem.testData";
import { User } from "src/users/schemas/user.schema";

describe("CartItemService", () => {
  let service: CartItemService;
  let model: Model<CartItem>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CartItemService,
        { provide: Connection, useValue: {} },
        {
          provide: getModelToken(CartItem.name),
          useValue: {
            new: jest.fn().mockResolvedValue(mockCartItem),
            constructor: jest.fn().mockResolvedValue(mockCartItem),
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

    service = module.get<CartItemService>(CartItemService);
    model = module.get<Model<CartItem>>(getModelToken(CartItem.name));
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should return cart items in one user ID, within given pagination", async () => {
    jest.spyOn(model, "find").mockReturnValue({
      sort: jest.fn().mockReturnValue({
        skip: jest.fn().mockReturnValue({
          limit: jest.fn().mockReturnValue({
            exec: jest.fn().mockResolvedValueOnce(mockCartItemArray),
          }),
        }),
      }),
    } as any);
    const user_Id = "user123";
    expect(await service.findAll({ userId: user_Id, limit: 3, offset: 1 })).toEqual(
      mockCartItemArray,
    );
  });

  it("should return a cart items in given object ID", async () => {
    jest.spyOn(model, "findOne").mockReturnValueOnce(
      createMock<Query<any, any>>({
        exec: jest.fn().mockResolvedValueOnce(mockCartItem),
      }) as any,
    );
    const id = Object("6321e2b4d65d0ab88eaefb13");
    const expectedCartItem = mockCartItem;

    const cartItem = await service.findOne(id);
    expect(cartItem).toEqual(expectedCartItem);
  });

  it("should return a cart item created", async () => {
    jest.spyOn(model, "create").mockImplementationOnce(() => Promise.resolve(mockCartItem));
    expect(await service.create(mockNewCartItem)).toEqual(mockCartItem);
  });

  it("should update a cart item", async () => {
    const updateCartItem = {
      ...mockCartItem,
      quotation: "$AU1111123update",
    };
    jest.spyOn(model, "findByIdAndUpdate").mockReturnValueOnce(
      createMock<Query<any, any>>({
        exec: jest.fn().mockResolvedValueOnce(mockCartItem),
      }) as any,
    );
    const updatedCartItem = await service.update(
      Object("632336d9529f634ce9bd0833"),
      updateCartItem,
    );
    expect(updatedCartItem).toEqual(updatedCartItem);
  });

  it("should delete a cart item", async () => {
    jest.spyOn(model, "findOneAndUpdate").mockResolvedValueOnce(
      createMock<Query<any, any>>({
        exec: jest.fn().mockResolvedValueOnce(mockCartItemInDatabase),
      }) as any,
    );
    expect(await service.remove(Object("6320bd57f3dee2ee6deeecf2"))).toEqual(true);
  });
});
