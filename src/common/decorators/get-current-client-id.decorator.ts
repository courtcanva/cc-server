import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { JwtPayload } from "../../auth/types";
/**
 * Get user ID from request
 */
export const GetCurrentClientId = createParamDecorator(
  (_: undefined, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    console.log(request);
    const client = request.user as JwtPayload;
    return client.sub;
  },
);
