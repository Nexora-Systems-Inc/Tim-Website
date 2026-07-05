import { defineConfig, devices } from "@playwright/test";
import routesConfig from "./config/routes.json" with { type: "json" };

const config = routesConfig;

export default defineConfig({
  testDir: "./tests",
  fullyParallel: false,
  forbidOnly: Boolean(process.env.CI),
  retries: 0,
  workers: 1,
  reporter: [["list"]],
  use: {
    baseURL: `http://127.0.0.1:${config.serverPort}`,
    trace: "off",
    screenshot: "off",
    video: "off",
    ...devices["Desktop Chrome"],
    viewport: config.viewport,
  },
  projects: [
    {
      name: "visual-reports",
    },
  ],
});
