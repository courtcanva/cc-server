import { Test, TestingModule } from "@nestjs/testing";
import { PriceController } from "./price.controller";
import { PriceService } from "./price.service";
import { PriceDto } from "./dto/price.dto";
import { mockPrice } from "./price.testData";

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
            findOne: jest.fn().mockImplementation(() => Promise.resolve(mockPrice)),
            create: jest
              .fn()
              .mockImplementation((createPriceDto: PriceDto) =>
                Promise.resolve({ _id: "1", ...createPriceDto }),
              ),
            update: jest
              .fn()
              .mockImplementation((tile_id: string, updatePriceDto: PriceDto) =>
                Promise.resolve({ tile_id: "tile001", ...updatePriceDto }),
              ),
            remove: jest.fn().mockResolvedValue({ isDeleted: true }),
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

  describe("findOne", () => {
    it("should get a price", () => {
      expect(controller.findOne("tile001")).resolves.toEqual(mockPrice);
    });
  });

  describe("create()", () => {
    it("should create a new price", async () => {
      const createPriceDto: PriceDto = mockPrice;

      expect(controller.create(createPriceDto)).resolves.toEqual({
        _id: "1",
        ...createPriceDto,
      });
    });
  });

  describe("updatePrice", () => {
    it("should update a new Price", () => {
      const priceDto: PriceDto = mockPrice;
      const updatePriceDto = {
        ...priceDto,
        deliveryPrice: priceDto.deliveryPrice,
        tilePrice: priceDto.tilePrice,
      };
      expect(controller.update("tile001", updatePriceDto)).resolves.toEqual({
        tile_id: "tile001",
        ...mockPrice,
      });
    });
  });

  describe("deletePrice", () => {
    it("should return Price deleted successfully", () => {
      expect(controller.remove("tile001")).resolves.toEqual({ isDeleted: true });
    });
  });
});
