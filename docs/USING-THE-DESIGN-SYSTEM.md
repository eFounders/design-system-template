# Using the design system — operating guide

The practical manual. Three things: what you set up once, what to check on each
project, and the prompts/skills to make prototypes from a codebase.

The goal: **a design system that runs on Claude to build prototypes from the
codebase**, on every startup — same method, different brands.

---

## 1. Set up once (your machine)

- **Claude Code** + **Node** — you already have these.
- **Design skills** already in Claude: `design-prototype`, `design-frame`,
  `nelly-design-critique`, `design-system-creation`. Nothing new to install.
- **The shared base** = this `@efounders` registry. Maintain it once; every project
  consumes it. (Run the storybook locally with `npm run dev`; publish it with
  `npm run registry:build` + deploy so projects can `shadcn add @efounders/…`.)

You do **not** need to become a registry engineer. The plumbing is set up once.

---

## 2. Check on each project (the checklist)

For a project to "have a design system that runs on Claude", it needs **3 boxes**:

- [ ] **A `CLAUDE.md` at the root** — the file Claude reads automatically. It points
  to the tokens, the components, and the rules. **This is the box that matters.**
  Use `templates/CLAUDE.md` from this repo as the drop-in starting point.
- [ ] **Tokens** in one clear file (`styles.css` / `globals.css`) = the project's brand.
- [ ] **Components** available (shadcn + the project's bespoke ones).

If the 3 boxes are checked → Claude prototypes on-brand, from the code, without you
re-explaining. If `CLAUDE.md` is missing, that's ~90% of the problem.

A project with a mature DS of its own (its own tokens + components) does **not** need
the base's component code — only the conventions layer (`CLAUDE.md` + rules).

---

## 3. Prompts & skills (to make a prototype)

Open a Claude Code conversation **inside the project**, then:

| You want… | You type | What it does |
|---|---|---|
| a clickable multi-screen prototype | `/design-prototype an onboarding flow, 3 screens` | reads the project's DS, builds a navigable on-brand prototype |
| one polished screen | `/design-frame the settings screen` | a single-screen mockup from the DS |
| a UX review | `/nelly-design-critique` + screenshots + goal | scored review against named UX frameworks |
| start a DS on a project that has none | `/design-system-creation` | creates tokens + components + `CLAUDE.md` |

The skills reuse the design system found in the current directory, so output comes
out on-brand **automatically** — because of the `CLAUDE.md`.

---

## What is unified (and what isn't)

- **Unified**: the *method* — token contract, component vocabulary, rules,
  `CLAUDE.md` structure, the skills. The skeleton.
- **Per project**: the *brand* — colors, font, radius, density. The skin.

Set the brand in one place: `--brand-*`, `--font-base`, `--radius`, `--text-base`.
Every component follows. Rose, Dona, Haze: same method, different skins.
