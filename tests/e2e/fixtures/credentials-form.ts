import { LOGIN_PAGE_ROUTE } from "@/constanst";
import { Credentials } from "@/types";
import { Locator, Page } from "@playwright/test";

export class CredentialsForm {
  private readonly userEmailTextField: Locator;
  private readonly userPasswordTextField: Locator;
  private readonly credentialsButton: Locator;

  constructor(public readonly page: Page, idForm: "sign-in" | "sign-up") {
    this.userEmailTextField = this.page.getByTestId(
      `${idForm}-textfield-user-email`
    );
    this.userPasswordTextField = this.page.getByTestId(
      `${idForm}-textfield-user-password`
    );
    this.credentialsButton = this.page.getByTestId(
      `${idForm}-credentials-submit-button`
    );
  }

  async goto() {
    await this.page.goto(LOGIN_PAGE_ROUTE);
  }

  async submitCredentials(credentials: Credentials) {
    await this.userEmailTextField.fill(credentials.email);
    await this.userPasswordTextField.fill(credentials.password);
    await this.credentialsButton.click();
  }
}
