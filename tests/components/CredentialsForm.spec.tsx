import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import {
  EMAIL_ALREADY_EXIST,
  EMAIL_IS_INVALID,
  PASSWORD_FIELD_LENGTH_IS_TOO_SHORT,
} from "@/constanst";
import { credentialsDummy } from "../dummies";
import { MemoryRouterProvider } from "next-router-mock/MemoryRouterProvider";
import CredentialsForm from "@/components/CredentialsForm";
import FormValidationError from "@/errors/form-validation-error";

describe("CredentialsForm", () => {
  let action: jest.Mock;
  beforeEach(() => {
    action = jest.fn();
    render(<CredentialsForm textButton="" action={action} redirectTo="/" />, {
      wrapper: MemoryRouterProvider,
    });
  });

  it("Should render properly", () => {
    screen.getByTestId("textfield-user-email");
    screen.getByTestId("textfield-user-password");
    screen.getByTestId("credentials-submit-button");

    expect(screen.queryByTestId("error-messages")).toBeNull();
  });

  it("When there is not info in the text fields the credentials submit button is disabled", async () => {
    const submitButton = screen.getByTestId("credentials-submit-button");
    expect(submitButton.hasAttribute("disabled")).toBeTruthy();
  });

  it("When credentials form textfields are filled the credentials submit button should be active", async () => {
    const textFieldUserEmail = screen.getByTestId("textfield-user-email");
    const textFieldUserPassword = screen.getByTestId("textfield-user-password");
    await userEvent.type(textFieldUserEmail, credentialsDummy.email);
    await userEvent.type(textFieldUserPassword, credentialsDummy.password);

    const submitButton = screen.getByTestId("credentials-submit-button");

    expect(submitButton.hasAttribute("disabled")).toBeFalsy();
  });

  it("When credentials form is submited but there is a invalid email should show a messages error", async () => {
    const textFieldUserEmail = screen.getByTestId("textfield-user-email");
    const textFieldUserPassword = screen.getByTestId("textfield-user-password");

    await userEvent.type(textFieldUserEmail, "invalidemail");
    await userEvent.type(textFieldUserPassword, credentialsDummy.password);

    const submitButton = screen.getByTestId("credentials-submit-button");

    await userEvent.click(submitButton);

    const errorMessages = screen.getByTestId("error-messages");
    expect(errorMessages.childElementCount).toBe(1);
    expect(errorMessages.firstChild?.textContent).toContain(EMAIL_IS_INVALID);
  });

  it("When credentials form is submited but there is a with less than (4) characters should show a messages error", async () => {
    const textFieldUserEmail = screen.getByTestId("textfield-user-email");
    const textFieldUserPassword = screen.getByTestId("textfield-user-password");

    await userEvent.type(textFieldUserEmail, credentialsDummy.email);
    await userEvent.type(textFieldUserPassword, "123");

    const submitButton = screen.getByTestId("credentials-submit-button");

    await userEvent.click(submitButton);

    const errorMessages = screen.getByTestId("error-messages");
    expect(errorMessages.childElementCount).toBe(1);
    expect(errorMessages.firstChild?.textContent).toContain(
      PASSWORD_FIELD_LENGTH_IS_TOO_SHORT
    );
  });

  it("When credentials form is submited but the user there is a server error message should show it", async () => {
    action.mockRejectedValueOnce(
      new FormValidationError([EMAIL_ALREADY_EXIST])
    );

    const textFieldUserEmail = screen.getByTestId("textfield-user-email");
    const textFieldUserPassword = screen.getByTestId("textfield-user-password");

    await userEvent.type(textFieldUserEmail, credentialsDummy.email);
    await userEvent.type(textFieldUserPassword, credentialsDummy.password);

    const registerButton = screen.getByTestId("credentials-submit-button");

    await userEvent.click(registerButton);

    const errorMessages = screen.getByTestId("error-messages");
    expect(errorMessages.childElementCount).toBe(1);
    expect(errorMessages.firstChild?.textContent).toContain(
      EMAIL_ALREADY_EXIST
    );
  });
});
