import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { HealthModule } from "./health/health.module";
import { CatsModule } from "./cats/cats.module";
import { TilesModule } from "./tiles/tiles.module";
import { AuthModule } from "./auth/auth.module";
import { UserController } from "./user/user.controller";
import { UserService } from "./user/user.service";
import { UserModule } from "./user/user.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.DATABASE_URL),
    HealthModule,
    CatsModule,
    TilesModule,
    MongooseModule.forRoot(process.env.DATABASE_URL),
    AuthModule,
    UserModule,
  ],
})
export class AppModule {}
