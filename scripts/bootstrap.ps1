$ErrorActionPreference = "Stop"

Write-Host "Checking Node.js and npm..."
if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
  throw "Node.js was not found. Install Node.js 18+ and retry."
}
if (-not (Get-Command npm -ErrorAction SilentlyContinue)) {
  throw "npm was not found. Install Node.js 18+ and retry."
}

Write-Host "Installing dependencies..."
npm ci

Write-Host "Running accelerator quickstart workflow..."
npm run quickstart

Write-Host "Bootstrap complete. Check out/ and generated-tests/ for outputs."
