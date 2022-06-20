import { PassportSerializer } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";

@Injectable()
export class CookieSerializer extends PassportSerializer {
  serializeUser(user: any, done: (err: any, id?: any) => void): void {
    return done(null, user);
  }

  deserializeUser(payload: any, done: (err: any, id?: any) => void): void {
    return done(null, payload);
  }
}
