# Composition

How to combine components into screens. The tokens say *what things are worth*, the components say *what each one is*, and this file says *how they go together on a page*.

It does **not** repeat the components' props (those live in the code and the Storybook). It holds only what the code can't express: when to reach for each layout primitive, and the page archetypes to follow.

## The layout primitives

Four primitives carry the layout. They each encode one project decision, so screens stay consistent instead of each one improvising with raw utilities.

| Primitive | Use it for | Reach for it when |
|---|---|---|
| `Container` | Page width + horizontal gutters | Wrapping the content of every page |
| `Section` | Vertical rhythm between the major parts of a page | Separating header / body / groups of content |
| `Stack` | A column or row with a consistent gap | Any time you'd otherwise write `flex flex-col gap-*` |
| `PageHeader` | The top of a screen (title, description, actions) | The first thing on almost every page |

Rule of thumb: if a layout choice is a **project decision** (how wide is a page, how much air between sections), use a primitive. If it's a one-off (`mt-2` on a single element), plain Tailwind utilities are fine. Never hardcode a width or spacing that a primitive already owns.

## Page archetypes

Most screens are one of a few shapes. Start from the closest one.

### Standard page

The default. A constrained, centered column with a header and stacked content.

```tsx
<Container size="md">
  <Section>
    <Stack gap="lg">
      <PageHeader title="Projects" actions={<Button>New project</Button>} />
      {/* content */}
    </Stack>
  </Section>
</Container>
```

### List page

A standard page whose body is a list or a grid of cards. Use a `Stack` (row + `wrap`) or a Tailwind `grid` for the collection, and always handle the five states (empty, loading, error, partial, ideal).

### Settings / form page

Narrower for readability: `Container size="sm"`. Group related fields in `Section`s, label groups with a `PageHeader` or a card title.

### Detail page

A `PageHeader` for the entity, then content `Section`s. If it needs a side panel, use a two-column Tailwind `grid` inside the `Container`; reach for a dedicated app-shell block only once the project actually needs persistent navigation (not yet shipped here).

## Rules

- **One `Container` per page.** Don't nest containers; nest `Section`s and `Stack`s inside one.
- **One primary action per screen** (see `PageHeader actions`). Secondary actions are `variant="outline"` or `ghost`.
- **Spacing comes from `Stack` and `Section`,** not from margins sprinkled on children.
- **Responsive is built in.** `Container` padding and `PageHeader` already adapt; don't re-solve responsiveness by hand unless the layout genuinely needs it.

## Where this lives

- Primitives: `components/ui/container.tsx`, `section.tsx`, `stack.tsx`, `page-header.tsx`
- Rendered, with every variant: the **Layout** section of the Storybook (see the `PageHeader → FullPage` story for a complete example)
- Portable summary for tools without the repo: the Layout note in `DESIGN.md`
