#!/usr/bin/env node

const path = require("path");
const { spawnSync } = require("child_process");

const command = process.argv[2] || "help";

const commandMap = {
  impact: ["scripts/change-impact.js"],
  "pr:checklist": ["scripts/pr-checklist.js"],
  "test:stubs": ["scripts/generate-jasmine-stubs.js"],
  quickstart: [
    "scripts/change-impact.js",
    "scripts/pr-checklist.js",
    "scripts/generate-jasmine-stubs.js"
  ]
};

function runNodeScript(relativeScriptPath) {
  const scriptPath = path.resolve(__dirname, "..", relativeScriptPath);
  const result = spawnSync(process.execPath, [scriptPath], {
    cwd: process.cwd(),
    stdio: "inherit"
  });

  if (result.error) {
    console.error("Failed to execute", relativeScriptPath, result.error.message);
    process.exit(1);
  }

  if (typeof result.status === "number" && result.status !== 0) {
    process.exit(result.status);
  }
}

function showHelp() {
  console.log("Developer AI Accelerator CLI");
  console.log("");
  console.log("Usage:");
  console.log("  npx developer-ai-accelerator impact");
  console.log("  npx developer-ai-accelerator pr:checklist");
  console.log("  npx developer-ai-accelerator test:stubs");
  console.log("  npx developer-ai-accelerator quickstart");
  console.log("");
  console.log("Alias:");
  console.log("  npx daa quickstart");
}

if (!commandMap[command]) {
  showHelp();
  process.exit(command === "help" ? 0 : 1);
}

commandMap[command].forEach(runNodeScript);
