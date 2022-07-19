import { Test, TestingModule } from "@nestjs/testing";
import { UserDesignController } from "./userDesign.controller";
import { UserDesignService } from "./userDesign.service";
import { UserDesignDto } from "./dto/userDesign.dto";
import { mockDesign } from "./userDesign.testData";

describe("UserDesignController", () => {
  let controller: UserDesignController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserDesignController],
      providers: [
        {
          provide: UserDesignService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([mockDesign]),
            findOne: jest.fn().mockImplementation(() => Promise.resolve(mockDesign)),
            create: jest.fn().mockImplementation((createUserDesignDto: UserDesignDto) =>
              Promise.resolve({
                _id: "1",
                ...createUserDesignDto,
              }),
            ),
            update: jest.fn().mockImplementation(() => Promise.resolve(mockDesign)),
            remove: jest.fn().mockResolvedValue({ isDeleted: true }),
          },
        },
      ],
    }).compile();

    controller = module.get<UserDesignController>(UserDesignController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  describe("findAll()", () => {
    it("should get all of userDesign", () => {
      expect(controller.findAll("user123")).resolves.toEqual([mockDesign]);
    });
  });

  describe("findOne", () => {
    it("should get a userDesign", () => {
      expect(
        controller.findOne({ user_id: "user123", design_name: "CourtCanvas1" }),
      ).resolves.toEqual(mockDesign);
    });
  });

  describe("create()", () => {
    it("should create a new userDesign", async () => {
      const createUserDesignDto: UserDesignDto = mockDesign;

      expect(controller.create(createUserDesignDto)).resolves.toEqual({
        _id: "1",
        ...createUserDesignDto,
      });
    });
  });

  describe("updateUserDesign", () => {
    it("should update a new UserDesign", () => {
      const UserDesignDto: UserDesignDto = mockDesign;
      const updateUserDesign = {
        ...UserDesignDto,
        design_id: UserDesignDto.design_id,
        tileColor: UserDesignDto.tileColor,
        courtSize: UserDesignDto.courtSize,
      };
      expect(
        controller.update({ user_id: "user123", design_name: "CourtCanvas1" }, updateUserDesign),
      ).resolves.toEqual({
        ...updateUserDesign,
      });
    });
  });

  describe("deleteUserDesign", () => {
    it("should return UserDesign deleted successfully", () => {
      expect(
        controller.remove({ user_id: "user123", design_name: "CourtCanvas1" }),
      ).resolves.toEqual({ isDeleted: true });
    });
  });
});
