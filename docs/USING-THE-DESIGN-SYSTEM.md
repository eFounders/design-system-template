# How to use the design system

A shared design-system base + an AI-native way of working. You consume it per
project, set your own brand on top, and Claude builds on-brand from it.

> Notion version (with per-step sub-pages): https://app.notion.com/p/3821cc0bd5bc818986acd792a4490721

## The principles — what makes a design system AI-native

*What I've understood from my research — 4 principles.*

**1. Make the whole system visible — a code-linked storybook that doubles as a readability check.**
The storybook renders the real components and *all* the tokens straight from the code — the source of truth — laid out the way you design (foundations → components → molecules), not a static mock. Because it shows what's **connected**, what's **forked**, and what's **missing**, it's also a diagnostic of **what the AI can actually read**: if the storybook can render the whole system, the AI can read the whole system — so it prototypes and designs from it reliably; the gaps you see are the gaps the AI will hit too.

**2. Build a design-system folder that matches how the AI works — it's the AI's memory.**
A prompt is one session; the design system is what the AI **remembers** across sessions, teammates and versions. Concretely, an ideal folder holds:
- **tokens** — values, semantic, named by intent (`tokens.css`)
- **components** — the real, reusable ones (the code)
- **component specs** — what each is *for*, when to use it, variants, states (`COMPONENTS.md`); the code says *how it looks*, the spec says *when to use it*
- **conventions** — the rules (`CLAUDE.md`): the 5 states, one primary, source of truth
- **a code-linked storybook** — the live reference

Knowing whether a project's files match this ideal is exactly what `/ds-audit` evaluates.

**3. Reuse the real component library — don't reinvent it.**
Tools like a **component registry** and **MCP servers** (shadcn for components, Figma for design) let the AI pull directly from your *real* components — the ones that ship. The system becomes queryable: the agent searches it, finds the right component, uses it — instead of inventing a plausible-but-wrong one.

**4. Explore with shareable deliverables.**
Exploration still needs artifacts the team can review and act on. So prototyping produces real, shareable outputs — in **code** (clickable HTML) or in **Figma** — depending on the moment. The point isn't one magic tool; it's that every exploration lands as something concrete people can react to.

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

**Already have a (messy) Figma DS?** Don't merge a clean library into it — that works badly
(duplicate components, broken instances). **Generate a fresh** one from the code, **re-link
the screens** to the new components, then **retire the legacy** page. *(Optional: fold a
genuinely-better old decision into the code first, so it flows into the fresh Figma.)* Run
**`/ds-figma`** for this.

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
