import { createParamDecorator, ExecutionContext } from "@nestjs/common";
/**
 * Get user info from request
 */
export const GetCurrentClient = createParamDecorator(
  (data: any | undefined, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    // console.log(request);
    if (!data) {
      return request.user;
    }
    return request.user[data];
  },
);
