import fs from "node:fs";
import path from "node:path";
import { chromium, type Browser, type BrowserContext } from "@playwright/test";
import { resolveStorageStatePath } from "./auth.js";
import { buildBaseUrl, startStaticServer } from "./server.js";
import type {
  CaptureManifest,
  CapturePhase,
  CaptureResult,
  VisualReportsConfig,
} from "./types.js";
import { ensureDir, writeJson } from "./utils.js";

export interface CaptureOptions {
  config: VisualReportsConfig;
  staticRoot: string;
  outputDir: string;
  revision: string;
  phase: CapturePhase;
  repoRoot: string;
  skipInstall?: boolean;
}

async function createContext(
  browser: Browser,
  config: VisualReportsConfig,
  repoRoot: string,
): Promise<BrowserContext> {
  const storageState = resolveStorageStatePath(config.auth, repoRoot);

  return browser.newContext({
    viewport: config.viewport,
    storageState,
  });
}

export async function captureScreenshots(
  options: CaptureOptions,
): Promise<CaptureManifest> {
  const { config, staticRoot, outputDir, revision, phase, repoRoot } = options;

  ensureDir(outputDir);

  const server = await startStaticServer(staticRoot, config.serverPort);
  const baseUrl = buildBaseUrl(server.port);
  const browser = await chromium.launch({ headless: true });

  const results: CaptureResult[] = [];

  try {
    const context = await createContext(browser, config, repoRoot);
    const page = await context.newPage();

    for (const route of config.routes) {
      const filename = `${route.id}.png`;
      const screenshotPath = path.join(outputDir, filename);
      const url = `${baseUrl}${route.path}`;

      let statusCode: number | null = null;
      let success = false;
      let error: string | undefined;

      try {
        const response = await page.goto(url, {
          waitUntil: "networkidle",
          timeout: 60_000,
        });

        statusCode = response?.status() ?? null;

        if (route.waitForSelector) {
          await page.waitForSelector(route.waitForSelector, {
            timeout: 15_000,
          });
        }

        if (route.waitMs) {
          await page.waitForTimeout(route.waitMs);
        }

        await page.screenshot({
          path: screenshotPath,
          fullPage: true,
        });

        success = statusCode !== null && statusCode >= 200 && statusCode < 400;
      } catch (captureError) {
        error =
          captureError instanceof Error
            ? captureError.message
            : String(captureError);

        try {
          await page.screenshot({
            path: screenshotPath,
            fullPage: true,
          });
        } catch {
          if (fs.existsSync(screenshotPath)) {
            fs.unlinkSync(screenshotPath);
          }
        }
      }

      results.push({
        routeId: route.id,
        routeName: route.name,
        category: route.category,
        path: route.path,
        filename,
        success,
        statusCode,
        error,
      });

      console.log(
        `[${phase}] ${route.name} (${route.path}) -> ${success ? "ok" : "failed"}`,
      );
    }

    await context.close();
  } finally {
    await browser.close();
    await server.close();
  }

  const manifest: CaptureManifest = {
    revision,
    capturedAt: new Date().toISOString(),
    viewport: config.viewport,
    results,
  };

  writeJson(path.join(outputDir, "manifest.json"), manifest);
  return manifest;
}
