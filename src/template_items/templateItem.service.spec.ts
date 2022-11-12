import { Test, TestingModule } from "@nestjs/testing";
import { Connection, Model, Query } from "mongoose";
import { TemplateItemService } from "./templateItem.service";
import { createMock } from "@golevelup/ts-jest";
import { TemplateItem } from "./schemas/template.schema";
import { getModelToken } from "@nestjs/mongoose";
import {
  mockTemplateItem,
  mockTemplateItemArray,
  mockNewTemplateItem,
  mockTemplateItemInDatabase,
  mockTemplateItemObj,
} from "./templateItem.testData";
import { User } from "src/users/schemas/user.schema";

describe("TemplateItemService", () => {
  let service: TemplateItemService;
  let model: Model<TemplateItem>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TemplateItemService,
        { provide: Connection, useValue: {} },
        {
          provide: getModelToken(TemplateItem.name),
          useValue: {
            new: jest.fn().mockResolvedValue(mockTemplateItem),
            constructor: jest.fn().mockResolvedValue(mockTemplateItem),
            getAllTemplates: jest.fn(),
            find: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            findOneAndUpdate: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
        {
          provide: getModelToken(User.name),
          useValue: {
            find: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<TemplateItemService>(TemplateItemService);
    model = module.get<Model<TemplateItem>>(getModelToken(TemplateItem.name));
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should return template items in one userId, within given pagination", async () => {
    jest.spyOn(model, "find").mockReturnValue({
      sort: jest.fn().mockReturnValue({
        skip: jest.fn().mockReturnValue({
          limit: jest.fn().mockReturnValue({
            exec: jest.fn().mockResolvedValueOnce(mockTemplateItemArray),
          }),
        }),
      }),
    } as any);

    const user_id = "123456";

    const templates = await service.getAllTemplates({
      user_id,
      limit: 5,
      offset: 0,
      filterTag: "ProFullCourt",
    });
    expect(templates).toEqual(mockTemplateItemArray);
  });

  it("should return a template Items in given Object ID", async () => {
    jest.spyOn(model, "findOne").mockReturnValue(
      createMock<Query<any, any>>({
        exec: jest.fn().mockResolvedValueOnce(mockTemplateItem),
      }) as any,
    );
    const id = Object("6321e2b4d65d0ab88eaefb13");
    const expectedTemplateItem = mockTemplateItem;

    const templateItem = await service.findOne(id);
    expect(templateItem).toEqual(expectedTemplateItem);
  });

  it("should return a template item created", async () => {
    jest.spyOn(model, "create").mockImplementationOnce(() => Promise.resolve(mockTemplateItem));
    expect(await service.create(mockNewTemplateItem)).toEqual(mockTemplateItem);
  });

  it("should update a template item", async () => {
    const updateTemplateItem = {
      ...mockTemplateItem,
      isOfficial: true,
      status: "published",
    };
    jest.spyOn(model, "findOneAndUpdate").mockReturnValueOnce(
      createMock<Query<any, any>>({
        exec: jest.fn().mockResolvedValueOnce(mockTemplateItem),
      }) as any,
    );
    const updatedTemplateItem = await service.update(Object("1"), updateTemplateItem);
    expect(updatedTemplateItem).toEqual(updatedTemplateItem);
  });

  it("should delete a template item", async () => {
    jest.spyOn(model, "findOneAndUpdate").mockReturnValueOnce(
      createMock<Query<any, any>>({
        exec: jest.fn().mockResolvedValueOnce(mockTemplateItemInDatabase),
      }) as any,
    );
    expect(await service.remove(Object("6320bd57f3dee2ee6deeecf2"))).toEqual(true);
  });
});
