import { Test, TestingModule } from "@nestjs/testing";
import { user } from "../user/user.testData";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

describe("AuthController", () => {
  let controller: AuthController;
  // Initialize the testing module
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            googleLogin: jest.fn().mockResolvedValue(user),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  describe("AuthController", () => {
    it("should get a user object", () => {
      expect(controller.googleLogin("testCode")).resolves.toEqual(user);
    });
  });
});
