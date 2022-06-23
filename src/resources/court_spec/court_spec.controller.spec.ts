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

  describe("CourtSpecController", () => {
    it("should get an array of courts", () => {
      expect(controller.getAllCourtSizes()).resolves.toEqual(courtArray);
    });
  });
});
