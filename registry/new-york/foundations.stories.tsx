import * as React from "react"
import type { Meta, StoryObj } from "@storybook/nextjs-vite"

/* Foundations — the token grid, rendered live from the project's CSS variables.
   Each swatch auto-resolves which primitive it maps to + its hex (works in any
   brand, follows dark mode). This is the "all tokens visible" reference. */

function rgbToHex(rgb: string) {
  const m = rgb.match(/rgba?\(([^)]+)\)/)
  if (!m) return rgb
  const p = m[1].split(",").map((s) => s.trim())
  if (p[3] !== undefined && parseFloat(p[3]) < 1) return rgb
  const h = (n: string) => (+n).toString(16).padStart(2, "0")
  return `#${h(p[0])}${h(p[1])}${h(p[2])}`
}

const PRIMITIVES = [
  ...[0, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950].map((s) => `neutral-${s}`),
  ...[50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950].map((s) => `brand-${s}`),
  "green-50", "green-500", "green-600", "red-50", "red-500", "red-600",
  "amber-50", "amber-400", "amber-500", "sky-50", "sky-500", "sky-600",
]

function useReverse() {
  const [map, setMap] = React.useState<Record<string, string>>({})
  React.useEffect(() => {
    const probe = document.createElement("div")
    probe.style.cssText = "position:absolute;opacity:0"
    document.body.appendChild(probe)
    const m: Record<string, string> = {}
    for (const p of PRIMITIVES) {
      probe.style.backgroundColor = `var(--${p})`
      const hex = rgbToHex(getComputedStyle(probe).backgroundColor)
      if (/^#/.test(hex) && !(hex in m)) m[hex] = p
    }
    probe.remove()
    setMap(m)
  }, [])
  return map
}

function Swatch({ name, v, map }: { name: string; v: string; map: Record<string, string> }) {
  const ref = React.useRef<HTMLDivElement>(null)
  const [hex, setHex] = React.useState("")
  React.useEffect(() => {
    if (ref.current) setHex(rgbToHex(getComputedStyle(ref.current).backgroundColor))
  }, [])
  return (
    <div className="flex flex-col gap-1.5">
      <div ref={ref} className="border-border h-12 w-full rounded-md border" style={{ background: `var(${v})` }} />
      <span className="text-xs font-medium">{name}</span>
      <span className="text-muted-foreground -mt-1 font-mono text-[10px]">{map[hex] ? `${map[hex]} · ` : ""}{hex}</span>
    </div>
  )
}

function Grid({ items }: { items: [string, string][] }) {
  const map = useReverse()
  return (
    <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
      {items.map(([n, v]) => <Swatch key={n} name={n} v={v} map={map} />)}
    </div>
  )
}

function Ramp({ prefix, stops }: { prefix: string; stops: number[] }) {
  return (
    <div className="flex w-full overflow-hidden rounded-md border">
      {stops.map((s) => (
        <div key={s} className="flex h-12 flex-1 items-end justify-center pb-1" style={{ background: `var(${prefix}${s})` }}>
          <span className="bg-background/70 rounded px-1 font-mono text-[9px]">{s}</span>
        </div>
      ))}
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-3">
      <h3 className="border-b pb-1.5 text-sm font-medium">{title}</h3>
      {children}
    </section>
  )
}

function Foundations() {
  return (
    <div className="flex max-w-4xl flex-col gap-8">
      <Section title="Semantic colors">
        <Grid items={[["background", "--background"], ["foreground", "--foreground"], ["card", "--card"], ["primary", "--primary"], ["secondary", "--secondary"], ["muted", "--muted"], ["accent", "--accent"], ["border", "--border"], ["ring", "--ring"]]} />
      </Section>
      <Section title="Primary + states">
        <Grid items={[["primary", "--primary"], ["primary-foreground", "--primary-foreground"], ["primary-hover", "--primary-hover"], ["primary-active", "--primary-active"], ["primary-subtle", "--primary-subtle"]]} />
      </Section>
      <Section title="Feedback (full)">
        <Grid items={[["success", "--success"], ["success-subtle", "--success-subtle"], ["warning", "--warning"], ["warning-subtle", "--warning-subtle"], ["info", "--info"], ["info-subtle", "--info-subtle"], ["destructive", "--destructive"], ["destructive-subtle", "--destructive-subtle"]]} />
      </Section>
      <Section title="Brand ramp"><Ramp prefix="--brand-" stops={[50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950]} /></Section>
      <Section title="Neutral ramp"><Ramp prefix="--neutral-" stops={[0, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950]} /></Section>
      <Section title="Tag palette">
        <div className="flex flex-wrap gap-2">
          {(["gray", "red", "orange", "amber", "green", "teal", "blue", "violet", "pink"] as const).map((h) => {
            const bg = `--tag-${h}-bg`
            const fg = `--tag-${h}-fg`
            return (
              <span key={h} className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium" style={{ background: `var(${bg})`, color: `var(${fg})` }}>
                <span className="size-1.5 rounded-full" style={{ background: `var(${fg})` }} />{h}
              </span>
            )
          })}
        </div>
      </Section>
      <Section title="Typography">
        <div className="flex flex-col gap-2">
          {([["text-xl", "var(--text-xl)"], ["text-lg", "var(--text-lg)"], ["text-md", "var(--text-md)"], ["text-base", "var(--text-base)"], ["text-sm", "var(--text-sm)"], ["text-xs", "var(--text-xs)"]] as const).map(([n, s]) => (
            <div key={n} className="flex items-baseline gap-4"><span className="text-muted-foreground w-20 font-mono text-xs">{n}</span><span style={{ fontSize: s }}>The quick brown fox</span></div>
          ))}
        </div>
      </Section>
      <Section title="Radius">
        <div className="flex flex-wrap items-end gap-4">
          {([["xs", "var(--radius-xs)"], ["sm", "var(--radius-sm)"], ["md", "var(--radius-md)"], ["lg", "var(--radius-lg)"], ["xl", "var(--radius-xl)"]] as const).map(([n, r]) => (
            <div key={n} className="flex flex-col items-center gap-1.5"><div className="bg-muted border size-14" style={{ borderRadius: r }} /><span className="text-muted-foreground font-mono text-xs">{n}</span></div>
          ))}
        </div>
      </Section>
    </div>
  )
}

const meta = { title: "Foundations/Tokens", component: Foundations } satisfies Meta<typeof Foundations>
export default meta
type Story = StoryObj<typeof meta>
export const Tokens: Story = {}
