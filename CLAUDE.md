# CLAUDE.md — design-system-template

The eFounders shared, brand-agnostic, AI-native **design-system template**. Clone it per startup and re-brand. The **code is the source of truth**; Figma reflects it.

## Where everything is (one file = one role)

| What | Where |
|---|---|
| **Tokens** (the values) | `app/tokens.css` — edit brand knobs here |
| Tailwind wiring | `app/globals.css` (imports tokens.css, maps to utilities) |
| **Components** (the toolbox) | `components/ui/` — the full shadcn set, themed (46) |
| **Visual identity** | `DESIGN.md` — portable summary for tools without the registry |
| **Component specs / rules** | `docs/COMPONENTS.md` |
| **Composition / layout** | `docs/COMPOSITION.md` (+ layout primitives `Container`/`Section`/`Stack`/`PageHeader` in `components/ui/`) |
| **Agent index** | `llms.txt` |
| **The gate** | `scripts/ds-check.mjs` (run `npm run ds-check` or `/ds-check`) |
| **Distribution** | `registry.json` → `public/r/*.json` (`shadcn add @efounders/...`) |
| **Storybook** | `npm run storybook` · live: design-system-template-storybook.vercel.app |

## Hard rules (non-negotiable)

- **Tokens only.** Never a raw hex/px when a token exists. The gate fails the build otherwise.
- **One canonical component per role.** Don't add `PrimaryButton` next to `Button`, and don't duplicate a shadcn primitive (a `Tag` that's just a coloured `Badge`). Need something new → install from shadcn, or compose existing; only build custom when it's a genuinely reusable pattern, then spec it in `docs/COMPONENTS.md`.
- **Re-brand via knobs only:** `--brand-*`, `--font-base`, `--radius`, `--text-base` (in `app/tokens.css`). Everything else follows.
- **Every screen handles the 5 states:** empty, loading, error, partial, ideal.
- **Accessibility:** keyboard, visible focus, correct ARIA, sufficient contrast.

## Workflow

`main` is protected — work on a branch, open a PR, let CI (`ds-check`) pass, then merge. Never push directly to `main`.

## Skills

`/ds-audit` (assess a project) · `/ds-bootstrap` (set up a project's DS) · `/ds-figma` (Figma from code) · `/ds-prototype` (screens & flows).
