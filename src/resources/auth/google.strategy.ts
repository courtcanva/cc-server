import { PassportStrategy } from "@nestjs/passport";
import { Strategy, VerifyCallback } from "passport-google-oauth20";
import { Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "./schemas/user.schema";
import { IMongoUser } from "./user";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, "google") {
  constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: "http://localhost:8080/google/redirect",
      // callbackURL: "http://localhost:3000",
      scope: ["email", "profile"],
      // failureRedirect: "https://uat.design.courtcanva.com",
      failureRedirect: "http://localhost:3000",
    });
  }

  // async validate(
  //   accessToken: string,
  //   refreshToken: string,
  //   profile: any,
  //   done: VerifyCallback,
  // ): Promise<any> {
  //   const { name, emails, photos } = profile;
  //   const user = {
  //     email: emails[0].value,
  //     firstName: name.givenName,
  //     lastName: name.familyName,
  //     picture: photos[0].value,
  //     accessToken,
  //     refreshToken,
  //   };
  //   console.log(profile);
  //   done(null, user);
  // }

  async validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback) {
    this.userModel.findOne({ googleId: profile.id }, async (err: Error, doc: IMongoUser) => {
      if (err) {
        console.log(err);
        return done();
      }

      if (!doc) {
        const newUser = new this.userModel({
          googleId: profile.id,
          email: profile.email,
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          picture: profile.photos[0].value,
          // createdAt:
        });

        await newUser.save();
        done(null, newUser);
      }
      done(null, doc);
    });
  }
}
