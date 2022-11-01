import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { TeamMember, TeamMemberSchema } from "./schemas/teamMembers.schema";
import { TeamMemberController } from "./teamMember.controller";
import { TeamMemberService } from "./teamMember.service";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: TeamMember.name,
        schema: TeamMemberSchema,
      },
    ]),
  ],
  controllers: [TeamMemberController],
  providers: [TeamMemberService],
})
export class TeamMemberModule {}
