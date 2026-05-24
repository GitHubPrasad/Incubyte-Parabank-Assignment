import { defineConfig, devices } from "@playwright/test";
import { config } from "./src/config";

export default defineConfig({
  // Tell Playwright where our test files live
  testDir: "./src/tests",

  // Run tests sequentially (not in parallel) - easier to debug while learning
  fullyParallel: false,

  // Fail the build if you accidentally left test.only in source
  forbidOnly: !!process.env.CI,

  // No retries for now
  retries: config.retries,

  // One worker = one browser at a time
  workers: 1,

  // Reporter - shows results in terminal + generates HTML report
  reporter: [
    ["list"],
    ["html", { outputFolder: "reports/html-report", open: "never" }],
  ],

  use: {
    baseURL: config.baseURL,
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    headless: config.headless,
    actionTimeout: config.timeout / 2,
    navigationTimeout: config.timeout,
  },

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
