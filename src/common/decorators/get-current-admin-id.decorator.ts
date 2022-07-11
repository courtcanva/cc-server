import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { JwtPayload } from "../../admin/types";
/**
 * Get user ID from request
 */
export const GetCurrentAdminId = createParamDecorator((_: undefined, context: ExecutionContext) => {
  const request = context.switchToHttp().getRequest();
  const admin = request.user as JwtPayload;
  return admin.sub;
});
