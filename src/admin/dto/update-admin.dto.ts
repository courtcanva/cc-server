import { PartialType } from "@nestjs/mapped-types";
import { Exclude } from "class-transformer";
import { CreateAdminDto } from "./create-admin.dto";

export class UpdateAdminDto extends PartialType(CreateAdminDto) {
  @Exclude()
  readonly email: string;

  @Exclude()
  readonly permission: string;
}
