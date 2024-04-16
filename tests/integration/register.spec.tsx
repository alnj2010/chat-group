import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import Register from "@/pages/register";
import mockRouter from "next-router-mock";
import { MemoryRouterProvider } from "next-router-mock/MemoryRouterProvider";

jest.mock("next/router", () => require("next-router-mock"));

const userAuthDummy = { email: "userDummy@email.com", password: "1234" };
describe("Register page", () => {
  beforeEach(() => {
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
    expect(mockRouter.asPath).toEqual("/");
  });

  it("When there is not info in the text fields the register button is disabled", async () => {
    const registerButton = screen.getByTestId("register-button");
    expect(registerButton.hasAttribute("disabled")).toBeTruthy();
  });

  it("When register textfields are filled the register button should be active", async () => {
    const textFieldUserEmail = screen.getByTestId("textfield-user-email");
    const textFieldUserPassword = screen.getByTestId("textfield-user-password");
    await userEvent.type(textFieldUserEmail, userAuthDummy.email);
    await userEvent.type(textFieldUserPassword, userAuthDummy.password);

    const registerButton = screen.getByTestId("register-button");

    expect(registerButton.hasAttribute("disabled")).toBeFalsy();
  });

  it("When register form is submited but there is a invalid email should show a messages error", async () => {
    const textFieldUserEmail = screen.getByTestId("textfield-user-email");
    const textFieldUserPassword = screen.getByTestId("textfield-user-password");

    await userEvent.type(textFieldUserEmail, "invalidemail");
    await userEvent.type(textFieldUserPassword, userAuthDummy.password);

    const registerButton = screen.getByTestId("register-button");

    await userEvent.click(registerButton);

    const errorMessages = screen.getByTestId("error-messages");
    expect(errorMessages.childElementCount).toBe(1);
    expect(errorMessages.firstChild?.textContent).toContain("Invalid email");
  });

  it("When register form is submited but there is a with less than (4) characters should show a messages error", async () => {
    const textFieldUserEmail = screen.getByTestId("textfield-user-email");
    const textFieldUserPassword = screen.getByTestId("textfield-user-password");

    await userEvent.type(textFieldUserEmail, userAuthDummy.email);
    await userEvent.type(textFieldUserPassword, "123");

    const registerButton = screen.getByTestId("register-button");

    await userEvent.click(registerButton);

    const errorMessages = screen.getByTestId("error-messages");
    expect(errorMessages.childElementCount).toBe(1);
    expect(errorMessages.firstChild?.textContent).toContain(
      "Password length must be greater than 4 character"
    );
  });
});
