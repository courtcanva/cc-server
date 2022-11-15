import { SetMetadata } from "@nestjs/common";
import { permissionType } from "src/admin/schemas/admin.schema";

export const PERMISSIONS_KEY = "permissions";
export const HasPermissions = (...permissions: permissionType[]) =>
  SetMetadata(PERMISSIONS_KEY, permissions);
