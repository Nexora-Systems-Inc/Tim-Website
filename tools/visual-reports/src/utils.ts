import fs from "node:fs";
import path from "node:path";
import routesConfig from "../config/routes.json" with { type: "json" };
import type { VisualReportsConfig } from "./types.js";

const TOOL_ROOT = path.resolve(import.meta.dirname, "..");

export function loadConfig(): VisualReportsConfig {
  return routesConfig as VisualReportsConfig;
}

export function getToolRoot(): string {
  return TOOL_ROOT;
}

export function getReportsRoot(repoRoot: string): string {
  return path.join(repoRoot, "visual-reports");
}

export function getTempRoot(repoRoot: string): string {
  return path.join(getReportsRoot(repoRoot), ".tmp");
}

export function ensureDir(dirPath: string): void {
  fs.mkdirSync(dirPath, { recursive: true });
}

export function copyFileSafe(source: string, destination: string): void {
  if (!fs.existsSync(source)) {
    return;
  }

  ensureDir(path.dirname(destination));
  fs.copyFileSync(source, destination);
}

export function writeJson(filePath: string, data: unknown): void {
  ensureDir(path.dirname(filePath));
  fs.writeFileSync(filePath, `${JSON.stringify(data, null, 2)}\n`, "utf8");
}

export function readJson<T>(filePath: string): T {
  return JSON.parse(fs.readFileSync(filePath, "utf8")) as T;
}

export function formatTimestamp(date = new Date()): string {
  return date.toISOString();
}

export function formatDisplayTimestamp(date = new Date()): string {
  return date.toISOString().replace("T", " ").replace(/\.\d{3}Z$/, " UTC");
}

export function relativeFromReport(reportDir: string, filePath: string): string {
  return path.relative(reportDir, filePath).split(path.sep).join("/");
}
