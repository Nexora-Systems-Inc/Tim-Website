#!/usr/bin/env node
/**
 * Optional auth bootstrap for apps that require login.
 * This gallery site is public; enable auth in config/routes.json when needed.
 */
import fs from "node:fs";
import path from "node:path";
import readline from "node:readline/promises";
import { chromium } from "@playwright/test";
import { getRepoRoot } from "./git.js";
import { buildBaseUrl, startStaticServer } from "./server.js";
import {
  assertBuildOutput,
  buildApp,
  installDependencies,
  resolveAppRoot,
} from "./build.js";
import { ensureDir, getToolRoot, loadConfig } from "./utils.js";

async function prompt(question: string): Promise<string> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  try {
    return (await rl.question(question)).trim();
  } finally {
    rl.close();
  }
}

async function main(): Promise<void> {
  const config = loadConfig();
  const repoRoot = getRepoRoot();
  const appRoot = resolveAppRoot(repoRoot, config.appDir);
  const authPath = path.join(getToolRoot(), config.auth.storageStatePath);

  console.log("Setting up Playwright authenticated storage state.");
  console.log(`App root: ${appRoot}`);

  installDependencies(appRoot);
  const staticRoot = buildApp(appRoot);
  assertBuildOutput(staticRoot);

  const loginUrl = await prompt(
    `Login URL [${buildBaseUrl(config.serverPort)}/]: `,
  );
  const server = await startStaticServer(staticRoot, config.serverPort);
  const baseUrl = buildBaseUrl(server.port);
  const targetUrl = loginUrl || baseUrl;

  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({ viewport: config.viewport });
  const page = await context.newPage();

  console.log(`\nComplete login in the opened browser window.`);
  console.log(`Navigating to: ${targetUrl}`);

  await page.goto(targetUrl, { waitUntil: "domcontentloaded" });
  await prompt("\nPress Enter after you have finished logging in... ");

  ensureDir(path.dirname(authPath));
  await context.storageState({ path: authPath });

  await browser.close();
  await server.close();

  console.log(`\nStorage state saved to ${authPath}`);
  console.log("Set auth.enabled to true in config/routes.json to use it.");
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
});
