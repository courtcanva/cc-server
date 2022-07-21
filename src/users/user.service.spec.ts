import { createMock } from "@golevelup/ts-jest";
import { NotFoundException } from "@nestjs/common";
import { getModelToken } from "@nestjs/mongoose";
import { Test, TestingModule } from "@nestjs/testing";
import { Model, Query } from "mongoose";
import { updatedUser, user, userArray } from "./user.testData";
import { User } from "./schemas/user.schema";
import { UserService } from "./user.service";

describe("UserService", () => {
  let service: UserService;
  let model: Model<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
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

    service = module.get(UserService);
    model = module.get<Model<User>>(getModelToken(User.name));
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should return all users", async () => {
    jest.spyOn(model, "find").mockReturnValue({
      skip: jest.fn().mockReturnValue({
        limit: jest.fn().mockReturnValue({ exec: jest.fn().mockResolvedValueOnce(userArray) }),
      }),
    } as any);
    const paginationQuery = { limit: 10, offset: 0 };
    const users = await service.getAllUsers(paginationQuery);
    expect(users).toEqual(userArray);
  });

  it("should get user by id", async () => {
    jest.spyOn(model, "findById").mockReturnValueOnce(
      createMock<Query<any, any>>({
        exec: jest.fn().mockResolvedValueOnce(userArray[0]),
      }) as any,
    );
    const user = await service.getUserById(Object("62b83c2e89301b1aecf6af78"));
    expect(user).toEqual(userArray[0]);
  });

  it("should add a new user", async () => {
    jest.spyOn(model, "create").mockImplementationOnce(() => user);
    const newUser = await service.create(user);
    expect(newUser).toEqual(user);
  });

  it("should update user information", async () => {
    jest.spyOn(model, "findById").mockReturnValueOnce(
      createMock<Query<any, any>>({
        exec: jest.fn().mockResolvedValueOnce(updatedUser),
      }) as any,
    );
    jest.spyOn(model, "findByIdAndUpdate").mockReturnValueOnce(
      createMock<Query<any, any>>({
        exec: jest.fn().mockResolvedValueOnce(updatedUser),
      }) as any,
    );
    const user = await service.updateUserById(Object("62b83c2e89301b1aecf6af78"), {
      ...updatedUser,
      updatedAt: new Date(),
    });
    expect(user).toEqual(updatedUser);
  });

  it("can't find the user then fail to update", async () => {
    jest.spyOn(model, "findById").mockReturnValueOnce(
      createMock<Query<any, any>>({
        exec: jest.fn().mockResolvedValueOnce(null),
      }) as any,
    );
    jest.fn().mockRejectedValueOnce("User 62b83c2e89301b1aecf6af78 not found");
    try {
      await service.getUserById(Object("62b83c2e89301b1aecf6af78"));
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException);
      expect(error.message).toBe("User 62b83c2e89301b1aecf6af78 not found");
    }
  });

  it("should delete a user", async () => {
    jest.spyOn(model, "findById").mockReturnValueOnce(
      createMock<Query<any, any>>({
        exec: jest.fn().mockResolvedValueOnce({ message: "User deleted successfully" }),
      }) as any,
    );
    jest.spyOn(model, "findByIdAndUpdate").mockReturnValueOnce(
      createMock<Query<any, any>>({
        exec: jest.fn().mockResolvedValueOnce(updatedUser),
      }) as any,
    );
    expect(await service.removeUserById(Object("62b83c2e89301b1aecf6af78"))).toEqual({
      message: "User deleted successfully",
    });
  });
});
