"use client"

import * as React from "react"
import { ChevronDown, MoreHorizontal, Trash2 } from "lucide-react"

// shadcn atoms (standard, themed by our tokens)
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Switch } from "@/components/ui/switch"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Toaster } from "@/components/ui/sonner"
import { toast } from "sonner"

// our registry components
import { Button } from "@/registry/new-york/ui/button"
import { Badge } from "@/registry/new-york/ui/badge"
import { Input } from "@/registry/new-york/ui/input"
import { Label } from "@/registry/new-york/ui/label"
import { Tag } from "@/registry/new-york/ui/tag"
import { Stat } from "@/registry/new-york/ui/stat"
import { ChatMessage } from "@/registry/new-york/blocks/chat/message"
import { Composer } from "@/registry/new-york/blocks/chat/composer"
import { TypingIndicator } from "@/registry/new-york/blocks/chat/typing-indicator"
import { FilterBar } from "@/registry/new-york/blocks/filter-bar"

/* ------------------------------------------------------------------ */
/* eFounders Design System — live storybook with a sidebar to navigate */
/* (scroll-spy). Chrome is neutral; specimens use the brand tokens.    */
/* Imports the REAL components — what `shadcn add @efounders/…` ships.  */
/* ------------------------------------------------------------------ */

const NAV: { label: string; id: string; children: { label: string; id: string }[] }[] = [
  {
    label: "Foundations",
    id: "foundations",
    children: [
      { label: "Colors", id: "colors" },
      { label: "Typography", id: "typography" },
      { label: "Radius & elevation", id: "radius" },
      { label: "Rules", id: "rules" },
    ],
  },
  {
    label: "Components",
    id: "components",
    children: [
      { label: "Buttons & labels", id: "buttons" },
      { label: "Inputs", id: "inputs" },
      { label: "Controls & display", id: "controls" },
    ],
  },
  {
    label: "Molecules",
    id: "molecules",
    children: [
      { label: "Filter & table", id: "data" },
      { label: "Navigation & overlays", id: "nav" },
      { label: "AI — chat", id: "ai" },
    ],
  },
]

// Observe only the leaf (sub-section) ids — observing the parent Layer too would
// always win as topmost and the sub-item highlight would never light up.
const LEAF_IDS = NAV.flatMap((s) => s.children.map((c) => c.id))

function useActiveSection(ids: string[]) {
  const [active, setActive] = React.useState(ids[0])
  React.useEffect(() => {
    let frame = 0
    const onScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const line = 140 // a section is "current" once its top passes this line
        let current = ids[0]
        for (const id of ids) {
          const el = document.getElementById(id)
          if (el && el.getBoundingClientRect().top <= line) current = id
        }
        // bottom guard: at the end of the page, the last section is current
        const atBottom =
          window.innerHeight + window.scrollY >=
          document.documentElement.scrollHeight - 4
        setActive(atBottom ? ids[ids.length - 1] : current)
      })
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [ids])
  return [active, setActive] as const
}

export default function Home() {
  const [dark, setDark] = React.useState(false)
  const [active, setActive] = useActiveSection(LEAF_IDS)

  React.useEffect(() => {
    document.documentElement.classList.toggle("dark", dark)
  }, [dark])

  function go(e: React.MouseEvent, id: string) {
    e.preventDefault()
    setActive(id)
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <TooltipProvider>
      <Toaster />
      <div className="bg-background text-foreground flex min-h-svh">
        {/* ---------- Sidebar (chrome) ---------- */}
        <aside className="bg-background sticky top-0 hidden h-svh w-60 shrink-0 flex-col overflow-y-auto border-r px-4 py-5 lg:flex">
          <div className="mb-6 flex items-start justify-between gap-2">
            <div className="flex flex-col">
              <span className="text-sm font-semibold tracking-tight">eFounders DS</span>
              <span className="text-muted-foreground text-xs">Shared base</span>
            </div>
            <Button variant="outline" size="sm" onClick={() => setDark((d) => !d)}>
              {dark ? "Light" : "Dark"}
            </Button>
          </div>

          <nav className="flex flex-col gap-5 text-sm">
            {NAV.map((section) => {
              const sectionActive =
                active === section.id || section.children.some((c) => c.id === active)
              return (
                <div key={section.id} className="flex flex-col gap-1">
                  <a
                    href={`#${section.id}`}
                    onClick={(e) => go(e, section.id)}
                    className={`rounded-md px-2 py-1 font-medium transition-colors ${
                      sectionActive
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {section.label}
                  </a>
                  <div className="border-border ml-2 flex flex-col gap-0.5 border-l pl-2">
                    {section.children.map((child) => (
                      <a
                        key={child.id}
                        href={`#${child.id}`}
                        onClick={(e) => go(e, child.id)}
                        className={`rounded-md px-2 py-1 text-[13px] transition-colors ${
                          active === child.id
                            ? "bg-accent text-accent-foreground font-medium"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {child.label}
                      </a>
                    ))}
                  </div>
                </div>
              )
            })}
          </nav>

          <p className="text-muted-foreground mt-auto pt-6 text-xs">
            What you see is what <code className="font-mono">shadcn add</code> ships.
          </p>
        </aside>

        {/* ---------- Content ---------- */}
        <main className="mx-auto flex max-w-4xl flex-1 flex-col gap-16 px-6 py-10 lg:px-12">
          {/* ===== FOUNDATIONS ===== */}
          <Layer id="foundations" index="01" title="Foundations" hint="The raw material. Set the brand here; everything else follows.">
            <Group id="colors" title="Surfaces">
              <Swatches
                items={[
                  ["background", "--background"],
                  ["foreground", "--foreground"],
                  ["card", "--card"],
                  ["card-foreground", "--card-foreground"],
                  ["popover", "--popover"],
                  ["popover-foreground", "--popover-foreground"],
                  ["surface-sunken", "--surface-sunken"],
                  ["muted", "--muted"],
                ]}
              />
            </Group>
            <Group title="Text levels">
              <Swatches
                items={[
                  ["muted-foreground", "--muted-foreground"],
                  ["foreground-subtle", "--foreground-subtle"],
                  ["link", "--link"],
                ]}
              />
            </Group>
            <Group title="Borders & focus">
              <Swatches
                items={[
                  ["border", "--border"],
                  ["input", "--input"],
                  ["border-strong", "--border-strong"],
                  ["ring", "--ring"],
                ]}
              />
            </Group>
            <Group title="Primary + states">
              <Swatches
                items={[
                  ["primary", "--primary"],
                  ["primary-foreground", "--primary-foreground"],
                  ["primary-hover", "--primary-hover"],
                  ["primary-active", "--primary-active"],
                  ["primary-subtle", "--primary-subtle"],
                ]}
              />
            </Group>
            <Group title="Secondary & accent">
              <Swatches
                items={[
                  ["secondary", "--secondary"],
                  ["secondary-foreground", "--secondary-foreground"],
                  ["secondary-hover", "--secondary-hover"],
                  ["accent", "--accent"],
                  ["accent-foreground", "--accent-foreground"],
                ]}
              />
            </Group>
            <Group title="Feedback (full)">
              <Swatches
                items={[
                  ["destructive", "--destructive"],
                  ["destructive-subtle", "--destructive-subtle"],
                  ["destructive-foreground", "--destructive-foreground"],
                  ["success", "--success"],
                  ["success-subtle", "--success-subtle"],
                  ["success-foreground", "--success-foreground"],
                  ["warning", "--warning"],
                  ["warning-subtle", "--warning-subtle"],
                  ["warning-foreground", "--warning-foreground"],
                  ["info", "--info"],
                  ["info-subtle", "--info-subtle"],
                  ["info-foreground", "--info-foreground"],
                ]}
              />
            </Group>
            <Group title="Brand ramp (override per project)">
              <Ramp prefix="--brand-" stops={[50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950]} />
            </Group>
            <Group title="Neutral ramp">
              <Ramp prefix="--neutral-" stops={[0, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950]} />
            </Group>
            <Group title="Tag palette (decorative, non-semantic)">
              <div className="flex flex-wrap gap-2">
                {(["gray", "red", "orange", "amber", "green", "teal", "blue", "violet", "pink"] as const).map((h) => (
                  <Tag key={h} hue={h} dot>
                    {h}
                  </Tag>
                ))}
              </div>
            </Group>
            <Group id="typography" title="Typography">
              <div className="flex flex-col gap-2">
                {([
                  ["text-xl", "var(--text-xl)"],
                  ["text-lg", "var(--text-lg)"],
                  ["text-md", "var(--text-md)"],
                  ["text-base", "var(--text-base)"],
                  ["text-sm", "var(--text-sm)"],
                  ["text-xs", "var(--text-xs)"],
                ] as const).map(([name, size]) => (
                  <div key={name} className="flex items-baseline gap-4">
                    <span className="text-muted-foreground w-20 font-mono text-xs">{name}</span>
                    <span style={{ fontSize: size }}>The quick brown fox</span>
                  </div>
                ))}
              </div>
            </Group>
            <Group id="radius" title="Radius">
              <div className="flex flex-wrap items-end gap-4">
                {([
                  ["xs", "var(--radius-xs)"],
                  ["sm", "var(--radius-sm)"],
                  ["md", "var(--radius-md)"],
                  ["lg", "var(--radius-lg)"],
                  ["xl", "var(--radius-xl)"],
                ] as const).map(([n, r]) => (
                  <div key={n} className="flex flex-col items-center gap-1.5">
                    <div className="bg-muted border size-14" style={{ borderRadius: r }} />
                    <span className="text-muted-foreground font-mono text-xs">{n}</span>
                  </div>
                ))}
              </div>
            </Group>
            <Group title="Elevation">
              <div className="flex flex-wrap gap-6">
                {([
                  ["sm", "var(--shadow-sm)"],
                  ["md", "var(--shadow-md)"],
                  ["lg", "var(--shadow-lg)"],
                ] as const).map(([n, s]) => (
                  <div key={n} className="bg-card flex size-16 items-center justify-center rounded-lg" style={{ boxShadow: s }}>
                    <span className="text-muted-foreground font-mono text-xs">{n}</span>
                  </div>
                ))}
              </div>
            </Group>
            <Group id="rules" title="Rules">
              <ul className="text-muted-foreground flex flex-col gap-1.5 text-sm">
                <li>Always use the tokens — never a raw hex/px.</li>
                <li>Every screen handles the 5 states: empty, loading, error, partial, ideal.</li>
                <li>One primary action per screen. Destructive → confirm.</li>
                <li>One icon library for the whole project.</li>
              </ul>
            </Group>
          </Layer>

          {/* ===== COMPONENTS ===== */}
          <Layer id="components" index="02" title="Components" hint="Atoms. shadcn standards themed by the brand + our additions.">
            <Group id="buttons" title="Button">
              <div className="flex flex-wrap gap-3">
                <Button>Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="destructive">Destructive</Button>
                <Button variant="link">Link</Button>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <Button size="sm">Small</Button>
                <Button>Default</Button>
                <Button size="lg">Large</Button>
                <Button disabled>Disabled</Button>
              </div>
            </Group>
            <Group title="Badge & Tag">
              <div className="flex flex-wrap items-center gap-3">
                <Badge>Default</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="destructive">Destructive</Badge>
                <Badge variant="outline">Outline</Badge>
                <span className="text-border">|</span>
                <Tag hue="blue" dot>Design</Tag>
                <Tag hue="green" dot>Shipped</Tag>
                <Tag hue="violet" dot>AI</Tag>
              </div>
            </Group>
            <Group id="inputs" title="Inputs">
              <div className="grid max-w-2xl gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="e">Email</Label>
                  <Input id="e" placeholder="you@startup.com" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="d">Disabled</Label>
                  <Input id="d" placeholder="Disabled" disabled />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="s">Select</Label>
                  <Select>
                    <SelectTrigger id="s">
                      <SelectValue placeholder="Pick one" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="a">Option A</SelectItem>
                      <SelectItem value="b">Option B</SelectItem>
                      <SelectItem value="c">Option C</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="i">Invalid</Label>
                  <Input id="i" placeholder="Invalid" aria-invalid />
                </div>
              </div>
            </Group>
            <Group id="controls" title="Selection, tabs, avatar, tooltip">
              <div className="flex flex-col gap-6">
                <div className="flex flex-wrap items-center gap-8">
                  <label className="flex items-center gap-2 text-sm">
                    <Checkbox defaultChecked /> Checkbox
                  </label>
                  <RadioGroup defaultValue="1" className="flex gap-4">
                    <label className="flex items-center gap-2 text-sm">
                      <RadioGroupItem value="1" /> One
                    </label>
                    <label className="flex items-center gap-2 text-sm">
                      <RadioGroupItem value="2" /> Two
                    </label>
                  </RadioGroup>
                  <label className="flex items-center gap-2 text-sm">
                    <Switch defaultChecked /> Switch
                  </label>
                </div>
                <Tabs defaultValue="overview" className="max-w-md">
                  <TabsList>
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="activity">Activity</TabsTrigger>
                    <TabsTrigger value="settings">Settings</TabsTrigger>
                  </TabsList>
                  <TabsContent value="overview" className="text-muted-foreground pt-2 text-sm">
                    Overview content.
                  </TabsContent>
                  <TabsContent value="activity" className="text-muted-foreground pt-2 text-sm">
                    Activity content.
                  </TabsContent>
                  <TabsContent value="settings" className="text-muted-foreground pt-2 text-sm">
                    Settings content.
                  </TabsContent>
                </Tabs>
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarFallback>NS</AvatarFallback>
                  </Avatar>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="sm">Hover me</Button>
                    </TooltipTrigger>
                    <TooltipContent>A brief hint</TooltipContent>
                  </Tooltip>
                </div>
                <div className="grid gap-3 sm:grid-cols-3">
                  <Stat label="Active users" value="2,481" delta="+12%" trend="up" />
                  <Stat label="Churn" value="1.8%" delta="-0.3%" trend="down" />
                  <Stat label="MRR" value="$48.2k" delta="+4%" trend="up" />
                </div>
              </div>
            </Group>
          </Layer>

          {/* ===== MOLECULES ===== */}
          <Layer id="molecules" index="03" title="Molecules" hint="Composed patterns, including the AI surface.">
            <Group id="data" title="Filter bar & table">
              <div className="flex flex-col gap-5">
                <FilterBar
                  filters={["Status", "Owner", "Date"]}
                  activeFilters={[{ id: "1", label: "Status: Active" }]}
                  resultCount={42}
                />
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Project</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">MRR</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      ["Rose", "green", "Active", "$12.4k"],
                      ["Dona", "amber", "Beta", "$2.1k"],
                      ["Haze", "blue", "Side", "—"],
                    ].map(([name, hue, status, mrr]) => (
                      <TableRow key={name}>
                        <TableCell className="font-medium">{name}</TableCell>
                        <TableCell>
                          <Tag hue={hue as "green"} dot>{status}</Tag>
                        </TableCell>
                        <TableCell className="text-right tabular-nums">{mrr}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </Group>
            <Group id="nav" title="Navigation & overlays">
              <div className="flex flex-wrap items-center gap-4">
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem><BreadcrumbLink href="#">Home</BreadcrumbLink></BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem><BreadcrumbLink href="#">Projects</BreadcrumbLink></BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem><BreadcrumbPage>Rose</BreadcrumbPage></BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      Menu <ChevronDown className="size-3.5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem><MoreHorizontal className="size-4" /> Edit</DropdownMenuItem>
                    <DropdownMenuItem>Duplicate</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem variant="destructive">
                      <Trash2 className="size-4" /> Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">Open dialog</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Delete project?</DialogTitle>
                      <DialogDescription>This cannot be undone.</DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      <Button variant="ghost">Cancel</Button>
                      <Button variant="destructive">Delete</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" size="sm">Open drawer</Button>
                  </SheetTrigger>
                  <SheetContent>
                    <SheetHeader>
                      <SheetTitle>Details</SheetTitle>
                      <SheetDescription>A side panel for drill-in.</SheetDescription>
                    </SheetHeader>
                  </SheetContent>
                </Sheet>

                <Button variant="outline" size="sm" onClick={() => toast("Saved", { description: "Your changes are live." })}>
                  Toast
                </Button>
              </div>
            </Group>
            <Group id="ai" title="AI — chat surface" hint="Just enough to build a chat.">
              <div className="bg-surface-sunken flex max-w-xl flex-col gap-3 rounded-xl p-4">
                <ChatMessage role="user" name="You">
                  Summarize the deck in 3 bullets.
                </ChatMessage>
                <ChatMessage role="assistant" name="Assistant" timestamp="now">
                  Here are the three key points from the deck, focused on traction,
                  the roadmap, and the ask.
                </ChatMessage>
                <TypingIndicator />
                <Composer placeholder="Message the assistant…" />
              </div>
            </Group>
          </Layer>

          <footer className="text-muted-foreground border-t pt-6 text-xs">
            The base is brand-agnostic. Set <code className="font-mono">--brand-*</code>,
            font, radius and density per project — every component follows.
          </footer>
        </main>
      </div>
    </TooltipProvider>
  )
}

/* ---------- storybook helpers (chrome) ---------- */

function Layer({
  id,
  index,
  title,
  hint,
  children,
}: {
  id?: string
  index: string
  title: string
  hint?: string
  children: React.ReactNode
}) {
  return (
    <section id={id} className="flex scroll-mt-6 flex-col gap-8">
      <div className="flex items-baseline gap-3">
        <span className="text-muted-foreground font-mono text-xs">{index}</span>
        <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
        {hint ? <span className="text-muted-foreground hidden text-sm sm:inline">{hint}</span> : null}
      </div>
      <div className="flex flex-col gap-8">{children}</div>
    </section>
  )
}

function Group({
  id,
  title,
  hint,
  children,
}: {
  id?: string
  title: string
  hint?: string
  children: React.ReactNode
}) {
  return (
    <div id={id} className="flex scroll-mt-6 flex-col gap-3">
      <div className="flex items-baseline gap-2 border-b pb-1.5">
        <h3 className="text-sm font-medium">{title}</h3>
        {hint ? <span className="text-muted-foreground text-xs">{hint}</span> : null}
      </div>
      <div className="flex flex-col gap-4 pt-1">{children}</div>
    </div>
  )
}

function Swatches({ items }: { items: [string, string][] }) {
  return (
    <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
      {items.map(([name, varName]) => (
        <div key={name} className="flex flex-col gap-1.5">
          <div
            className="border-border h-12 w-full rounded-md border"
            style={{ background: `var(${varName})` }}
          />
          <div className="flex flex-col">
            <span className="text-xs font-medium">{name}</span>
            <span className="text-muted-foreground font-mono text-[10px]">{varName}</span>
          </div>
        </div>
      ))}
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
