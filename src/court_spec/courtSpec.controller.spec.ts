import { Test, TestingModule } from "@nestjs/testing";
import { UpdateCourtSpecDto } from "./dto/update-courtSpec.dto";
import { CreateCourtSpecDto } from "./dto/create-courtSpec.dto";
import { CourtSpecController } from "./courtSpec.controller";
import { CourtSpecService } from "./courtSpec.service";
import { court, updatedCourt } from "./courtSpec.testData";
import { PaginationQueryDto } from "src/common/dto/pagination-query.dto";
import { JwtSecretRequestType } from "@nestjs/jwt";

describe("CourtSpecController", () => {
  let controller: CourtSpecController;
  let service: CourtSpecService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [CourtSpecController],
      providers: [
        {
          provide: CourtSpecService,
          useValue: {
            getAllCourtSizes: jest.fn().mockResolvedValue([court]),
            getCourtSpecById: jest
              .fn()
              .mockImplementation((courtId: string) => Promise.resolve(court)),
            create: jest
              .fn()
              .mockImplementation((createCourtSpecDto: CreateCourtSpecDto) =>
                Promise.resolve({ name: "Court #1", ...createCourtSpecDto }),
              ),
            updateCourtSpecById: jest
              .fn()
              .mockImplementation((name: string, updateCourtSpecDto: UpdateCourtSpecDto) =>
                Promise.resolve({ name: "Court #1", ...updateCourtSpecDto }),
              ),
            removeCourtSpecById: jest.fn().mockResolvedValue({ deleted: true }),
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
      const paginationQuery = { limit: 10, offset: 0 };
      expect(controller.getAllCourtSizes(paginationQuery)).resolves.toEqual([court]);
    });

    it("should get a court by id", () => {
      expect(controller.getCourtSpecById(Object("62ad9efe1bc0ca4561d9ca45"))).resolves.toEqual(
        court,
      );
    });

    it("should insert a court", () => {
      expect(controller.create(court)).resolves.toEqual(court);
    });

    it("should update a court", () => {
      expect(controller.update(Object("62ad9efe1bc0ca4561d9ca45"), updatedCourt)).resolves.toEqual(
        updatedCourt,
      );
    });

    it("should delete a court", () => {
      jest.spyOn(service, "removeCourtSpecById").mockResolvedValueOnce(true);
      expect(controller.remove(Object("62ad9efe1bc0ca4561d9ca45"))).resolves.toEqual(true);
    });
  });
});
