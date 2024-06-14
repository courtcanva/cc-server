import { Tokens } from "./types";

export type ReturnUserInfo = {
  userId: string;
  googleId: string;
  email: string;
  firstName: string;
  lastName: string;
  profileImgUrl?: string | null;
  tokens: Tokens;
  needConnection: boolean;
};
