# Manon post-launch maintenance ledger

Tracks **approved production changes** to Manon's gallery site
(`www.mlalondeartistepeintre.ca`) after custom-domain cutover on **2026-09-18**.

Ledger file: [`maintenance-log.json`](./maintenance-log.json)

Future summary visual (not built yet): `docs/maintenance/manon-maintenance-summary.png`

## Scope

- **In scope:** post-launch artwork additions, corrections, and updates that shipped to production.
- **Out of scope:** pre-2026-09-18 work (DNS cutover, initial email setup, original imports), unmerged branches, preview-only experiments.

## Request vs change counts

- A **request** is one customer request / work session (often one PR).
- A **change** is one individual artwork action inside that request (add, correct, or update).
- One request can contain multiple changes. Example: REQ-2026-09-A is 1 request with 2 changes.

`summary.total_requests` and `summary.total_changes` must both stay accurate.

## Days since launch

Do **not** hardcode `days_since_launch` in the JSON (it goes stale daily).

Compute at read time:

```text
days_since_launch = floor((as_of_date - launch_date).days)
```

- `launch_date` is stored in the JSON (`2026-09-18`).
- `as_of_date` defaults to today in `America/Toronto`.
- If you print a snapshot, label it with an explicit "as of" date.

Durable counts that belong in JSON `summary`:

- `total_requests`
- `total_changes`
- `artwork_additions`
- `artwork_corrections_or_updates` (corrections + updates)
- `last_maintenance_date`
- `approximate_total_labour_minutes` (sum of known request labour; `null` if none recorded)

## Update procedure

After EVERY approved production change to Manon's website:

1. Merge/deploy the approved change.
2. Verify production.
3. Append/update the maintenance ledger.
4. Record PR/merge information.
5. Record approximate labour time when known.
6. Only mark the entry LIVE after production verification.
7. Regenerate the Nexora maintenance visual once that generator exists.

## How to append an entry

1. Add a new object to `requests[]` with a new `id` (e.g. `REQ-2026-10-A`).
2. Fill PR number, branch, verified merge SHA (`gh pr view <n> --json mergeCommit`), and production status.
3. List each artwork action under `changes[]` with `category`, `artwork_id`, `artwork_title`, `description`.
4. Categories: `artwork_addition`, `artwork_correction`, `artwork_update`.
5. Recompute `summary` durable counts from all requests.
6. Keep website catalog JSON, artwork images, and site behavior out of this docs-only PR unless the approved change itself is a separate production PR.
