import { Module } from '@nestjs/common';
import { CourtSpecModule } from './modules/court_spec/court_spec.module';

@Module({
  imports: [CourtSpecModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
