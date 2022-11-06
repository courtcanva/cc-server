import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
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
import { OrderModule } from "./orders/order.module";
import { StripeModule } from "./stripe/stripe.module";
import {
  applyRawBodyOnlyTo,
  JsonBodyMiddleware,
  RawBodyMiddleware,
} from "@golevelup/nestjs-webhooks";

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
    OrderModule,
    StripeModule,
    JsonBodyMiddleware,
    RawBodyMiddleware,
  ],
})
export class AppModule implements NestModule {
  // Apply raw body parsing to the routes with path "stripe/webhook",
  // and then to automatically apply JSON body parsing to all other routes
  // with the exclusion of the raw routes.
  configure(consumer: MiddlewareConsumer) {
    applyRawBodyOnlyTo(consumer, {
      method: RequestMethod.ALL,
      path: "stripe/webhook",
    });
  }
}
