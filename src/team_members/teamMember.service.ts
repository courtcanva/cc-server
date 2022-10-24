import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, ObjectId } from "mongoose";
import { CreateTeamMemberDto } from "./dto/createTeamMember.dto";
import { GetAllTeamMembersDto } from "./dto/getAllTeamMembers.dto";
import { UpdateTeamMemberDto } from "./dto/updateTeamMember.dto";
import { TeamMember } from "./schemas/teamMembers.schema";

@Injectable()
export class TeamMemberService {
  constructor(@InjectModel(TeamMember.name) private readonly TeamMemberModel: Model<TeamMember>) {}

  async getAllTeamMembers(getAllTeamMembers: GetAllTeamMembersDto) {
    const { isSorted = false, limit = 0, offset = 0 } = getAllTeamMembers;
    const optionalQuery: { [key: string]: any } = {};

    const teamMembers = await this.TeamMemberModel.find({
      isDeleted: false,
      ...optionalQuery,
    })
      .sort({ priority: 1 })
      .skip(offset)
      .limit(limit)
      .exec();

    return teamMembers;
  }

  async findOne(id: ObjectId) {
    const teamMember = await this.TeamMemberModel.findById(id).exec();
    if (!teamMember) {
      throw new NotFoundException(`Team member #${id} not found`);
    }

    return teamMember;
  }

  async create(createTeamMemberDto: CreateTeamMemberDto) {
    const teamMember = await this.TeamMemberModel.create(createTeamMemberDto);
    return teamMember;
  }

  async update(id: ObjectId, updateTeamMemberDto: UpdateTeamMemberDto) {
    const updatedTeamMember = await this.TeamMemberModel.findOneAndUpdate(
      {
        _id: id,
        isDeleted: false,
      },
      { $set: updateTeamMemberDto },
      { new: true },
    ).exec();

    if (!updatedTeamMember) {
      throw new NotFoundException(`Team member #${id} not found`);
    }

    return updatedTeamMember;
  }

  async remove(id: ObjectId) {
    const response = await this.TeamMemberModel.findOneAndUpdate(
      {
        _id: id,
        isDeleted: false,
      },
      {
        $set: { isDeleted: true },
      },
    );
    if (!response) {
      return false;
    }
    return true;
  }
}
