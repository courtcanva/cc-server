import { getModelToken } from "@nestjs/mongoose";
import { Model, Query } from "mongoose";
import { Test, TestingModule } from "@nestjs/testing";
import { createMock } from "@golevelup/ts-jest";
import { Design } from "./schemas/design.schema";
import { mockDesign, mockDesignArray } from "./design.testData";
import { DesignService } from "./design.service";

describe("DesignService", () => {
  let service: DesignService;
  let model: Model<Design>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DesignService,
        {
          provide: getModelToken(Design.name),
          useValue: {
            new: jest.fn().mockResolvedValue(mockDesign),
            constructor: jest.fn().mockResolvedValue(mockDesign),
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

    service = module.get(DesignService);
    model = module.get<Model<Design>>(getModelToken(Design.name));
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should return all design for one user", async () => {
    jest.spyOn(model, "find").mockReturnValueOnce(
      createMock<Query<any, any>>({
        exec: jest.fn().mockResolvedValueOnce(mockDesignArray),
      }) as any,
    );
    const design = await service.find("user123");
    expect(design).toEqual(mockDesignArray);
  });

  it("should insert a new user design", async () => {
    jest.spyOn(model, "create").mockImplementationOnce(() => Promise.resolve(mockDesign));
    const newDesign = await service.create(mockDesign);
    expect(newDesign).toEqual(mockDesign);
  });

  it("should update a user design successfully", async () => {
    const updateDesign = {
      ...mockDesign,
      designName: mockDesign.designName,
      tileColor: mockDesign.tileColor,
      courtSize: mockDesign.courtSize,
    };
    jest.spyOn(model, "findOneAndUpdate").mockReturnValueOnce(
      createMock<Query<any, any>>({
        exec: jest.fn().mockResolvedValueOnce(mockDesign),
      }) as any,
    );
    const updatedDesign = await service.update(Object("1"), updateDesign);
    expect(updatedDesign).toEqual(mockDesign);
  });

  it("should delete a user design successfully", async () => {
    jest.spyOn(model, "remove").mockResolvedValueOnce(
      createMock<Query<any, any>>({
        exec: jest.fn().mockResolvedValueOnce(mockDesign),
      }) as any,
    );
    const deleteDesign = await service.remove(Object("1"));
    expect(deleteDesign).toEqual(true);
  });
});
