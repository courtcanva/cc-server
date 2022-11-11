import { IsNotEmpty, IsEnum } from "class-validator";
import { permissionType } from "../schemas/admin.schema";

export class SetAdminPermissionDto {
  @IsNotEmpty()
  @IsEnum(permissionType)
  readonly permission: string;
}
