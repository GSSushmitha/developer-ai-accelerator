const fs = require("fs");
const path = require("path");

const checklist = [
  "Does this change include tests for modified logic?",
  "Are edge cases and null or undefined paths covered?",
  "Did we avoid breaking public APIs?",
  "Are docs or comments updated where behavior changed?",
  "Can this change be rolled back safely?"
];

const outDir = path.join(process.cwd(), "out");
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const outFile = path.join(outDir, "pr-checklist.txt");
fs.writeFileSync(outFile, checklist.map((c, i) => `${i + 1}. ${c}`).join("\n") + "\n");

console.log("PR checklist written to", outFile);
