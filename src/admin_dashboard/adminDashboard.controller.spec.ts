import { Test, TestingModule } from "@nestjs/testing";
import { AdminDashboardController } from "./adminDashboard.controller";
import { AdminDashboardService } from "./adminDashboard.service";

describe("AdminDashboardController", () => {
  let controller: AdminDashboardController;

  const mockAdminDashboardService = {
    getDashboardData: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminDashboardController],
      providers: [
        {
          provide: AdminDashboardService,
          useValue: mockAdminDashboardService,
        },
      ],
    }).compile();

    controller = module.get<AdminDashboardController>(AdminDashboardController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  it("should call corresponding method in the service", async () => {
    await controller.getDashboardData();
    expect(mockAdminDashboardService.getDashboardData).toHaveBeenCalled();
  });
});
