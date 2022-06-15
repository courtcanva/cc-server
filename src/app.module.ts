import { Module } from '@nestjs/common';
import { CatsModule } from './cats/cats.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CourtSpecModule } from './modules/court_spec/court_spec.module';

@Module({
  imports: [
    CatsModule,
    CourtSpecModule,
    MongooseModule.forRoot(
      'mongodb+srv://stevenliu001:RaLkib1OblvrBUSx@cluster0.yujhg.mongodb.net/court_spec-demo?retryWrites=true&w=majority',
    ),
  ],
})
export class AppModule {}
