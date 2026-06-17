# Component specs — `@efounders` bespoke

What the agent reads to use our components correctly. Standard shadcn components
(button, input, table…) follow shadcn's own docs + the tokens. These are the bespoke
ones `@efounders` adds. **Every value comes from a token — never a raw hex/px.**

## Token intent (the ones to get right)

| Token | Use for | Not for |
|---|---|---|
| `--primary` (+ `-foreground` / `-hover`) | the one primary action per screen, links, focus | decorating a large surface (→ `--primary-subtle`) |
| `--muted-foreground` | secondary text: labels, hints, metadata, placeholders | body text (→ `--foreground`) |
| `--accent` (+ `-foreground`) | hover / selected background (menus, rows) | a primary action |
| `--destructive…` | error, delete (confirm first) | a warning (→ `--warning`) |
| `--success` / `--warning` / `--info` (+ `-subtle`) | feedback meaning only | decoration |
| `--tag-{hue}-bg` / `-fg` | decorative categories (Tag) | a semantic status (→ Badge) |
| `--border` / `--input` / `--ring` | borders, field borders, focus ring | text |

## Components

### Tag — `@efounders/tag`
- **For:** a decorative, non-semantic label (category, team, project, custom status). The hue *identifies*; it doesn't mean "error" or "success".
- **Not for:** a semantic status (→ Badge). Never hijack feedback colors for a category.
- **Variants:** `hue` = gray · red · orange · amber · green · teal · blue · violet · pink. Optional leading `dot`.
- **Tokens:** `--tag-{hue}-bg` / `--tag-{hue}-fg`.
- **Rule:** one hue = one category, stable over time.

### Stat / KPI — `@efounders/stat`
- **For:** one key number + label + optional trend. 3–4 per row max. Never a pie chart.
- **Anatomy:** label (muted) · value (large, tabular-nums) · delta (trend up/down/neutral).
- **Tokens:** `--muted-foreground` (label), `--foreground` (value), `--success` / `--destructive` (delta).

### Filter bar — `@efounders/filter-bar`
- **For:** restricting a list/table — filter buttons + removable active chips + clear-all + result count.
- **Tokens:** `--secondary` / `--border` (inactive), `--primary-subtle` / `--primary` (active chip), `--accent`.
- **Rules:** an active filter is always visible and removable. "No results" is a distinct state from "no data".

### Chat message — `@efounders/chat-message`
- **For:** one conversation turn.
- **Variants:** `user` (on `--accent`, aligned right) · `assistant` (on `--card` + border, holds rich content).
- **Tokens:** `--accent` (user), `--card` / `--border` (assistant), `--muted-foreground` (name / timestamp).

### Composer — `@efounders/chat-composer`
- **For:** writing & sending a prompt. Enter = send, Shift+Enter = newline. Send becomes **Stop** while generating.
- **States:** idle · typing · generating (Stop) · disabled (must explain why, e.g. quota reached).
- **Tokens:** `--card` / `--border` / `--ring`, `--primary` (Send).

### Typing indicator — `@efounders/chat-typing`
- **For:** "the assistant is writing" — three pulsing dots. Respects `prefers-reduced-motion`. Always interruptible (the composer shows Stop).
- **Tokens:** `--card` / `--border`, `--muted-foreground`.

## Missing a component?

Don't improvise → combine existing ones, and log the need here. Decide it at the design
ritual; then it goes into the registry (so every project gets it).

| Date | Need | Asked by | Status |
|---|---|---|---|
| | | | to create / created / declined (alternative: …) |
