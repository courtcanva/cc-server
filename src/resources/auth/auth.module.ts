import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { GoogleStrategy } from "src/resources/auth/google.strategy";
import { PassportModule } from "@nestjs/passport";
import { CookieSerializer } from "./cookie.serializer";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "./schemas/user.schema";

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: "local",
      session: true,
    }),
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
  ],
  providers: [AuthService, GoogleStrategy, CookieSerializer],
  controllers: [AuthController],
})
export class AuthModule {}
