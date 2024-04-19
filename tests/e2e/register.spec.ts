import { EDIT_PROFILE_PAGE_ROUTE, LOGIN_PAGE_ROUTE } from "@/constanst";
import { test, expect } from "@playwright/test";

test("I can register a new account", async ({ page, browserName }) => {
  await page.goto(LOGIN_PAGE_ROUTE);
  const registerLink = page.getByTestId("register-link");
  await registerLink.click();

  const userEmailTextField = page.getByTestId("textfield-user-email");
  const userPasswordTextField = page.getByTestId("textfield-user-password");
  const id = Math.random().toString().substring(2, 5);
  await userEmailTextField.fill(
    `userDummy${browserName}${id}${Date.now()}@email.com`
  );
  await userPasswordTextField.fill("passwordDummy");

  const registerButton = page.getByTestId("register-button");

  await registerButton.click();
  await page.waitForURL(`**${EDIT_PROFILE_PAGE_ROUTE}`);

  const changeInfoSection = await page.getByTestId("change-info-section");

  const cookies = await page.context().cookies();
  await expect(
    cookies.find((c) => c.name === "next-auth.session-token")
  ).toBeDefined();
  await expect(changeInfoSection).toBeVisible();
});
