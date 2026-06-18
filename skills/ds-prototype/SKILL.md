---
name: ds-prototype
description: The single prototyping skill. Spec a feature like a PM, use THIS project's code/design-system 100% (CLAUDE.md + globals.css tokens + shadcn/@efounders components as the source of truth), propose several options, and output as HTML or as Figma screens — with design best practices (auto-layout, real components). Use whenever the user wants to prototype, mock up, design screens, "show options for X", "build a clickable demo", or design a single screen or a multi-screen flow. Frontend-only / mock data, no prod. Replaces ds-frame (one screen is just a 1-screen prototype).
---

# ds-prototype — spec → options → HTML or Figma, 100% on your code

One skill for all prototyping: a single screen or a full flow, in HTML or in Figma. It is
**spec-driven**, uses the project's **real code as the source of truth**, and gives the team
**options** to choose from.

## 1 · Spec the feature (PM lens) — interview briefly

Before designing, get a lightweight PM spec. Fill from the prompt, then ask only the
highest-leverage question(s) (2–3 options + open), restate in a few bullets, and proceed:

- **Objective / JTBD** — what problem, for whom, what does success look like.
- **User + context** — who, when, what they're trying to do.
- **Scope** — one screen, or the hero flow (3–5 screens); the must-haves.
- **Benchmark (optional, light)** — 1–3 patterns from comparable products to ground the
  options. Use only if it sharpens the direction; don't over-research.

Bias to action: a sharp spec + sensible defaults beats a long question list.

## 2 · Read the design system — the code is the source of truth (100%)

In the current project, read: **`CLAUDE.md`** (conventions, rules, tone), the **tokens**
(`app/globals.css` / `src/styles.css` / `tokens.css` — CSS custom properties), and the **real
components** (`components/ui/*`, `registry/**` — shadcn + `@efounders` bespoke). Match the
real components exactly.

- **Use the real components.** Missing one? Pull it from `@efounders` (`shadcn add
  @efounders/<name>` / shadcn MCP). If it genuinely doesn't exist, **say so explicitly** —
  compose from primitives and flag it as a new component to add to the DS. Never silently fake one.
- **No design system in this project?** Run **`/ds-bootstrap`** first.

## 3 · Propose options

Give **2–3 distinct directions** for the feature (different layouts / IA / emphasis) — each a
real take, not a variant of one. One line of trade-offs per option, so the team can pick.

## 4 · Output — HTML or Figma

Ask which surface (or infer from the request):

**A · HTML** — fast, interactive, prod-free.
- Single self-contained file(s); tokens on `:root`; every value via `var(--…)`.
- Real component classes/structure; mock data (no prod); hash routing for flows; no external
  runtime deps (Google Font only if the DS specifies one).

**B · Figma** — visual, team-facing. Generate via the **Figma MCP** (the `figma-generate-design`
/ `use_figma` skills). **Best practices, non-negotiable:**
- **Auto-layout everywhere** — no absolute positioning.
- **Use the real library components** (linked to code via Code Connect). If one isn't in the
  library, **don't fake it**: compose from existing + state clearly it's a new component to add.
- **Variables = tokens** — Figma variable names match the token names exactly.
- Clean layer names; **prefix exploration/option frames with `_wip/`** so the MCP skips them later.
- **Code stays the source of truth; Figma reflects it.**

## 5 · Deliver + iterate

- HTML → `**[Open →](file:///absolute/path/…)**`. Figma → the Figma link.
- A short summary **per option** (what it is, trade-offs, what to try).
- Iterate on the option the team picks. Never dump HTML/code in chat — write the file / create
  the Figma frames, return the link.

## Rules
- **Code = source of truth**, always. Figma reflects it, never the reverse.
- **Real components only**; specify explicitly when something must be invented.
- **Mock data, no prod** — explore any state freely.
- **Honor `CLAUDE.md`**: the 5 states, one primary action per screen, one icon library, tokens-only.
