# Using the eFounders design system

One shared, brand-agnostic base + an AI-native process. Each project keeps its own
skin; the method is the same everywhere. This guide has three parts:

1. **Step 0 — Is your DS AI-native?** (understand it, audit your project)
2. **Onboard a project** (new company · existing company with a DS)
3. **How you use it day to day** (light for now — to expand)

---

## 1 · Step 0 — Is your DS AI-native?

An **AI-native design system** is one an agent can *read and build from reliably*:
the brand lives in machine-readable tokens, the rules live where the agent reads
(the code + a `CLAUDE.md`), components are real and reused, and the system is a
versioned source of truth — not copied per project.

**Audit any project with one command:** run `/ds-audit` in a Claude Code
conversation inside the repo. It inspects the codebase, scores the criteria below
with evidence, classifies the project, and returns a prioritized plan.

### The checklist (what `/ds-audit` scores)

**A · Tokens** — semantic, named by role (`--primary`, `--muted-foreground`); intent on
each (use for / not for); light + dark; brand isolated to a few knobs; shadcn contract respected.
**B · Conventions** — a `CLAUDE.md` at the root pointing to tokens/components/rules
(*highest-leverage item*); component specs the agent can read; the 5 states documented; hard
rules explicit (one primary/screen, one icon library, never invent a value).
**C · Components & storybook** — real reused components (no `Button`/`PrimaryButton` sprawl);
a living storybook that renders the *real* components (no drift).
**D · Distribution** — a versioned source projects *consume* (registry), not copy; brand-agnostic base.
**E · Verification** — a deterministic gate on PRs; a component audit; prototyping skills that build from the codebase.

> Most boxes checked → an agent builds on-brand from your code with little hand-holding.

---

## 2 · Onboard a project — what do I do?

### A · New company (greenfield)

1. **Ensure shadcn + Tailwind v4** in the project (`npx shadcn@latest init` if needed).
2. **Point at the registry** — add to `components.json`:
   ```json
   "registries": { "@efounders": "https://ds-registry-five.vercel.app/r/{name}.json" }
   ```
3. **Pull the base** — `shadcn add @efounders/theme` (the token structure) + any bespoke
   you need (`tag`, `stat`, `filter-bar`, `chat-message`, `chat-composer`, `chat-typing`).
   Standard components come from shadcn (`shadcn add button input table …`) and are branded
   automatically by the theme.
4. **Set the brand** — edit `--brand-*`, `--font-base`, `--radius`, `--text-base` in the
   tokens file. Everything follows.
5. **Drop in `CLAUDE.md`** — copy `templates/CLAUDE.md`, fill the paths + tone.
6. **Confirm + build** — run `/ds-audit` to check you're AI-native, then `/design-prototype …`.

### B · Existing company that already has a DS

The goal is to *wire it in*, not rip it out.

1. **Run `/ds-audit`** in their repo → verdict + plan. Keep what works.
2. **Add the conventions layer** (usually the missing piece) — a `CLAUDE.md` pointing to
   *their* tokens, components, and rules (adapt `templates/CLAUDE.md`). This alone makes their
   DS AI-native.
3. **Align token naming to the shadcn contract** where it's cheap (`--primary`, `--background`,
   `--ring`…) so shadcn components plug in — **keep their brand values**.
4. **Fix the storybook** if it's a static mirror → point it at the real components.
5. **Add the deterministic gate** if missing.
6. **Consume only what they lack** from `@efounders` (a bespoke component), never a fork.
   Re-run `/ds-audit` to confirm.

---

## 3 · How you use it day to day  *(light — to expand)*

In a Claude Code conversation **inside the project**:

| You want… | You type |
|---|---|
| a clickable multi-screen prototype | `/design-prototype [what you want]` |
| one polished screen | `/design-frame [the screen]` |
| a UX review | `/nelly-design-critique` + screenshots + goal |
| a DS health check | `/ds-audit` |

**Roles** — *PM* spins a prototype to align (`/design-prototype`); *Designer* maintains the
base, sets the brand, refines screens, reviews; *Dev* pulls components and Claude codes
on-brand from the `CLAUDE.md`. Same system, three altitudes — nobody re-explains it.

---

*Repo: eFounders/ds-registry · Storybook: https://ds-registry-five.vercel.app · maintained once, consumed everywhere.*
