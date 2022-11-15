import { createMock } from "@golevelup/ts-jest";
import { getModelToken } from "@nestjs/mongoose";
import { Test, TestingModule } from "@nestjs/testing";
import { Connection, Model, Query } from "mongoose";
import { DepositService } from "./deposit.service";
import { Deposit } from "./schemas/deposit.schema";

describe("DepositService", () => {
  let service: DepositService;
  let model: Model<Deposit>;

  const mockDepositModel = {
    findOne: jest.fn().mockReturnValueOnce(
      createMock<Query<any, any>>({
        exec: jest.fn().mockResolvedValueOnce({ depositRatio: 0.2 }),
      }) as any,
    ),
    findOneAndUpdate: jest.fn().mockReturnValueOnce(
      createMock<Query<any, any>>({
        exec: jest.fn().mockResolvedValueOnce({ depositRatio: 0.2 }),
      }) as any,
    ),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DepositService,
        { provide: Connection, useValue: {} },
        {
          provide: getModelToken(Deposit.name),
          useValue: mockDepositModel,
        },
      ],
    }).compile();

    service = module.get<DepositService>(DepositService);
    model = module.get<Model<Deposit>>(getModelToken(Deposit.name));
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should return deposit", async () => {
    const findOneSpy: jest.SpyInstance = jest.spyOn(model, "findOneAndUpdate");
    const deposit: Deposit = await service.update({ depositRatio: 0.2 });
    expect(findOneSpy).toHaveBeenCalled();
    expect(deposit).toEqual({ depositRatio: 0.2 });
  });

  it("should return new deposit", async () => {
    const updateSpy: jest.SpyInstance = jest.spyOn(model, "findOne");
    const deposit: Deposit = await service.findOne();
    expect(updateSpy).toHaveBeenCalled();
    expect(deposit).toEqual({ depositRatio: 0.2 });
  });
});
