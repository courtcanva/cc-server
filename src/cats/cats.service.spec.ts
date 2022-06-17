import { getModelToken } from "@nestjs/mongoose";
import { Test, TestingModule } from "@nestjs/testing";
import { CatsService } from "./cats.service";
import { Cat } from "./schemas/cat.schema";
import { createMock } from "@golevelup/ts-jest";
import { Model, Query } from "mongoose";

const mockCat = {
  name: "Cat #1",
  breed: "Breed #1",
  age: 4,
  tag: ["test"],
};

const catsArray = [
  {
    name: "Cat #1",
    breed: "Breed #1",
    age: 4,
    tag: ["test"],
  },
  {
    name: "Cat #2",
    breed: "Breed #2",
    age: 2,
    tag: ["test"],
  },
];

describe("CatService", () => {
  let service: CatsService;
  let model: Model<Cat>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CatsService,
        {
          provide: getModelToken(Cat.name),
          useValue: {
            new: jest.fn().mockResolvedValue(mockCat),
            constructor: jest.fn().mockResolvedValue(mockCat),
            find: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            findOneAndUpdate: jest.fn(),
            remove: jest.fn(),
            save: jest.fn(),
            exec: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get(CatsService);
    model = module.get<Model<Cat>>(getModelToken(Cat.name));
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should return all cats", async () => {
    jest.spyOn(model, "find").mockReturnValueOnce({
      exec: jest.fn().mockResolvedValueOnce(catsArray),
    } as any);
    const cats = await service.findAll();
    expect(cats).toEqual(catsArray);
  });

  it("should get one cat by id", async () => {
    jest.spyOn(model, "findOne").mockReturnValueOnce(
      createMock<Query<any, any>>({
        exec: jest.fn().mockResolvedValueOnce(mockCat),
      }) as any,
    );
    const cats = await service.findOne("1");
    expect(cats).toEqual(mockCat);
  });

  it("should insert a new cat", async () => {
    jest.spyOn(model, "create").mockImplementationOnce(() => Promise.resolve(mockCat));
    const newCat = await service.create(mockCat);
    expect(newCat).toEqual(mockCat);
  });
  it("should update a cat successfully", async () => {
    jest.spyOn(model, "findOneAndUpdate").mockReturnValueOnce(
      createMock<Query<any, any>>({
        exec: jest.fn().mockResolvedValueOnce(mockCat),
      }) as any,
    );
    const updatedCat = await service.update("1", mockCat);
    expect(updatedCat).toEqual(mockCat);
  });

  it("should delete a cat successfully", async () => {
    jest.spyOn(model, "remove").mockResolvedValueOnce(true as any);
    expect(await service.remove("1")).toEqual({ deleted: true });
  });
  it("should not delete a cat", async () => {
    jest.spyOn(model, "remove").mockRejectedValueOnce(new Error("Bad delete"));
    expect(await service.remove("1")).toEqual({
      deleted: false,
      message: "Bad delete",
    });
  });
});
