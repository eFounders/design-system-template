---
name: ds-audit
description: Audit a codebase to assess whether its design system is AI-native (an agent can read it and build on-brand reliably). Use when the user says "audit my DS", "is my design system AI-native", "check/score my design system", "what's missing in my DS", "am I ready to build UI with Claude here", or when onboarding a new or existing project to the @efounders design system. Runs against the current working directory, scores explicit criteria with evidence, and returns a prioritized plan.
---

# DS Audit — is this codebase's design system AI-native?

An **AI-native design system** is one an agent can *read and build from reliably*: the brand lives in machine-readable tokens, the rules live where the agent reads (the code + a `CLAUDE.md`), components are real and reused, and the whole thing is a versioned source of truth — not copied per project. This skill assesses a real codebase against that bar and returns a plan.

Canonical reference: the **@efounders** registry (`https://ds-registry-five.vercel.app`, repo `eFounders/ds-registry`). Align findings toward it.

## How to run the audit

1. **Target the codebase — a git repo, not loose local files.** A design system lives in a repo, so audit the repo:
   - Given a **GitHub repo** (a URL or `owner/repo`) → shallow-clone it and audit the clone: `gh repo clone <owner/repo> <tmp> -- --depth=1 --single-branch` (or `git clone --depth 1 <url> <tmp>`). Read from `<tmp>`; remove it when done.
   - Run **inside a project** → confirm it's a git repo (`git rev-parse --is-inside-work-tree`) and audit the working tree.
   - If the target isn't under git, flag it — "closest to the codebase" means the repo. Always note the **branch / commit** you audited.
2. **Locate the design system** in that repo. Look for: a tokens file (`globals.css`, `styles.css`, `tokens.css`, `tailwind.config`), `components.json` (shadcn), `components/ui/` or a bespoke components folder, a `CLAUDE.md`/`AGENTS.md`, a storybook/preview route, CI checks. Use Glob/Grep — do not assume.
3. **Score each criterion below** as ✅ pass / 🟠 partial / ❌ missing, each with **evidence** (a `file:line` or a one-line observation). Never score from assumption — open the files.
4. **Classify the project** into one of: *(a) no real DS yet*, *(b) has a DS but not AI-native*, *(c) AI-native with gaps*, *(d) solid*.
5. **Return the report** (format below): the repo + branch audited, the classification, the scored checklist, and a **prioritized action plan** — highest-leverage first.

## The checklist (score every item, with evidence)

### A · Tokens — the material
- [ ] **Semantic tokens named by role** (`--primary`, `--muted-foreground`, `--destructive`…), mapped from primitives — not raw hex/px scattered in components.
- [ ] **Intent on each semantic token** (a comment: *use for / not for*) so the agent picks the right one, not the nearest-looking. *(R. Kavcic)*
- [ ] **Light + dark** both defined.
- [ ] **Brand isolated to a few knobs** (`--brand-*`, font, `--radius`, density) — changing them re-skins everything.
- [ ] **shadcn contract respected** (`--background`, `--card`, `--primary`, `--ring`…) so shadcn components plug in directly.

### B · Conventions — readable by the agent
- [ ] **A `CLAUDE.md` at the root** that points to the tokens, the components, and the rules. *(Highest-leverage item — this is what makes the rest legible to the agent.)*
- [ ] **Component specs the agent can read**: for / not-for, variants, states, tokens, rules — auto-descriptive. *(R. Kavcic & TJ Pitre)*
- [ ] **UX patterns documented**: the **5 states** (empty, loading, error, partial, ideal), forms, errors.
- [ ] **Hard rules explicit**: one primary action per screen · one icon library · never invent a value · missing component → combine existing + log, don't improvise.

### C · Components & storybook
- [ ] **Real, reused components** (shadcn-based), one canonical per role — no `Button` / `PrimaryButton` / `AppButton` sprawl.
- [ ] **A living storybook that renders the REAL components** — not a hand-made HTML mirror that drifts. *(Noé)*

### D · Distribution
- [ ] **A versioned source of truth that projects consume** (a registry or package), not copied into each repo. Updating = re-pull, not re-paste. *(Noé — the central point.)*
- [ ] **Brand-agnostic base**; each project sets its own brand (the skeleton is shared, the skin is not).

### E · Verification
- [ ] **A deterministic gate on PRs** — hardcoded colors / unknown tokens fail the build (`ds-check`-style).
- [ ] **A component audit** to catch duplicates / off-DS components.
- [ ] **A prototyping skill that generates from the codebase** (`/ds-prototype`) — proof the DS is actually used to build.

## Report format

```
# DS Audit — <project>

**Verdict:** <(a) no DS yet | (b) has a DS, not AI-native | (c) AI-native with gaps | (d) solid>
**Score:** <X/16 passed>  ·  one-line summary

## Findings
A · Tokens
- ✅/🟠/❌ <criterion> — <evidence: file:line or observation>
… (every item, every group)

## Plan (highest-leverage first)
1. <concrete action> — <why it matters>
2. …
```

## Tailor the plan to the verdict

- **(a) No DS yet** → bootstrap: pull the @efounders base (`shadcn add @efounders/theme`), set the project brand, drop in the `CLAUDE.md` template. Consider `/design-system-creation`.
- **(b) Has a DS, not AI-native** → the gap is usually the **conventions layer**: add a `CLAUDE.md` pointing to the existing tokens/components, write component specs, make the storybook render real components, add the gate. Don't rebuild what works.
- **(c) AI-native with gaps** → close the specific failed items; wire the gate; align token naming to the shadcn contract.
- **(d) Solid** → keep it consuming the versioned base; only maintain.

Be honest and specific. Cite evidence. A checklist that says "✅ everything" without file references is not an audit.
