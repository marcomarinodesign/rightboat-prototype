"use client"

import * as React from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import { cn } from "@/lib/utils"
import { BoatCard, type GalleryViewConfig } from "@/components/boats/boat-card"
import type { SliderIndicator } from "@/components/ui/image-slider"
import { listingBoats, type Boat } from "@/data/boats"

// ─── Fixtures ──────────────────────────────────────────────────────────────
// The only boats in the prototype dataset with a real multi-photo gallery cap
// at 4 images. Photo-count scenarios are slices of one real gallery rather than
// photos borrowed across boats, so every card below shows a single vessel.

const galleryBoat =
  listingBoats.find((b) => b.galleryImages && b.galleryImages.length >= 4) ??
  listingBoats[0]

const realGallery = galleryBoat.galleryImages ?? [galleryBoat.image]

function withPhotos(boat: Boat, n: number, id: string): Boat {
  return { ...boat, id, galleryImages: realGallery.slice(0, n) }
}

const SCENARIOS = [
  {
    n: 1,
    label: "1 photo",
    note: "No gallery affordance should appear at all. Card must read as a plain image.",
  },
  {
    n: 2,
    label: "2 photos",
    note: "Below the 4–5 the brief assumes. Is the affordance worth showing here?",
  },
  {
    n: 4,
    label: "4 photos",
    note: "The nominal case in the brief.",
  },
] as const

const INDICATORS: { value: SliderIndicator; label: string; tradeoff: string }[] = [
  {
    value: "dots",
    label: "Dots",
    tradeoff:
      "Already in production. Degrades past ~6 photos — dots shrink and stop being countable. Needs the scrim to survive a bright photo.",
  },
  {
    value: "counter",
    label: "Counter 2/5",
    tradeoff:
      "Scales to any photo count and states the total up front, which sets expectation before the first swipe. The only one legible without a scrim, since it carries its own pill.",
  },
  {
    value: "progress",
    label: "Progress bar",
    tradeoff:
      "Reads as position, not as count — the user never learns how many photos exist. Familiar from stories UI. Needs the scrim.",
  },
]

// ─── Page ──────────────────────────────────────────────────────────────────

export default function GalleryViewExplorationPage() {
  const [indicator, setIndicator] = React.useState<SliderIndicator>("counter")
  const [viewAll, setViewAll] = React.useState(true)
  const [arrowsOnHover, setArrowsOnHover] = React.useState(true)
  const [viewport, setViewport] = React.useState<"mobile" | "desktop">("desktop")

  const variation: GalleryViewConfig = { indicator, viewAll, arrowsOnHover }

  const frameWidth = viewport === "mobile" ? "w-[390px]" : "w-full max-w-[300px]"

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <Link
          href="/design-system"
          className="mb-6 inline-flex items-center gap-2 text-sm text-midnight transition-colors hover:text-primary"
        >
          <ArrowLeft className="size-4" aria-hidden />
          Design system
        </Link>

        <header className="mb-10 border-b border-border-card pb-8">
          <p className="mb-2 text-xs font-medium uppercase tracking-wide text-primary">
            Q3 2026 · Exploration
          </p>
          <h1 className="mb-3 text-3xl font-bold text-foreground">
            SRP Gallery View — A/B test
          </h1>
          <p className="max-w-2xl text-sm leading-6 text-midnight">
            Image navigation inside the listing card, without leaving the SRP.
            This page is the exploration surface for the W7 slot: it exists to
            turn the brief&rsquo;s four open questions into decisions the team can
            look at rather than discuss in the abstract.
          </p>
        </header>

        {/* Controls */}
        <section className="mb-10 rounded-xl border border-border-card bg-card p-5">
          <h2 className="mb-4 text-sm font-bold text-foreground">Controls</h2>
          <div className="flex flex-wrap items-center gap-6">
            <ControlGroup label="Indicator">
              {INDICATORS.map((opt) => (
                <Chip
                  key={opt.value}
                  active={indicator === opt.value}
                  onClick={() => setIndicator(opt.value)}
                >
                  {opt.label}
                </Chip>
              ))}
            </ControlGroup>

            <ControlGroup label="Viewport">
              <Chip
                active={viewport === "desktop"}
                onClick={() => setViewport("desktop")}
              >
                Desktop
              </Chip>
              <Chip
                active={viewport === "mobile"}
                onClick={() => setViewport("mobile")}
              >
                Mobile 390
              </Chip>
            </ControlGroup>

            <ControlGroup label="Options">
              <Chip active={viewAll} onClick={() => setViewAll((v) => !v)}>
                &ldquo;View all photos&rdquo; frame
              </Chip>
              <Chip
                active={arrowsOnHover}
                onClick={() => setArrowsOnHover((v) => !v)}
              >
                Arrows on hover
              </Chip>
            </ControlGroup>
          </div>
        </section>

        {/* A — Control vs variation */}
        <Section
          title="A · Control vs variation"
          description="The brief describes the control as “current listing card with one image”. That is not what rightboat.com serves: production already shows three photos per card — a hero over two thumbnails — at every breakpoint. The real comparison is three static photos against five swipeable ones plus a route into the full gallery, which is a much smaller delta than the brief assumes."
        >
          <div className="flex flex-wrap gap-8">
            <Arm
              label="Control — production today"
              caption="Hero over a 2-up thumbnail row. Three photos visible, no interaction."
            >
              <div className={frameWidth}>
                <BoatCard
                  boat={withPhotos(galleryBoat, 4, "control")}
                  gridLayout="srp"
                  srpVariant="simple"
                  mediaLayout="triptych"
                />
              </div>
            </Arm>
            <Arm
              label="Variation — Figma proposal"
              caption="One photo at a time, swipeable, with a position indicator and a route into the full gallery. Trades two always-visible thumbnails for depth."
            >
              <div className={frameWidth}>
                <BoatCard
                  boat={withPhotos(galleryBoat, 4, "variation")}
                  gridLayout="srp"
                  srpVariant="simple"
                  galleryView={variation}
                />
              </div>
            </Arm>
          </div>
        </Section>

        {/* B — Indicators */}
        <Section
          title="B · Position indicator"
          description="Open question in the brief — dots, counter or progress bar. All three, same card, same photos."
        >
          <div className="flex flex-wrap gap-8">
            {INDICATORS.map((opt) => (
              <Arm key={opt.value} label={opt.label} caption={opt.tradeoff}>
                <div className={frameWidth}>
                  <BoatCard
                    boat={withPhotos(galleryBoat, 4, `ind-${opt.value}`)}
                    gridLayout="srp"
                    srpVariant="simple"
                    galleryView={{ ...variation, indicator: opt.value }}
                  />
                </div>
              </Arm>
            ))}
          </div>
        </Section>

        {/* C — Edge cases */}
        <Section
          title="C · Photo-count edge cases"
          description="The brief flags this as unresolved and it is the one that most changes the build. Until today the prototype padded every card to 4 slides by repeating the hero image, so this case was invisible."
        >
          <div className="flex flex-wrap gap-8">
            {SCENARIOS.map((s) => (
              <Arm key={s.n} label={s.label} caption={s.note}>
                <div className={frameWidth}>
                  <BoatCard
                    boat={withPhotos(galleryBoat, s.n, `edge-${s.n}`)}
                    gridLayout="srp"
                    srpVariant="simple"
                    galleryView={variation}
                  />
                </div>
              </Arm>
            ))}
          </div>
        </Section>

        {/* Open questions */}
        <section className="mt-12 rounded-xl border border-border-card bg-neutral-100 p-6">
          <h2 className="mb-4 text-base font-bold text-foreground">
            What this page settles, and what it doesn&rsquo;t
          </h2>
          <dl className="space-y-4 text-sm leading-6">
            <QA
              q="The brief's control does not exist"
              a="The brief defines the control as “current listing card with one image”. Production serves three photos per card — a hero over two thumbnails — at every breakpoint. The test is therefore three static photos against five swipeable ones, not one against five. Part of the brief's stated objective, previewing several images from the SRP, already shipped."
              status="blocked"
            />
            <QA
              q="Which position indicator?"
              a="Answerable here — section B. Recommendation: counter. It is the only one that survives a listing with 20 photos and the only one that tells the user the gallery has depth before they interact."
              status="ready"
            />
            <QA
              q="What happens below 3 photos?"
              a="Answerable here — section C. Recommendation: no affordance at 1 photo, and treat 2 as a real gallery. The card must not imply photos that do not exist."
              status="ready"
            />
            <QA
              q="Average photos per listing, and % under 3?"
              a="Not answerable here. The prototype dataset caps at 4 real photos and only one boat has a gallery at all — that is a fixture limit, not a finding. Needs the production number from Nico or Joe before the indicator choice can be locked, since it decides whether dots ever degrade in practice."
              status="blocked"
            />
            <QA
              q="Does the A/B run on mobile, desktop or both?"
              a="Not a design question — it is a scoping decision. Both arms are built responsive either way, so this does not block W7, but it does change the test spec."
              status="external"
            />
          </dl>
        </section>
      </div>
    </div>
  )
}

// ─── Building blocks ───────────────────────────────────────────────────────

function Section({
  title,
  description,
  children,
}: {
  title: string
  description: string
  children: React.ReactNode
}) {
  return (
    <section className="mb-12">
      <h2 className="mb-2 text-subtitle-3 font-bold text-foreground">{title}</h2>
      <p className="mb-6 max-w-3xl text-body-2 text-midnight">{description}</p>
      {children}
    </section>
  )
}

function Arm({
  label,
  caption,
  children,
}: {
  label: string
  caption: string
  children: React.ReactNode
}) {
  return (
    <div className="flex max-w-[390px] flex-col gap-3">
      <div>
        <div className="text-body-2 font-bold text-foreground">{label}</div>
        <p className="mt-1 max-w-[300px] text-body-3 text-midnight">{caption}</p>
      </div>
      {children}
    </div>
  )
}

function ControlGroup({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-xs font-medium uppercase tracking-wide text-midnight">
        {label}
      </span>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  )
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "rounded-full border px-3 py-1.5 text-sm font-medium",
        "transition-colors duration-[var(--transition-duration-fast)] motion-reduce:transition-none",
        active
          ? "border-primary bg-primary text-primary-foreground"
          : "border-input bg-background text-foreground hover:border-primary"
      )}
    >
      {children}
    </button>
  )
}

function QA({
  q,
  a,
  status,
}: {
  q: string
  a: string
  status: "ready" | "blocked" | "external"
}) {
  const badge = {
    ready: { label: "Decidible", className: "bg-primary text-primary-foreground" },
    blocked: { label: "Blocked on data", className: "bg-midnight text-white" },
    external: { label: "Scoping", className: "bg-neutral-200 text-midnight" },
  }[status]

  return (
    <div>
      <dt className="flex flex-wrap items-center gap-2 font-bold text-foreground">
        {q}
        <span
          className={cn(
            "rounded-full px-2 py-0.5 text-xs font-medium leading-4",
            badge.className
          )}
        >
          {badge.label}
        </span>
      </dt>
      <dd className="mt-1 text-midnight">{a}</dd>
    </div>
  )
}
