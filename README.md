# Developer AI Accelerator

A reusable repository for all developers to reduce development and testing cycle time using agentic AI workflows.

## What this provides

- Fast change impact analysis
- Automatic test stub generation
- PR quality checklist generation
- CI starter pipeline for fast feedback
- Agent contracts that can be integrated with Copilot or internal LLM tooling

## Scripts

- `npm run impact`: Generates `out/impact-report.json` from changed files
- `npm run test:stubs`: Generates starter Jasmine tests in `generated-tests/`
- `npm run pr:checklist`: Generates `out/pr-checklist.txt`
- `npm run quickstart`: Runs all three workflows

## Why this reduces time

1. Less manual triage
- Engineers see impacted test scope quickly.

2. Faster test authoring
- Test skeletons are pre-generated for changed source files.

3. Better PR quality consistency
- A standard checklist avoids repeated review comments.

4. Faster CI
- Teams can run targeted suites first based on impact report.

## AI-native operating model

Use this loop on each PR:

1. Analyze: run change impact
2. Generate: create test stubs
3. Review: run PR checklist and AI review
4. Verify: execute targeted tests, then full regression as needed

## CI

The included `azure-pipelines.yml` runs:

- Impact mapping
- Checklist generation
- Test stub generation

## Repository layout

- `scripts/`: automation logic
- `config/`: agent definitions and sample module-to-test mapping
- `out/`: generated reports
- `generated-tests/`: generated test stubs

## Setup

```bash
npm install
npm run quickstart
```

## Internal npm package workflow (recommended)

Instead of copying files into every repository, publish this as an internal npm package and run it with `npx` from any source repo.

### 1) Publish this package to your internal registry

Example once your registry authentication is configured:

```bash
npm publish --access restricted
```

### 2) Install in a source code repository

```bash
npm install --save-dev developer-ai-accelerator
```

### 3) Run in that source repository

```bash
npx developer-ai-accelerator quickstart
```

Or run individual steps:

```bash
npx developer-ai-accelerator impact
npx developer-ai-accelerator pr:checklist
npx developer-ai-accelerator test:stubs
```

### 4) Optional npm script shortcuts in source repositories

```json
{
	"scripts": {
		"impact": "developer-ai-accelerator impact",
		"pr:checklist": "developer-ai-accelerator pr:checklist",
		"test:stubs": "developer-ai-accelerator test:stubs",
		"quickstart": "developer-ai-accelerator quickstart"
	}
}
```

Outputs are generated in the source repository where the command is run:

- `out/impact-report.json`
- `out/pr-checklist.txt`
- `generated-tests/*.spec.js`

## Quick bootstrap for teammates

Prerequisite: Node.js 18 or newer.

Windows PowerShell:

```powershell
npm run bootstrap:win
```

macOS or Linux:

```bash
npm run bootstrap:unix
```

Both commands install dependencies and run the full workflow.

## How teams use this in daily work

On each PR:

1. Run impact mapping (`npm run impact`)
2. Generate checklist (`npm run pr:checklist`)
3. Generate test stubs (`npm run test:stubs`)
4. Execute targeted tests, then broader regression as needed

Generated artifacts:

- `out/impact-report.json`
- `out/pr-checklist.txt`
- `generated-tests/*.spec.js`

## Use this in your own project

1. Preferred: install this package and run it with `npx developer-ai-accelerator quickstart`.
2. Alternative: copy the `scripts/` and `config/` folders into your repo.
3. If copied directly, add these npm scripts into your `package.json`:

```json
{
	"scripts": {
		"impact": "node scripts/change-impact.js",
		"test:stubs": "node scripts/generate-jasmine-stubs.js",
		"pr:checklist": "node scripts/pr-checklist.js",
		"quickstart": "npm run impact && npm run pr:checklist && npm run test:stubs"
	}
}
```

4. Start with `config/module-map.sample.json` and tailor mappings to your modules.

## GitHub Actions support

This repository includes `.github/workflows/ci.yml` so teams not using Azure DevOps can run the same acceleration flow on GitHub:

- Fast feedback: impact report + PR checklist
- Test assist: generated test stubs
- Workflow artifacts are uploaded for easy download from each run

## Push to your remote

```bash
git init
git add .
git commit -m "Initial commit: Developer AI Accelerator"
git branch -M main
git remote add origin <your-repo-url>
git push -u origin main
```
