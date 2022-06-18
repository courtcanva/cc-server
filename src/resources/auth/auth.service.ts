import { Injectable } from "@nestjs/common";

@Injectable()
export class AuthService {
  googleLogin(req) {
    if (!req.user) {
      return "No user from google";
    }

    return {
      message: "User information from google",
      user: req.user,
    };
  }

  googleLogout(req, res) {
    if (req.user) {
      req.logout();
      res.send("done");
    }
  }
}
