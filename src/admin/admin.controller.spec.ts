import { Test, TestingModule } from "@nestjs/testing";
import { ObjectId } from "mongoose";
// import { AdminDto } from "./dto/admin.dto";
import { UpdateAdminDto } from "./dto/update-admin.dto";
import { AdminController } from "./admin.controller";
import { AdminService } from "./admin.service";
import { mockAdminData } from "./admin.testData";
import { getModelToken } from "@nestjs/mongoose";
import { Admin } from "./schemas/admin.schema";
import { SetAdminPermissionDto } from "./dto/set-admin-permission.dto";
// import { BadRequestException, NotFoundException } from "@nestjs/common";

describe("AdminController", () => {
  let controller: AdminController;
  let service: AdminService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [AdminController],
      providers: [
        {
          provide: AdminService,
          useValue: {
            findAll: jest.fn().mockResolvedValue(mockAdminData),
            findOne: jest
              .fn()
              .mockImplementation((adminId: ObjectId) => Promise.resolve(mockAdminData[1])),
            update: jest
              .fn()
              .mockImplementation((adminId: ObjectId, UpdateAdminDto: UpdateAdminDto) =>
                Promise.resolve({ email: "admin2_Upadte@gmail.com", ...UpdateAdminDto }),
              ),
            remove: jest.fn().mockResolvedValue({ isDeleted: true }),
            restore: jest.fn().mockResolvedValue({ isDeleted: false }),
            setPermission: jest.fn().mockResolvedValue({ permission: "super" }),
          },
        },
        {
          provide: getModelToken(Admin.name),
          useValue: jest.fn(),
        },
      ],
    }).compile();

    controller = module.get<AdminController>(AdminController);
    service = module.get<AdminService>(AdminService);
  });

  it("controller should be defined", () => {
    expect(controller).toBeDefined();
  });

  it("findAllAdmin should get all admins", async () => {
    const paginationQuery = { limit: 1, offset: 0 };
    expect(controller.findAllAdmin(paginationQuery)).resolves.toEqual(mockAdminData);
  });

  // it("getAdminById throws an error if user with given id is not found", async () => {
  //   controller.getAdminById = () => null;
  //   const admin = await controller.getAdminById(Object("634818ff801e2c3713056222"));
  //   expect(admin).rejects.toThrow(NotFoundException);
  // });

  it("getAdminById returns a single user with the given id", async () => {
    const admin = await controller.getAdminById(Object("634818ff801e2c3713056222"));
    expect(admin).toBeDefined();
  });

  it("updateAdminById should update a admin", () => {
    const updateAdminDto: any = mockAdminData[1];
    const updateAdmin = {
      ...updateAdminDto,
      email: mockAdminData[1].email,
    };
    expect(
      controller.updateAdminById(Object("634818ff801e2c3713056222"), updateAdmin),
    ).resolves.toEqual({ email: "admin2_Upadte@gmail.com", ...updateAdminDto });
  });

  it("remove should delete a admin", () => {
    expect(controller.deleteAdminById(Object("634818ff801e2c3713056222"))).resolves.toEqual({
      isDeleted: true,
    });
  });

  it("remove should restore a deleted admin", () => {
    expect(controller.restoreAdminById(Object("634818ff801e2c3713056222"))).resolves.toEqual({
      isDeleted: false,
    });
  });

  it("should set a permission state for admin", () => {
    const setAdminPermissionDto: SetAdminPermissionDto = { permission: "super" };
    expect(
      controller.setAdminPermissionById(Object("634818ff801e2c3713056222"), setAdminPermissionDto),
    ).resolves.toEqual({
      permission: "super",
    });
  });
});
