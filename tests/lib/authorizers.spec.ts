import { INVALID_CREDENTIALS } from "@/constanst";

import { credentialsDummy, userDummy, userJWTDummy } from "../dummies";
import { getUserByEmail } from "@/lib/db";
import { authorizeCredentials } from "@/lib/authorizers";
import ValidatorError from "@/errors/validator-error";
import DBError from "@/errors/db-error";
import AuthorizeError from "@/errors/authorize-error";
import { hash } from "@/lib/crypto";

jest.mock("@/lib/db", () => {
  return {
    getUserByEmail: jest.fn().mockResolvedValue(userDummy),
  };
});

jest.mock("@/lib/crypto", () => {
  return {
    hash: jest.fn().mockReturnValue(userDummy.password),
  };
});

describe("Credentials Authorizer", () => {
  beforeEach(() => {});

  it("When Credentials are received with empty values should return an errors", async () => {
    expect.assertions(1);
    try {
      await authorizeCredentials({ email: "", password: "" });
    } catch (error) {
      expect(error).toBeInstanceOf(ValidatorError);
    }
  });

  it("When there is an error fetching the credentials from DB should return an errors", async () => {
    (getUserByEmail as jest.Mock).mockRejectedValueOnce(new DBError(""));

    expect.assertions(1);
    try {
      await authorizeCredentials(credentialsDummy);
    } catch (error) {
      expect(error).toBeInstanceOf(DBError);
    }
  });

  it("When the received password is different to stored password should return an error", async () => {
    (hash as jest.Mock).mockReturnValueOnce("different-password");

    expect.assertions(2);
    try {
      await authorizeCredentials(credentialsDummy);
    } catch (error) {
      expect(error).toBeInstanceOf(AuthorizeError);
      expect((error as AuthorizeError).message).toBe(INVALID_CREDENTIALS);
    }
  });

  it("When the received credentials are OK should return user jwt payload", async () => {
    const data = await authorizeCredentials(credentialsDummy);
    expect(data).toEqual(userJWTDummy);
  });
});
