import {
  EDIT_PROFILE_PAGE_ROUTE,
  EMAIL_ALREADY_EXIST,
  REGISTER_API_ROUTE,
} from "@/constanst";
import { test as base, expect } from "@playwright/test";
import { getRandomCredentialsByBrowserName } from "../dummies";
import { CredentialsForm } from "./fixtures/credentials-form";

const test = base.extend<{ credentialsForm: CredentialsForm }>({
  credentialsForm: async ({ page }, use) => {
    const credentialsForm = new CredentialsForm(page, "sign-up");

    credentialsForm.goto();
    const registerLink = page.getByTestId("jump-to");
    await registerLink.click();

    use(credentialsForm);
  },
});

test("When I correctly fill the register form and press submit button then I will be redirected to edit profile page", async ({
  credentialsForm,
  browserName,
  page,
}) => {
  const credentials = getRandomCredentialsByBrowserName(browserName);
  await credentialsForm.submitCredentials(credentials);
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
  credentialsForm,
}) => {
  const credentials = getRandomCredentialsByBrowserName(browserName);

  await request.post(REGISTER_API_ROUTE, {
    data: credentials,
  });

  await credentialsForm.submitCredentials(credentials);
  await page.waitForSelector('[data-testid="sign-up-error-messages"]');

  const errorMessages = await page.getByTestId("sign-up-error-messages");

  await expect(errorMessages).toContainText(EMAIL_ALREADY_EXIST);
});
