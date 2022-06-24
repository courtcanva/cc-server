import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { CourtSpecController } from "./courtSpec.controller";
import { CourtSpecService } from "./courtSpec.service";
import { CourtSpec, CourtSpecSchema } from "./schemas/courtSpec.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: CourtSpec.name,
        schema: CourtSpecSchema,
      },
    ]),
  ],
  controllers: [CourtSpecController],
  providers: [CourtSpecService],
})
export class CourtSpecModule {}
