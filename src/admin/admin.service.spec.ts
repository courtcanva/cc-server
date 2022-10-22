import { Test, TestingModule } from "@nestjs/testing";
import { Connection, Model, Query } from "mongoose";
import { AdminService } from "./admin.service";
import { createMock } from "@golevelup/ts-jest";
import { Admin } from "./schemas/admin.schema";
import { getModelToken } from "@nestjs/mongoose";
import { mockAdminData } from "./admin.testData";
import { JwtService } from "@nestjs/jwt";

describe("AdminService", () => {
  let service: AdminService;
  let model: Model<Admin>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JwtService,
        AdminService,
        { provide: Connection, useValue: {} },
        {
          provide: getModelToken(Admin.name),
          useValue: {
            new: jest.fn().mockResolvedValue(mockAdminData),
            constructor: jest.fn().mockResolvedValue(mockAdminData),
            findAll: jest.fn(),
            findOne: jest.fn(),
            find: jest.fn(),
            create: jest.fn(),
            findById: jest.fn(),
            findByIdAndUpdate: jest.fn(),
            findOneAndUpdate: jest.fn(),
            remove: jest.fn(),
            sort: jest.fn(),
            skip: jest.fn(),
            limit: jest.fn(),
            save: jest.fn(),
            exec: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AdminService>(AdminService);
    model = module.get<Model<Admin>>(getModelToken(Admin.name));
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should return all admin within given pagination", async () => {
    jest.spyOn(model, "find").mockReturnValue({
      sort: jest.fn().mockReturnValue({
        skip: jest.fn().mockReturnValue({
          limit: jest.fn().mockReturnValue({
            exec: jest.fn().mockResolvedValueOnce(mockAdminData),
          }),
        }),
      }),
    } as any);
    expect(await service.findAll({ limit: 3, offset: 1 })).toEqual(mockAdminData);
  });

  it("should return an admin by given ID", async () => {
    jest.spyOn(model, "findById").mockReturnValueOnce(
      createMock<Query<any, any>>({
        exec: jest.fn().mockResolvedValueOnce(mockAdminData[0]),
      }) as any,
    );
    const Admin = await service.findOne(Object("634818ff801e2c3713056222"));
    expect(Admin).toEqual(mockAdminData[0]);
  });

  it("should update an Admin", async () => {
    jest.spyOn(model, "findById").mockReturnValueOnce(
      createMock<Query<any, any>>({
        exec: jest.fn().mockResolvedValueOnce(mockAdminData[1]),
      }) as any,
    );
    const updatedAdmin = { ...mockAdminData[1], email: "admin2Updated@gmail.com" };
    jest.spyOn(model, "findByIdAndUpdate").mockReturnValueOnce(
      createMock<Query<any, any>>({
        exec: jest.fn().mockResolvedValueOnce(updatedAdmin),
      }) as any,
    );

    const updated_Admin = await service.update(Object("634818ff801e2c3713056222"), {
      email: "admin2Updated@gmail.com",
    });

    expect(updatedAdmin).toEqual(updated_Admin);
  });

  it("should delete an admin", async () => {
    jest.spyOn(model, "findById").mockReturnValueOnce(
      createMock<Query<any, any>>({
        exec: jest.fn().mockResolvedValueOnce(mockAdminData[0]),
      }) as any,
    );
    jest.spyOn(model, "findOneAndUpdate").mockResolvedValueOnce(
      createMock<Query<any, any>>({
        exec: jest.fn().mockResolvedValueOnce(mockAdminData),
      }) as any,
    );
    expect(await service.remove(Object("634818ff801e2c37130565f3"))).toEqual(true);
  });

  it("should restore a deleted admin", async () => {
    jest.spyOn(model, "findById").mockReturnValueOnce(
      createMock<Query<any, any>>({
        exec: jest.fn().mockResolvedValueOnce(mockAdminData[2]),
      }) as any,
    );
    jest.spyOn(model, "findOneAndUpdate").mockResolvedValueOnce(
      createMock<Query<any, any>>({
        exec: jest.fn().mockResolvedValueOnce(mockAdminData),
      }) as any,
    );
    expect(await service.restore(Object("6352457649dfd4dd6e7bb31c"))).toEqual(true);
  });
});
