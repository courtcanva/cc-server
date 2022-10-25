import { Test, TestingModule } from "@nestjs/testing";
import { TeamMemberController } from "./teamMember.controller";
import { TeamMemberService } from "./teamMember.service";
import {
  mockGroupedTeamMembers,
  mockTeamMember1,
  mockTeamMember1Modified,
  mockTeamMemberResult1,
} from "./teamMember.testData";
import { CreateTeamMemberDto } from "./dto/createTeamMember.dto";
import { UpdateTeamMemberDto } from "./dto/updateTeamMember.dto";
import { GetAllTeamMembersDto } from "./dto/getAllTeamMembers.dto";
import { ObjectId } from "mongoose";

describe("Team Member Controller", () => {
  let controller: TeamMemberController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TeamMemberController],
      providers: [
        {
          provide: TeamMemberService,
          useValue: {
            getAllTeamMembers: jest
              .fn()
              .mockImplementation(() => Promise.resolve(mockGroupedTeamMembers)),
            findOne: jest.fn().mockImplementation(() => Promise.resolve(mockTeamMemberResult1)),
            create: jest.fn().mockImplementation((createTeamMemberDto: CreateTeamMemberDto) =>
              Promise.resolve({
                _id: "mongodbObjectId",
                createdAt: "2022-10-25T12:49:09.801Z",
                updatedAt: "2022-10-25T12:49:09.801Z",
                isDeleted: false,
                __v: 0,
                ...createTeamMemberDto,
              }),
            ),
            update: jest
              .fn()
              .mockImplementation((_id: ObjectId, updateTeamMemberDto: UpdateTeamMemberDto) =>
                Promise.resolve(updateTeamMemberDto),
              ),
            remove: jest.fn().mockResolvedValue({ isDeleted: true }),
          },
        },
      ],
    }).compile();

    controller = module.get<TeamMemberController>(TeamMemberController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  describe("getAllTeamMembers", () => {
    it("should get all team members", async () => {
      const getAllTeamMembersDto: GetAllTeamMembersDto = { isGrouped: true, limit: 0, offset: 0 };
      expect(controller.getAllTeamMembers(getAllTeamMembersDto)).resolves.toEqual(
        mockGroupedTeamMembers,
      );
    });
  });

  describe("findOne", () => {
    it("should get a team member with given Id", async () => {
      expect(controller.findOne(Object("1"))).resolves.toEqual(mockTeamMemberResult1);
    });
  });

  describe("create", () => {
    it("should create a new team member", async () => {
      const createTeamMemberDto: CreateTeamMemberDto = mockTeamMember1;

      expect(controller.create(createTeamMemberDto)).resolves.toEqual({
        ...mockTeamMemberResult1,
        _id: "mongodbObjectId",
      });
    });
  });

  describe("update", () => {
    it("should update a team member", () => {
      const updateTeamMemberDto: UpdateTeamMemberDto = mockTeamMemberResult1;
      const updateField = {
        ...updateTeamMemberDto,
        role: "Developer",
        emailAddress: "testData1modefied@gmail.com",
      };
      expect(controller.update(Object("mongodbObjectId"), updateField)).resolves.toEqual({
        ...mockTeamMember1Modified,
      });
    });
  });

  describe("delete a team member", () => {
    it("should return true/false to show if given team member deleted successfully", () => {
      expect(controller.remove(Object("mongodbObjectId"))).resolves.toEqual({
        isDeleted: true,
      });
    });
  });
});
