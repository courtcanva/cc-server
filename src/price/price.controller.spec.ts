import { Test, TestingModule } from "@nestjs/testing";
import { PriceController } from "./price.controller";
import { PriceService } from "./price.service";
import { CreatePriceDto } from "./dto/create-price.dto";
import { UpdatePriceDto } from "./dto/update-price.dto";
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
              .mockImplementation((createPriceDto: CreatePriceDto) =>
                Promise.resolve({ _id: "1", ...createPriceDto }),
              ),
            update: jest
              .fn()
              .mockImplementation((id: string, updatePriceDto: UpdatePriceDto) =>
                Promise.resolve({ _id: "1", ...updatePriceDto }),
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
      expect(controller.findAll()).resolves.toEqual([mockPrice]);
    });
  });

  describe("findOne", () => {
    it("should get a price", () => {
      expect(controller.findOne(Object("1"))).resolves.toEqual(mockPrice);
    });
  });

  describe("create()", () => {
    it("should create a new price", async () => {
      const createPriceDto: CreatePriceDto = mockPrice;

      expect(controller.create(createPriceDto)).resolves.toEqual({
        _id: "1",
        ...createPriceDto,
      });
    });
  });

  describe("updatePrice", () => {
    it("should update a new Price", () => {
      const updatePriceDto: UpdatePriceDto = mockPrice;
      expect(controller.update(Object("1"), updatePriceDto)).resolves.toEqual({
        _id: "1",
        ...updatePriceDto,
      });
    });
  });

  describe("deletePrice", () => {
    it("should return Price deleted successfully", () => {
      const updatePriceDto: UpdatePriceDto = mockPrice;
      expect(controller.remove(Object("1"), updatePriceDto)).resolves.toEqual({ isDeleted: true });
    });
  });
});
