import { LOGIN_PAGE_ROUTE } from "@/constanst";
import { Credentials } from "@/types";
import { Locator, Page } from "@playwright/test";

export class RegisterPage {
  private readonly userEmailTextField: Locator;
  private readonly userPasswordTextField: Locator;
  private readonly registerButton: Locator;

  constructor(public readonly page: Page) {
    this.userEmailTextField = this.page.getByTestId("textfield-user-email");
    this.userPasswordTextField = this.page.getByTestId(
      "textfield-user-password"
    );
    this.registerButton = this.page.getByTestId("credentials-submit-button");
  }

  async goto() {
    await this.page.goto(LOGIN_PAGE_ROUTE);
    const registerLink = this.page.getByTestId("register-link");
    await registerLink.click();
  }

  async submitCredentials(credentials: Credentials) {
    await this.userEmailTextField.fill(credentials.email);
    await this.userPasswordTextField.fill(credentials.password);
    await this.registerButton.click();
  }

}
