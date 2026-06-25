---
# ── Machine-readable metadata (the design identity in a nutshell) ──
name: eFounders Design System
description: Brand-agnostic, AI-native design system. Tokens + the full shadcn toolbox, themed.
source_of_truth: code            # tokens live in code, Figma reflects it
files:
  tokens: app/tokens.css         # THE token values (edit the knobs here)
  components: components/ui/      # 46 shadcn components + 4 layout primitives (50 files)
  rules: CLAUDE.md, docs/COMPONENTS.md, docs/COMPOSITION.md
  storybook: https://design-system-template-storybook.vercel.app

# ── Brand knobs (the only things to change per project) ──
brand:
  color: "#2563eb"               # --brand-600
  radius: "8px"                  # --radius
  font_base: "ui-sans-serif, system-ui, sans-serif"   # --font-base
  text_base: "14px"              # --text-base (density: 14 dense / 16 large)

# ── Design tokens (names → role; values in app/tokens.css) ──
tokens:
  color:
    background: var(--background)            # page background
    foreground: var(--foreground)            # body text
    primary: var(--primary)                  # the one primary action, links, focus
    primary_foreground: var(--primary-foreground)
    muted_foreground: var(--muted-foreground) # secondary text, labels, hints
    accent: var(--accent)                    # hover / selected background
    border: var(--border)
    ring: var(--ring)                        # focus ring
    destructive: var(--destructive)          # error / delete
    success: var(--success)
    warning: var(--warning)
    info: var(--info)
  typography:
    sizes: { xs: 12px, sm: 13px, base: 14px, md: 16px, lg: 20px, xl: 28px }
    weights: { regular: 400, medium: 500, semibold: 600 }
  spacing:
    grid: 4px
    scale: [4px, 8px, 12px, 16px, 20px, 24px, 32px, 40px, 48px, 64px]
  radius: { xs: 4px, sm: 6px, md: 8px, lg: 12px, xl: 16px, full: 9999px }
  modes: [light, dark]
---

# Design

How this product should look and feel. **The code is the source of truth** — token values live in `app/tokens.css`, components in `components/ui/`. Never hardcode a colour or size when a token exists. To re-brand, change only the brand knobs above.

## Brand & Style

A clean, neutral, product-first system. Generous whitespace, restrained colour, one clear action per screen. The base ships intentionally neutral (placeholder blue) so each project sets its own brand by editing four knobs (`--brand-*`, font, radius, density) — everything else re-skins automatically. Light and dark are both first-class.

## Color

Two tiers: raw **primitives** (`--neutral-*`, `--brand-*`, feedback ramps) feed **semantic** tokens named by role. Always use the semantic ones:

- **Surface & text:** `--background` / `--foreground`, `--card`, `--muted-foreground` for secondary text.
- **Action:** `--primary` (one primary action per screen), `--primary-hover/active/subtle`, `--accent` for hover/selected states.
- **Feedback (meaning only, never decoration):** `--destructive`, `--success`, `--warning`, `--info` (each with a `-subtle` background).
- **Decorative categories:** the `--tag-*` palette (9 hues) — a colour means a category, not a status.

## Typography

System sans-serif by default (`--font-base`), monospace for code (`--font-mono`). Sizes are fixed steps: `--text-xs` 12 → `--text-xl` 28, with `--text-base` (14px) driving density. Weights: regular 400 / medium 500 / semibold 600. Body line-height 1.5.

## Spacing

A strict **4px grid** (`--space-1` = 4px … `--space-16` = 64px). Use the scale, never arbitrary px. Consistent spacing is what makes screens feel calm and on-system.

Radius: `--radius` (8px) is the default; `xs` 4 → `xl` 16, plus `full`. Elevation via `--shadow-sm/md/lg`.

## Components

The toolbox is the **full shadcn component set** (Button, Input, Dialog, Sidebar, Command, Form, Table, Tabs, Tooltip… 46 components), plus four in-house layout primitives (`Container`/`Section`/`Stack`/`PageHeader`) — 50 files in `components/ui/`, all themed by the tokens above. One canonical component per role — never duplicate a primitive. Browse them all, themed and with every state, in the Storybook. Build a custom component only when it's a genuinely reusable pattern shadcn doesn't cover (then spec it in `docs/COMPONENTS.md`).

Every screen handles the **5 states**: empty, loading, error, partial, ideal.

## Layout

Generous whitespace, a constrained reading width, one clear action per screen. Composition runs on four primitives, each owning one decision so screens stay consistent: `Container` (page width and gutters), `Section` (vertical rhythm), `Stack` (a column or row with a consistent gap), `PageHeader` (title, description, actions). Most screens follow a simple archetype: a single `Container`, a `PageHeader`, then stacked `Section`s. The full rules and page archetypes live in `docs/COMPOSITION.md`.
