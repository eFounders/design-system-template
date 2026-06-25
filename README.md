# eFounders Design System — the kit

The shared, **brand-agnostic, AI-native** design-system base for eFounders startups.
The **code is the source of truth**; each project sets its own brand on top and stays
independent (the code is owned, not a dependency).

## Two ways to use it

- **Clone the whole kit** — *Use this template* on GitHub. You get tokens + components +
  storybook + conventions as a starter you own and brand. *(Romain-style, but no drift.)*
  First move after cloning: replace the root `CLAUDE.md` (which governs *this kit*) with a
  filled-in copy of `templates/CLAUDE.project.md` — that's your project's conventions file.
- **Pull pieces** — `shadcn add @efounders/<name>` from the registry
  (`https://design-system-template-registry.vercel.app/r/{name}.json`). Updating = re-pull.

## What's inside

- **Tokens** — `app/tokens.css` (the values: two-tier primitives→semantic, light + dark; `app/globals.css` wires them into Tailwind).
- **Visual identity** — `DESIGN.md` (portable summary) · **agent rules** — `CLAUDE.md`.
- **Components** — `components/ui/`: the full shadcn toolbox, themed by the tokens
  (one canonical component per role, no duplicates). `registry/new-york/` holds the
  distributed `theme` (and any future custom component).
- **Storybook** — the real reference, published at
  `https://design-system-template-storybook.vercel.app` (Get started · Foundations · Base),
  rendering the actual components. `npm run storybook` to run it locally.
- **Conventions** — `templates/CLAUDE.project.md` (drop-in), `docs/COMPONENTS.md` (specs), `llms.txt`.
- **Gate** — `scripts/ds-check.mjs` + `.github/workflows/ds-check.yml` (hardcoded values / unknown tokens fail).
- **Registry** — `registry.json` → `public/r/*.json` (each item carries a `meta` contract).

## Docs & skills

- **How to use it:** [Notion — AI-Design Workspace](https://app.notion.com/p/3821cc0bd5bc818986acd792a4490721) (setup, onboarding, daily use)
- **Skills:** `/ds-audit` (assess) · `/ds-bootstrap` (create) · `/ds-figma` (Figma from code)

## Dev

```bash
npm run storybook       # the reference (Foundations + Base toolbox)
npm run dev             # the registry app (serves /r/*.json; root redirects to the storybook)
npm run registry:build  # build the registry JSON (public/r/*.json)
npm run ds-check        # the conformance gate
```

Storybook (live): https://design-system-template-storybook.vercel.app · Registry JSON: https://design-system-template-registry.vercel.app/r/{name}.json
