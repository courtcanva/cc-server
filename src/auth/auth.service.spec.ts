import { getModelToken } from "@nestjs/mongoose";
import { Test, TestingModule } from "@nestjs/testing";
import { Model } from "mongoose";
import { AuthService } from "./auth.service";
import { User } from "../users/schemas/user.schema";

describe("AuthService", () => {
  let service: AuthService;
  let model: Model<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: getModelToken(User.name),
          useValue: {
            find: jest.fn(),
            findById: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            findByIdAndUpdate: jest.fn(),
            exec: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get(AuthService);
    model = module.get<Model<User>>(getModelToken(User.name));
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
