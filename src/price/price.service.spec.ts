import { getModelToken } from "@nestjs/mongoose";
import { Model, Query } from "mongoose";
import { Test, TestingModule } from "@nestjs/testing";
import { createMock } from "@golevelup/ts-jest";
import { Price } from "./schemas/price.schema";
import { mockPrice } from "./price.testData";
import { PriceService } from "./price.service";

describe("PriceService", () => {
  let service: PriceService;
  let model: Model<Price>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PriceService,
        {
          provide: getModelToken(Price.name),
          useValue: {
            new: jest.fn().mockResolvedValue(mockPrice),
            constructor: jest.fn().mockResolvedValue(mockPrice),
            find: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            findOneAndUpdate: jest.fn(),
            remove: jest.fn(),
            save: jest.fn(),
            exec: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get(PriceService);
    model = module.get<Model<Price>>(getModelToken(Price.name));
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should return all Price", async () => {
    jest.spyOn(model, "find").mockReturnValue({
      skip: jest.fn().mockReturnValue({
        limit: jest.fn().mockReturnValue({ exec: jest.fn().mockResolvedValueOnce([mockPrice]) }),
      }),
    } as any);
    const paginationQuery = { limit: 10, offset: 0 };
    const price = await service.findAll(paginationQuery);
    expect(price).toEqual([mockPrice]);
  });

  it("should update a price successfully", async () => {
    const updatePrice = {
      ...mockPrice,
      cementFloorPrice: mockPrice.cementFloorPrice,
      tilesPrice: mockPrice.tilesPrice,
    };
    jest.spyOn(model, "findOneAndUpdate").mockReturnValueOnce(
      createMock<Query<any, any>>({
        exec: jest.fn().mockResolvedValueOnce(mockPrice),
      }) as any,
    );
    const updatedPrice = await service.update(Object("1"), updatePrice);
    expect(updatedPrice).toEqual(mockPrice);
  });
});
