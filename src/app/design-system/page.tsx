"use client"

import * as React from "react"
import Link from "next/link"
import {
  Anchor,
  ArrowLeft,
  Check,
  Heart,
  Home,
  Loader2,
  Mail,
  Search,
  Settings,
  ShieldCheck,
  Star,
  User,
  Zap,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog"
import { IconContainer } from "@/components/ui/icon-container"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { ActiveFiltersChips } from "@/components/filters/active-filters-chips"
import { SearchableSelect } from "@/components/filters/searchable-select"
import { BoatCard } from "@/components/boats/boat-card"
import { RBImage } from "@/components/ui/RBImage"
import { latestBoats } from "@/data/boats"

// ─── Navigation structure ──────────────────────────────────────────────────

const NAV = [
  {
    category: "Foundation",
    items: [
      { id: "colors", label: "Colors" },
      { id: "typography", label: "Typography" },
      { id: "radius", label: "Radius & Shadows" },
    ],
  },
  {
    category: "Atoms",
    items: [
      { id: "button", label: "Button" },
      { id: "badge", label: "Badge" },
      { id: "input", label: "Input" },
      { id: "checkbox", label: "Checkbox" },
      { id: "select", label: "Select" },
      { id: "progress", label: "Progress" },
      { id: "icon-container", label: "Icon Container" },
    ],
  },
  {
    category: "Overlays",
    items: [
      { id: "dialog", label: "Dialog" },
      { id: "sheet", label: "Sheet" },
    ],
  },
  {
    category: "Layout",
    items: [{ id: "card", label: "Card" }],
  },
  {
    category: "Custom",
    items: [
      { id: "boat-card", label: "Boat Card" },
      { id: "active-filters", label: "Active Filters" },
      { id: "searchable-select", label: "Searchable Select" },
      { id: "images", label: "Image System" },
    ],
  },
]

// ─── Helper components ────────────────────────────────────────────────────

function Section({
  id,
  title,
  description,
  a11y,
  children,
}: {
  id: string
  title: string
  description?: string
  a11y?: string[]
  children: React.ReactNode
}) {
  return (
    <section
      id={id}
      className="scroll-mt-16 border-b border-border/60 pb-14 pt-10 last:border-0"
    >
      <div className="mb-8">
        <h2 className="text-2xl font-bold">{title}</h2>
        {description && (
          <p className="mt-1.5 text-sm text-muted-foreground">{description}</p>
        )}
        {a11y && a11y.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {a11y.map((note) => (
              <span
                key={note}
                className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-medium text-emerald-700 ring-1 ring-emerald-200"
              >
                <ShieldCheck className="h-3 w-3" />
                {note}
              </span>
            ))}
          </div>
        )}
      </div>
      <div className="space-y-8">{children}</div>
    </section>
  )
}

function Group({
  label,
  children,
  className,
}: {
  label: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <div>
      <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        {label}
      </p>
      <div
        className={cn(
          "rounded-2xl border border-border/60 bg-white p-6",
          className
        )}
      >
        {children}
      </div>
    </div>
  )
}

function Swatch({
  label,
  color,
  token,
}: {
  label: string
  color: string
  token: string
}) {
  return (
    <div className="space-y-2">
      <div
        className="h-10 w-full rounded-lg border border-black/5 shadow-sm"
        style={{ background: color }}
      />
      <p className="text-xs font-medium leading-tight">{label}</p>
      <p className="font-mono text-[10px] text-muted-foreground">{token}</p>
    </div>
  )
}

// ─── Active filters demo with isolated state ──────────────────────────────

const INITIAL_FILTERS = [
  { key: "type", label: "Sailboat" },
  { key: "price", label: "€10k – €50k" },
  { key: "location", label: "France" },
]

function ActiveFilterChipsDemo() {
  const [filters, setFilters] = React.useState(INITIAL_FILTERS)
  const remove = (key: string) =>
    setFilters((prev) => prev.filter((f) => f.key !== key))

  if (filters.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        All removed.{" "}
        <button
          className="underline hover:text-foreground"
          onClick={() => setFilters(INITIAL_FILTERS)}
        >
          Reset
        </button>
      </p>
    )
  }

  return (
    <ActiveFiltersChips
      activeFilters={filters.map((f) => ({
        ...f,
        onRemove: () => remove(f.key),
      }))}
      onClearAll={() => setFilters([])}
    />
  )
}

// ─── Main page ─────────────────────────────────────────────────────────────

export default function DesignSystemPage() {
  const [activeId, setActiveId] = React.useState("colors")
  const [dialogOpen, setDialogOpen] = React.useState(false)
  const [sheetOpen, setSheetOpen] = React.useState(false)
  const [sheetSide, setSheetSide] = React.useState<
    "left" | "right" | "top" | "bottom"
  >("right")
  const [checkboxA, setCheckboxA] = React.useState(false)
  const [checkboxB, setCheckboxB] = React.useState(true)

  const sampleBoat = latestBoats[0]

  function openSheet(side: typeof sheetSide) {
    setSheetSide(side)
    setSheetOpen(true)
  }

  return (
    <div className="flex min-h-screen bg-background font-sans">
      {/* ── Sidebar ─────────────────────────────────────────── */}
      <aside className="fixed inset-y-0 left-0 z-40 flex w-56 shrink-0 flex-col border-r border-white/10 bg-neutral-950 text-white">
        {/* Branding */}
        <div className="flex items-center gap-2.5 border-b border-white/10 px-4 py-4">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary">
            <Anchor className="h-4 w-4 text-white" />
          </div>
          <div>
            <p className="text-sm font-semibold leading-tight">Design System</p>
            <p className="text-[10px] text-white/40">Rightboat · v1.1</p>
          </div>
        </div>

        {/* Back link */}
        <div className="border-b border-white/10 px-3 py-2.5">
          <Link
            href="/"
            className="flex items-center gap-1.5 rounded-md px-2 py-1.5 text-xs text-white/50 transition hover:bg-white/5 hover:text-white"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to site
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-4">
          {NAV.map((section) => (
            <div key={section.category} className="mb-5 px-3">
              <p className="mb-1.5 px-2 text-[10px] font-semibold uppercase tracking-widest text-white/30">
                {section.category}
              </p>
              {section.items.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={() => setActiveId(item.id)}
                  className={cn(
                    "flex items-center rounded-md px-2 py-1.5 text-sm transition-colors",
                    activeId === item.id
                      ? "bg-white/10 text-white"
                      : "text-white/55 hover:bg-white/5 hover:text-white"
                  )}
                >
                  {item.label}
                </a>
              ))}
            </div>
          ))}
        </nav>
      </aside>

      {/* ── Content ─────────────────────────────────────────── */}
      <div className="ml-56 flex flex-1 flex-col">
        {/* Sticky top bar */}
        <div className="sticky top-0 z-30 border-b border-border/60 bg-background/95 px-10 py-4 backdrop-blur">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h1 className="text-lg font-bold">Rightboat Design System</h1>
              <Badge variant="secondary">v1.1</Badge>
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-medium text-emerald-700 ring-1 ring-emerald-200">
                <ShieldCheck className="h-3 w-3" />
                Accessibility refactor applied
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              All components are live and interactive
            </p>
          </div>
        </div>

        <main className="flex-1 px-10 pb-24">
          {/* ══════════════════════════════════════════
           *  FOUNDATION
           * ══════════════════════════════════════════ */}

          <Section
            id="colors"
            title="Colors"
            description="Brand and semantic color tokens used throughout the UI."
          >
            <Group label="Brand palette">
              <div className="grid grid-cols-3 gap-4 sm:grid-cols-6">
                <Swatch label="Midnight" color="#13022c" token="--brand-midnight" />
                <Swatch label="Blue 200" color="#208cff" token="--brand-blue-200" />
                <Swatch label="Blue 300" color="#086bff" token="--brand-blue-300" />
                <Swatch
                  label="Blue 400 (primary)"
                  color="#0257fc"
                  token="--brand-blue-400"
                />
                <Swatch label="Blue 500" color="#0944c4" token="--brand-blue-500" />
                <Swatch label="Blue 600" color="#0e3d9a" token="--brand-blue-600" />
              </div>
            </Group>

            <Group label="Semantic tokens">
              <div className="grid grid-cols-3 gap-4 sm:grid-cols-5">
                {[
                  { label: "Background", token: "--background" },
                  { label: "Foreground", token: "--foreground" },
                  { label: "Primary", token: "--primary" },
                  { label: "Muted", token: "--muted" },
                  { label: "Border", token: "--border" },
                  { label: "Card", token: "--card" },
                  { label: "Destructive", token: "--destructive" },
                  { label: "Tag BG", token: "--tag-bg" },
                ].map(({ label, token }) => (
                  <Swatch
                    key={token}
                    label={label}
                    color={`var(${token})`}
                    token={token}
                  />
                ))}
              </div>
            </Group>
          </Section>

          <Section
            id="typography"
            title="Typography"
            description="Type scale, heading utilities, and font weights."
          >
            <Group label="Heading scale">
              <div className="space-y-5">
                {[
                  { cls: "heading-xl", meta: "3rem / 700" },
                  { cls: "heading-lg", meta: "2.25rem / 700" },
                  { cls: "heading-md", meta: "1.875rem / 700" },
                  { cls: "heading-sm", meta: "1.5rem / 700" },
                ].map(({ cls, meta }) => (
                  <div key={cls} className="flex items-baseline gap-5 border-b border-border/40 pb-4 last:border-0 last:pb-0">
                    <span className="w-28 shrink-0 font-mono text-[10px] text-muted-foreground">
                      .{cls}
                      <br />
                      {meta}
                    </span>
                    <p className={cls}>The right boat</p>
                  </div>
                ))}
              </div>
            </Group>

            <Group label="Body text scale">
              <div className="space-y-3">
                {[
                  { cls: "text-xl", label: "text-xl" },
                  { cls: "text-lg", label: "text-lg" },
                  { cls: "text-base", label: "text-base (default)" },
                  { cls: "text-sm", label: "text-sm" },
                  { cls: "text-xs", label: "text-xs" },
                ].map(({ cls, label }) => (
                  <div key={cls} className="flex items-baseline gap-5">
                    <span className="w-36 shrink-0 font-mono text-[10px] text-muted-foreground">
                      {label}
                    </span>
                    <p className={cls}>Explore thousands of boats for sale</p>
                  </div>
                ))}
              </div>
            </Group>

            <Group label="Font weights">
              <div className="space-y-3 text-base">
                {[
                  ["font-normal", "Normal"],
                  ["font-medium", "Medium"],
                  ["font-semibold", "Semibold"],
                  ["font-bold", "Bold"],
                ].map(([cls, label]) => (
                  <div key={cls} className="flex items-center gap-5">
                    <span className="w-36 shrink-0 font-mono text-[10px] text-muted-foreground">
                      {cls}
                    </span>
                    <p className={cls}>
                      {label} — The right boat for your adventure
                    </p>
                  </div>
                ))}
              </div>
            </Group>
          </Section>

          <Section
            id="radius"
            title="Radius & Shadows"
            description="Border radius scale and elevation tokens."
          >
            <Group label="Border radius">
              <div className="grid grid-cols-4 gap-6 sm:grid-cols-7">
                {[
                  ["rounded-sm", "sm"],
                  ["rounded-md", "md"],
                  ["rounded-lg", "lg"],
                  ["rounded-xl", "xl"],
                  ["rounded-2xl", "2xl"],
                  ["rounded-3xl", "3xl"],
                  ["rounded-full", "full"],
                ].map(([cls, label]) => (
                  <div key={label} className="flex flex-col items-center gap-2">
                    <div
                      className={cn(
                        "h-12 w-full border-2 border-primary/40 bg-primary/10",
                        cls
                      )}
                    />
                    <span className="font-mono text-[10px] text-muted-foreground">
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </Group>

            <Group label="Shadows" className="bg-muted/30">
              <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
                {[
                  ["shadow-sm", "sm"],
                  ["shadow-md", "md"],
                  ["shadow-lg", "lg"],
                  ["shadow-xl", "xl"],
                ].map(([cls, label]) => (
                  <div key={label} className="flex flex-col items-center gap-3">
                    <div className={cn("h-14 w-full rounded-xl bg-white", cls)} />
                    <span className="font-mono text-[10px] text-muted-foreground">
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </Group>
          </Section>

          {/* ══════════════════════════════════════════
           *  ATOMS
           * ══════════════════════════════════════════ */}

          <Section
            id="button"
            title="Button"
            description="Interactive action trigger. Supports variants, sizes, and icons."
            a11y={[
              "WCAG 2.5.5 — 44px touch target (h-11 default · h-11 icon)",
              "sm h-10 · default h-11 · lg h-11 · icon h-11",
            ]}
          >
            <Group label="Variants">
              <div className="flex flex-wrap items-center gap-3">
                <Button>Default</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="destructive">Destructive</Button>
                <Button variant="link">Link</Button>
              </div>
            </Group>

            <Group label="Sizes — h-10 sm · h-11 default · h-11 lg · h-11 icon">
              <div className="flex flex-wrap items-end gap-3">
                <Button size="sm">Small</Button>
                <Button>Default</Button>
                <Button size="lg">Large</Button>
                <Button size="icon">
                  <Star className="h-4 w-4" />
                </Button>
              </div>
            </Group>

            <Group label="States & with icon">
              <div className="flex flex-wrap items-center gap-3">
                <Button disabled>Disabled</Button>
                <Button>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Loading
                </Button>
                <Button>
                  <Check className="h-4 w-4" />
                  Confirm
                </Button>
                <Button variant="outline">
                  <Mail className="h-4 w-4" />
                  Contact seller
                </Button>
                <Button variant="outline">
                  <Search className="h-4 w-4" />
                  Search
                </Button>
              </div>
            </Group>
          </Section>

          <Section
            id="badge"
            title="Badge"
            description="Small status indicators and categorical labels."
            a11y={["Increased vertical padding — py-1.5 for readability"]}
          >
            <Group label="Variants">
              <div className="flex flex-wrap items-center gap-3">
                <Badge variant="default">Default</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="outline">Outline</Badge>
              </div>
            </Group>

            <Group label="Usage examples">
              <div className="flex flex-wrap items-center gap-3">
                <Badge variant="default">New listing</Badge>
                <Badge variant="secondary">Used</Badge>
                <Badge variant="secondary">Sailboat</Badge>
                <Badge variant="outline">France</Badge>
                <Badge className="border border-primary bg-white text-primary">
                  Active filter
                </Badge>
                <Badge variant="default">
                  <Check className="mr-1 h-3 w-3" />
                  Verified
                </Badge>
                <Badge variant="default" className="rounded-full px-2">
                  3
                </Badge>
              </div>
            </Group>
          </Section>

          <Section
            id="input"
            title="Input"
            description="Text input field for forms and search."
            a11y={[
              "WCAG 2.5.5 — h-11 (44px touch target)",
              "iOS zoom fix — text-base md:text-sm (≥ 16px on mobile)",
            ]}
          >
            <Group label="Types">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <p className="text-xs font-medium text-muted-foreground">
                    Text
                  </p>
                  <Input type="text" placeholder="e.g. Beneteau Oceanis 46" />
                </div>
                <div className="space-y-1.5">
                  <p className="text-xs font-medium text-muted-foreground">
                    Email
                  </p>
                  <Input type="email" placeholder="you@example.com" />
                </div>
                <div className="space-y-1.5">
                  <p className="text-xs font-medium text-muted-foreground">
                    Number
                  </p>
                  <Input type="number" placeholder="150 000" />
                </div>
                <div className="space-y-1.5">
                  <p className="text-xs font-medium text-muted-foreground">
                    With icon
                  </p>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input className="pl-9" placeholder="Search boats…" />
                  </div>
                </div>
              </div>
            </Group>

            <Group label="States">
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="space-y-1.5">
                  <p className="text-xs font-medium text-muted-foreground">
                    Default
                  </p>
                  <Input placeholder="Placeholder text" />
                </div>
                <div className="space-y-1.5">
                  <p className="text-xs font-medium text-muted-foreground">
                    With value
                  </p>
                  <Input defaultValue="Beneteau Oceanis 46" />
                </div>
                <div className="space-y-1.5">
                  <p className="text-xs font-medium text-muted-foreground">
                    Disabled
                  </p>
                  <Input disabled placeholder="Disabled field" />
                </div>
              </div>
            </Group>
          </Section>

          <Section
            id="checkbox"
            title="Checkbox"
            description="Boolean selection control. Click to toggle."
            a11y={[
              "WCAG 2.5.5 — 44px invisible touch area via after: pseudo-element",
              "Visual size h-5 w-5 (20px)",
            ]}
          >
            <Group label="States">
              <div className="flex flex-wrap items-center gap-8 text-sm">
                <label className="flex cursor-pointer items-center gap-2.5">
                  <Checkbox
                    checked={checkboxA}
                    onCheckedChange={(v) => setCheckboxA(Boolean(v))}
                  />
                  <span>{checkboxA ? "Checked" : "Unchecked"} (click me)</span>
                </label>
                <label className="flex cursor-pointer items-center gap-2.5">
                  <Checkbox
                    checked={checkboxB}
                    onCheckedChange={(v) => setCheckboxB(Boolean(v))}
                  />
                  <span>Used boats</span>
                </label>
                <label className="flex cursor-pointer items-center gap-2.5 opacity-50">
                  <Checkbox disabled />
                  <span>Disabled</span>
                </label>
                <label className="flex cursor-pointer items-center gap-2.5 opacity-50">
                  <Checkbox checked disabled />
                  <span>Disabled checked</span>
                </label>
              </div>
            </Group>
          </Section>

          <Section
            id="select"
            title="Select"
            description="Dropdown selection for categorical and enumerated options."
            a11y={[
              "WCAG 2.5.5 — h-11 trigger (44px touch target)",
              "iOS zoom fix — text-base md:text-sm (≥ 16px on mobile)",
              "SelectItem py-2.5 for dropdown touch targets",
            ]}
          >
            <Group label="Examples">
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="space-y-1.5">
                  <p className="text-xs font-medium text-muted-foreground">
                    Boat type
                  </p>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sailboat">Sailboat</SelectItem>
                      <SelectItem value="motorboat">Motorboat</SelectItem>
                      <SelectItem value="catamaran">Catamaran</SelectItem>
                      <SelectItem value="yacht">Yacht</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <p className="text-xs font-medium text-muted-foreground">
                    With default
                  </p>
                  <Select defaultValue="sailboat">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sailboat">Sailboat</SelectItem>
                      <SelectItem value="motorboat">Motorboat</SelectItem>
                      <SelectItem value="catamaran">Catamaran</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <p className="text-xs font-medium text-muted-foreground">
                    Sort order
                  </p>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="featured">Featured</SelectItem>
                      <SelectItem value="price-low">
                        Price (low to high)
                      </SelectItem>
                      <SelectItem value="price-high">
                        Price (high to low)
                      </SelectItem>
                      <SelectItem value="newest">Newest listings</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </Group>
          </Section>

          <Section
            id="progress"
            title="Progress"
            description="Visual indicator of completion or loading state."
            a11y={[
              "WCAG 2.3.3 — transition-transform only (no layout shift)",
              "motion-reduce:transition-none respects prefers-reduced-motion",
            ]}
          >
            <Group label="Values">
              <div className="space-y-4">
                {[0, 25, 50, 75, 100].map((v) => (
                  <div key={v} className="flex items-center gap-5">
                    <span className="w-8 shrink-0 text-right font-mono text-xs text-muted-foreground">
                      {v}%
                    </span>
                    <Progress value={v} className="flex-1" />
                  </div>
                ))}
              </div>
            </Group>

            <Group label="Sizes">
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <p className="font-mono text-[10px] text-muted-foreground">
                    h-1.5
                  </p>
                  <Progress value={65} className="h-1.5" />
                </div>
                <div className="space-y-1.5">
                  <p className="font-mono text-[10px] text-muted-foreground">
                    h-2 (thin)
                  </p>
                  <Progress value={65} className="h-2" />
                </div>
                <div className="space-y-1.5">
                  <p className="font-mono text-[10px] text-muted-foreground">
                    h-4 (default)
                  </p>
                  <Progress value={65} />
                </div>
              </div>
            </Group>
          </Section>

          <Section
            id="icon-container"
            title="Icon Container"
            description="Consistent wrapper for icons with muted background and primary tint."
            a11y={["transition-colors for smooth interactive state changes"]}
          >
            <Group label="Icons">
              <div className="flex flex-wrap items-start gap-6">
                {[
                  { icon: <Anchor />, label: "Anchor" },
                  { icon: <Star />, label: "Star" },
                  { icon: <Heart />, label: "Heart" },
                  { icon: <Search />, label: "Search" },
                  { icon: <Settings />, label: "Settings" },
                  { icon: <User />, label: "User" },
                  { icon: <Home />, label: "Home" },
                  { icon: <Zap />, label: "Zap" },
                  { icon: <Mail />, label: "Mail" },
                  { icon: <Check />, label: "Check" },
                ].map(({ icon, label }) => (
                  <div
                    key={label}
                    className="flex flex-col items-center gap-1.5"
                  >
                    <IconContainer>{icon}</IconContainer>
                    <span className="text-[10px] text-muted-foreground">
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </Group>

            <Group label="Sizes">
              <div className="flex flex-wrap items-end gap-8">
                {[
                  { cls: "size-6", label: "size-6" },
                  { cls: "size-8", label: "size-8 (default)" },
                  { cls: "size-10 rounded-xl", label: "size-10" },
                  { cls: "size-12 rounded-2xl", label: "size-12" },
                  { cls: "size-16 rounded-3xl", label: "size-16" },
                ].map(({ cls, label }) => (
                  <div key={label} className="flex flex-col items-center gap-2">
                    <IconContainer className={cls}>
                      <Anchor
                        className={
                          cls.includes("16")
                            ? "h-7 w-7"
                            : cls.includes("12")
                            ? "h-6 w-6"
                            : undefined
                        }
                      />
                    </IconContainer>
                    <span className="font-mono text-[10px] text-muted-foreground">
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </Group>
          </Section>

          {/* ══════════════════════════════════════════
           *  OVERLAYS
           * ══════════════════════════════════════════ */}

          <Section
            id="dialog"
            title="Dialog"
            description="Modal dialog for focused interactions and confirmations."
            a11y={[
              "WCAG 2.5.5 — 44px close button (h-11 w-11)",
              "WCAG 2.3.3 — motion-reduce:animate-none on overlay & content",
            ]}
          >
            <Group label="Interactive">
              <Button onClick={() => setDialogOpen(true)}>Open Dialog</Button>
              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogContent>
                  <DialogTitle>Contact broker</DialogTitle>
                  <DialogDescription>
                    You&apos;re about to contact{" "}
                    <strong>Denison Yacht Sales</strong> about this listing.
                    Your details will be shared with the broker.
                  </DialogDescription>
                  <div className="mt-6 flex justify-end gap-3">
                    <DialogClose asChild>
                      <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <DialogClose asChild>
                      <Button>Send enquiry</Button>
                    </DialogClose>
                  </div>
                </DialogContent>
              </Dialog>
            </Group>
          </Section>

          <Section
            id="sheet"
            title="Sheet"
            description="Side drawer for filters, navigation, and secondary content. Supports all four sides."
            a11y={[
              "WCAG 2.5.5 — 44px close button (h-11 w-11)",
              "WCAG 2.3.3 — motion-reduce:animate-none on overlay & content",
            ]}
          >
            <Group label="Interactive — all sides">
              <div className="flex flex-wrap gap-3">
                {(["right", "left", "top", "bottom"] as const).map((side) => (
                  <Button
                    key={side}
                    variant="outline"
                    onClick={() => openSheet(side)}
                  >
                    Open {side}
                  </Button>
                ))}
              </div>
              <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
                <SheetContent side={sheetSide}>
                  <SheetHeader>
                    <SheetTitle>Sheet — {sheetSide}</SheetTitle>
                    <SheetDescription>
                      A {sheetSide} sheet. Use for navigation, filters, and
                      detail panels.
                    </SheetDescription>
                  </SheetHeader>
                  <div className="mt-6 space-y-3 text-sm text-muted-foreground">
                    <p>
                      Sheet content can contain filters, forms, navigation
                      menus, or any other content.
                    </p>
                    <p>
                      It renders with a backdrop overlay and can be closed by
                      clicking outside or the × button.
                    </p>
                  </div>
                  <SheetFooter className="mt-8">
                    <SheetClose asChild>
                      <Button variant="outline">Dismiss</Button>
                    </SheetClose>
                    <SheetClose asChild>
                      <Button>Apply</Button>
                    </SheetClose>
                  </SheetFooter>
                </SheetContent>
              </Sheet>
            </Group>
          </Section>

          {/* ══════════════════════════════════════════
           *  LAYOUT
           * ══════════════════════════════════════════ */}

          <Section
            id="card"
            title="Card"
            description="Container component with CardHeader, CardTitle, CardDescription, CardContent, and CardFooter."
            a11y={[
              "WCAG 1.4.12 — CardTitle leading-tight (line height ≥ 1.5)",
              "transition-shadow for hover elevation feedback",
            ]}
          >
            <Group label="Full card">
              <div className="grid gap-6 sm:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Beneteau Oceanis 46</CardTitle>
                    <CardDescription>2019 · Used · Sailboat</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      A beautiful ocean-going sailboat in excellent condition,
                      perfect for blue-water cruising.
                    </p>
                  </CardContent>
                  <CardFooter className="justify-between">
                    <span className="text-sm text-muted-foreground">
                      Marseille, France
                    </span>
                    <Button size="sm">Contact seller</Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Listing performance</CardTitle>
                    <CardDescription>Last 30 days</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Views</span>
                      <span className="font-medium">2,847</span>
                    </div>
                    <Progress value={72} className="h-2" />
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Enquiries</span>
                      <span className="font-medium">14</span>
                    </div>
                    <Progress value={35} className="h-2" />
                  </CardContent>
                </Card>
              </div>
            </Group>

            <Group label="Minimal variant">
              <Card className="max-w-sm">
                <CardHeader>
                  <CardTitle>Quick tip</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Add at least 10 photos to your listing to increase
                    visibility by 3×.
                  </p>
                </CardContent>
              </Card>
            </Group>
          </Section>

          {/* ══════════════════════════════════════════
           *  CUSTOM COMPONENTS
           * ══════════════════════════════════════════ */}

          <Section
            id="boat-card"
            title="Boat Card"
            description="Primary listing card used across the marketplace. Supports grid and list variants."
          >
            <Group label="Grid variant (default)">
              <div className="grid max-w-[260px]">
                <BoatCard boat={sampleBoat} />
              </div>
            </Group>

            <Group label="List variant">
              <div className="max-w-2xl">
                <BoatCard boat={sampleBoat} variant="list" />
              </div>
            </Group>
          </Section>

          <Section
            id="active-filters"
            title="Active Filters Chips"
            description="Displays applied filters as removable badge chips. Click × to remove individual filters."
          >
            <Group label="Interactive">
              <ActiveFilterChipsDemo />
            </Group>
          </Section>

          <Section
            id="searchable-select"
            title="Searchable Select"
            description="Select dropdown with built-in search for long option lists."
          >
            <Group label="Examples">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <p className="text-xs font-medium text-muted-foreground">
                    Country
                  </p>
                  <SearchableSelect
                    value=""
                    onValueChange={() => {}}
                    options={[
                      { label: "France", value: "france" },
                      { label: "Spain", value: "spain" },
                      { label: "Italy", value: "italy" },
                      { label: "United Kingdom", value: "uk" },
                      { label: "United States", value: "us" },
                      { label: "Croatia", value: "croatia" },
                      { label: "Greece", value: "greece" },
                      { label: "Germany", value: "de" },
                      { label: "Netherlands", value: "nl" },
                    ]}
                    placeholder="Select country"
                    searchPlaceholder="Search countries…"
                  />
                </div>
                <div className="space-y-1.5">
                  <p className="text-xs font-medium text-muted-foreground">
                    Manufacturer
                  </p>
                  <SearchableSelect
                    value=""
                    onValueChange={() => {}}
                    options={[
                      { label: "Beneteau", value: "beneteau" },
                      { label: "Jeanneau", value: "jeanneau" },
                      { label: "Sunseeker", value: "sunseeker" },
                      { label: "Bavaria", value: "bavaria" },
                      { label: "Azimut", value: "azimut" },
                      { label: "Princess", value: "princess" },
                      { label: "Ferretti", value: "ferretti" },
                    ]}
                    placeholder="Select brand"
                    searchPlaceholder="Search brands…"
                  />
                </div>
              </div>
            </Group>
          </Section>
          <Section
            id="images"
            title="Image System"
            description="Standardized image dimensions across all use cases. Breakpoints: sm (mobile-first), md (tablet), xl (desktop). Source: image spec v1 — Feb 2026."
          >
            {/* ── Full spec table ── */}
            <Group label="Full image spec">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border/60 text-left text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                      <th className="pb-3 pr-4 w-5">·</th>
                      <th className="pb-3 pr-6">Use Case</th>
                      <th className="pb-3 pr-5">Ratio</th>
                      <th className="pb-3 pr-5">sm</th>
                      <th className="pb-3 pr-5">md</th>
                      <th className="pb-3 pr-5">xl</th>
                      <th className="pb-3">Controller</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      {
                        group: "articles",
                        color: "bg-violet-500",
                        rows: [
                          { useCase: "Article Author Photo", ratio: "1:1",  aspect: "aspect-square",  sm: "48×48",    md: "72×72",    xl: "96×96",     route: "articles#show" },
                          { useCase: "Article Card",         ratio: "2:1",  aspect: "aspect-[2/1]",   sm: "432×216",  md: "640×320",  xl: "960×480",   route: "articles#index" },
                          { useCase: "Article Hero",         ratio: "4:1",  aspect: "aspect-[4/1]",   sm: "640×160",  md: "960×240",  xl: "1280×320",  route: "articles#show" },
                        ],
                      },
                      {
                        group: "boats",
                        color: "bg-blue-500",
                        rows: [
                          { useCase: "Similar Boats Card",  ratio: "1:1",  aspect: "aspect-square",  sm: "150×150",  md: "200×200",  xl: "250×250",   route: "boats#show" },
                          { useCase: "Broker Logo",         ratio: "2:1",  aspect: "aspect-[2/1]",   sm: "200×100",  md: "300×150",  xl: "400×200",   route: "boats#show" },
                          { useCase: "Boat Gallery Main",   ratio: "2:1",  aspect: "aspect-[2/1]",   sm: "640×320",  md: "960×480",  xl: "raw",        route: "boats#show" },
                          { useCase: "Manufacturer Logo",   ratio: "3:2",  aspect: "aspect-[3/2]",   sm: "150×100",  md: "225×150",  xl: "300×200",   route: "boats#show" },
                        ],
                      },
                      {
                        group: "home",
                        color: "bg-emerald-500",
                        rows: [
                          { useCase: "Popular Category Card", ratio: "3:4", aspect: "aspect-[3/4]",  sm: "225×300",  md: "270×360",  xl: "313×417",   route: "home#index" },
                          { useCase: "Home Hero Carousel",  ratio: "3:1",  aspect: "aspect-[3/1]",   sm: "640×213",  md: "960×320",  xl: "1920×640",  route: "home#index" },
                          { useCase: "Boat Card",           ratio: "4:3",  aspect: "aspect-[4/3]",   sm: "400×300",  md: "533×400",  xl: "667×500",   route: "home#index" },
                          { useCase: "Popular model card",  ratio: "4:3",  aspect: "aspect-[4/3]",   sm: "267×200",  md: "333×250",  xl: "400×300",   route: "home#index" },
                        ],
                      },
                      {
                        group: "categories",
                        color: "bg-amber-500",
                        rows: [
                          { useCase: "Category Hero",       ratio: "6:1",  aspect: "aspect-[6/1]",   sm: "768×128",  md: "1020×170", xl: "1680×280",  route: "categories#show" },
                        ],
                      },
                      {
                        group: "manufacturer",
                        color: "bg-rose-500",
                        rows: [
                          { useCase: "Manufacturer hero",   ratio: "6:1",  aspect: "aspect-[6/1]",   sm: "640×107",  md: "960×160",  xl: "1920×320",  route: "manufacturer#show" },
                        ],
                      },
                      {
                        group: "feeds",
                        color: "bg-neutral-400",
                        rows: [
                          { useCase: "Google Merchant Feed", ratio: "1:1", aspect: "aspect-square",  sm: "300×300",  md: "—",        xl: "—",          route: "feeds/*" },
                        ],
                      },
                    ].map(({ group, color, rows }) => (
                      <React.Fragment key={group}>
                        <tr>
                          <td colSpan={7} className="pt-5 pb-1.5">
                            <span className={cn("inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-white", color)}>
                              {group}
                            </span>
                          </td>
                        </tr>
                        {rows.map((row) => (
                          <tr key={row.useCase} className="border-b border-border/30 last:border-0">
                            <td className="py-2.5 pr-4">
                              <div className={cn("w-5 rounded-[3px] bg-primary/15", row.aspect)} />
                            </td>
                            <td className="py-2.5 pr-6 text-sm font-medium text-foreground">{row.useCase}</td>
                            <td className="py-2.5 pr-5 font-mono text-xs text-muted-foreground">{row.ratio}</td>
                            <td className="py-2.5 pr-5 font-mono text-xs text-muted-foreground">{row.sm}</td>
                            <td className="py-2.5 pr-5 font-mono text-xs text-muted-foreground">{row.md}</td>
                            <td className="py-2.5 pr-5 font-mono text-xs text-muted-foreground">{row.xl}</td>
                            <td className="py-2.5">
                              <code className="rounded bg-neutral-100 px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
                                {row.route}
                              </code>
                            </td>
                          </tr>
                        ))}
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              </div>
            </Group>

            {/* ── Aspect ratio visualizer ── */}
            <Group label="Aspect ratio reference">
              <div className="flex flex-wrap items-end gap-6">
                {[
                  { ratio: "1:1",  aspect: "aspect-square",  label: "Square",    usedBy: "Author photo, Similar boats, Merchant" },
                  { ratio: "4:3",  aspect: "aspect-[4/3]",   label: "Standard",  usedBy: "Boat card, Popular model card" },
                  { ratio: "3:2",  aspect: "aspect-[3/2]",   label: "Classic",   usedBy: "Manufacturer logo" },
                  { ratio: "2:1",  aspect: "aspect-[2/1]",   label: "Wide",      usedBy: "Article card, Broker logo, Gallery main" },
                  { ratio: "3:1",  aspect: "aspect-[3/1]",   label: "Panoramic", usedBy: "Home hero carousel" },
                  { ratio: "4:1",  aspect: "aspect-[4/1]",   label: "Cinematic", usedBy: "Article hero" },
                  { ratio: "6:1",  aspect: "aspect-[6/1]",   label: "Banner",    usedBy: "Category hero, Manufacturer hero" },
                  { ratio: "3:4",  aspect: "aspect-[3/4]",   label: "Portrait",  usedBy: "Popular category card" },
                ].map(({ ratio, aspect, label, usedBy }) => (
                  <div key={ratio} className="flex flex-col items-center gap-2">
                    <div className={cn("w-20 rounded-md bg-primary/15 border border-primary/20", aspect)} />
                    <div className="text-center">
                      <p className="font-mono text-xs font-semibold text-foreground">{ratio}</p>
                      <p className="text-[10px] text-muted-foreground">{label}</p>
                      <p className="mt-0.5 max-w-[80px] text-[9px] leading-tight text-muted-foreground/70">{usedBy}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Group>

            {/* ── RBImage component ── */}
            <Group label="RBImage component — props">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border/60 text-left text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                      <th className="pb-3 pr-6">Prop</th>
                      <th className="pb-3 pr-6">Type</th>
                      <th className="pb-3">Notes</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/40 font-mono text-xs">
                    {[
                      { prop: "src",      type: "string",                              notes: "Required. Remote URL or local path." },
                      { prop: "alt",      type: "string",                              notes: "Required. Descriptive alt text." },
                      { prop: "variant",  type: '"hero" | "card" | "thumbnail"',       notes: "Required. Drives dimensions, sizes and loading." },
                      { prop: "priority", type: "boolean",                             notes: "Default false. Pass true for above-the-fold images." },
                      { prop: "className",type: "string",                              notes: "Optional. Merged via twMerge — h-full overrides default h-auto." },
                    ].map((row) => (
                      <tr key={row.prop}>
                        <td className="py-2.5 pr-6 text-foreground">{row.prop}</td>
                        <td className="py-2.5 pr-6 text-muted-foreground">{row.type}</td>
                        <td className="py-2.5 text-muted-foreground">{row.notes}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Group>

            {/* ── Live examples ── */}
            <Group label="Live — hero (priority · 1600×900)">
              <div className="overflow-hidden rounded-lg">
                <RBImage
                  src="https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=1600&q=80"
                  alt="Motor yacht at sea — hero variant"
                  variant="hero"
                  priority
                />
              </div>
              <p className="mt-3 font-mono text-[11px] text-muted-foreground">
                {`<RBImage src="..." alt="..." variant="hero" priority />`}
              </p>
            </Group>

            <Group label="Live — card (lazy · 800×600)">
              <div className="grid grid-cols-3 gap-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="overflow-hidden rounded-lg">
                    <RBImage
                      src={`https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=800&q=80&sig=${i}`}
                      alt={`Boat card demo ${i}`}
                      variant="card"
                    />
                  </div>
                ))}
              </div>
              <p className="mt-3 font-mono text-[11px] text-muted-foreground">
                {`<RBImage src="..." alt="..." variant="card" />`}
              </p>
            </Group>

            {/* ── Config ── */}
            <Group label="next.config.ts — optimization">
              <div className="rounded-lg bg-neutral-950 p-4">
                <pre className="overflow-x-auto font-mono text-xs leading-relaxed text-neutral-300">
{`images: {
  remotePatterns: [ /* rightboat.com, unsplash, ... */ ],
  formats: ["image/avif", "image/webp"],
  deviceSizes: [640, 768, 1024, 1280, 1600],
}`}
                </pre>
              </div>
              <p className="mt-3 text-xs text-muted-foreground">
                AVIF/WebP auto-negotiated by Vercel CDN.{" "}
                <code className="rounded bg-neutral-100 px-1 font-mono">unoptimized: true</code>{" "}
                removed — all images now pass through Next.js optimization pipeline.
              </p>
            </Group>
          </Section>
        </main>
      </div>
    </div>
  )
}
