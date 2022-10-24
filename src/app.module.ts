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
import { DesignModule } from "./designs/design.module";
import { CartItemModule } from "./cart_items/cartItem.module";
import { TemplateItemsModule } from "./template_items/templateItem.module";
import { TeamMemberModule } from "./team_members/teamMember.module";

@Module({
  imports: [
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
    DesignModule,
    CartItemModule,
    TemplateItemsModule,
    TeamMemberModule,
  ],
})
export class AppModule {}
