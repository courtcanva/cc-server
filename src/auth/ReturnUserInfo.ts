import { Tokens } from "./types";

export type ReturnUserInfo = {
  userId: string;
  googleId: string;
  email: string;
  firstName: string;
  lastName: string;
  tokens: Tokens;
  needConnection: boolean;
};
