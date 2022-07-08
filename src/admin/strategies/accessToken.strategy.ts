import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { JwtPayload } from "../types";

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, "jwt") {
  constructor() {
    super({
      //Get tokens from headers
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // TODO: put secret into environment variable
      secretOrKey: "at-secret",
    });
  }

  validate(payload: JwtPayload) {
    return payload;
  }
}
