import { render, screen } from "@testing-library/react";
import mockRouter from "next-router-mock";

import Login from "@/pages";
import { MemoryRouterProvider } from "next-router-mock/dist/MemoryRouterProvider";
import userEvent from "@testing-library/user-event";
import { PROFILE_PAGE_ROUTE, REGISTER_PAGE_ROUTE } from "@/constanst";
import { credentialsDummy } from "../dummies";
import { enableFetchMocks } from "jest-fetch-mock";

jest.mock("next-auth/react", () => {
  return {
    signIn: jest.fn().mockReturnValue({ ok: true }),
  };
});
jest.mock("next/router", () => require("next-router-mock"));
enableFetchMocks();

describe("Login page", () => {
  beforeEach(() => {
    //fetchMock.doMock();
    render(<Login />, { wrapper: MemoryRouterProvider });
  });

  it("Should render properly", () => {
    screen.getByTestId("credentials-form");

    screen.getByTestId("google-provider");
    screen.getByTestId("facebook-provider");
    screen.getByTestId("twitter-provider");
    screen.getByTestId("github-provider");
    screen.getByTestId("jump-to");
  });

  it("When Register Link is clicked should go to register page", async () => {
    const loginLink = screen.getByTestId("jump-to");
    await userEvent.click(loginLink);
    expect(mockRouter.asPath).toEqual(REGISTER_PAGE_ROUTE);
  });

  it("When credentials form is submited correctly should go to the profile page", async () => {
    fetchMock.mockResponseOnce("", {
      status: 200,
    });

    const textFieldUserEmail = screen.getByTestId("textfield-user-email");
    const textFieldUserPassword = screen.getByTestId("textfield-user-password");

    await userEvent.type(textFieldUserEmail, credentialsDummy.email);
    await userEvent.type(textFieldUserPassword, credentialsDummy.password);

    const credentialsSubmitButton = screen.getByTestId(
      "credentials-submit-button"
    );

    await userEvent.click(credentialsSubmitButton);

    expect(mockRouter.asPath).toEqual(PROFILE_PAGE_ROUTE);
  });
});
