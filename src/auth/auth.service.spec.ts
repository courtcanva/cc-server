import { getModelToken } from "@nestjs/mongoose";
import { Test, TestingModule } from "@nestjs/testing";
import { Model, Query } from "mongoose";
import { AuthService } from "./auth.service";
import { User } from "../users/schemas/user.schema";
import { user, updatedUser, userArray } from "../users/user.testData";
import { createMock } from "@golevelup/ts-jest";
import { NotFoundException } from "@nestjs/common";
import { MailerModule } from "@nestjs-modules/mailer";
import { ConfigModule, ConfigService } from "@nestjs/config";

describe("AuthService", () => {
  let service: AuthService;
  let model: Model<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MailerModule.forRootAsync({
          imports: [ConfigModule],
          useFactory: async (config: ConfigService) => ({
            transport: {
              host: config.get("EMAIL_HOST"),
              secure: false,
              auth: {
                user: config.get("EMAIL_USER"),
                pass: config.get("EMAIL_PASSWORD"),
              },
            },
            defaults: {
              from: process.env.EMAIL_USER,
            },
          }),
          inject: [ConfigService],
        }),
        ConfigModule.forRoot({
          isGlobal: true,
        }),
      ],
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
