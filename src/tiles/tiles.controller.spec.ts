import { Test, TestingModule } from "@nestjs/testing";
import { TilesController } from "./tiles.controller";
import { TilesService } from "./tiles.service";
import { CreateTileDto } from "./dto/create-tile.dto";
import { UpdateTileDto } from "./dto/update-tile.dto";
import { mockTile } from "./tile.testData";

describe("TilesController", () => {
  let controller: TilesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TilesController],
      providers: [
        {
          provide: TilesService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([mockTile]),
            findOne: jest.fn().mockImplementation(() => Promise.resolve(mockTile)),
            create: jest
              .fn()
              .mockImplementation((createTileDto: CreateTileDto) =>
                Promise.resolve({ _id: "1", ...createTileDto }),
              ),
            update: jest
              .fn()
              .mockImplementation((id: string, updateTileDto: UpdateTileDto) =>
                Promise.resolve({ _id: "1", ...updateTileDto }),
              ),
            remove: jest.fn().mockResolvedValue({ isDeleted: true }),
          },
        },
      ],
    }).compile();

    controller = module.get<TilesController>(TilesController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  describe("findAll()", () => {
    it("should get all of tiles", () => {
      const paginationQuery = { limit: 10, offset: 0 };
      expect(controller.findAll(paginationQuery)).resolves.toEqual([mockTile]);
    });
  });

  describe("findOne", () => {
    it("should get a tile", () => {
      expect(controller.findOne(Object("1"))).resolves.toEqual(mockTile);
    });
  });

  describe("create()", () => {
    it("should create a new tile", async () => {
      const createTileDto: CreateTileDto = mockTile;

      expect(controller.create(createTileDto)).resolves.toEqual({
        _id: "1",
        ...createTileDto,
      });
    });
  });

  describe("updateTile", () => {
    it("should update a new Tile", () => {
      const updateTileDto: UpdateTileDto = mockTile;
      expect(controller.update(Object("1"), updateTileDto)).resolves.toEqual({
        _id: "1",
        ...updateTileDto,
      });
    });
  });

  describe("deleteTile", () => {
    it("should return Tile deleted successfully", () => {
      const updateTileDto: UpdateTileDto = mockTile;
      expect(controller.remove(Object("1"), updateTileDto)).resolves.toEqual({ isDeleted: true });
    });
  });
});
