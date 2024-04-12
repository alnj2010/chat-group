import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Register from "@/pages/register";
import { MemoryRouterProvider } from "next-router-mock/MemoryRouterProvider";

jest.mock("next/router", () => require("next-router-mock"));

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

  /* it("When Login Link is clicked should go to login page", async () => {
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
      await submitAuthForm("register", {
        password: userAuthDummy.password,
        email: "invalidemail",
      });
  
      const errorMessages = screen.getByTestId("error-messages");
      expect(errorMessages.childElementCount).toBe(1);
      expect(errorMessages.firstChild?.textContent).toContain(
        invalidFieldMsg("email")
      );
    });
  
    it("When register form is submited but there is a with less than (4) characters should show a messages error", async () => {
      await submitAuthForm("register", {
        password: "p",
        email: userAuthDummy.email,
      });
  
      const errorMessages = screen.getByTestId("error-messages");
      expect(errorMessages.childElementCount).toBe(1);
      expect(errorMessages.firstChild?.textContent).toContain(
        lessThan4CharsFieldMsg("password")
      );
    });
  
    it("When register form is submited with valid data should go to profile page", async () => {
      jest.spyOn(apiUtil, "post").mockResolvedValue({
        ok: true,
        data: { code: 200 },
      });
  
      await submitAuthForm("register", userAuthDummy);
  
      expect((apiUtil.post as jest.Mock).mock.lastCall[1]).toEqual({
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userAuthDummy),
      });
      expect(mockRouter.asPath).toEqual("/profile/edit");
    });
  
    it("When register form is submited with existing user should show error messages", async () => {
      jest
        .spyOn(apiUtil, "post")
        .mockRejectedValue(
          new ApiError(400, REGISTER_SERVICE_ERROR_EXISTING_USER)
        );
      await submitAuthForm("register", userAuthDummy);
  
      const errorMessages = screen.getByTestId("error-messages");
      expect(errorMessages.childElementCount).toBe(1);
      expect(errorMessages.firstChild?.textContent).toContain(
        REGISTER_SERVICE_ERROR_EXISTING_USER
      );
      expect((apiUtil.post as jest.Mock).mock.lastCall[1]).toEqual({
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userAuthDummy),
      });
    });
  
    it("When register form is submited with valid data but a error service occurred should go to error page", async () => {
      jest
        .spyOn(apiUtil, "post")
        .mockRejectedValue(new InternalONotFoundApiError("some error"));
  
      await submitAuthForm("register", userAuthDummy);
  
      expect((apiUtil.post as jest.Mock).mock.lastCall[1]).toEqual({
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userAuthDummy),
      });
      expect(mockRouter.asPath).toEqual("/500");
    }); */
});
