import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { HealthModule } from "./health/health.module";
import { CourtSpecModule } from "./court_spec/courtSpec.module";
import { MongooseModule } from "@nestjs/mongoose";
import { TilesModule } from "./tiles/tiles.module";
import { AuthModule } from "./auth/auth.module";
import { UserModule } from "./users/user.module";
import { AdminModule } from "./admin/admin.module";
import { PriceModule } from "./price/price.module";
import { MailerModule } from "@nestjs-modules/mailer";

@Module({
  imports: [
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        transport: {
          host: config.get("EMAIL_HOST"),
          secure: false,
          auth: {
            user: config.get("EMAIL_USER"),
            pass: config.get("EMAIL_PASSWORD"),
          },
        },
        defaults: {
          from: process.env.EMAIL_USER,
        },
      }),
      inject: [ConfigService],
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.DATABASE_URL),
    HealthModule,
    CourtSpecModule,
    TilesModule,
    AuthModule,
    UserModule,
    AdminModule,
    PriceModule,
  ],
})
export class AppModule {}
