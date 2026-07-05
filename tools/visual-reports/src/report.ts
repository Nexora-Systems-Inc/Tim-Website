import fs from "node:fs";
import path from "node:path";
import { getAuthWarning } from "./auth.js";
import {
  assertBuildOutput,
  buildApp,
  installDependencies,
  resolveAppRoot,
} from "./build.js";
import { captureScreenshots } from "./capture.js";
import { compareCaptures } from "./compare.js";
import {
  buildReportId,
  getCommitInfo,
  getRepoRoot,
  resolveRevision,
} from "./git.js";
import { generateHtmlReport } from "./html.js";
import type { ReportMetadata } from "./types.js";
import {
  ensureDir,
  getReportsRoot,
  getTempRoot,
  loadConfig,
  writeJson,
} from "./utils.js";
import { createWorktree, pruneWorktrees, removeWorktree } from "./worktree.js";

export interface GenerateReportOptions {
  before?: string;
  after?: string;
  includeTitle?: boolean;
  skipInstall?: boolean;
  keepWorktrees?: boolean;
}

export interface GenerateReportResult {
  reportDir: string;
  reportId: string;
  metadataPath: string;
  htmlPath: string;
}

async function captureRevision(options: {
  repoRoot: string;
  revision: string;
  phase: "before" | "after";
  worktreePath: string;
  captureDir: string;
  skipInstall: boolean;
}): Promise<void> {
  const config = loadConfig();
  const { repoRoot, revision, phase, worktreePath, captureDir, skipInstall } =
    options;

  console.log(`\n=== ${phase.toUpperCase()} revision ${revision.slice(0, 7)} ===`);

  createWorktree(repoRoot, worktreePath, revision);

  const appRoot = resolveAppRoot(worktreePath, config.appDir);

  if (!skipInstall) {
    console.log(`Installing dependencies in ${appRoot}`);
    installDependencies(appRoot);
  }

  console.log(`Building application in ${appRoot}`);
  const staticRoot = buildApp(appRoot);
  assertBuildOutput(staticRoot);

  await captureScreenshots({
    config,
    staticRoot,
    outputDir: captureDir,
    revision,
    phase,
    repoRoot,
  });
}

export async function generateVisualReport(
  options: GenerateReportOptions = {},
): Promise<GenerateReportResult> {
  const config = loadConfig();
  const repoRoot = getRepoRoot();

  const beforeRevision = resolveRevision(options.before ?? "HEAD~1", repoRoot);
  const afterRevision = resolveRevision(options.after ?? "HEAD", repoRoot);

  if (beforeRevision === afterRevision) {
    throw new Error("Before and after revisions must be different.");
  }

  const beforeCommit = getCommitInfo(beforeRevision, repoRoot);
  const afterCommit = getCommitInfo(afterRevision, repoRoot);
  const { reportId, reportSlug } = buildReportId(
    afterCommit,
    options.includeTitle ?? true,
  );

  const authWarning = getAuthWarning(config.auth, repoRoot);
  if (authWarning) {
    console.warn(`Warning: ${authWarning}`);
  }

  const reportDir = path.join(getReportsRoot(repoRoot), reportSlug);
  const tempRoot = getTempRoot(repoRoot);
  const beforeWorktree = path.join(tempRoot, "worktrees", "before");
  const afterWorktree = path.join(tempRoot, "worktrees", "after");
  const beforeCaptureDir = path.join(tempRoot, "captures", "before");
  const afterCaptureDir = path.join(tempRoot, "captures", "after");

  ensureDir(reportDir);

  const skipInstall = options.skipInstall ?? false;

  try {
    await captureRevision({
      repoRoot,
      revision: beforeRevision,
      phase: "before",
      worktreePath: beforeWorktree,
      captureDir: beforeCaptureDir,
      skipInstall,
    });

    await captureRevision({
      repoRoot,
      revision: afterRevision,
      phase: "after",
      worktreePath: afterWorktree,
      captureDir: afterCaptureDir,
      skipInstall,
    });

    const beforeManifest = JSON.parse(
      fs.readFileSync(path.join(beforeCaptureDir, "manifest.json"), "utf8"),
    );
    const afterManifest = JSON.parse(
      fs.readFileSync(path.join(afterCaptureDir, "manifest.json"), "utf8"),
    );

    const comparison = compareCaptures(
      config,
      beforeManifest,
      afterManifest,
      beforeCaptureDir,
      afterCaptureDir,
      reportDir,
    );

    const generatedAt = new Date();
    const metadata: ReportMetadata = {
      reportId,
      reportSlug,
      commit: afterCommit,
      previousCommit: beforeCommit,
      generatedAt: generatedAt.toISOString(),
      config: {
        viewport: config.viewport,
        routeCount: config.routes.length,
      },
      summary: {
        compared: comparison.compared.length,
        new: comparison.newRoutes.length,
        removed: comparison.removedRoutes.length,
      },
      routes: {
        compared: comparison.compared,
        new: comparison.newRoutes,
        removed: comparison.removedRoutes,
      },
    };

    const metadataPath = path.join(reportDir, "metadata.json");
    const htmlPath = path.join(reportDir, "report.html");

    writeJson(metadataPath, metadata);
    fs.writeFileSync(
      htmlPath,
      generateHtmlReport(metadata, afterCommit, beforeCommit, generatedAt),
      "utf8",
    );

    console.log(`\nVisual report generated: ${reportDir}`);
    console.log(`Report ID: ${reportId}`);
    console.log(`Open: ${htmlPath}`);

    return { reportDir, reportId, metadataPath, htmlPath };
  } finally {
    if (!options.keepWorktrees) {
      try {
        removeWorktree(repoRoot, beforeWorktree);
        removeWorktree(repoRoot, afterWorktree);
        pruneWorktrees(repoRoot);
      } catch (cleanupError) {
        console.warn(
          cleanupError instanceof Error
            ? cleanupError.message
            : String(cleanupError),
        );
      }
    }
  }
}
