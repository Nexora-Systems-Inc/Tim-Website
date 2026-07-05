import fs from "node:fs";
import path from "node:path";
import type { AuthConfig } from "./types.js";
import { getToolRoot } from "./utils.js";

export function resolveStorageStatePath(
  auth: AuthConfig,
  repoRoot: string,
): string | undefined {
  if (!auth.enabled) {
    return undefined;
  }

  const candidates = [
    path.join(getToolRoot(), auth.storageStatePath),
    ...auth.playwrightStorageStatePaths.map((candidate) =>
      path.join(repoRoot, candidate),
    ),
  ];

  if (auth.reuseFromPlaywright) {
    for (const candidate of candidates) {
      if (fs.existsSync(candidate)) {
        return candidate;
      }
    }
  }

  const toolAuthPath = path.join(getToolRoot(), auth.storageStatePath);
  if (fs.existsSync(toolAuthPath)) {
    return toolAuthPath;
  }

  return undefined;
}

export function getAuthWarning(
  auth: AuthConfig,
  repoRoot: string,
): string | undefined {
  if (!auth.enabled) {
    return undefined;
  }

  const storageState = resolveStorageStatePath(auth, repoRoot);
  if (storageState) {
    return undefined;
  }

  return [
    "Authentication is enabled but no Playwright storage state was found.",
    "Run `npm run auth:setup` in tools/visual-reports or place storage state at",
    auth.storageStatePath,
  ].join(" ");
}
