import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { HealthModule } from "./health/health.module";
import { CourtSpecModule } from "./resources/court_spec/court_spec.module";

import { CatsModule } from "./cats/cats.module";
import { MongooseModule } from "@nestjs/mongoose";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    HealthModule,
    CatsModule,
    CourtSpecModule,
    MongooseModule.forRoot(process.env.DATABASE_URL),
  ],
})
export class AppModule {}
