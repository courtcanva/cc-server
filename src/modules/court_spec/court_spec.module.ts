import { Module } from '@nestjs/common';
import { CourtSpecController } from './court_spec.controller';
import { CourtSpecService } from './court_spec.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CourtSpec, CourtSpecSchema } from './court_spec.schema';

@Module({
  imports: [
    MongooseModule.forFeature({
      name: CourtSpec.name,
      schema: CourtSpecSchema,
    }),
  ],
  controllers: [CourtSpecController],
  providers: [CourtSpecService],
})
export class CourtSpecModule {}
