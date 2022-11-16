import { getModelToken } from "@nestjs/mongoose";
import { Test, TestingModule } from "@nestjs/testing";
import { Admin } from "src/admin/schemas/admin.schema";
import { DepositController } from "./deposit.controller";
import { DepositService } from "./deposit.service";

describe("DepositController", () => {
  let controller: DepositController;

  const mockDepositService = {
    findOne: jest.fn().mockImplementation(() => Promise.resolve({ depositRate: 0.02 })),
    update: jest.fn().mockImplementation(() => Promise.resolve({ depositRate: 0.01 })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DepositController],
      providers: [
        {
          provide: DepositService,
          useValue: mockDepositService,
        },
        {
          provide: getModelToken(Admin.name),
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<DepositController>(DepositController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  it("should return the deposit", async () => {
    expect(await controller.getDeopsit()).toEqual({ depositRate: 0.02 });
    expect(mockDepositService.findOne).toHaveBeenCalled();
  });

  it("should update and return the new deposit", async () => {
    expect(await controller.changeDeposit({ depositRate: 0.01 })).toEqual({ depositRate: 0.01 });
    expect(mockDepositService.update).toHaveBeenCalled();
  });
});
