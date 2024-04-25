export type Credentials = { email: string; password: string };
export type APIErrorData = { errors: Array<string> };
export type APIData = {
  data: string;
};

export type UserJWT = {
  id: string;
  email: string;
  name?: string;
  image?: string;
};

export type User = {
  id: string;
  uuid: string;
  email: string;
  password: string;
  name?: string;
  phone?: string;
  bio?: string;
  image?: string;
};
