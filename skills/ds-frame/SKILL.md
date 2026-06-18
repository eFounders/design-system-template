---
name: ds-frame
description: Design and refine ONE screen as a static, polished HTML mockup that reuses THIS project's design system — the CSS-variable tokens, the shadcn + @efounders components, and the project's CLAUDE.md rules. Use whenever the user wants to design, mock up, explore or refine a single screen ("design the settings view", "what should the empty inbox look like?", "lay out the project detail page", "show me what X looks like"). NOT for multi-screen flows (use ds-prototype). Frontend-only, mock data, no prod. Output is a clickable file:// link.
---

# ds-frame — one screen, on your system

Turn a screen brief into a self-contained, polished **single HTML file** that reuses the
project's design system. One screen at rest, fully composed, realistic mock data, no backend.
For multi-screen clickable flows, use `ds-prototype`.

**Source of truth = the code.** This is a frontend exploration artifact aligned to the
project's real tokens and components — it never invents its own system.

## Pre-flight — locate the design system (this project's shape)

Read, in the current working directory:
- **`CLAUDE.md`** (root) — the conventions: tokens path, components, hard rules, tone. *Read it first.*
- **Tokens**: `app/globals.css` / `src/styles.css` / `tokens.css` — the CSS custom properties (primitives + semantic). Extract them verbatim.
- **Components**: `components/ui/*`, `registry/**`, or the project's component dir (shadcn + bespoke). Read a few to match real class names / structure.
- A **storybook route** if present — the canonical reference.

**No design system in this project?** Don't invent one — run **`/ds-bootstrap`** first (it
seeds the `@efounders` base + the project's brand). Then come back here.

**Missing a component?** Don't reinvent it — pull it from `@efounders` (`shadcn add
@efounders/<name>` or via the shadcn MCP), or compose from existing primitives and note it.

## Align on the spec (one question max)

From the prompt, fill: the screen, the primary user + their goal here, the information
hierarchy, the sections, the state to render (populated by default; empty/loading/error if
asked). If one high-leverage gap would make the result useless, ask **one** focused question
(2–3 options + open). Otherwise restate the spec in 4–5 bullets and design. Bias to action.

## Build

Single file `frame-<slug>.html` in the project root.

- **Tokens, not literals.** Put the project's CSS-variable tokens on `:root`, then every
  color/space/radius/font in CSS references `var(--…)`. Never a raw hex/px outside `:root`.
- **Match the real components** (the shadcn + bespoke ones you read) — same structure,
  variants, states. Don't invent.
- **Honor `CLAUDE.md`**: the 5 states discipline, one primary action per screen, one icon
  library, no hardcoded values.
- **Mock data, no prod.** Realistic domain content; explore any state freely (empty / loaded /
  extreme) — you control the data, never the production backend.
- **No external runtime deps** (no CDN/React/Tailwind); load a Google Font only if the DS
  specifies one. Local interactivity within the screen is welcome (tabs, filters, hovers);
  **no navigation away** (that's `ds-prototype`).
- Multiple states requested → stack them as labeled sections in the same file.

## Deliver

`realpath` the file, then output `**[Open frame →](file:///absolute/path/frame-<slug>.html)**`
+ a 3–5 line summary (screen, sections, local interactivity to try, what's out of scope).
Write the file, return the link — never dump the HTML in chat.
