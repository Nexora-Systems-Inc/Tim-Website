# Playwright Visual Reports

Internal engineering tool for documenting UI changes between Git commits. This package lives on the permanent branch `tools/playwright-visual-reports` and is **never merged into `main`**.

## Purpose

Compare two Git revisions, capture identical route screenshots at each revision, and produce a self-contained HTML report with before/after images.

## Setup

### Prerequisites

- Node.js 20+
- Git
- npm

### Install

From the repository root:

```bash
cd tools/visual-reports
npm install
npx playwright install chromium
```

Playwright browsers are installed locally for this tooling package only. No production dependencies are modified.

### Route configuration

All routes are defined in one place:

```
tools/visual-reports/config/routes.json
```

Each route entry includes:

| Field | Description |
| --- | --- |
| `id` | Stable identifier used for screenshot filenames |
| `name` | Human-readable label in the report |
| `category` | Grouping label (e.g. Gallery, General) |
| `path` | URL path to capture |
| `waitForSelector` | Optional selector to wait for before screenshot |
| `waitMs` | Optional extra delay in milliseconds |

Update this file when pages are added or renamed. The Galerie à Manon site routes are preconfigured.

### Authentication

This public gallery site does not require login. Auth support is built in for future use:

1. Set `"enabled": true` in `config/routes.json` under `auth`.
2. Run `npm run auth:setup` and complete login in the opened browser.
3. The tool reuses existing Playwright storage state from common paths when `reuseFromPlaywright` is true.

No duplicate login automation runs during capture unless auth is enabled and no storage state exists.

## Usage

Run from `tools/visual-reports/`:

### Default comparison (previous commit → current commit)

```bash
npm run report
```

Equivalent to `--before HEAD~1 --after HEAD`.

### Explicit commit hashes

```bash
npm run report -- --before fc6ae42 --after 3464729
```

### Report ID without commit title slug

```bash
npm run report -- --no-title-slug
```

Produces `VR-3464729` instead of `VR-3464729-feat-separate-biography-and-contact-pages`.

### Skip dependency install (faster re-runs)

```bash
npm run report -- --skip-install
```

Use when `package-lock.json` has not changed between revisions.

### Keep worktrees for debugging

```bash
npm run report -- --keep-worktrees
```

## How it works

1. Resolves **before** and **after** Git revisions.
2. Creates detached Git worktrees so the tooling branch stays checked out.
3. For each revision:
   - Installs dependencies in `website/` (unless `--skip-install`)
   - Runs `npm run build` (static export to `website/out/`)
   - Serves the build locally
   - Captures full-page Playwright screenshots for every configured route
4. Compares captures and classifies routes as **compared**, **new**, or **removed**.
5. Writes the report under `visual-reports/VR-<hash>-<slug>/`.

## Report structure

```
visual-reports/
  VR-3464729-feat-separate-biography-and-contact-pages/
    report.html          # Human-readable comparison
    metadata.json        # Machine-readable summary
    before/              # Screenshots from the previous revision
    after/               # Screenshots from the current revision
    new/                 # Screens only present after
    removed/             # Screens only present before
```

### metadata.json

Includes report ID, commit hashes, commit titles, generation timestamp, viewport settings, route counts, and per-route file references.

### report.html

Header fields:

- Visual Report ID
- Commit (after)
- Previous Commit (before)
- Commit Title
- Generated timestamp

Body sections:

- **Compared Routes** — side-by-side before/after
- **New Screens** — routes that exist only in the after revision
- **Removed Screens** — routes that exist only in the before revision

## Branch workflow

This branch is permanent tooling only.

### Stay synchronized with main

Rebase or merge **from** `main` into this branch (never the reverse):

```bash
git checkout tools/playwright-visual-reports
git fetch origin
git merge origin/main
# or: git rebase origin/main
```

A helper script is provided:

```powershell
# Windows
./tools/visual-reports/scripts/sync-from-main.ps1
```

```bash
# macOS / Linux
./tools/visual-reports/scripts/sync-from-main.sh
```

## Architecture

Modular layout for future phases (pixel diff, AI summaries, CI, etc.):

| Module | Role |
| --- | --- |
| `src/git.ts` | Revision resolution, report naming |
| `src/worktree.ts` | Isolated checkouts per worktree |
| `src/build.ts` | Install + build app in worktree |
| `src/server.ts` | Static file server for captures |
| `src/capture.ts` | Playwright screenshot capture |
| `src/compare.ts` | Route classification |
| `src/html.ts` | HTML report rendering |
| `src/report.ts` | Orchestration pipeline |

Future additions can plug in after `compare.ts` (pixel diff) or extend `html.ts` (annotations, PDF export) without restructuring the pipeline.

## Limitations (v1)

- No pixel-level diffing or pass/fail thresholds
- No AI summaries or PDF export
- No GitHub Actions or PR comment integration
- Route list is centralized in tooling config (not auto-discovered from the app router)
- Each revision is fully built in a worktree (slower but accurate)
- Screenshots use a fixed viewport from config
- Dynamic content timing may vary slightly between runs

## Future expansion (not implemented)

Designed but intentionally out of scope for v1:

- Pixel diff overlays and regression thresholds
- AI-generated change summaries
- PDF export and image annotations
- CI / GitHub Actions integration
- Automatic pull request comments

## Troubleshooting

| Issue | Suggestion |
| --- | --- |
| Build fails in worktree | Run the same `npm run build` manually at that commit |
| Empty or partial captures | Add `waitForSelector` / `waitMs` for slow routes |
| Port already in use | Change `serverPort` in `config/routes.json` |
| Auth required | Run `npm run auth:setup` and enable auth in config |
