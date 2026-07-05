import { execFileSync, spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

export function installDependencies(appRoot: string): void {
  const lockfile = path.join(appRoot, "package-lock.json");
  const command = fs.existsSync(lockfile) ? "ci" : "install";

  execFileSync("npm", [command], {
    cwd: appRoot,
    stdio: "inherit",
    shell: process.platform === "win32",
  });
}

export function buildApp(appRoot: string): string {
  execFileSync("npm", ["run", "build"], {
    cwd: appRoot,
    stdio: "inherit",
    shell: process.platform === "win32",
  });

  return path.join(appRoot, "out");
}

export function resolveAppRoot(worktreeRoot: string, appDir: string): string {
  return path.join(worktreeRoot, appDir);
}

export function assertBuildOutput(outDir: string): void {
  if (!fs.existsSync(outDir)) {
    throw new Error(
      `Build output not found at ${outDir}. Ensure the app produces a static export.`,
    );
  }
}

export function runCommand(
  command: string,
  args: string[],
  cwd: string,
): { status: number | null; stdout: string; stderr: string } {
  const result = spawnSync(command, args, {
    cwd,
    encoding: "utf8",
    shell: process.platform === "win32",
  });

  return {
    status: result.status,
    stdout: result.stdout ?? "",
    stderr: result.stderr ?? "",
  };
}
