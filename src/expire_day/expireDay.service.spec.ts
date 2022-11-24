import { createMock } from "@golevelup/ts-jest";
import { getModelToken } from "@nestjs/mongoose";
import { Test, TestingModule } from "@nestjs/testing";
import { Connection, Model, Query } from "mongoose";
import { ExpireDayService } from "./expireDay.service";
import { ExpireDay } from "./schemas/expireDay.schema";

describe("ExpireDayService", () => {
  let service: ExpireDayService;
  let model: Model<ExpireDay>;

  const mockExpireDayModel = {
    findOne: jest.fn().mockReturnValueOnce(
      createMock<Query<any, any>>({
        exec: jest.fn().mockResolvedValueOnce({ expireDays: 7 }),
      }) as any,
    ),
    findOneAndUpdate: jest.fn().mockReturnValueOnce(
      createMock<Query<any, any>>({
        exec: jest.fn().mockResolvedValueOnce({ expireDays: 7 }),
      }) as any,
    ),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ExpireDayService,
        { provide: Connection, useValue: {} },
        {
          provide: getModelToken(ExpireDay.name),
          useValue: mockExpireDayModel,
        },
      ],
    }).compile();

    service = module.get<ExpireDayService>(ExpireDayService);
    model = module.get<Model<ExpireDay>>(getModelToken(ExpireDay.name));
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should return expireDay", async () => {
    const findOneSpy: jest.SpyInstance = jest.spyOn(model, "findOneAndUpdate");
    const expireDay: ExpireDay = await service.update({ expireDays: 7 });
    expect(findOneSpy).toHaveBeenCalled();
    expect(expireDay).toEqual({ expireDays: 7 });
  });

  it("should return new expireDay", async () => {
    const updateSpy: jest.SpyInstance = jest.spyOn(model, "findOne");
    const expireDay: ExpireDay = await service.findOne();
    expect(updateSpy).toHaveBeenCalled();
    expect(expireDay).toEqual({ expireDays: 7 });
  });
});
