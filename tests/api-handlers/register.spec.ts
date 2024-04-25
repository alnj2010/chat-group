import {
  API_ERROR_INTERNAL_SERVER,
  API_ERROR_NOT_FOUND,
  API_SUCCESS_SIGN_UP,
  EMAIL_ALREADY_EXIST,
  EMAIL_FIELD_IS_REQUIRED,
  EMAIL_FIELD_MUST_BE_A_STRING,
  EMAIL_IS_INVALID,
  PASSWORD_FIELD_IS_REQUIRED,
  PASSWORD_FIELD_LENGTH_IS_TOO_SHORT,
  PASSWORD_FIELD_MUST_BE_A_STRING,
} from "@/constanst";
import handler from "@/pages/api/auth/register";
import { createMocks } from "node-mocks-http";
import { APIData, APIErrorData } from "@/types";
import { credentialsDummy } from "../dummies";
import { userEmailExist } from "@/lib/db";

jest.mock("@/lib/db", () => {
  return {
    createUserByCredentials: jest.fn(),
    userEmailExist: jest.fn().mockResolvedValue(false),
  };
});

describe("Register handler", () => {
  beforeEach(() => {});

  it("When a request is received with a invalid http method should return a code 404", async () => {
    const { req, res } = createMocks({
      method: "GET",
    });

    // @ts-ignore
    await handler(req, res);

    const payload = res._getJSONData() as APIErrorData;
    expect(res.statusCode).toBe(404);
    expect(payload.errors).toContain(API_ERROR_NOT_FOUND);
  });

  it("When a POST request is received with an empty body should return a code 400", async () => {
    const { req, res } = createMocks({
      method: "POST",
    });

    // @ts-ignore
    await handler(req, res);

    const payload = res._getJSONData() as APIErrorData;
    expect(res.statusCode).toBe(400);
    expect(payload.errors).toContain(EMAIL_FIELD_IS_REQUIRED);
    expect(payload.errors).toContain(PASSWORD_FIELD_IS_REQUIRED);
  });

  it("When a POST request is received with a body that has null credentials should return a code 400 with a list of errors", async () => {
    const { req, res } = createMocks({
      method: "POST",
      body: { email: null, password: null },
    });

    // @ts-ignore
    await handler(req, res);

    const payload = res._getJSONData() as APIErrorData;
    expect(res.statusCode).toBe(400);
    expect(payload.errors).toContain(EMAIL_FIELD_MUST_BE_A_STRING);
    expect(payload.errors).toContain(PASSWORD_FIELD_MUST_BE_A_STRING);
  });

  it("When a POST request is received with a body that has bad credentials should return a code 400 with a list of errors", async () => {
    const { req, res } = createMocks({
      method: "POST",
      body: { email: "invalidemail", password: "123" },
    });

    // @ts-ignore
    await handler(req, res);

    const payload = res._getJSONData() as APIErrorData;
    expect(res.statusCode).toBe(400);
    expect(payload.errors).toContain(EMAIL_IS_INVALID);
    expect(payload.errors).toContain(PASSWORD_FIELD_LENGTH_IS_TOO_SHORT);
  });
  it("When a POST request is received but an error in db occurs should return a code 500", async () => {
    (userEmailExist as jest.Mock).mockRejectedValueOnce(
      new Error("internal error")
    );
    const { req, res } = createMocks({
      method: "POST",
      body: credentialsDummy,
    });

    // @ts-ignore
    await handler(req, res);

    const payload = res._getJSONData() as APIErrorData;
    expect(res.statusCode).toBe(500);
    expect(payload.errors).toContain(API_ERROR_INTERNAL_SERVER);
  });
  it("When a POST request is received but email already exist should return a code 400 with a list of errors", async () => {
    (userEmailExist as jest.Mock).mockResolvedValueOnce(true);

    const { req, res } = createMocks({
      method: "POST",
      body: credentialsDummy,
    });

    // @ts-ignore
    await handler(req, res);

    const payload = res._getJSONData() as APIErrorData;
    expect(res.statusCode).toBe(400);
    expect(payload.errors).toContain(EMAIL_ALREADY_EXIST);
  });
  it("When a POST request is received should return 200 if it is OK", async () => {
    const { req, res } = createMocks({
      method: "POST",
      body: credentialsDummy,
    });

    // @ts-ignore
    await handler(req, res);

    const payload = res._getJSONData() as APIData;
    expect(res.statusCode).toBe(200);
    expect(payload.data).toBe(API_SUCCESS_SIGN_UP);
  });
});
