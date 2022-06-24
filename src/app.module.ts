import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { HealthModule } from "./health/health.module";

import { CatsModule } from "./cats/cats.module";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthModule } from "./auth/auth.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    HealthModule,
    CatsModule,
    MongooseModule.forRoot(process.env.DATABASE_URL),
    AuthModule,
  ],
})
export class AppModule {}
