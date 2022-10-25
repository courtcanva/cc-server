import { Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";
import { ObjectId } from "mongoose";
import { CreateTeamMemberDto } from "./dto/createTeamMember.dto";
import { GetAllTeamMembersDto } from "./dto/getAllTeamMembers.dto";
import { UpdateTeamMemberDto } from "./dto/updateTeamMember.dto";
import { TeamMember } from "./schemas/teamMembers.schema";
import { TeamMemberService } from "./teamMember.service";

@Controller("team-member")
export class TeamMemberController {
  constructor(private readonly teamMemberService: TeamMemberService) {}

  @Get()
  async getAllTeamMembers(@Query() getAllTeamMembers: GetAllTeamMembersDto): Promise<any> {
    return await this.teamMemberService.getAllTeamMembers(getAllTeamMembers);
  }

  @Get(":id")
  async findOne(@Param("id") teamMemberId: ObjectId): Promise<TeamMember> {
    return await this.teamMemberService.findOne(teamMemberId);
  }

  @Post()
  async create(@Body() createTeamMemberDto: CreateTeamMemberDto): Promise<TeamMember> {
    return await this.teamMemberService.create(createTeamMemberDto);
  }

  @Put(":id")
  async update(
    @Param("id") id: ObjectId,
    @Body() updateTeamMemberDto: UpdateTeamMemberDto,
  ): Promise<TeamMember> {
    return await this.teamMemberService.update(id, updateTeamMemberDto);
  }

  @Delete(":id")
  async remove(@Param("id") id: ObjectId): Promise<boolean> {
    return await this.teamMemberService.remove(id);
  }
}
