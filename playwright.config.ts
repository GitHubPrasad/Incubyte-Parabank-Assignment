import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  // Tell Playwright where our test files live
  testDir: "./src/tests",

  // Run tests sequentially (not in parallel) - easier to debug while learning
  fullyParallel: false,

  // Fail the build if you accidentally left test.only in source
  forbidOnly: !!process.env.CI,

  // No retries for now
  retries: 0,

  // One worker = one browser at a time
  workers: 1,

  // Reporter - shows results in terminal + generates HTML report
  reporter: [
    ["list"],
    ["html", { outputFolder: "reports/html-report", open: "never" }],
  ],

  use: {
    // Base URL of our application
    baseURL: "https://parabank.parasoft.com",

    // Save screenshots on failure automatically
    screenshot: "only-on-failure",

    // Save videos on failure
    video: "retain-on-failure",

    // See the browser while tests run (false = headless/invisible)
    headless: false,

    // Each action timeout
    actionTimeout: 15000,

    // Navigation timeout
    navigationTimeout: 30000,
  },

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
