import { Test, TestingModule } from "@nestjs/testing";
import { DesignController } from "./design.controller";
import { DesignService } from "./design.service";
import { DesignDto } from "./dto/design.dto";
import { mockDesign } from "./design.testData";
import { JwtModule } from "@nestjs/jwt";
import * as UpLoadImg from "../utils/UploadImg";

describe("DesignController", () => {
  let controller: DesignController;
  const mockUploadImgToS3 = jest.spyOn(UpLoadImg, "upLoadImgTo3S");

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DesignController],
      imports: [JwtModule],
      providers: [
        {
          provide: DesignService,
          useValue: {
            find: jest.fn().mockImplementation(() => Promise.resolve([mockDesign])),
            create: jest.fn().mockImplementation((createDesignDto: DesignDto) =>
              Promise.resolve({
                _id: "1",
                ...createDesignDto,
              }),
            ),
            update: jest.fn().mockImplementation((_id: string, updateDesignDto: DesignDto) =>
              Promise.resolve({
                _id: "1",
                ...updateDesignDto,
              }),
            ),
            remove: jest.fn().mockResolvedValue({ isDeleted: true }),
          },
        },
      ],
    }).compile();

    controller = module.get<DesignController>(DesignController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  describe("find", () => {
    it("should get a design", () => {
      expect(controller.find("user123")).resolves.toEqual([mockDesign]);
    });
  });

  describe("create()", () => {
    it("should create a new design", async () => {
      controller.create(mockDesign);
      expect(mockUploadImgToS3).toBeCalled();
    });
  });

  describe("updateDesign", () => {
    it("should update a new Design", () => {
      controller.update(Object("1"), mockDesign);
      expect(mockUploadImgToS3).toBeCalled();
    });
  });

  describe("deleteDesign", () => {
    it("should return Design deleted successfully", () => {
      expect(controller.remove(Object("1"))).resolves.toEqual({ isDeleted: true });
    });
  });
});
