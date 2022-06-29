import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { HealthModule } from "./health/health.module";
import { CourtSpecModule } from "./court_spec/courtSpec.module";
import { MongooseModule } from "@nestjs/mongoose";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    HealthModule,
    
    CourtSpecModule,
  ],
})
export class AppModule {}
