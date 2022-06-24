import { getModelToken } from "@nestjs/mongoose";
import { Test, TestingModule } from "@nestjs/testing";
import { CourtSpecService } from "./courtSpec.service";
import { CourtSpec } from "./schemas/courtSpec.schema";
import { createMock } from "@golevelup/ts-jest";
import { model, Model, Query } from "mongoose";
import { CreateCourtSpecDto } from "./dto/create-courtSpec.dto";

const court: CreateCourtSpecDto = {
  name: "Court #1",
  length: 10000,
  width: 2000,
  centreCircleRadius: 1800,
  threePointRadius: 6000,
  threePointLine: 2300,
  lengthOfCorner: 2000,
  restrictedAreaLength: 2000,
  restrictedAreaWidth: 2000,
  sideBorderWidth: 2000,
  lineBorderWidth: 50,
  description: "Court #1",
  createdAt: undefined,
  updatedAt: undefined,
};

const updatedCourt = {
  id: Object("62ad9efe1bc0ca4561d9ca45"),
  name: "Court #1",
  length: 10000,
  width: 2000,
  centreCircleRadius: 1800,
  threePointRadius: 6000,
  threePointLine: 2300,
  lengthOfCorner: 2000,
  restrictedAreaLength: 2000,
  restrictedAreaWidth: 2000,
  sideBorderWidth: 2000,
  lineBorderWidth: 50,
  description: "Court #1",
  createdAt: undefined,
  updatedAt: new Date(),
};

const courtArray = [
  {
    id: "62ad9efe1bc0ca4561d9ca45",
    name: "Court #1",
    length: 10000,
    width: 2000,
    centreCircleRadius: 1800,
    threePointRadius: 6000,
    threePointLine: 2300,
    lengthOfCorner: 2000,
    restrictedAreaLength: 2000,
    restrictedAreaWidth: 2000,
    sideBorderWidth: 2000,
    lineBorderWidth: 50,
    description: "Court #1",
  },
  {
    id: 2,
    name: "Court #2",
    length: 10000,
    width: 2000,
    centreCircleRadius: 1800,
    threePointRadius: 6000,
    threePointLine: 2300,
    lengthOfCorner: 2000,
    restrictedAreaLength: 2000,
    restrictedAreaWidth: 2000,
    sideBorderWidth: 2000,
    lineBorderWidth: 50,
    description: "Court #2",
  },
];

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
});
