import { getModelToken } from "@nestjs/mongoose";
import { Test, TestingModule } from "@nestjs/testing";
import { Admin } from "src/admin/schemas/admin.schema";
import { ExpireDayController } from "./expireDay.controller";
import { ExpireDayService } from "./expireDay.service";

describe("ExpireDayController", () => {
  let controller: ExpireDayController;

  const mockExpireDayService = {
    findOne: jest.fn().mockImplementation(() => Promise.resolve({ expireDays: 7 })),
    update: jest.fn().mockImplementation(() => Promise.resolve({ expireDays: 3 })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExpireDayController],
      providers: [
        {
          provide: ExpireDayService,
          useValue: mockExpireDayService,
        },
        {
          provide: getModelToken(Admin.name),
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<ExpireDayController>(ExpireDayController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  it("should return the expireDay", async () => {
    expect(await controller.getExpireDay()).toEqual({ expireDays: 7 });
    expect(mockExpireDayService.findOne).toHaveBeenCalled();
  });

  it("should update and return the new expireDay", async () => {
    expect(await controller.changeExpireDay({ expireDays: 3 })).toEqual({ expireDays: 3 });
    expect(mockExpireDayService.update).toHaveBeenCalled();
  });
});
