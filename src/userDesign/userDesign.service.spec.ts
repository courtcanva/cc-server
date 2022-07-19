import { getModelToken } from "@nestjs/mongoose";
import { Model, Query } from "mongoose";
import { Test, TestingModule } from "@nestjs/testing";
import { createMock } from "@golevelup/ts-jest";
import { UserDesign } from "./schemas/userDesign.schema";
import { mockDesign } from "./userDesign.testData";
import { UserDesignService } from "./userDesign.service";

describe("UserDesignService", () => {
  let service: UserDesignService;
  let model: Model<UserDesign>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserDesignService,
        {
          provide: getModelToken(UserDesign.name),
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

    service = module.get(UserDesignService);
    model = module.get<Model<UserDesign>>(getModelToken(UserDesign.name));
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should return all design for one user", async () => {
    jest.spyOn(model, "find").mockReturnValueOnce({
      exec: jest.fn().mockResolvedValueOnce([mockDesign]),
    } as any);
    const userDesign = await service.findAll("user123");
    expect(userDesign).toEqual([mockDesign]);
  });

  it("should get one user design by design id", async () => {
    jest.spyOn(model, "findOne").mockReturnValueOnce(
      createMock<Query<any, any>>({
        exec: jest.fn().mockResolvedValueOnce(mockDesign),
      }) as any,
    );
    const userDesign = await service.findOne({ user_id: "user123", design_name: "CourtCanvas1" });
    expect(userDesign).toEqual(mockDesign);
  });

  it("should insert a new user design", async () => {
    jest.spyOn(model, "create").mockImplementationOnce(() => Promise.resolve(mockDesign));
    const newUserDesign = await service.create(mockDesign);
    expect(newUserDesign).toEqual(mockDesign);
  });

  it("should update a user design successfully", async () => {
    jest.spyOn(model, "findOneAndUpdate").mockReturnValueOnce(
      createMock<Query<any, any>>({
        exec: jest.fn().mockResolvedValueOnce(mockDesign),
      }) as any,
    );
    const updateUserDesign = {
      ...mockDesign,
      design_id: mockDesign.design_id,
      tileColor: mockDesign.tileColor,
      courtSize: mockDesign.courtSize,
    };
    const updatedUserDesign = await service.update(
      { user_id: "user123", design_name: "CourtCanvas1" },
      updateUserDesign,
    );
    expect(updatedUserDesign).toEqual(mockDesign);
  });

  it("should delete a user design successfully", async () => {
    jest.spyOn(model, "remove").mockResolvedValueOnce(
      createMock<Query<any, any>>({
        exec: jest.fn().mockResolvedValueOnce(mockDesign),
      }) as any,
    );
    const deleteUserDesign = await service.remove({
      user_id: "user123",
      design_name: "CourtCanvas1",
    });
    expect(deleteUserDesign).toEqual(true);
  });
});
