#!/usr/bin/env node
/* ============================================================
   ds-check — design-system conformance gate (deterministic).
   It IS the DS rules, made executable. Same script, two scopes:
     • on a PR diff   → the GATE (blocks merge)   ← via .github/workflows
     • on the whole repo → a global DS audit + health score
   Deterministic only (no LLM): a gate must give the same verdict
   every run. The subjective/product review is separate & advisory
   (the product-review skill, in the design-skills repo).

   USAGE
     node scripts/ds-check.mjs                  # scan the repo
     node scripts/ds-check.mjs src/Button.tsx   # scan given paths (e.g. a diff)

   CHECKS
     ERROR (blocks): hardcoded color (hex / rgb() / hsl()) in app code
     ERROR (blocks): var(--token) referencing a token NOT defined in the tokens file
     WARN  (report): hardcoded px on spacing/radius/font-size in CSS
   Exit code 1 if any ERROR. The tokens file is where colors are
   legitimately defined → exempt from the color check.
   ============================================================ */

import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join, extname, relative } from "node:path";

const ROOT = process.cwd();

// Where the brand tokens live (first match wins). The agent and the gate
// read the same contract. Add your project's path here if it differs.
const TOKEN_FILES = [
  "app/tokens.css",
  "app/globals.css",
  "src/styles.css",
  "styles.css",
  "tokens.css",
  "src/app/globals.css",
  "app/styles.css",
].filter((p) => existsSync(join(ROOT, p)));

const SCAN_EXTS = new Set([".css", ".scss", ".html", ".js", ".jsx", ".ts", ".tsx", ".vue", ".svelte", ".astro"]);
const IGNORE_DIRS = new Set(["node_modules", ".git", "dist", "build", ".next", "out", "coverage", "public", "storybook-static", ".turbo"]);
const ALLOW_COLOR_WORDS = new Set(["transparent", "currentcolor", "inherit", "none", "initial", "unset"]);
// Runtime / framework CSS vars set outside the tokens file (Radix, Tailwind, cmdk) — not DS tokens.
const RUNTIME_VAR_PREFIXES = ["tw-", "radix-", "cmdk-"];
// Tailwind v4 built-ins (--spacing) + component-local layout vars (set inline via style props) — not DS tokens.
const RUNTIME_VAR_NAMES = new Set(["spacing", "gap", "sidebar-width", "sidebar-width-icon"]);

// ---- load the known tokens from the tokens file(s) -----------------------
function loadTokens() {
  const defs = new Set();
  if (!TOKEN_FILES.length) {
    console.error("⚠  No tokens file found (app/globals.css, src/styles.css…) — cannot validate token names.");
  }
  for (const tf of TOKEN_FILES) {
    const css = readFileSync(join(ROOT, tf), "utf8");
    for (const m of css.matchAll(/--([a-z0-9-]+)\s*:/gi)) defs.add(m[1].toLowerCase());
  }
  return defs;
}

// ---- collect files to scan -----------------------------------------------
function collect(paths) {
  const out = [];
  const walk = (p) => {
    let st; try { st = statSync(p); } catch { return; }
    if (st.isDirectory()) {
      if (IGNORE_DIRS.has(p.split("/").pop())) return;
      for (const f of readdirSync(p)) walk(join(p, f));
    } else if (SCAN_EXTS.has(extname(p))) {
      out.push(p);
    }
  };
  (paths.length ? paths : ["."]).forEach((p) => walk(join(ROOT, p)));
  return out;
}

const tokens = loadTokens();
const tokenFileSet = new Set(TOKEN_FILES);
const files = collect(process.argv.slice(2));
const findings = [];

const RE_HEX = /#[0-9a-fA-F]{3,8}\b/g;
const RE_FUNC = /\b(rgb|rgba|hsl|hsla)\s*\(/g;
const RE_VAR = /var\(\s*--([a-z0-9-]+)/gi;
const RE_PX = /\b(padding|margin|gap|border-radius|font-size)\s*:\s*[^;]*?\b(\d{2,})px/gi;

for (const file of files) {
  const rel = relative(ROOT, file);
  const isTokenFile = tokenFileSet.has(rel);
  const text = readFileSync(file, "utf8");
  text.split("\n").forEach((line, i) => {
    const ln = i + 1;
    const code = line.replace(/\/\*.*?\*\//g, "");

    if (!isTokenFile) {
      for (const m of code.matchAll(RE_HEX)) {
        // Skip hex inside a quoted attribute-selector value, e.g. [stroke='#ccc'] — it MATCHES a
        // third-party default to override it with a token, it is not an applied color.
        const before = code[m.index - 1];
        if (before === "'" || before === '"') continue;
        findings.push({ rel, ln, level: "error", msg: `hardcoded color ${m[0]} → use a token (var(--…))` });
      }
      for (const m of code.matchAll(RE_FUNC)) {
        findings.push({ rel, ln, level: "error", msg: `hardcoded color ${m[1]}(…) → use a token` });
      }
    }
    for (const m of code.matchAll(RE_VAR)) {
      const name = m[1].toLowerCase();
      if (!tokens.has(name) && !RUNTIME_VAR_NAMES.has(name) && !RUNTIME_VAR_PREFIXES.some((p) => name.startsWith(p))) {
        findings.push({ rel, ln, level: "error", msg: `unknown token --${name} (not defined in the tokens file)` });
      }
    }
    if (/\.s?css$/.test(rel) && !isTokenFile) {
      for (const m of code.matchAll(RE_PX)) {
        findings.push({ rel, ln, level: "warn", msg: `${m[1]}: ${m[2]}px hardcoded → use --space-* / --radius-* / --text-*` });
      }
    }
  });
}

// ---- duplicate-component audit (one canonical per role) ------------------
// Deterministic: flags the same component file basename, or the same exported
// PascalCase component, defined in more than one place. Catches Button/AppButton
// sprawl and stray copies (e.g. the same component in components/ui AND registry/).
{
  const COMPONENT_DIRS = ["components/ui", "registry/new-york/ui", "registry/new-york/blocks"];
  const byBase = {};
  const byExport = {};
  const walkComp = (dir) => {
    const abs = join(ROOT, dir);
    if (!existsSync(abs)) return;
    for (const entry of readdirSync(abs)) {
      const p = join(abs, entry);
      if (statSync(p).isDirectory()) { walkComp(join(dir, entry)); continue; }
      if (!/\.tsx$/.test(entry) || /\.(stories|test)\.tsx$/.test(entry)) continue;
      const rel = relative(ROOT, p);
      const base = entry.replace(/\.tsx$/, "");
      (byBase[base] ??= []).push(rel);
      const text = readFileSync(p, "utf8");
      const names = new Set();
      for (const m of text.matchAll(/export\s+(?:async\s+)?(?:function|const)\s+([A-Z]\w+)/g)) names.add(m[1]);
      for (const m of text.matchAll(/export\s*\{([^}]*)\}/g)) {
        for (let part of m[1].split(",")) {
          part = part.trim();
          if (!part) continue;
          const asM = part.match(/\bas\s+([A-Za-z]\w*)/);
          const name = asM ? asM[1] : part.split(/\s+/)[0];
          if (/^[A-Z]\w+$/.test(name)) names.add(name);
        }
      }
      for (const n of names) (byExport[n] ??= new Set()).add(rel);
    }
  };
  COMPONENT_DIRS.forEach(walkComp);
  for (const [base, list] of Object.entries(byBase)) {
    if (list.length > 1)
      findings.push({ rel: list[1], ln: 1, level: "error", msg: `duplicate component file "${base}.tsx" — also at ${list[0]} (keep one canonical per role)` });
  }
  for (const [name, set] of Object.entries(byExport)) {
    const list = [...set];
    if (list.length > 1)
      findings.push({ rel: list[1], ln: 1, level: "error", msg: `component "${name}" exported from ${list.length} files (${list.join(", ")}) — one canonical per role` });
  }
}

const errors = findings.filter((f) => f.level === "error");
const warns = findings.filter((f) => f.level === "warn");
const score = Math.max(0, 100 - errors.length * 10 - warns.length * 2);

const byFile = {};
for (const f of findings) (byFile[f.rel] ??= []).push(f);

console.log(`\nds-check — ${files.length} file(s) scanned · tokens from: ${TOKEN_FILES.join(", ") || "(none)"}\n`);
if (!findings.length) {
  console.log("✅ Conformant. No design-system violations.\n");
} else {
  for (const [rel, fs] of Object.entries(byFile)) {
    console.log(`  ${rel}`);
    for (const f of fs.sort((a, b) => a.ln - b.ln)) {
      console.log(`    ${f.level === "error" ? "✖" : "▲"} L${f.ln}  ${f.msg}`);
    }
    console.log("");
  }
}
console.log(`DS score: ${score}/100  ·  ${errors.length} error(s), ${warns.length} warning(s)`);
console.log(errors.length ? "Verdict: FAIL — fix the errors before merge.\n" : "Verdict: PASS\n");

process.exit(errors.length ? 1 : 0);
