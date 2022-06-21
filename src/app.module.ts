import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { HealthModule } from "./health/health.module";
import { CatsModule } from "./cats/cats.module";
import { TilesModule } from "./resource/tiles/tiles.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.DATABASE_URL),
    HealthModule,
    CatsModule,
    TilesModule,
  ],
})
export class AppModule {}
