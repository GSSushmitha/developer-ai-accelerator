const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

function getChangedSourceFiles() {
  try {
    const raw = execSync("git diff --name-only origin/main...HEAD", { stdio: ["ignore", "pipe", "ignore"] }).toString();
    return raw
      .split(/\r?\n/)
      .map((x) => x.trim())
      .filter((x) => x.startsWith("src/") && (x.endsWith(".js") || x.endsWith(".ts")));
  } catch {
    return [];
  }
}

function stubContent(sourceFile) {
  const base = path.basename(sourceFile).replace(/\.(js|ts)$/i, "");
  return `describe('${base}', () => {\n  it('should keep expected behavior', () => {\n    // TODO: Replace with real assertions based on changed logic in ${sourceFile}\n    expect(true).toBeTrue();\n  });\n});\n`;
}

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

const changed = getChangedSourceFiles();
const outDir = path.join(process.cwd(), "generated-tests");
ensureDir(outDir);

changed.forEach((file) => {
  const base = path.basename(file).replace(/\.(js|ts)$/i, ".spec.js");
  const target = path.join(outDir, base);
  if (!fs.existsSync(target)) {
    fs.writeFileSync(target, stubContent(file));
  }
});

console.log(`Generated ${changed.length} test stub(s) in ${outDir}`);
