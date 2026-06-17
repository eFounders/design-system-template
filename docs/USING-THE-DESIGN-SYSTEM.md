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
- **Consume, don't copy.** Pull from the registry with `shadcn add`; update by re-pulling.
- **The storybook shows the real components.** Your live reference — it can't drift.

## Resources

- **Storybook (live reference):** https://ds-registry-five.vercel.app
- **Registry (install from):** https://ds-registry-five.vercel.app/r/{name}.json
- **Repo:** https://github.com/eFounders/ds-registry

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

1. **Ensure shadcn + Tailwind v4** (`npx shadcn@latest init` if needed).
2. **Point at the registry** — add the `@efounders` namespace in `components.json`,
   pointing to `https://ds-registry-five.vercel.app/r/{name}.json`.
3. **Pull the base** — `shadcn add @efounders/theme` + any bespoke you need (`tag`, `stat`,
   `filter-bar`, `chat-*`). Standard components come from shadcn and are branded automatically.
4. **Set the brand** — edit `--brand-*`, `--font-base`, `--radius`, `--text-base`.
5. **Add `CLAUDE.md`** — copy `templates/CLAUDE.md`, fill the paths + tone.
6. **Check + build** — run `/ds-audit`, then `/design-prototype …`.

### B · A project that already has a design system

Wire it in, don't rip it out.

1. **Run `/ds-audit`** → see where it stands. Keep what works.
2. **Add `CLAUDE.md`** pointing to *its* tokens / components / rules — usually this alone
   makes it AI-native.
3. **Align token names** to the shadcn contract where cheap — keep its brand.
4. **Point the storybook at the real components** if it's a static mock.
5. **Pull only what's missing** from the registry, never a fork.
6. **Re-run `/ds-audit`** to confirm.

## Step 2 — Use it day to day

In a Claude Code conversation **inside the project**:

| You want… | You type |
|---|---|
| a clickable multi-screen prototype | `/design-prototype [what you want]` |
| one polished screen | `/design-frame [the screen]` |
| a UX review | `/nelly-design-critique` + screenshots + goal |
| a DS health check | `/ds-audit` |

Because the project has its tokens + `CLAUDE.md`, what comes out is already on-brand —
you don't re-explain the system each time. *Roles:* PM spins a prototype to align;
Designer maintains the base, sets the brand, refines, reviews; Dev pulls components and
Claude codes on-brand from the `CLAUDE.md`.
