import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import * as session from "express-session";
import * as passport from "passport";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.set("trust proxy", 1); //
  app.enableCors();
  app.use(
    session({
      secret: "my-secret",
      resave: true,
      saveUninitialized: true,
      cookie: {
        sameSite: "none", //for cross origin
        secure: true, //in charge of the https protocol
        maxAge: 1000 * 60 * 60 * 24 * 7, // setting the cookie expiration for one week
      },
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());
  // await app.listen(8080);
  app.enableCors();
  await app.listen(process.env.PORT || 8080);
}
bootstrap();
