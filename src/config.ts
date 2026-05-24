import * as dotenv from "dotenv";

// Load .env file
dotenv.config();

export const config = {
  baseURL: process.env.BASE_URL || "https://parabank.parasoft.com",
  browser: process.env.BROWSER || "chromium",
  headless: process.env.HEADLESS === "true",
  timeout: parseInt(process.env.TIMEOUT || "30000"),
  paths: {
    home: "/parabank/index.htm",
    register: "/parabank/register.htm",
    overview: "/parabank/overview.htm",
  },
};
