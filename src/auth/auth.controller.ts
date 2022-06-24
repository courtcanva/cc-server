import { Body, Controller, Post } from "@nestjs/common";
import { OAuth2Client } from "google-auth-library";

@Controller("auth")
export class AuthController {
  @Post("google")
  async est(@Body() body): Promise<any> {
    const code = body.code;
    const client = new OAuth2Client(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_SECRET,
      "postmessage",
    );
    console.log("code------", code);
    const { tokens } = await client.getToken(code);
    // const test = await client.verifyIdToken
    // client.setCredentials(r.tokens);
    console.log("client-----", client);
    console.log("code------", code);
    console.log("token", tokens);
  }
}
