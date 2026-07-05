import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

export function createWorktree(
  repoRoot: string,
  worktreePath: string,
  revision: string,
): void {
  fs.mkdirSync(path.dirname(worktreePath), { recursive: true });

  if (fs.existsSync(worktreePath)) {
    removeWorktree(repoRoot, worktreePath);
  }

  execFileSync("git", ["worktree", "add", "--detach", worktreePath, revision], {
    cwd: repoRoot,
    stdio: "inherit",
  });
}

export function removeWorktree(repoRoot: string, worktreePath: string): void {
  if (!fs.existsSync(worktreePath)) {
    return;
  }

  execFileSync("git", ["worktree", "remove", "-f", worktreePath], {
    cwd: repoRoot,
    stdio: "inherit",
  });
}

export function pruneWorktrees(repoRoot: string): void {
  execFileSync("git", ["worktree", "prune"], {
    cwd: repoRoot,
    stdio: "inherit",
  });
}
