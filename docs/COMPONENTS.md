# Component specs — `@efounders`

What the agent reads to use the design system correctly. The toolbox is the **full shadcn
component set** (button, input, dialog, sidebar, command, form…), themed by the tokens — it
follows shadcn's own docs plus the token rules below. Browse them, themed and with all states,
in the **Base** section of the Storybook. **Every value comes from a token — never a raw hex/px.**

## Token intent (the ones to get right)

| Token | Use for | Not for |
|---|---|---|
| `--primary` (+ `-foreground` / `-hover`) | the one primary action per screen, links, focus | decorating a large surface (→ `--primary-subtle`) |
| `--muted-foreground` | secondary text: labels, hints, metadata, placeholders | body text (→ `--foreground`) |
| `--accent` (+ `-foreground`) | hover / selected background (menus, rows) | a primary action |
| `--destructive…` | error, delete (confirm first) | a warning (→ `--warning`) |
| `--success` / `--warning` / `--info` (+ `-subtle`) | feedback meaning only | decoration |
| `--tag-{hue}-bg` / `-fg` | decorative, non-semantic categories | a semantic status (→ a `Badge`) |
| `--border` / `--input` / `--ring` | borders, field borders, focus ring | text |

## Components

There are **no bespoke components** — the toolbox is the standard shadcn set, themed by the
tokens. Install what you need with `npx shadcn add <name>`; it inherits the theme automatically.

**One canonical component per role.** Don't duplicate a primitive (a `Tag` that is only a
`Badge` with a colour, for instance). Add a *custom* component only when it's a genuinely
reusable pattern shadcn doesn't cover — and when you do, give it a spec in this section
(for / not-for · variants · tokens · rules), register it in `registry.json`, and add a story.

## Missing a component?

Don't improvise → combine existing ones, and log the need here. Decide it at the design
ritual; then it goes into the registry (so every project gets it).

| Date | Need | Asked by | Status |
|---|---|---|---|
| | | | to create / created / declined (alternative: …) |
