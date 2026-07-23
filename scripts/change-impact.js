const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

function safeExec(command) {
  try {
    return execSync(command, { stdio: ["ignore", "pipe", "ignore"] }).toString();
  } catch {
    return "";
  }
}

function getChangedFiles() {
  const fromMain = safeExec("git diff --name-only origin/main...HEAD");
  const fallback = safeExec("git diff --name-only HEAD~1 HEAD");
  const raw = fromMain || fallback;
  return raw.split(/\r?\n/).map((x) => x.trim()).filter(Boolean);
}

function mapToTestTargets(files) {
  const groups = { unit: [], integration: [], ui: [] };

  files.forEach((file) => {
    const f = file.toLowerCase();
    if (f.includes("src/") || f.endsWith(".js") || f.endsWith(".ts")) {
      groups.unit.push(file);
    }
    if (f.includes("api") || f.includes("service") || f.includes("dataprovider")) {
      groups.integration.push(file);
    }
    if (f.includes("template") || f.endsWith(".html") || f.endsWith(".css")) {
      groups.ui.push(file);
    }
  });

  return groups;
}

function writeOutput(result) {
  const outDir = path.join(process.cwd(), "out");
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }
  const outFile = path.join(outDir, "impact-report.json");
  fs.writeFileSync(outFile, JSON.stringify(result, null, 2));
  console.log("Impact report written to", outFile);
}

const changedFiles = getChangedFiles();
const mapping = mapToTestTargets(changedFiles);

const report = {
  changedFiles,
  recommendedRuns: {
    unit: mapping.unit.length > 0,
    integration: mapping.integration.length > 0,
    ui: mapping.ui.length > 0
  },
  mappedFiles: mapping
};

writeOutput(report);
console.log(JSON.stringify(report, null, 2));
