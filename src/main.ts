import { ValidationPipe } from "@nestjs/common";
import { Handler, Context } from "aws-lambda";
import { NestFactory } from "@nestjs/core";
import { configure as serverlessExpress } from "@codegenie/serverless-express";
import { ExpressAdapter, NestExpressApplication } from "@nestjs/platform-express";
import { AppModule } from "./app.module";
import { MongoExceptionFilter } from "./common/filters/mongoose-exception.filter";
import * as express from "express";
import { json } from "body-parser";

let cachedServer: Handler;

async function bootstrap() {
  const expressApp = express();
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    new ExpressAdapter(expressApp),
    {
      bodyParser: false,
    },
  );
  app.use(json({ limit: "1mb" }));
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

  await app.init();
  return serverlessExpress({ app: expressApp });
}

export const handler = async (event: any, context: Context) => {
  if (!cachedServer) {
    cachedServer = await bootstrap();
  }
  return cachedServer(event, context);
};
