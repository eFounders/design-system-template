---
description: Run the deterministic design-system conformance gate (ds-check)
allowed-tools: Bash(node scripts/ds-check.mjs*), Bash(npm run ds-check*)
---

Run the design-system conformance gate and report the result.

1. Run `node scripts/ds-check.mjs` (scans the whole repo). To check only specific files (e.g. a diff), pass paths: `node scripts/ds-check.mjs path/to/File.tsx`.
2. Report the score and verdict.
3. If there are errors, list each with its file and line, and how to fix it:
   - **hardcoded color** → replace with the right token (`var(--…)`). Never invent a token; only use ones defined in `app/tokens.css`.
   - **unknown token** (`var(--token)` not defined in `app/tokens.css`) → use an existing token.
   - **duplicate component** (same component file/export in two places) → keep one canonical per role, delete the copy.

This gate IS the design-system rules made executable. It must pass (no errors) before merging.
