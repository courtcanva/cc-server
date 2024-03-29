import { createMock } from "@golevelup/ts-jest";
import { NotFoundException } from "@nestjs/common";
import { getModelToken } from "@nestjs/mongoose";
import { Test, TestingModule } from "@nestjs/testing";
import { Model, Query } from "mongoose";
import {
  connectedAccount,
  unconnectedAccount,
  updatedUser,
  user,
  userArray,
  usersDataObject,
} from "./user.testData";
import { User } from "./schemas/user.schema";
import { UserService } from "./user.service";
import { AuthService } from "src/auth/auth.service";
import { ConfigModule } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";

describe("UserService", () => {
  let service: UserService;
  let model: Model<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot({ isGlobal: true })],
      providers: [
        UserService,
        AuthService,
        JwtService,
        {
          provide: getModelToken(User.name),
          useValue: {
            find: jest.fn(),
            findById: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            findByIdAndUpdate: jest.fn(),
            exec: jest.fn(),
            countDocuments: jest.fn(),
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

  it("should return users", async () => {
    jest.spyOn(model, "find").mockReturnValue({
      sort: jest.fn().mockReturnValue({
        skip: jest.fn().mockReturnValue({
          limit: jest.fn().mockReturnValue({ exec: jest.fn().mockResolvedValueOnce(userArray) }),
        }),
      }),
    } as any);
    jest.spyOn(model, "countDocuments").mockResolvedValueOnce(2);
    const paginationQuery = { limit: 10, offset: 0 };
    const users = await service.getAllUsers(paginationQuery);
    expect(users).toEqual(usersDataObject);
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
  // TODO: modify below tests
  // it("should add a new user", async () => {
  //   jest.spyOn(model, "create").mockImplementationOnce(() => user);
  //   const newUser = await service.create(user);
  //   expect(newUser).toEqual(user);
  // });

  // it("should update user information", async () => {
  //   jest.spyOn(model, "findById").mockReturnValueOnce(
  //     createMock<Query<any, any>>({
  //       exec: jest.fn().mockResolvedValueOnce(updatedUser),
  //     }) as any,
  //   );
  //   jest.spyOn(model, "findByIdAndUpdate").mockReturnValueOnce(
  //     createMock<Query<any, any>>({
  //       exec: jest.fn().mockResolvedValueOnce(updatedUser),
  //     }) as any,
  //   );
  //   const user = await service.updateUserById(Object("62b83c2e89301b1aecf6af78"), {
  //     ...updatedUser,
  //     updatedAt: new Date(),
  //   });
  //   expect(user).toEqual(updatedUser);
  // });

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

  it("should check user by email", async () => {
    jest.spyOn(model, "findOne").mockReturnValueOnce(
      createMock<Query<any, any>>({
        exec: jest.fn().mockResolvedValueOnce(null),
      }) as any,
    );
    const status = await service.checkEmail({ email: "null@gmail.com" });
    expect(status.findUser).toEqual(false);
  });

  it("should verify users' password", async () => {
    jest.spyOn(model, "findById").mockReturnValueOnce(
      createMock<Query<any, any>>({
        exec: jest.fn().mockResolvedValueOnce(user),
      }) as any,
    );
    const passwordMatches = await service.checkPassword({
      userId: user.id,
      password: "123456",
    });
    expect(passwordMatches).toEqual(false);
  });

  it("should update a user's google ID", async () => {
    jest.spyOn(model, "findOne").mockReturnValueOnce(
      createMock<Query<any, any>>({
        exec: jest.fn().mockResolvedValueOnce(unconnectedAccount),
      }) as any,
    );
    jest.spyOn(model, "findByIdAndUpdate").mockReturnValueOnce(
      createMock<Query<any, any>>({
        exec: jest.fn().mockResolvedValueOnce(connectedAccount),
      }) as any,
    );
    jest.spyOn(model, "findByIdAndUpdate").mockReturnValueOnce(
      createMock<Query<any, any>>({
        exec: jest.fn().mockResolvedValueOnce(connectedAccount),
      }) as any,
    );
    const updatedUser = await service.connectAccount(unconnectedAccount);
    expect(updatedUser.googleId).toEqual(connectedAccount.googleId);
  });

  it("should update a user's password by id", async () => {
    jest.spyOn(model, "findById").mockReturnValueOnce(
      createMock<Query<any, any>>({
        exec: jest.fn().mockResolvedValueOnce(user),
      }) as any,
    );
    jest.spyOn(model, "findByIdAndUpdate").mockReturnValueOnce(
      createMock<Query<any, any>>({
        exec: jest.fn().mockResolvedValueOnce(updatedUser),
      }) as any,
    );
    const updatedAccount = await service.updateUserById({
      userId: user.id,
      password: updatedUser.password,
    });
    expect(updatedAccount.password).toEqual(updatedUser.password);
  });

  it("should fail to update a user's password if no such user", async () => {
    jest.spyOn(model, "findById").mockReturnValueOnce(
      createMock<Query<any, any>>({
        exec: jest.fn().mockResolvedValueOnce(null),
      }) as any,
    );
    jest.spyOn(model, "findByIdAndUpdate").mockReturnValueOnce(
      createMock<Query<any, any>>({
        exec: jest.fn().mockResolvedValueOnce(null),
      }) as any,
    );
    await expect(
      service.updateUserById({
        userId: "null",
        password: updatedUser.password,
      }),
    ).rejects.toThrow(`User not found`);
  });
});
