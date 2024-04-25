import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import Register from "@/pages/register";
import mockRouter from "next-router-mock";
import { MemoryRouterProvider } from "next-router-mock/MemoryRouterProvider";
import { enableFetchMocks } from "jest-fetch-mock";
import { EDIT_PROFILE_PAGE_ROUTE, LOGIN_PAGE_ROUTE } from "@/constanst";
import { credentialsDummy } from "../dummies";

jest.mock("next-auth/react", () => {
  return {
    signIn: jest.fn().mockReturnValue({ ok: true }),
  };
});
jest.mock("next/router", () => require("next-router-mock"));
enableFetchMocks();

describe("Register page", () => {
  beforeEach(() => {
    render(<Register />, { wrapper: MemoryRouterProvider });
  });

  it("Should render properly", () => {
    screen.getByTestId("sign-up-credentials-form");

    screen.getByTestId("google-provider");
    screen.getByTestId("facebook-provider");
    screen.getByTestId("twitter-provider");
    screen.getByTestId("github-provider");
    screen.getByTestId("jump-to");
  });

  it("When Login Link is clicked should go to login page", async () => {
    const loginLink = screen.getByTestId("jump-to");
    await userEvent.click(loginLink);
    expect(mockRouter.asPath).toEqual(LOGIN_PAGE_ROUTE);
  });

  it("When credentials form is submited correctly should go to the edit profile page", async () => {
    fetchMock.mockResponseOnce("", {
      status: 200,
    });

    const textFieldUserEmail = screen.getByTestId("sign-up-textfield-user-email");
    const textFieldUserPassword = screen.getByTestId("sign-up-textfield-user-password");

    await userEvent.type(textFieldUserEmail, credentialsDummy.email);
    await userEvent.type(textFieldUserPassword, credentialsDummy.password);

    const credentialsSubmitButton = screen.getByTestId(
      "sign-up-credentials-submit-button"
    );

    await userEvent.click(credentialsSubmitButton);

    expect(mockRouter.asPath).toEqual(EDIT_PROFILE_PAGE_ROUTE);
  });
});
