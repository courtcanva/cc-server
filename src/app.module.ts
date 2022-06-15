import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CourtSpecModule } from './modules/court_spec/court_spec.module';

@Module({
  imports: [CourtSpecModule, MongooseModule.forRoot('mongodb://localhost/courtcanvas')],
})
export class AppModule {}
