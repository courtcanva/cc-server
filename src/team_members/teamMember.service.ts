import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, ObjectId } from "mongoose";
import { CreateTeamMemberDto } from "./dto/createTeamMember.dto";
import { ListTeamMembersDto } from "./dto/listTeamMembers.dto";
import { UpdateTeamMemberDto } from "./dto/updateTeamMember.dto";
import { TeamMember } from "./schemas/teamMembers.schema";

@Injectable()
export class TeamMemberService {
  constructor(@InjectModel(TeamMember.name) private readonly TeamMemberModel: Model<TeamMember>) {}

  async listTeamMembers(getAllTeamMembers: ListTeamMembersDto): Promise<any> {
    const { isGrouped = "false", limit = 0, offset = 0 } = getAllTeamMembers;
    const optionalQuery: { [key: string]: any } = {};

    const teamMembers = await this.TeamMemberModel.find({
      isDeleted: false,
      ...optionalQuery,
    })
      .sort({ priority: -1 })
      .skip(offset)
      .limit(limit)
      .exec();

    if (isGrouped === "false") return teamMembers;

    const groupedTeamMembers = {};
    teamMembers.forEach((teamMember) => {
      if (!groupedTeamMembers[teamMember.role]) groupedTeamMembers[teamMember.role] = [];
      groupedTeamMembers[teamMember.role].push(teamMember);
    });
    return groupedTeamMembers;
  }

  async findOne(id: ObjectId): Promise<TeamMember> {
    const teamMember = await this.TeamMemberModel.findById(id).exec();
    if (!teamMember) {
      throw new NotFoundException(`Team member #${id} not found`);
    }

    return teamMember;
  }

  async create(createTeamMemberDto: CreateTeamMemberDto): Promise<TeamMember> {
    const teamMember = await this.TeamMemberModel.create(createTeamMemberDto);
    return teamMember;
  }

  async update(id: ObjectId, updateTeamMemberDto: UpdateTeamMemberDto): Promise<TeamMember> {
    const teamMember = await this.TeamMemberModel.findByIdAndUpdate(
      { _id: id },
      { $set: updateTeamMemberDto },
      { new: true },
    ).exec();
    if (!teamMember) {
      throw new NotFoundException(`Team member #${id} not found`);
    }
    return teamMember;
  }

  async remove(id: ObjectId): Promise<boolean> {
    try {
      await this.TeamMemberModel.findOneAndUpdate({ _id: id }, { $set: { isDeleted: true } });
      return true;
    } catch {
      return false;
    }
  }
}
