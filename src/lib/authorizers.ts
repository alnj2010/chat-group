import { Credentials, UserJWT } from "@/types";
import { getUserByEmail } from "./db";
import { validateCredentials } from "./validators";
import AuthorizeError from "@/errors/authorize-error";
import { INVALID_CREDENTIALS } from "@/constanst";
import { hash } from "./crypto";

export const authorizeCredentials = async (
  data: Credentials
): Promise<UserJWT> => {
  try {
    const credentialsReceived = validateCredentials(data);
    const user = await getUserByEmail(credentialsReceived.email);

    const passwordHashed = hash(credentialsReceived.password);

    if (passwordHashed !== user.password) {
      throw new AuthorizeError(INVALID_CREDENTIALS);
    }

    const userJWT: UserJWT = {
      id: user.id,
      email: user.email,
      image: user.image,
      name: user.name,
    };
    return userJWT;
  } catch (error) {
    throw error;
  }
};
