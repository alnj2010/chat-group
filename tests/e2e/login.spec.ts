import {
  INVALID_CREDENTIALS,
  LOGIN_PAGE_ROUTE,
  PROFILE_PAGE_ROUTE,
  REGISTER_API_ROUTE,
} from "@/constanst";
import { test, expect } from "@playwright/test";
import {
  credentialsDummy,
  getRandomCredentialsByBrowserName,
} from "../dummies";

test.describe(() => {
  test("When I fill the login form and press submit button but the user does not exist then I will be shown an error message", async ({
    page,
  }) => {
    page.goto(LOGIN_PAGE_ROUTE);
    const userEmailTextField = page.getByTestId("sign-in-textfield-user-email");
    const userPasswordTextField = page.getByTestId(
      "sign-in-textfield-user-password"
    );

    await userEmailTextField.fill(credentialsDummy.email);
    await userPasswordTextField.fill(credentialsDummy.password);

    const loginButton = page.getByTestId("sign-in-credentials-submit-button");
    await loginButton.click();
    await page.waitForSelector('[data-testid="sign-in-error-messages"]');

    const errorMessages = await page.getByTestId("sign-in-error-messages");

    await expect(errorMessages).toContainText(INVALID_CREDENTIALS);
  });

  test("When I fill the login form and press submit button but the email is not right then I will be shown an error message", async ({
    page,
    browserName,
    request,
  }) => {
    const credentials = getRandomCredentialsByBrowserName(browserName);

    await request.post(REGISTER_API_ROUTE, {
      data: credentials,
    });

    page.goto(LOGIN_PAGE_ROUTE);
    const userEmailTextField = page.getByTestId("sign-in-textfield-user-email");
    const userPasswordTextField = page.getByTestId(
      "sign-in-textfield-user-password"
    );

    await userEmailTextField.fill(credentials.email);
    await userPasswordTextField.fill("43223");

    const loginButton = page.getByTestId("sign-in-credentials-submit-button");
    await loginButton.click();
    await page.waitForSelector('[data-testid="sign-in-error-messages"]');

    const errorMessages = await page.getByTestId("sign-in-error-messages");

    await expect(errorMessages).toContainText(INVALID_CREDENTIALS);
  });

  test("When I fill the login form and press submit button then I will be redirected to profile page", async ({
    page,
    browserName,
    request,
  }) => {
    const credentials = getRandomCredentialsByBrowserName(browserName);

    await request.post(REGISTER_API_ROUTE, {
      data: credentials,
    });

    page.goto(LOGIN_PAGE_ROUTE);
    const userEmailTextField = page.getByTestId("sign-in-textfield-user-email");
    const userPasswordTextField = page.getByTestId(
      "sign-in-textfield-user-password"
    );

    await userEmailTextField.fill(credentials.email);
    await userPasswordTextField.fill(credentials.password);

    const loginButton = page.getByTestId("sign-in-credentials-submit-button");
    await loginButton.click();
    await page.waitForURL(`**${PROFILE_PAGE_ROUTE}`);

    const profileInfoSection = await page.getByTestId("profile-info-section");

    const cookies = await page.context().cookies();

    await expect(
      cookies.find((c) => c.name === "next-auth.session-token")
    ).toBeDefined();
    await expect(profileInfoSection).toBeVisible();
  });
});
