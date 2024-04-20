import { INVALID_CREDENTIALS, LOGIN_PAGE_ROUTE } from "@/constanst";
import { test, expect } from "@playwright/test";
import { credentialsDummy } from "../dummies";

test("When I fill the login form and press submit button but the user does not exist then I will be shown an error message", async ({
  page,
}) => {
  page.goto(LOGIN_PAGE_ROUTE);
  const userEmailTextField = page.getByTestId("textfield-user-email");
  const userPasswordTextField = page.getByTestId("textfield-user-password");

  await userEmailTextField.fill(credentialsDummy.email);
  await userPasswordTextField.fill(credentialsDummy.password);

  const loginButton = page.getByTestId("login-button");
  await loginButton.click();
  await page.waitForSelector('[data-testid="error-messages"]');

  const errorMessages = await page.getByTestId("error-messages");

  await expect(errorMessages).toContainText(INVALID_CREDENTIALS);
});

/* test("When I fill the login form and press submit button then I will be redirected to profile page", async ({
  page,
}) => {}); */
