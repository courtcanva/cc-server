import { Module } from '@nestjs/common';
import { CourtSpecController } from './court_spec.controller';
import { CourtSpecService } from './court_spec.service';

@Module({
  controllers: [CourtSpecController],
  providers: [CourtSpecService],
})
export class CourtSpecModule {}
