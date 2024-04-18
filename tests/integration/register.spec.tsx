import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import Register from "@/pages/register";
import mockRouter from "next-router-mock";
import { MemoryRouterProvider } from "next-router-mock/MemoryRouterProvider";
import { enableFetchMocks } from "jest-fetch-mock";
import {
  EDIT_PROFILE_PAGE_ROUTE,
  EMAIL_ALREADY_EXIST,
  EMAIL_IS_INVALID,
  LOGIN_PAGE_ROUTE,
  PASSWORD_FIELD_LENGTH_IS_TOO_SHORT,
} from "@/constanst";
import { credentialsDummy } from "../dummies";
import { APIErrorData } from "@/types";

jest.mock("next-auth/react", () => {
  return {
    signIn: jest.fn().mockReturnValue({ ok: true }),
  };
});
jest.mock("next/router", () => require("next-router-mock"));
enableFetchMocks();

describe("Register page", () => {
  beforeEach(() => {
    //fetchMock.doMock();
    render(<Register />, { wrapper: MemoryRouterProvider });
  });

  it("Should render properly", () => {
    screen.getByTestId("textfield-user-email");
    screen.getByTestId("textfield-user-password");
    screen.getByTestId("register-button");
    screen.getByTestId("google-provider");
    screen.getByTestId("facebook-provider");
    screen.getByTestId("twitter-provider");
    screen.getByTestId("github-provider");
    screen.getByTestId("login-link");
    expect(screen.queryByTestId("error-messages")).toBeNull();
  });

  it("When Login Link is clicked should go to login page", async () => {
    const loginLink = screen.getByTestId("login-link");
    await userEvent.click(loginLink);
    expect(mockRouter.asPath).toEqual(LOGIN_PAGE_ROUTE);
  });

  it("When there is not info in the text fields the register button is disabled", async () => {
    const registerButton = screen.getByTestId("register-button");
    expect(registerButton.hasAttribute("disabled")).toBeTruthy();
  });

  it("When register textfields are filled the register button should be active", async () => {
    const textFieldUserEmail = screen.getByTestId("textfield-user-email");
    const textFieldUserPassword = screen.getByTestId("textfield-user-password");
    await userEvent.type(textFieldUserEmail, credentialsDummy.email);
    await userEvent.type(textFieldUserPassword, credentialsDummy.password);

    const registerButton = screen.getByTestId("register-button");

    expect(registerButton.hasAttribute("disabled")).toBeFalsy();
  });

  it("When register form is submited but there is a invalid email should show a messages error", async () => {
    const textFieldUserEmail = screen.getByTestId("textfield-user-email");
    const textFieldUserPassword = screen.getByTestId("textfield-user-password");

    await userEvent.type(textFieldUserEmail, "invalidemail");
    await userEvent.type(textFieldUserPassword, credentialsDummy.password);

    const registerButton = screen.getByTestId("register-button");

    await userEvent.click(registerButton);

    const errorMessages = screen.getByTestId("error-messages");
    expect(errorMessages.childElementCount).toBe(1);
    expect(errorMessages.firstChild?.textContent).toContain(EMAIL_IS_INVALID);
  });

  it("When register form is submited but there is a with less than (4) characters should show a messages error", async () => {
    const textFieldUserEmail = screen.getByTestId("textfield-user-email");
    const textFieldUserPassword = screen.getByTestId("textfield-user-password");

    await userEvent.type(textFieldUserEmail, credentialsDummy.email);
    await userEvent.type(textFieldUserPassword, "123");

    const registerButton = screen.getByTestId("register-button");

    await userEvent.click(registerButton);

    const errorMessages = screen.getByTestId("error-messages");
    expect(errorMessages.childElementCount).toBe(1);
    expect(errorMessages.firstChild?.textContent).toContain(
      PASSWORD_FIELD_LENGTH_IS_TOO_SHORT
    );
  });

  it("When register form is submited but the user already exist should show a messages error", async () => {
    const apiErrorsDataDummy: APIErrorData = { errors: [EMAIL_ALREADY_EXIST] };
    fetchMock.mockResponseOnce(JSON.stringify(apiErrorsDataDummy), {
      status: 409,
    });

    const textFieldUserEmail = screen.getByTestId("textfield-user-email");
    const textFieldUserPassword = screen.getByTestId("textfield-user-password");

    await userEvent.type(textFieldUserEmail, credentialsDummy.email);
    await userEvent.type(textFieldUserPassword, credentialsDummy.password);

    const registerButton = screen.getByTestId("register-button");

    await userEvent.click(registerButton);

    const errorMessages = screen.getByTestId("error-messages");
    expect(errorMessages.childElementCount).toBe(1);
    expect(errorMessages.firstChild?.textContent).toContain(
      EMAIL_ALREADY_EXIST
    );
  });

  it("When register form is submited correctly should go to the edit profile page", async () => {
    fetchMock.mockResponseOnce("", {
      status: 200,
    });

    const textFieldUserEmail = screen.getByTestId("textfield-user-email");
    const textFieldUserPassword = screen.getByTestId("textfield-user-password");

    await userEvent.type(textFieldUserEmail, credentialsDummy.email);
    await userEvent.type(textFieldUserPassword, credentialsDummy.password);

    const registerButton = screen.getByTestId("register-button");

    await userEvent.click(registerButton);

    expect(mockRouter.asPath).toEqual(EDIT_PROFILE_PAGE_ROUTE);
  });
});
