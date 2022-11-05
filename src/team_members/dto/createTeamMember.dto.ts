import {
  IsEmail,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  Max,
  Min,
} from "class-validator";
import { RoleType } from "../schemas/teamMembers.schema";

export class CreateTeamMemberDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsUrl()
  @IsNotEmpty()
  @IsOptional()
  readonly profileImgUrl: string;

  @IsEnum(RoleType)
  @IsNotEmpty()
  @IsOptional()
  readonly role: string;

  @IsUrl()
  @IsNotEmpty()
  @IsOptional()
  readonly linkedInUrl: string;

  @IsUrl()
  @IsNotEmpty()
  @IsOptional()
  readonly githubUrl: string;

  @IsEmail()
  @IsNotEmpty()
  @IsOptional()
  readonly emailAddress: string;

  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  @Max(5)
  @Min(0)
  @IsInt()
  readonly priority: number;
}
