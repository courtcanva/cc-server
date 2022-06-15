import { UpdateCatDto } from "./dto/update-cat.dto";
import { Test, TestingModule } from "@nestjs/testing";
import { CatsController } from "./cats.controller";
import { CreateCatDto } from "./dto/create-cat.dto";
import { CatsService } from "./cats.service";

describe("CatsController", () => {
  let controller: CatsController;
  let service: CatsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CatsController],
      providers: [
        {
          provide: CatsService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([
              {
                name: "Cat #1",
                breed: "Bread #1",
                age: 4,
                tag: ["test"],
              },
              {
                name: "Cat #2",
                breed: "Breed #2",
                age: 3,
                tag: ["test"],
              },
              {
                name: "Cat #3",
                breed: "Breed #3",
                age: 2,
                tag: ["test"],
              },
            ]),
            findOne: jest.fn().mockImplementation((id: string) =>
              Promise.resolve({
                _id: id,
                name: "Cat #1",
                breed: "Bread #1",
                age: 4,
                tag: ["test"],
              }),
            ),
            create: jest
              .fn()
              .mockImplementation((createCatDto: CreateCatDto) =>
                Promise.resolve({ _id: "1", ...createCatDto }),
              ),
            update: jest
              .fn()
              .mockImplementation((id: string, updateCatDto: UpdateCatDto) =>
                Promise.resolve({ _id: "1", ...updateCatDto }),
              ),
            remove: jest.fn().mockResolvedValue({ deleted: true }),
          },
        },
      ],
    }).compile();

    controller = module.get<CatsController>(CatsController);
    service = module.get<CatsService>(CatsService);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  describe("findAll()", () => {
    it("should get an array of cats", () => {
      expect(controller.findAll()).resolves.toEqual([
        {
          name: "Cat #1",
          breed: "Bread #1",
          age: 4,
          tag: ["test"],
        },
        {
          name: "Cat #2",
          breed: "Breed #2",
          age: 3,
          tag: ["test"],
        },
        {
          name: "Cat #3",
          breed: "Breed #3",
          age: 2,
          tag: ["test"],
        },
      ]);
    });
  });

  describe("findOne", () => {
    it("should get a single cat", () => {
      expect(controller.findOne("1")).resolves.toEqual({
        _id: "1",
        name: "Cat #1",
        breed: "Bread #1",
        age: 4,
        tag: ["test"],
      });
    });
  });

  describe("create()", () => {
    it("should create a new cat", async () => {
      const createCatDto: CreateCatDto = {
        name: "Cat #1",
        breed: "Breed #1",
        age: 4,
        tag: ["test"],
      };

      expect(controller.create(createCatDto)).resolves.toEqual({
        _id: "1",
        ...createCatDto,
      });
    });
  });
  describe("updateCat", () => {
    it("should update a new cat", () => {
      const updateCatDto: UpdateCatDto = {
        name: "Cat #2",
        breed: "Breed #1",
        age: 4,
        tag: ["test"],
      };
      expect(controller.update("1", updateCatDto)).resolves.toEqual({ _id: "1", ...updateCatDto });
    });
  });
  describe("deleteCat", () => {
    it("should return that it deleted a cat", () => {
      expect(controller.remove("a uuid that exists")).resolves.toEqual({
        deleted: true,
      });
    });
    it("should return that it did not delete a cat", () => {
      const deleteSpy = jest.spyOn(service, "remove").mockResolvedValueOnce({ deleted: false });
      expect(controller.remove("a uuid that does not exist")).resolves.toEqual({
        deleted: false,
      });
      expect(deleteSpy).toBeCalledWith("a uuid that does not exist");
    });
  });
});
