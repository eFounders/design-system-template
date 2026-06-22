import { Button } from "@/components/ui/button"

const STORYBOOK_URL = "https://ds-registry-storybook.vercel.app"

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen max-w-2xl flex-col justify-center gap-10 px-6 py-16">
      <header className="flex flex-col gap-3">
        <span className="text-muted-foreground font-mono text-xs tracking-wide uppercase">
          @efounders · design system
        </span>
        <h1 className="text-foreground text-4xl font-semibold tracking-tight">
          A brand-agnostic toolbox, distributed as a registry.
        </h1>
        <p className="text-muted-foreground text-base">
          Tokens, the full shadcn component set themed by those tokens, and the
          conventions an agent needs to build on-brand. The code is the single
          source of truth — install pieces with <code className="font-mono">shadcn add</code>,
          then you own them.
        </p>
      </header>

      <div className="flex flex-wrap gap-3">
        <Button asChild>
          <a href={STORYBOOK_URL} target="_blank" rel="noreferrer">
            Browse the Storybook
          </a>
        </Button>
        <Button variant="outline" asChild>
          <a
            href="https://github.com/eFounders/ds-registry"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
        </Button>
      </div>

      <section className="flex flex-col gap-3">
        <h2 className="text-foreground text-sm font-medium">Get started</h2>
        <pre className="bg-muted text-muted-foreground overflow-x-auto rounded-lg p-4 text-sm">
          <code>{`# 1. point your project at the registry (components.json)
#    "registries": { "@efounders": "https://ds-registry-five.vercel.app/r/{name}.json" }

# 2. add the theme, then any component
npx shadcn add @efounders/theme
npx shadcn add button input sidebar command form`}</code>
        </pre>
      </section>

      <footer className="text-muted-foreground border-t pt-6 text-xs">
        The base is brand-agnostic. Set <code className="font-mono">--brand-*</code>,
        font, radius and density per project — every component follows.
      </footer>
    </main>
  )
}
