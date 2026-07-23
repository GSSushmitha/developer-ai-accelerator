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

## Push to your remote

```bash
git init
git add .
git commit -m "Initial commit: Developer AI Accelerator"
git branch -M main
git remote add origin <your-repo-url>
git push -u origin main
```
