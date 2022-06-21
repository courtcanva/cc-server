import { Test, TestingModule } from "@nestjs/testing";
import { UpdateCourtSpecDto } from "./dto/update-court_spec.dto";
import { CreateCourtSpecDto } from "./dto/create-court_spec.dto";
import { CourtSpecController } from "./court_spec.controller";
import { CourtSpecService } from "./court_spec.service";

describe("CourtSpecController", () => {
  let controller: CourtSpecController;
  let service: CourtSpecService;

  const courtArray = [
    {
      id: 1,
      name: "Court #1",
      length: 10000,
      width: 2000,
      centreCircleRadius: 1800,
      threePointRadius: 6000,
      threePointLine: 2300,
      lengthOfCorner: 2000,
      restrictedAreaLength: 2000,
      restrictedAreaWidth: 2000,
      sideBorderWidth: 2000,
      lineBorderWidth: 50,
      description: "Court #1",
    },
    {
      id: 2,
      name: "Court #2",
      length: 10000,
      width: 2000,
      centreCircleRadius: 1800,
      threePointRadius: 6000,
      threePointLine: 2300,
      lengthOfCorner: 2000,
      restrictedAreaLength: 2000,
      restrictedAreaWidth: 2000,
      sideBorderWidth: 2000,
      lineBorderWidth: 50,
      description: "Court #2",
    },
  ];
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CourtSpecController],
      providers: [
        {
          provide: CourtSpecService,
          useValue: {
            getAllCourtSizes: jest.fn().mockResolvedValue(courtArray),
            getCourtSpecById: jest
              .fn()
              .mockImplementation((courtId: string) => Promise.resolve(courtArray[0])),
            create: jest
              .fn()
              .mockImplementation((createCourtSpecDto: CreateCourtSpecDto) =>
                Promise.resolve({ name: "Court #1", ...createCourtSpecDto }),
              ),
            update: jest
              .fn()
              .mockImplementation((name: string, updateCourtSpecDto: UpdateCourtSpecDto) =>
                Promise.resolve({ name: "Court #1", ...updateCourtSpecDto }),
              ),
            remove: jest.fn().mockResolvedValue({ deleted: true }),
          },
        },
      ],
    }).compile();

    controller = module.get<CourtSpecController>(CourtSpecController);
    service = module.get<CourtSpecService>(CourtSpecService);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  describe("getAllCourtSizes", () => {
    it("should get an array of courts", () => {
      expect(controller.getAllCourtSizes()).resolves.toEqual(courtArray);
    });
  });

  describe("getCourtSpecById", () => {
    it("should get a single court", () => {
      expect(controller.getCourtSpecById("1")).resolves.toEqual(courtArray[0]);
    });
  });

  describe("create()", () => {
    it("should create a new court spec", async () => {
      expect(controller.create(courtArray[0])).resolves.toEqual({
        _id: "1",
        ...courtArray[0],
      });
    });
  });
  describe("updateCourt", () => {
    it("should update a court", () => {
      expect(controller.update("Court #2", courtArray[1])).resolves.toEqual({
        _id: "2",
        ...courtArray[1],
      });
    });
  });
  describe("deleteCourt", () => {
    it("should return that it deleted a court", () => {
      expect(controller.remove("a uuid that exists")).resolves.toEqual({
        deleted: true,
      });
    });
    it("should return that it did not delete a court", () => {
      const deleteSpy = jest
        .spyOn(service, "removeCourtSpecById")
        .mockResolvedValueOnce({ message: "Court  deleted successfully" });
      expect(controller.remove("a uuid that does not exist")).resolves.toEqual({
        message: "Court  deleted successfully",
      });
      expect(deleteSpy).toBeCalledWith("a uuid that does not exist");
    });
  });
});
