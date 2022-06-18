import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { HealthModule } from "./health/health.module";
import { CourtSpecModule } from "./resources/court_spec/court_spec.module";
import { MongooseModule } from "@nestjs/mongoose";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    HealthModule,
    CourtSpecModule,
    MongooseModule.forRoot(process.env.DATABASE_URL || "mongodb://localhost:27017/courtcanvas"),
  ],
})
export class AppModule {}
