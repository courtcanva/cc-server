import { PartialType } from "@nestjs/mapped-types";
import { CreateTeamMemberDto } from "./createTeamMember.dto";

export class UpdateTeamMemberDto extends PartialType(CreateTeamMemberDto) {}
