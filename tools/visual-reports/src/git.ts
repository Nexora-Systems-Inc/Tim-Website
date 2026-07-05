import { execFileSync } from "node:child_process";
import type { CommitInfo } from "./types.js";

export function getRepoRoot(): string {
  return execFileSync("git", ["rev-parse", "--show-toplevel"], {
    encoding: "utf8",
  }).trim();
}

export function resolveRevision(revision: string, repoRoot: string): string {
  return execFileSync("git", ["rev-parse", revision], {
    cwd: repoRoot,
    encoding: "utf8",
  }).trim();
}

export function getCommitInfo(revision: string, repoRoot: string): CommitInfo {
  const full = resolveRevision(revision, repoRoot);
  const short = full.slice(0, 7);
  const title = execFileSync("git", ["show", "-s", "--format=%s", full], {
    cwd: repoRoot,
    encoding: "utf8",
  }).trim();

  return { full, short, title };
}

export function sanitizeSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}

export function buildReportId(afterCommit: CommitInfo, includeTitle: boolean): {
  reportId: string;
  reportSlug: string;
} {
  const reportId = `VR-${afterCommit.short}`;
  const slugPart = sanitizeSlug(afterCommit.title);
  const reportSlug = includeTitle && slugPart
    ? `${reportId}-${slugPart}`
    : reportId;

  return { reportId, reportSlug };
}
