import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { RoleType } from "../schemas/teamMembers.schema";

export class CreateTeamMemberDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  readonly profileImgUrl: string;

  @IsEnum(RoleType)
  @IsNotEmpty()
  @IsOptional()
  readonly role: string;

  @IsString()
  @IsNotEmpty()
  readonly linkedInUrl: string;

  @IsString()
  @IsNotEmpty()
  readonly githubUrl: string;

  @IsEmail()
  @IsNotEmpty()
  readonly emailAddress: string;

  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  readonly priority: number;
}
