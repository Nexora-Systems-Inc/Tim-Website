$ErrorActionPreference = "Stop"

$Root = git rev-parse --show-toplevel
Set-Location $Root

$TargetBranch = "tools/playwright-visual-reports"
$CurrentBranch = git branch --show-current

if ($CurrentBranch -ne $TargetBranch) {
  Write-Host "Checking out $TargetBranch"
  git checkout $TargetBranch
}

git fetch origin
git merge origin/main --no-edit

Write-Host "Synced $TargetBranch with origin/main."
