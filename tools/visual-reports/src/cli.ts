#!/usr/bin/env node
import { Command } from "commander";
import { generateVisualReport } from "./report.js";

const program = new Command();

program
  .name("visual-report")
  .description(
    "Generate Playwright visual change reports between two Git revisions.",
  )
  .option(
    "--before <revision>",
    "Git revision for the BEFORE state (default: HEAD~1)",
  )
  .option(
    "--after <revision>",
    "Git revision for the AFTER state (default: HEAD)",
  )
  .option(
    "--no-title-slug",
    "Use report ID only (VR-<hash>) without commit title slug",
  )
  .option(
    "--skip-install",
    "Skip npm install/ci in worktrees (use when deps are unchanged)",
  )
  .option(
    "--keep-worktrees",
    "Keep temporary git worktrees after completion (debugging)",
  )
  .action(async (options) => {
    try {
      await generateVisualReport({
        before: options.before,
        after: options.after,
        includeTitle: options.titleSlug,
        skipInstall: options.skipInstall,
        keepWorktrees: options.keepWorktrees,
      });
    } catch (error) {
      console.error(
        error instanceof Error ? error.message : String(error),
      );
      process.exitCode = 1;
    }
  });

program.parseAsync(process.argv);
