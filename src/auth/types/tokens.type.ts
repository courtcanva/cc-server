export type Tokens = {
  accessToken: string;
  refreshToken: string;
};

export interface IAdmin {
  id: string;
  email: string;
  name: string;
  permission: string;
}

export interface IadminLoginReponseData extends Tokens {
  admin: IAdmin;
}
