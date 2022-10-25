import { Test, TestingModule } from "@nestjs/testing";
import { Connection, Model, Query } from "mongoose";
import { TeamMemberService } from "./teamMember.service";
import { createMock } from "@golevelup/ts-jest";
import { TeamMember } from "./schemas/teamMembers.schema";
import { getModelToken } from "@nestjs/mongoose";
import {
  mockTeamMember1,
  mockTeamMemberResult1,
  mockTeamMemberArray,
  mockGroupedTeamMembers,
} from "./teamMember.testData";

describe("Team Member Service", () => {
  let service: TeamMemberService;
  let model: Model<TeamMember>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TeamMemberService,
        { provide: Connection, useValue: {} },
        {
          provide: getModelToken(TeamMember.name),
          useValue: {
            new: jest.fn().mockResolvedValue(mockTeamMember1),
            constructor: jest.fn().mockResolvedValue(mockTeamMember1),
            findById: jest.fn(),
            find: jest.fn(),
            findOne: jest.fn(),
            findAll: jest.fn(),
            create: jest.fn(),
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

    service = module.get<TeamMemberService>(TeamMemberService);
    model = module.get<Model<TeamMember>>(getModelToken(TeamMember.name));
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should return grouped team members", async () => {
    jest.spyOn(model, "find").mockReturnValue({
      sort: jest.fn().mockReturnValue({
        skip: jest.fn().mockReturnValue({
          limit: jest.fn().mockReturnValue({
            exec: jest.fn().mockResolvedValueOnce(mockTeamMemberArray),
          }),
        }),
      }),
    } as any);
    expect(await service.getAllTeamMembers({ isGrouped: true, limit: 0, offset: 0 })).toEqual(
      mockGroupedTeamMembers,
    );
  });

  it("should return a team member in given object ID", async () => {
    jest.spyOn(model, "findById").mockReturnValueOnce(
      createMock<Query<any, any>>({
        exec: jest.fn().mockResolvedValueOnce(mockTeamMemberResult1),
      }) as any,
    );
    const id = Object("6357db45f1590811966581a5");
    const expectedTeamMember = mockTeamMemberResult1;

    const teamMember = await service.findOne(id);
    expect(teamMember).toEqual(expectedTeamMember);
  });

  it("should return a team member created", async () => {
    jest
      .spyOn(model, "create")
      .mockImplementationOnce(() => Promise.resolve(mockTeamMemberResult1));
    expect(await service.create(mockTeamMember1)).toEqual(mockTeamMemberResult1);
  });

  it("should update a team member", async () => {
    const id = Object("6357db45f1590811966581a5");
    const spy = jest.spyOn(model, "findByIdAndUpdate").mockReturnValue({
      exec: jest.fn().mockResolvedValue(mockTeamMemberResult1),
    } as any);
    await service.update(id, { role: "Developer" });
    expect(spy).toBeCalled();
  });

  it("should delete a team member", async () => {
    jest.spyOn(model, "findOneAndUpdate").mockResolvedValueOnce(
      createMock<Query<any, any>>({
        exec: jest.fn().mockResolvedValueOnce(mockTeamMemberResult1),
      }) as any,
    );
    expect(await service.remove(Object("6357db45f1590811966581a5"))).toEqual(true);
  });
});
