#!/usr/bin/env bash
set -euo pipefail

echo "Checking Node.js and npm..."
if ! command -v node >/dev/null 2>&1; then
  echo "Node.js was not found. Install Node.js 18+ and retry."
  exit 1
fi
if ! command -v npm >/dev/null 2>&1; then
  echo "npm was not found. Install Node.js 18+ and retry."
  exit 1
fi

echo "Installing dependencies..."
npm ci

echo "Running accelerator quickstart workflow..."
npm run quickstart

echo "Bootstrap complete. Check out/ and generated-tests/ for outputs."
