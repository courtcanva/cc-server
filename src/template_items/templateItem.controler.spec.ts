import { Test, TestingModule } from "@nestjs/testing";
import { TemplateItemController } from "./templateItem.controller";
import { TemplateItemService } from "./templateItem.service";
import { mockTemplateItem } from "./templateItem.testData";
import { GetAllTemplatesDto } from "./dto/getAllTemplate.dto";
import { TemplateItemDto } from "./dto/template.dto";
import { UpdateTemplateDto } from "./dto/updateTemplate.dto";
import { PaginationQueryDto } from "src/utils/PaginationDto/pagination-query.dto";

describe("TemplateItemController", () => {
  let controller: TemplateItemController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TemplateItemController],
      providers: [
        {
          provide: TemplateItemService,
          useValue: {
            getAllTemplates: jest
              .fn()
              .mockImplementation(() => Promise.resolve([mockTemplateItem])),
            findOne: jest.fn().mockImplementation(() => Promise.resolve(mockTemplateItem)),
            create: jest
              .fn()
              .mockImplementation((createTemplateDto: TemplateItemDto) =>
                Promise.resolve({ _id: "1", ...createTemplateDto }),
              ),
            update: jest
              .fn()
              .mockImplementation((_id: string, updateTemplateDto: UpdateTemplateDto) =>
                Promise.resolve({ _id: "1", ...updateTemplateDto }),
              ),
            remove: jest.fn().mockResolvedValue({ isDeleted: true }),
          },
        },
      ],
    }).compile();

    controller = module.get<TemplateItemController>(TemplateItemController);
  });
  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  describe("getAllTemplates", () => {
    it("should get all template items in a given user id with pagination", () => {
      const user_id = "123456";
      const getAllTemplatesDto: GetAllTemplatesDto & PaginationQueryDto = {
        user_id: user_id,
        limit: 3,
        offset: 2,
        filterTag: "ProFullCourt",
      };
      expect(controller.getAllTemplates(getAllTemplatesDto)).resolves.toEqual([mockTemplateItem]);
    });
  });

  describe("getTemplateById", () => {
    it("should get a template item in a given objectId", () => {
      expect(controller.findOne(Object("1"))).resolves.toEqual(mockTemplateItem);
    });
  });

  describe("create()", () => {
    it("should create a new cart item", async () => {
      const createTemplateDto: TemplateItemDto = {
        ...mockTemplateItem,
        image: "url123456",
        description: "small family first choice",
        tags: {
          CourtCategory: "full pro court",
          CourtType: "tennis",
        },
      };

      expect(controller.create(createTemplateDto)).resolves.toEqual({
        _id: "1",
        ...createTemplateDto,
      });
    });
  });

  describe("update template item", () => {
    it("should update a template item", () => {
      const updateTemplateDto: UpdateTemplateDto = {
        ...mockTemplateItem,
        isOfficial: true,
        status: "punished",
      };
      expect(controller.update(Object("1"), updateTemplateDto)).resolves.toEqual({
        _id: "1",
        ...updateTemplateDto,
      });
    });
  });

  describe("delete a template item", () => {
    it("should return a template item deleted successfully", () => {
      expect(controller.remove(Object("1"))).resolves.toEqual({ isDeleted: true });
    });
  });
});
