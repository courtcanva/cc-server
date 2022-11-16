import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AdminController } from "./admin.controller";
import { AdminService } from "./admin.service";
import { Admin, AdminSchema } from "./schemas/admin.schema";
import { AccessTokenStrategy, RefreshTokenStrategy } from "./strategies";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Admin.name,
        schema: AdminSchema,
      },
    ]),
    JwtModule.register({}),
  ],
  providers: [AdminService, AccessTokenStrategy, RefreshTokenStrategy],
  controllers: [AdminController],
  exports: [AdminService],
})
export class AdminModule {}
