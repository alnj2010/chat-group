import dotenv from "dotenv";
import { defineConfig, devices } from "@playwright/test";
import path from "path";

dotenv.config({
  path: [
    path.resolve(__dirname, ".env"),
    process.env.CI
      ? path.resolve(__dirname, ".env.ci")
      : path.resolve(__dirname, ".env.test.local"),
  ],
  override: true,
});

const baseURL = process.env.BASE_URL;

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: path.join(__dirname, "/tests/e2e"),
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: "html",
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL,

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "on-first-retry",
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: "Google Chrome",
      use: { ...devices["Desktop Chrome"], channel: "chrome" },
    },
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },
    /* Test against mobile viewports. */
    {
      name: "Mobile Chrome",
      use: { ...devices["Pixel 5"] },
    },
  ],

  /* Run your local dev server before starting the tests */
  webServer: {
    command: "npm run dev:e2e",
    env: {
      NODE_ENV: "test",
    },
    url: baseURL,
    timeout: 120 * 1000,
    reuseExistingServer: !process.env.CI,
  },
});
