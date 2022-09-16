import { Test, TestingModule } from "@nestjs/testing";
import { PriceController } from "./price.controller";
import { PriceService } from "./price.service";
import { PriceDto } from "./dto/price.dto";
import { mockPrice } from "./price.testData";
import { ObjectId } from "mongoose";

describe("PriceController", () => {
  let controller: PriceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PriceController],
      providers: [
        {
          provide: PriceService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([mockPrice]),
            update: jest
              .fn()
              .mockImplementation((_id: ObjectId, updatePriceDto: PriceDto) =>
                Promise.resolve({ _id: Object("1"), ...updatePriceDto }),
              ),
          },
        },
      ],
    }).compile();

    controller = module.get<PriceController>(PriceController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  describe("findAll()", () => {
    it("should get all of price", () => {
      const paginationQuery = { limit: 10, offset: 0 };
      expect(controller.findAll(paginationQuery)).resolves.toEqual([mockPrice]);
    });
  });

  describe("updatePrice", () => {
    it("should update a new Price", () => {
      const priceDto: PriceDto = mockPrice;
      const updatePriceDto = {
        ...priceDto,
        cementFloorPrice: mockPrice.cementFloorPrice,
        tilesPrice: mockPrice.tilesPrice,
      };
      expect(controller.update(Object("1"), updatePriceDto)).resolves.toEqual({
        _id: Object("1"),
        ...mockPrice,
      });
    });
  });
});
