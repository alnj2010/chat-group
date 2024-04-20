import { Credentials } from "@/types";

export const credentialsDummy: Credentials = {
  email: "userDummy@email.com",
  password: "1234",
};

export function getRandomCredentialsByBrowserName(
  browserName: string
): Credentials {
  const id = Math.random().toString().substring(2, 5);
  const credentials: Credentials = {
    email: `${browserName}${id}${Date.now()}${credentialsDummy.email}`,
    password: credentialsDummy.password,
  };
  return credentials;
}
