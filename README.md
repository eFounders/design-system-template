# eFounders Design System — the kit

The shared, **brand-agnostic, AI-native** design-system base for eFounders startups.
The **code is the source of truth**; each project sets its own brand on top and stays
independent (the code is owned, not a dependency).

## Two ways to use it

- **Clone the whole kit** — *Use this template* on GitHub. You get tokens + components +
  storybook + conventions as a starter you own and brand. *(Romain-style, but no drift.)*
- **Pull pieces** — `shadcn add @efounders/<name>` from the registry
  (`https://ds-registry-five.vercel.app/r/{name}.json`). Updating = re-pull.

## What's inside

- **Tokens** — `app/globals.css` (semantic, two-tier primitives→semantic, light + dark).
- **Components** — `registry/new-york/` + `components/ui/`: shadcn (themed) + bespoke
  (`tag`, `stat`, `filter-bar`, `chat-message`, `chat-composer`, `chat-typing`).
- **Storybook** — `app/page.tsx`: live, renders the real components (foundations →
  components → molecules), with a token grid (primitive · hex) that auto-resolves.
- **Conventions** — `templates/CLAUDE.md` (drop-in), `docs/COMPONENTS.md` (specs), `llms.txt`.
- **Gate** — `scripts/ds-check.mjs` + `.github/workflows/ds-check.yml` (hardcoded values / unknown tokens fail).
- **Registry** — `registry.json` → `public/r/*.json` (each item carries a `meta` contract).

## Docs & skills

- **How to use it:** `docs/USING-THE-DESIGN-SYSTEM.md` ·
  [Notion](https://app.notion.com/p/3821cc0bd5bc818986acd792a4490721)
- **Skills:** `/ds-audit` (assess) · `/ds-bootstrap` (create) · `/ds-figma` (Figma from code) · `/ds-prototype` (screens/flows)

## Dev

```bash
npm run dev             # the storybook
npm run registry:build  # build the registry JSON (public/r/*.json)
npm run ds-check        # the conformance gate
```

Storybook (live): https://ds-registry-five.vercel.app
