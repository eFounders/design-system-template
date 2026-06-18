# How to use the design system

A shared design-system base + an AI-native way of working. You consume it per
project, set your own brand on top, and Claude builds on-brand from it.

> Notion version (with per-step sub-pages): https://app.notion.com/p/3821cc0bd5bc818986acd792a4490721

## What to remember (the essentials)

- **The skeleton is shared, the brand is yours.** Set `--brand-*`, font, `--radius`,
  density per project — every component follows.
- **The agent reads `CLAUDE.md`.** A `CLAUDE.md` at the project root, pointing to the
  tokens, components and rules, is what makes Claude build on-brand. The single
  highest-leverage file.
- **Seed once, then you own it.** `shadcn add` writes the code *into your repo* — you own it. The registry is a starting point + an optional update channel, **not a runtime or build dependency**.
- **The storybook shows the real components.** Your live reference — it can't drift.
- **Figma leads while you explore; code leads once you build.** During DA exploration, Figma + Claude lead (you're searching the direction). The moment you create the design system, the **code becomes the source of truth** and Figma reflects it.

## Resources

- **Storybook (live reference):** https://ds-registry-five.vercel.app
- **Registry** — what `shadcn add` reads under the hood (not a page to open). Pattern `…/r/{name}.json`, where `{name}` is the component, e.g. `/r/theme.json`.
- **Repo:** https://github.com/eFounders/ds-registry
- **Component specs (agent-readable):** [`docs/COMPONENTS.md`](./COMPONENTS.md)

## Independence — spinning a startup out

Each startup ends up independent, with its own codebase — and the design system never
gets in the way of that:

- `shadcn add` **writes the code into the startup's repo** — it owns the tokens and
  components locally. The registry is **not** a runtime or build dependency.
- Spinning out → it **keeps all its code** and simply stops pulling from `@efounders`. Nothing breaks.
- Wants its own distribution later? It **forks the registry** to its own.
- Its **brand is already its own** (`--brand-*` set locally) — only the starting skeleton was ever shared.

---

## Step 0 — Audit your project

Know where a project stands before doing anything else.

Point `/ds-audit` at a **git repo** — a GitHub repo (URL or `owner/repo`) it clones, or
the repo you're already in. It audits the codebase (always the repo, closest to the
code — not loose local files), scores it with evidence, classifies it, and returns a
prioritized plan.

**What it checks**

- **A · Tokens** — semantic, named by role (`--primary`…); intent per token; light + dark;
  brand isolated to a few knobs; shadcn contract respected.
- **B · Conventions** — a `CLAUDE.md` at the root (the key one); component specs the agent
  can read; the 5 states documented; hard rules explicit.
- **C · Components & storybook** — real reused components (no `Button`/`PrimaryButton`
  sprawl); a living storybook rendering the real components.
- **D · Distribution** — consumed from a versioned source (registry), not copied;
  brand-agnostic base.
- **E · Verification** — a deterministic gate on PRs; prototyping skills that build from the codebase.

## Step 1 — Onboard a project

### A · Starting a new project

**Phase 0 — find the direction first (no code yet).** Moodboards in Figma → ask Claude to
generate sample screens (*écrans types*) directly in Figma, iterate until a direction
clicks. Figma leads here; there's no design system yet. **Once the DA is locked, wire it:**

1. **Ensure shadcn + Tailwind v4** (`npx shadcn@latest init` if needed).
2. **Point at the registry** — add the `@efounders` namespace in `components.json`,
   pointing to `https://ds-registry-five.vercel.app/r/{name}.json`.
3. **Pull the base** — `shadcn add @efounders/theme` + any bespoke you need (`tag`, `stat`,
   `filter-bar`, `chat-*`). Standard components come from shadcn and are branded automatically.
4. **Set the brand** — edit `--brand-*`, `--font-base`, `--radius`, `--text-base`.
5. **Add `CLAUDE.md`** — copy `templates/CLAUDE.md`, fill the paths + tone.
6. **Check + build** — run `/ds-audit`, then `/ds-prototype …`.

### B · A project that already has a design system

Wire it in, don't rip it out.

1. **Run `/ds-audit`** → see where it stands. Keep what works.
2. **Add `CLAUDE.md`** pointing to *its* tokens / components / rules — usually this alone
   makes it AI-native.
3. **Align token names** to the shadcn contract where cheap — keep its brand.
4. **Point the storybook at the real components** if it's a static mock.
5. **Pull only what's missing** from the registry, never a fork.
6. **Re-run `/ds-audit`** to confirm.

**Either way — let Claude reach the registry:** run `shadcn mcp init --client claude` in
the project. Claude Code then gets MCP tools to search / view / add from `@efounders`
conversationally — it pulls the right component while building, no manual `shadcn add`.

## Step 2 — Figma bridge & daily use

### Bridge to Figma — the design surface

Going all the way to Figma is what makes a *team* share one truth. **The code stays the
source of truth; Figma reflects it** (code → Figma, never the reverse).

1. **Variables = your tokens** — the Figma file's variables mirror the project's tokens (its brand).
2. **A Figma library that reflects the real components** — your storybook is the reference.
3. **Code Connect** links each Figma component to its real code component → Dev Mode shows the actual code.

Build it *from the code* with the Figma MCP (the `figma-generate-library` skill).

**Across the project's life:** Figma *leads* while you explore the DA (no code yet); once
the design system exists, the **code leads** and Figma reflects it. Then you can explore
several **pistes in Figma**, validate with the team, and Code Connect round-trips the
chosen one to code.

**One skill, two surfaces:** `/ds-prototype` outputs **HTML** (interactive flows + data
scenarios, fast) **or Figma** (visual / DA exploration + team buy-in). Figma generation is
token-heavy — dose it.

**Already have a Figma DS on the project?** Treat it as a *reference to harvest*, not a
base: regenerate the library from the code, fold any genuinely-better decisions from the
old file back into the code (they reappear in the new Figma), then archive the old file.
Never keep two competing sources.

### Day to day  *(still being refined)*

In a Claude Code conversation **inside the project**:

| You want… | You type |
|---|---|
| design a screen or a clickable flow (HTML or Figma) | `/ds-prototype [what you want]` |
| a UX review | `/nelly-design-critique` + screenshots + goal |
| a DS health check | `/ds-audit` |

Because the project has its tokens + `CLAUDE.md`, what comes out is already on-brand —
you don't re-explain the system each time. *Roles:* PM spins a prototype to align;
Designer maintains the base, sets the brand, refines, reviews; Dev pulls components and
Claude codes on-brand from the `CLAUDE.md`.
