import { test as baseTest, request, expect } from "@playwright/test";
import fs from "fs";
import path from "path";
import { getRandomDummyCredentialsById } from "../dummies";
import { PROFILE_PAGE_ROUTE, REGISTER_API_ROUTE } from "@/constanst";
import { CredentialsForm } from "./page-object-models/credentials-form";

export const test = baseTest.extend<{}, { workerStorageState: string }>({
  storageState: ({ workerStorageState }, use) => use(workerStorageState),

  workerStorageState: [
    async ({ browser }, use) => {
      // Use parallelIndex as a unique identifier for each worker.
      const id = test.info().parallelIndex;
      const fileName = path.resolve(
        test.info().project.outputDir,
        `.auth/${id}.json`
      );

      if (fs.existsSync(fileName)) {
        // Reuse existing authentication state if any.
        await use(fileName);
        return;
      }

      // Important: make sure we authenticate in a clean environment by unsetting storage state.
      const page = await browser.newPage({
        baseURL: process.env.BASE_URL,
        storageState: undefined,
      });

      // Acquire a unique account, for example create a new one.
      // Alternatively, you can have a list of precreated accounts for testing.
      // Make sure that accounts are unique, so that multiple team members
      // can run tests at the same time without interference.
      const credentials = await getRandomDummyCredentialsById(id);

      // Perform authentication steps. Replace these actions with your own.

      await page.request.post(REGISTER_API_ROUTE, {
        data: credentials,
      });

      const credentialsForm = new CredentialsForm(page, "sign-in");
      await credentialsForm.goto();
      await credentialsForm.submitCredentials(credentials);

      // Wait until the page receives the cookies.
      //
      // Sometimes login flow sets cookies in the process of several redirects.
      // Wait for the final URL to ensure that the cookies are actually set.
      await page.waitForURL(`**${PROFILE_PAGE_ROUTE}`);

      // End of authentication steps.

      await page.context().storageState({ path: fileName });
      await page.close();
      await use(fileName);
    },
    { scope: "worker" },
  ],
});

test("When I am authenticated and go to profile page then it should show the basic user info ", async ({
  page,
}) => {
  await page.goto(PROFILE_PAGE_ROUTE);

  const profileInfoSection = await page.getByTestId("profile-info-section");

  await expect(profileInfoSection).toBeVisible();
});
