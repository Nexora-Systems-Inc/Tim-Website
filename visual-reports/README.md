# Visual Reports Output

Generated visual change reports are written here by the tooling in `tools/visual-reports/`.

Each report is stored in a folder named after the **after** commit:

```
VR-<short-hash>-<sanitized-commit-title>/
  report.html
  metadata.json
  before/
  after/
  new/
  removed/
```

Temporary worktrees and capture caches live in `.tmp/` and are not meant to be committed.

See [tools/visual-reports/README.md](../tools/visual-reports/README.md) for usage.
