import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { HealthModule } from "./health/health.module";
import { CourtSpecModule } from "./court_spec/courtSpec.module";
import { MongooseModule } from "@nestjs/mongoose";
import { TilesModule } from "./tiles/tiles.module";
import { AuthModule } from "./auth/auth.module";
import { UserModule } from "./users/user.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.DATABASE_URL),
    HealthModule,
    CourtSpecModule,
    TilesModule,
    AuthModule,
    UserModule,
  ],
})
export class AppModule {}
