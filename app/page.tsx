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
/* eFounders Design System — live storybook.                          */
/* Imports the REAL components. Foundations = the brand-agnostic base; */
/* each project overrides the brand. Components/Molecules render the   */
/* exact code that `shadcn add @efounders/…` + shadcn install.         */
/* ------------------------------------------------------------------ */

export default function Home() {
  const [dark, setDark] = React.useState(false)
  React.useEffect(() => {
    document.documentElement.classList.toggle("dark", dark)
  }, [dark])

  return (
    <TooltipProvider>
      <div className="bg-background text-foreground min-h-svh">
        <Toaster />
        <header className="bg-background/80 sticky top-0 z-10 border-b backdrop-blur">
          <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
            <div>
              <h1 className="text-lg font-semibold tracking-tight">
                eFounders Design System
              </h1>
              <p className="text-muted-foreground text-xs">
                Shared base · brand-agnostic · live components
              </p>
            </div>
            <Button variant="outline" size="sm" onClick={() => setDark((d) => !d)}>
              {dark ? "Light" : "Dark"}
            </Button>
          </div>
        </header>

        <main className="mx-auto flex max-w-5xl flex-col gap-16 px-6 py-12">
          {/* ============ FOUNDATIONS ============ */}
          <Layer index="01" title="Foundations" hint="The raw material. Set the brand here; everything else follows.">
            <Group title="Semantic colors">
              <Swatches
                items={[
                  ["background", "--background"],
                  ["foreground", "--foreground"],
                  ["card", "--card"],
                  ["primary", "--primary"],
                  ["secondary", "--secondary"],
                  ["muted", "--muted"],
                  ["accent", "--accent"],
                  ["border", "--border"],
                  ["ring", "--ring"],
                ]}
              />
            </Group>
            <Group title="Feedback">
              <Swatches
                items={[
                  ["success", "--success"],
                  ["warning", "--warning"],
                  ["info", "--info"],
                  ["destructive", "--destructive"],
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
            <Group title="Typography">
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
            <Group title="Radius">
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
            <Group title="Rules">
              <ul className="text-muted-foreground flex flex-col gap-1.5 text-sm">
                <li>Always use the tokens — never a raw hex/px.</li>
                <li>Every screen handles the 5 states: empty, loading, error, partial, ideal.</li>
                <li>One primary action per screen. Destructive → confirm.</li>
                <li>One icon library for the whole project.</li>
              </ul>
            </Group>
          </Layer>

          {/* ============ COMPONENTS ============ */}
          <Layer index="02" title="Components" hint="Atoms. shadcn standards themed by the brand + our additions.">
            <Group title="Button">
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
            <Group title="Inputs">
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
            <Group title="Selection controls">
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
            </Group>
            <Group title="Tabs · Avatar · Tooltip">
              <div className="flex flex-col gap-4">
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
              </div>
            </Group>
            <Group title="Stat / KPI">
              <div className="grid gap-3 sm:grid-cols-3">
                <Stat label="Active users" value="2,481" delta="+12%" trend="up" />
                <Stat label="Churn" value="1.8%" delta="-0.3%" trend="down" />
                <Stat label="MRR" value="$48.2k" delta="+4%" trend="up" />
              </div>
            </Group>
          </Layer>

          {/* ============ MOLECULES ============ */}
          <Layer index="03" title="Molecules" hint="Composed patterns, including the AI surface.">
            <Group title="Filter bar">
              <FilterBar
                filters={["Status", "Owner", "Date"]}
                activeFilters={[{ id: "1", label: "Status: Active" }]}
                resultCount={42}
              />
            </Group>
            <Group title="Table">
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
            </Group>
            <Group title="Navigation · overlays">
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
            <Group title="AI — chat surface" hint="Just enough to build a chat.">
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
  index,
  title,
  hint,
  children,
}: {
  index: string
  title: string
  hint?: string
  children: React.ReactNode
}) {
  return (
    <section className="flex flex-col gap-8">
      <div className="flex items-baseline gap-3">
        <span className="text-muted-foreground font-mono text-xs">{index}</span>
        <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
        {hint ? <span className="text-muted-foreground text-sm">{hint}</span> : null}
      </div>
      <div className="flex flex-col gap-8">{children}</div>
    </section>
  )
}

function Group({
  title,
  hint,
  children,
}: {
  title: string
  hint?: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-3">
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
