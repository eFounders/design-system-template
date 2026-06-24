---
name: ds-prototype
description: The single prototyping skill. Spec a feature like a PM, use THIS project's real design system 100% as the source of truth (whatever the stack — it discovers the repo's tokens, components, and conventions), propose several options, and output as HTML or as Figma screens — with design best practices (4px grid, auto-layout, real components). Use whenever the user wants to prototype, mock up, design screens, "show options for X", "build a clickable demo", or design a single screen or a multi-screen flow. Frontend-only / mock data, no prod. Works in any repo. Replaces ds-frame (one screen is just a 1-screen prototype).
---

# ds-prototype — spec → options → HTML or Figma, 100% on your repo

One skill for all prototyping: a single screen or a full flow, in HTML or in Figma. It is
**spec-driven**, uses the project's **real code as the source of truth**, and gives the team
**options** to choose from. It works in **any repo**: it discovers the stack and adapts to it,
rather than assuming a specific framework or design system.

## 1 · Spec the feature (PM lens) — interview briefly

Before designing, get a lightweight PM spec. Fill from the prompt, then ask only the
highest-leverage question(s) (2–3 options + open), restate in a few bullets, and proceed:

- **Objective / JTBD** — what problem, for whom, what does success look like.
- **User + context** — who, when, what they're trying to do.
- **Scope** — one screen, or the hero flow (3–5 screens); the must-haves.
- **Benchmark (optional, light)** — 1–3 patterns from comparable products to ground the
  options. Use only if it sharpens the direction; don't over-research.
- **Ambition — ASK THIS UP FRONT.** Before designing, ask one question: do you want a
  **minimal version** (stick to the brief exactly, zero extras), a **divergent set** (a
  florilège of bolder, different directions), or **somewhere in between**? Default to the
  brief. Never add features, sections, or flourishes the user didn't ask for — if you think
  something is missing, name it as a suggestion, don't build it in silently.
- **Interrogate before building.** If scope, use cases, or visual preferences are unclear,
  ask first instead of guessing. A vague brief is the #1 cause of "approximate" output: the
  model fills the gaps with wrong assumptions.

Bias to action: a sharp spec + sensible defaults beats a long question list.

## 2 · Discover the design system — adapt to THIS repo (the code is the source of truth, 100%)

Do NOT assume a stack. First, **discover** what this repo actually uses, then match it exactly:

1. **Detect the stack.** Read `package.json` (or equivalent) and the project layout: framework
   (Next, Vite, Remix, Astro, Vue, Angular, SvelteKit, plain HTML…) and styling approach
   (Tailwind, CSS variables, CSS modules, styled-components, SCSS, vanilla-extract, a theme
   object…).
2. **Find the token source of truth.** Wherever this repo keeps its design values: CSS custom
   properties (`globals.css` / `styles.css` / `tokens.css`), a Tailwind config, a theme file,
   SCSS vars, a JSON token set. Use those exact values.
3. **Find the real components.** The repo's own component library (`components/`, `ui/`,
   `packages/*`, a registry, a Storybook). Match the real components exactly.
4. **Find the conventions.** `CLAUDE.md` / `AGENTS.md` / `README` / `CONTRIBUTING` / Storybook
   docs. Honor whatever IS documented (states, primary actions, icon set, tone). Do not impose
   rules the repo doesn't state.

Then:

- **Use the repo's real components.** Need one that exists in its library? Use it. If it
  genuinely doesn't exist, **say so explicitly** — compose from the repo's primitives and flag
  it as a new component to add to their DS. **Never silently fake one.**
- **Repo has no design system at all?** Say so, and offer a choice: (a) prototype against a
  minimal, neutral default and **label it clearly as not-yet-on-brand**, or (b) set one up
  first. Don't force any specific external design system.
- *(If this happens to be an @efounders repo, its DS is shadcn + `@efounders` components with
  tokens in `globals.css`; pull missing components from the `@efounders` registry, and
  `/ds-bootstrap` can seed one. That's just one possible setup, not a requirement.)*

## 3 · Propose options

Give **2–3 distinct directions** for the feature (different layouts / IA / emphasis) — each a
real take, not a variant of one. One line of trade-offs per option, so the team can pick.

## 4 · Output — HTML or Figma

Ask which surface (or infer from the request):

**A · HTML** — fast, interactive, prod-free.
- Single self-contained file(s); tokens on `:root`; every value via `var(--…)` (or the repo's
  token mechanism).
- **4px grid, no arbitrary values.** Every spacing / sizing / radius value is a multiple of
  4px and follows the Tailwind scale (`1/2/3/4/6/8/12/16/24…` → `4/8/12/16/24/32/48/64px`).
  Project tokens win; the 4px grid is the fallback whenever you compose a value. Never ship a
  `13px` / `padding: 17px`.
- Real component classes/structure; mock data (no prod); hash routing for flows; no external
  runtime deps (Google Font only if the DS specifies one).

**B · Figma** — visual, team-facing. Generate via the **Figma MCP** (the `figma-generate-design`
/ `use_figma` skills). **Best practices, non-negotiable:**
- **Auto-layout everywhere** — no absolute positioning.
- **Use the real library components** (linked to code via Code Connect). If one isn't in the
  library, **don't fake it**: compose from existing + state clearly it's a new component to add.
- **Variables = tokens** — Figma variable names match the token names exactly.
- **4px grid, no arbitrary values.** All spacing / sizing / radius in auto-layout follows the
  4px grid and the Tailwind scale (`4/8/12/16/24/32/48/64`). Use the project's spacing
  variables; the 4px grid is the fallback when you compose. No off-grid values.
- Clean layer names; **prefix exploration/option frames with `_wip/`** so the MCP skips them later.
- **Code stays the source of truth; Figma reflects it.**

## 5 · Deliver + iterate

- HTML → `**[Open →](file:///absolute/path/…)**`. Figma → the Figma link.
- A short summary **per option** (what it is, trade-offs, what to try).
- Iterate on the option the team picks **as a dialogue** — the first output is the start of the
  conversation, never the final deliverable. Never dump HTML/code in chat: write the file /
  create the Figma frames, return the link.

## Rules
- **Code = source of truth**, always. Figma reflects it, never the reverse.
- **Adapt to the repo.** Discover its stack, tokens, components, and conventions; never assume
  a specific framework or design system.
- **Real components only** (from THIS repo's library); specify explicitly when something must
  be invented.
- **Stick to the brief.** No extra features / sections / flourishes the user didn't ask for.
  Decide ambition up front (minimal vs divergent — §1); when in doubt, build minimal and
  suggest the rest in text.
- **4px grid, Tailwind scale** — every spacing/sizing/radius is a multiple of 4px on the
  Tailwind scale (`4/8/12/16/24/32/48/64`). Project tokens win; the grid is the fallback. No
  arbitrary values, in HTML or Figma.
- **Mock data, no prod** — explore any state freely.
- **Honor whatever the repo documents** (`CLAUDE.md` / `README` / Storybook): states, primary
  action per screen, icon library, tokens-only. Don't invent rules it doesn't state.
