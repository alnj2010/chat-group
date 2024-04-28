import { Credentials, User, UserJWT } from "@/types";

export const credentialsDummy: Credentials = {
  email: "userDummy@email.com",
  password: "1234",
};



export function getRandomDummyCredentialsById(
  id: number | string
): Credentials {
  const random = Math.random().toString().substring(2, 5);
  const credentials: Credentials = {
    email: `${id}${random}${Date.now()}${credentialsDummy.email}`,
    password: credentialsDummy.password,
  };
  return credentials;
}

export const userDummy: User = {
  id: "0",
  uuid: "uuiddummy",
  email: credentialsDummy.email,
  password: credentialsDummy.password,
  name: "namedummy",
  phone: "phonedummy",
  bio: "biodummy",
  image: "imagedummy",
};

export const userJWTDummy: UserJWT = {
  id: userDummy.id,
  email: credentialsDummy.email,
  image: userDummy.image,
  name: userDummy.name,
};
