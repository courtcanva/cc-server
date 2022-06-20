import { NestFactory } from "@nestjs/core";
import * as session from "express-session";
import * as passport from "passport";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(
    session({
      secret: "my-secret",
      resave: false,
      saveUninitialized: false,
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());
  // await app.listen(8080);
  app.enableCors();
  await app.listen(process.env.PORT || 8080);
}
bootstrap();
