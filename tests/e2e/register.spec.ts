import {
  EDIT_PROFILE_PAGE_ROUTE,
  EMAIL_ALREADY_EXIST,
  REGISTER_API_ROUTE,
} from "@/constanst";
import { test as base, expect } from "@playwright/test";
import { RegisterPage } from "./fixtures/register-page";
import { getRandomCredentialsByBrowserName } from "../dummies";

const test = base.extend<{ registerPage: RegisterPage }>({
  registerPage: async ({ page }, use) => {
    const registerPage = new RegisterPage(page);

    registerPage.goto();

    use(registerPage);
  },
});

test("When I correctly fill the register form and press submit button then I will be redirected to edit profile page", async ({
  registerPage,
  browserName,
  page,
}) => {
  const credentials = getRandomCredentialsByBrowserName(browserName);
  await registerPage.submitCredentials(credentials);
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
  registerPage,
}) => {
  const credentials = getRandomCredentialsByBrowserName(browserName);

  await request.post(REGISTER_API_ROUTE, {
    data: credentials,
  });

  await registerPage.submitCredentials(credentials);
  await page.waitForSelector('[data-testid="sign-up-error-messages"]');

  const errorMessages = await page.getByTestId("sign-up-error-messages");

  await expect(errorMessages).toContainText(EMAIL_ALREADY_EXIST);
});
