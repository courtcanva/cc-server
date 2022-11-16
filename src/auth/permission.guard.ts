import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Admin, permissionType } from "src/admin/schemas/admin.schema";
import { PERMISSIONS_KEY } from "./hasPermission.decorator";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    @InjectModel(Admin.name) private readonly AdminModel: Model<Admin>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredPermissions = this.reflector.getAllAndOverride<permissionType[]>(
      PERMISSIONS_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!requiredPermissions) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();
    const adminUser = await this.AdminModel.findOne({ email: user.email }).exec();
    return requiredPermissions.some((permission) => adminUser?.permission?.includes(permission));
  }
}
