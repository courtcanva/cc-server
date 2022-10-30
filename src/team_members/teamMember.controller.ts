import { Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";
import { ObjectId } from "mongoose";
import { CreateTeamMemberDto } from "./dto/createTeamMember.dto";
import { UpdateTeamMemberDto } from "./dto/updateTeamMember.dto";
import { ListTeamMembersDto } from "./dto/listTeamMembers.dto";
import { TeamMember } from "./schemas/teamMembers.schema";
import { TeamMemberService } from "./teamMember.service";

@Controller("team-member")
export class TeamMemberController {
  constructor(private readonly teamMemberService: TeamMemberService) {}

  @Get()
  async listTeamMembers(
    @Query() { isGrouped, ...paginationQuery }: ListTeamMembersDto,
  ): Promise<any> {
    return await this.teamMemberService.listTeamMembers({ isGrouped, ...paginationQuery });
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
