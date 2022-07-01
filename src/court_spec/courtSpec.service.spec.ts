import { getModelToken } from "@nestjs/mongoose";
import { Test, TestingModule } from "@nestjs/testing";
import { CourtSpecService } from "./courtSpec.service";
import { CourtSpec } from "./schemas/courtSpec.schema";
import { createMock } from "@golevelup/ts-jest";
import { model, Model, Query } from "mongoose";
import { CreateCourtSpecDto } from "./dto/create-courtSpec.dto";
import { NotFoundException } from "@nestjs/common";
import { court, updatedCourt, courtArray } from "./courtSpec.testData";

describe("CourtSpecService", () => {
  let service: CourtSpecService;
  let model: Model<CourtSpec>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CourtSpecService,
        {
          provide: getModelToken(CourtSpec.name),
          useValue: {
            find: jest.fn(),
            findById: jest.fn(),
            create: jest.fn(),
            findByIdAndUpdate: jest.fn(),
            exec: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get(CourtSpecService);
    model = module.get<Model<CourtSpec>>(getModelToken(CourtSpec.name));
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should return all courts", async () => {
    jest.spyOn(model, "find").mockReturnValueOnce({
      exec: jest.fn().mockResolvedValueOnce(courtArray),
    } as any);
    const courts = await service.getAllCourtSizes();
    expect(courts).toEqual(courtArray);
  });

  it("should get one court by id", async () => {
    jest.spyOn(model, "findById").mockReturnValueOnce(
      createMock<Query<any, any>>({
        exec: jest.fn().mockResolvedValueOnce(courtArray[0]),
      }) as any,
    );
    const courts = await service.getCourtSpecById(Object("62ad9efe1bc0ca4561d9ca45"));
    expect(courts).toEqual(courtArray[0]);
  });

  it("should insert a new court", async () => {
    jest.spyOn(model, "create").mockImplementationOnce(() => court);
    const newCourt = await service.create(court);
    expect(newCourt).toEqual(court);
  });

  it("should update a new court", async () => {
    jest.spyOn(model, "findById").mockReturnValueOnce(
      createMock<Query<any, any>>({
        exec: jest.fn().mockResolvedValueOnce(updatedCourt),
      }) as any,
    );
    jest.spyOn(model, "findByIdAndUpdate").mockReturnValueOnce(
      createMock<Query<any, any>>({
        exec: jest.fn().mockResolvedValueOnce(updatedCourt),
      }) as any,
    );
    const court = await service.updateCourtSpecById(Object("62ad9efe1bc0ca4561d9ca45"), {
      ...updatedCourt,
      updatedAt: new Date(),
    });
    expect(court).toEqual(updatedCourt);
  });

  it("can't find the court and fail update", async () => {
    jest.spyOn(model, "findById").mockReturnValueOnce(
      createMock<Query<any, any>>({
        exec: jest.fn().mockResolvedValueOnce(null),
      }) as any,
    );
    jest.fn().mockRejectedValueOnce("court not found");
    try {
      await service.getCourtSpecById(Object("62ad9efe1bc0ca4561d9ca45"));
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException);
      expect(error.message).toBe("court not found");
    }
  });

  it("should delete a court", async () => {
    jest.spyOn(model, "findById").mockReturnValueOnce(
      createMock<Query<any, any>>({
        exec: jest.fn().mockResolvedValueOnce(true),
      }) as any,
    );
    jest.spyOn(model, "findByIdAndUpdate").mockReturnValueOnce(
      createMock<Query<any, any>>({
        exec: jest.fn().mockResolvedValueOnce(updatedCourt),
      }) as any,
    );
    expect(await service.removeCourtSpecById(Object("62ad9efe1bc0ca4561d9ca45"))).toEqual(true);
  });
});
