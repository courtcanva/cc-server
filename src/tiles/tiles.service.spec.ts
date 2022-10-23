import { getModelToken } from "@nestjs/mongoose";
import { Model, Query } from "mongoose";
import { Test, TestingModule } from "@nestjs/testing";
import { createMock } from "@golevelup/ts-jest";
import { Tile } from "./schemas/tile.schema";
import { mockTile } from "./tile.testData";
import { TilesService } from "./tiles.service";

describe("TileService", () => {
  let service: TilesService;
  let model: Model<Tile>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TilesService,
        {
          provide: getModelToken(Tile.name),
          useValue: {
            new: jest.fn().mockResolvedValue(mockTile),
            constructor: jest.fn().mockResolvedValue(mockTile),
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

    service = module.get(TilesService);
    model = module.get<Model<Tile>>(getModelToken(Tile.name));
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should return all Tile", async () => {
    jest.spyOn(model, "find").mockReturnValue({
      skip: jest.fn().mockReturnValue({
        limit: jest.fn().mockReturnValue({ exec: jest.fn().mockResolvedValueOnce([mockTile]) }),
      }),
    } as any);
    const paginationQuery = { limit: 10, offset: 0 };
    const tiles = await service.findAll(paginationQuery);
    expect(tiles).toEqual([mockTile]);
  });
  it("should get one Tile by id", async () => {
    jest.spyOn(model, "findOne").mockReturnValueOnce(
      createMock<Query<any, any>>({
        exec: jest.fn().mockResolvedValueOnce(mockTile),
      }) as any,
    );
    const tile = await service.findOne(Object("1"));
    expect(mockTile).toEqual(mockTile);
  });
  it("should insert a new Tile", async () => {
    jest.spyOn(model, "create").mockImplementationOnce(() => Promise.resolve(mockTile));
    const newTile = await service.create(mockTile);
    expect(newTile).toEqual(mockTile);
  });
  it("should update a tile successfully", async () => {
    jest.spyOn(model, "findOneAndUpdate").mockReturnValueOnce(
      createMock<Query<any, any>>({
        exec: jest.fn().mockResolvedValueOnce(mockTile),
      }) as any,
    );
    const updatedTile = await service.update(Object("1"), mockTile);
    expect(updatedTile).toEqual(mockTile);
  });
  it("should delete a tile successfully", async () => {
    jest.spyOn(model, "remove").mockResolvedValueOnce(
      createMock<Query<any, any>>({
        exec: jest.fn().mockResolvedValueOnce(mockTile),
      }) as any,
    );
    const deleteTile = await service.remove(Object("1"), mockTile);
    expect(deleteTile).toEqual(false);
  });
});
