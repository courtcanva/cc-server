import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { DesignService } from "./design.service";
import { DesignController } from "./design.controller";
import { Design, DesignSchema } from "./schemas/design.schema";
@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Design.name,
        schema: DesignSchema,
      },
    ]),
  ],
  controllers: [DesignController],
  providers: [DesignService],
})
export class DesignModule {}
