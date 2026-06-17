# CLAUDE.md — [PROJECT NAME]

> Drop this file at the root of a project. Claude Code reads it automatically and
> follows it when generating UI. Fill the [brackets], then delete this line.
> This is the conventions layer of the eFounders design system: the project owns
> its brand, but builds the same disciplined way as every other project.

## What this project uses

- **Design system base**: the shared `@efounders` registry (tokens contract +
  bespoke components + rules). The skeleton is shared; the brand is this project's own.
- **Tokens (the brand)**: `[path, e.g. src/styles.css or app/globals.css]` — the
  single source of truth for colors, type, radius, spacing. Two tiers: primitives →
  semantic. Style via the semantic tokens (`--primary`, `--muted-foreground`, …),
  never the primitives, never a raw hex/px.
- **Components**: shadcn components (themed by the tokens above) + bespoke ones in
  `[path, e.g. src/components/ui + src/components/<brand>/]`.
- **Storybook / reference**: `[route or file, e.g. /design]` — the living reference
  of every token and component. What it shows is what ships.

## Design rules — NON-NEGOTIABLE

1. **Always use the design system.** Every color, size, spacing, radius and component
   comes from the tokens/components above. Never invent a value or a component.
2. **Missing component?** Do not improvise → combine existing ones, and log the need
   (see `[components spec]` § Missing components). Decide at the design ritual.
3. **The 5 states.** Every screen handles: empty, loading, error, partial, ideal.
4. **One primary action per screen.** Never two `primary` buttons side by side.
   Destructive actions require confirmation.
5. **One icon library** for the whole project: `[Lucide / Phosphor / …]`. Sizes via
   `--icon-sm/md/lg`. Never mix two libraries.
6. **Simplicity.** One goal per screen. When in doubt, the simplest thing for the user.

## This project's brand (the only knobs to set)

- **Brand color** → `--brand-*` (or `--primary` and its states)
- **Font** → `--font-base` / display font
- **Corner personality** → `--radius` (0 = square, 8 = soft, 16+ = very round)
- **Density** → `--text-base` (14 dense / 16 large), 4px spacing grid
- **Tag palette** → `--tag-*` (decorative, non-semantic categories)

Components and patterns follow these automatically — do not retouch them per feature.

## Tone

[tutoiement/vouvoiement · 2-3 personality words · vocabulary to avoid]

## How to prototype from this codebase

In a Claude Code conversation **inside this project**:
- Clickable multi-screen prototype → `/design-prototype [what you want]`
- A single polished screen → `/design-frame [the screen]`
- UX review → `/nelly-design-critique` + screenshots + goal

These skills reuse the design system found in this directory, so output comes out
on-brand automatically — because of this file.

If the shadcn MCP is set up (`shadcn mcp init --client claude`), Claude can also search
and add `@efounders` components directly — no manual `shadcn add` needed.

## Source of truth

The tokens/components files are THE reference. A feature never silently changes a
token. Improvements to the shared skeleton go to the `@efounders` registry, not here.
