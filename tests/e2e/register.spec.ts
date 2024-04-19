import {
  EDIT_PROFILE_PAGE_ROUTE,
  EMAIL_ALREADY_EXIST,
  LOGIN_PAGE_ROUTE,
  REGISTER_API_ROUTE,
} from "@/constanst";
import { Credentials } from "@/types";
import { test, expect, Page } from "@playwright/test";

function getRandomCredentialsByBrowserName(browserName: string): Credentials {
  const id = Math.random().toString().substring(2, 5);
  const credentials: Credentials = {
    email: `userDummy${browserName}${id}${Date.now()}@email.com`,
    password: "passwordDummy",
  };
  return credentials;
}

async function submitCredentials(page: Page, credentials: Credentials) {
  const userEmailTextField = page.getByTestId("textfield-user-email");
  const userPasswordTextField = page.getByTestId("textfield-user-password");

  await userEmailTextField.fill(credentials.email);
  await userPasswordTextField.fill(credentials.password);

  const registerButton = page.getByTestId("register-button");
  await registerButton.click();
}

test.describe("Register Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(LOGIN_PAGE_ROUTE);
    const registerLink = page.getByTestId("register-link");
    await registerLink.click();
  });

  test("When I correctly fill the register form and press submit button then I will be redirected to edit profile page", async ({
    page,
    browserName,
  }) => {
    const credentials = getRandomCredentialsByBrowserName(browserName);
    await submitCredentials(page, credentials);
    await page.waitForURL(`**${EDIT_PROFILE_PAGE_ROUTE}`);

    const changeInfoSection = await page.getByTestId("change-info-section");

    const cookies = await page.context().cookies();

    await expect(
      cookies.find((c) => c.name === "next-auth.session-token")
    ).toBeDefined();
    await expect(changeInfoSection).toBeVisible();
  });

  test("When I fill the register form and press submit button but the email is duplicated in the system then it will be shown an error message", async ({
    page,
    request,
    browserName,
  }) => {
    const credentials = getRandomCredentialsByBrowserName(browserName);

    await request.post(REGISTER_API_ROUTE, {
      data: credentials,
    });

    await submitCredentials(page, credentials);
    await page.waitForSelector('[data-testid="error-messages"]');

    const errorMessages = await page.getByTestId("error-messages");

    await expect(errorMessages).toContainText(EMAIL_ALREADY_EXIST);
  });
});
