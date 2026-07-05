#!/usr/bin/env bash
set -euo pipefail

ROOT="$(git rev-parse --show-toplevel)"
cd "$ROOT"

CURRENT_BRANCH="$(git branch --show-current)"
TARGET_BRANCH="tools/playwright-visual-reports"

if [[ "$CURRENT_BRANCH" != "$TARGET_BRANCH" ]]; then
  echo "Checking out $TARGET_BRANCH"
  git checkout "$TARGET_BRANCH"
fi

git fetch origin
git merge origin/main --no-edit

echo "Synced $TARGET_BRANCH with origin/main."
