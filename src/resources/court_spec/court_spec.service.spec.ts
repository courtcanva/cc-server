import { getModelToken } from "@nestjs/mongoose";
import { Test, TestingModule } from "@nestjs/testing";
import { CourtSpecService } from "./court_spec.service";
import { CourtSpec } from "./schemas/court_spec.schema";
import { createMock } from "@golevelup/ts-jest";
import { Model, Query } from "mongoose";
import { CreateCourtSpecDto } from "./dto/create-court_spec.dto";
import { BadRequestException } from "@nestjs/common";

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
  id: 1,
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
    id: 1,
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
    const courts = await service.getCourtSpecById("1");
    expect(courts).toEqual(courtArray[0]);
  });

  it("should insert a new court", async () => {
    jest.spyOn(model, "create").mockImplementationOnce(() => court);
    const newCourt = await service.create(court);
    expect(newCourt).toEqual(court);
  });

  // it.only("should update a court successfully", async () => {
  //   // const throwException = jest
  //   //   .spyOn(model, "findById")
  //   //   .mockRejectedValueOnce(new BadRequestException({ status: 400, message: "court not found!" }));
  //   // await throwException;
  //   jest.spyOn(model, "findByIdAndUpdate").mockReturnValueOnce(
  //     createMock<Query<any, any>>({
  //       exec: jest.fn().mockResolvedValueOnce(updatedCourt),
  //     }) as any,
  //   );
  //   try {
  //     await service.updateCourtSpecById("3", updatedCourt);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // });

  // it("should delete a court successfully", async () => {
  //   const mockDeletedCourt = {
  //     id: 1,
  //     name: "Court #1",
  //     length: 10000,
  //     width: 2000,
  //     centreCircleRadius: 1800,
  //     threePointRadius: 6000,
  //     threePointLine: 2300,
  //     lengthOfCorner: 2000,
  //     restrictedAreaLength: 2000,
  //     restrictedAreaWidth: 2000,
  //     sideBorderWidth: 2000,
  //     lineBorderWidth: 50,
  //     description: "Court #1",
  //     isDeleted: true,
  //   };
  //   jest.spyOn(model, "findByIdAndUpdate").mockResolvedValueOnce(() => mockDeletedCourt);

  //   const removeSuccessMsg = { message: "Court  deleted successfully" };
  //   expect(await service.removeCourtSpecById("1")).toEqual(removeSuccessMsg);
  // });
});
