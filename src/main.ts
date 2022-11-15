import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import { AppModule } from "./app.module";
import { MongoExceptionFilter } from "./common/filters/mongoose-exception.filter";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bodyParser: false,
  });
  app.enableCors();
  app.set("trust proxy", 1);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  app.useGlobalFilters(new MongoExceptionFilter());
  app.setGlobalPrefix("v1");
  await app.listen(process.env.PORT || 8080);
}
bootstrap();
