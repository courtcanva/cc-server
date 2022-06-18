import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { GoogleStrategy } from "src/utils/google.strategy";
import { PassportModule } from "@nestjs/passport";
import { CookieSerializer } from "./cookie.serializer";

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: "local",
      session: true,
    }),
  ],
  providers: [AuthService, GoogleStrategy, CookieSerializer],
  controllers: [AuthController],
})
export class AuthModule {}
