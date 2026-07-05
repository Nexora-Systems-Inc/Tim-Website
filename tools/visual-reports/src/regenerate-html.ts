#!/usr/bin/env node
/**
 * Regenerate report.html from an existing metadata.json (no re-capture).
 */
import fs from "node:fs";
import path from "node:path";
import { getCommitInfo, getRepoRoot } from "./git.js";
import { generateHtmlReport } from "./html.js";
import type { ReportMetadata } from "./types.js";
import { readJson } from "./utils.js";

const reportDir = process.argv[2];

if (!reportDir) {
  console.error("Usage: tsx src/regenerate-html.ts <report-directory>");
  process.exit(1);
}

const metadataPath = path.join(reportDir, "metadata.json");
const metadata = readJson<ReportMetadata>(metadataPath);
const repoRoot = getRepoRoot();
const afterCommit = getCommitInfo(metadata.commit.full, repoRoot);
const beforeCommit = getCommitInfo(metadata.previousCommit.full, repoRoot);
const generatedAt = new Date(metadata.generatedAt);

const htmlPath = path.join(reportDir, "report.html");
fs.writeFileSync(
  htmlPath,
  generateHtmlReport(metadata, afterCommit, beforeCommit, generatedAt),
  "utf8",
);

console.log(`Regenerated ${htmlPath}`);
