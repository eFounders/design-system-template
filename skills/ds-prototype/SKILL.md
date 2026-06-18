---
name: ds-prototype
description: Build a functional, interactive multi-screen HTML prototype (working navigation, modals, forms, flows — no backend) that reuses THIS project's design system — the CSS-variable tokens, the shadcn + @efounders components, and the project's CLAUDE.md rules. Use when the user wants to "prototype", "build a clickable demo", "show a working flow", "mock up how X works". For a single screen, use ds-frame. Frontend-only, mock data, no prod. Output is a clickable file:// link.
---

# ds-prototype — a clickable flow, on your system

Turn a product prompt into a self-contained, **interactive single HTML file** that reuses the
project's design system: navigation works, modals open, forms validate, lists filter. State
in memory (optionally `localStorage`). No backend, no prod data. For one screen, use `ds-frame`.

**Source of truth = the code.** It's a frontend exploration aligned to the project's real
tokens and components — it never invents its own system, and explores with mock data so it's
decoupled from production.

## Pre-flight — locate the design system (this project's shape)

Read, in the current working directory:
- **`CLAUDE.md`** (root) — conventions: tokens path, components, hard rules, tone. *Read it first.*
- **Tokens**: `app/globals.css` / `src/styles.css` / `tokens.css` — the CSS custom properties. Extract verbatim.
- **Components**: `components/ui/*`, `registry/**`, or the project's component dir (shadcn + bespoke). Read a few to match real class names / structure.
- A **storybook route** if present — the canonical reference.

**No design system in this project?** Run **`/ds-bootstrap`** first, then come back.
**Missing a component?** Pull from `@efounders` (`shadcn add @efounders/<name>` / shadcn MCP)
or compose from primitives and note it — never reinvent.

## Align on the spec (one question max)

Fill: product/feature, primary user + job-to-be-done, the 3–5 screens, the **one hero flow**
to demonstrate flawlessly, and scope boundaries (what's out). If one high-leverage gap would
make it useless, ask **one** focused question (2–3 options + open). Otherwise restate the spec
in 4–5 bullets and build. Bias to action; 3–5 screens is usually right.

## Build

Single file `prototype-<slug>.html` in the project root.

- **Tokens, not literals.** Project's CSS-variable tokens on `:root`; everything references `var(--…)`.
- **Match the real components** (shadcn + bespoke) — same structure/variants/states. Don't invent.
- **Real interactivity**: every primary CTA does something visible (create appends, delete
  removes, filter filters, tabs switch). Hash routing (`#/…`) so back/forward + refresh work.
- **Honor `CLAUDE.md`**: the 5 states, one primary per screen, one icon library, no hardcoded values.
- **Mock data, no prod.** Realistic domain seed; optional `localStorage` + a "Reset" button.
- **No external runtime deps** (no CDN/React/Tailwind); Google Font only if the DS specifies one.

## Deliver

`realpath` the file, then output `**[Open prototype →](file:///absolute/path/prototype-<slug>.html)**`
+ a 3–5 line summary (screens, the hero flow to try, what's stubbed/out of scope).
Write the file, return the link — never dump the HTML in chat.
