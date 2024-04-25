import {
  INVALID_CREDENTIALS,
  PROFILE_PAGE_ROUTE,
  REGISTER_API_ROUTE,
} from "@/constanst";
import { test as base, expect } from "@playwright/test";
import {
  credentialsDummy,
  getRandomCredentialsByBrowserName,
} from "../dummies";
import { CredentialsForm } from "./fixtures/credentials-form";

const test = base.extend<{ credentialsForm: CredentialsForm }>({
  credentialsForm: async ({ page }, use) => {
    const credentialsForm = new CredentialsForm(page, "sign-in");

    credentialsForm.goto();

    use(credentialsForm);
  },
});

test("When I fill the login form and press submit button but the user does not exist then I will be shown an error message", async ({
  page,
  credentialsForm,
}) => {
  await credentialsForm.submitCredentials(credentialsDummy);
  await page.waitForSelector('[data-testid="sign-in-error-messages"]');

  const errorMessages = await page.getByTestId("sign-in-error-messages");

  await expect(errorMessages).toContainText(INVALID_CREDENTIALS);
});

test("When I fill the login form and press submit button but the email is not right then I will be shown an error message", async ({
  page,
  browserName,
  request,
  credentialsForm,
}) => {
  const credentials = getRandomCredentialsByBrowserName(browserName);

  await request.post(REGISTER_API_ROUTE, {
    data: credentials,
  });

  await credentialsForm.submitCredentials({
    ...credentials,
    password: "invalidpassword",
  });

  await page.waitForSelector('[data-testid="sign-in-error-messages"]');

  const errorMessages = await page.getByTestId("sign-in-error-messages");

  await expect(errorMessages).toContainText(INVALID_CREDENTIALS);
});

test("When I fill the login form and press submit button then I will be redirected to profile page", async ({
  page,
  browserName,
  request,
  credentialsForm,
}) => {
  const credentials = getRandomCredentialsByBrowserName(browserName);

  await request.post(REGISTER_API_ROUTE, {
    data: credentials,
  });

  await credentialsForm.submitCredentials(credentials);
  await page.waitForURL(`**${PROFILE_PAGE_ROUTE}`);

  const profileInfoSection = await page.getByTestId("profile-info-section");

  const cookies = await page.context().cookies();

  await expect(
    cookies.find((c) => c.name === "next-auth.session-token")
  ).toBeDefined();
  await expect(profileInfoSection).toBeVisible();
});
