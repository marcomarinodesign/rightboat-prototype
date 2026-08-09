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
            Q3 2026 · Proposal
          </p>
          <h1 className="mb-3 text-3xl font-bold text-foreground">
            SRP Gallery View — A/B test
          </h1>
          <p className="max-w-2xl text-body-2 text-midnight">
            Image navigation inside the listing card, without leaving the SRP.
            Cards below are the real component, and the control is the card
            that ships on rightboat.com today rather than the one the brief
            describes. Recommendation is in{" "}
            <span className="font-bold">The proposal</span> at the foot of the
            page.
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
              label="Variation A — the brief as written"
              caption="One photo at a time, swipeable, with a position indicator and a terminal frame. Trades two always-visible thumbnails for depth."
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
            <Arm
              label="Variation B — recommended"
              caption="Production's layout kept intact; the second thumbnail becomes the route into the full gallery. Three photos still visible, and the brief's endpoint still gets its entry point."
            >
              <div className={frameWidth}>
                <BoatCard
                  boat={withPhotos(galleryBoat, 4, "variation-b")}
                  gridLayout="srp"
                  srpVariant="simple"
                  mediaLayout="triptych"
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

        {/* D — per card type */}
        <Section
          title="D · The three card layouts in production"
          description="rightboat.com does not have one listing card, it has three. Only the SRP card shows three photos; the homepage and the BDP's “similar boats” rail both show one. That means the brief's control is wrong for the SRP and right for the other two — and the recommendation has to split accordingly."
        >
          <div className="flex flex-wrap gap-8">
            <Arm
              label="SRP — 3 photos"
              caption="Breadth to protect. Recommendation: keep the layout, spend the last thumbnail on the gallery route (Variation B)."
            >
              <div className={frameWidth}>
                <BoatCard
                  boat={withPhotos(galleryBoat, 4, "type-srp")}
                  gridLayout="srp"
                  srpVariant="simple"
                  mediaLayout="triptych"
                  galleryView={variation}
                />
              </div>
            </Arm>
            <Arm
              label="Homepage — 1 photo"
              caption="Nothing to lose. The brief's carousel applies cleanly here: pure gain over a static image."
            >
              <div className={frameWidth}>
                <BoatCard
                  boat={withPhotos(galleryBoat, 4, "type-home")}
                  mediaLayout="hero"
                  galleryView={variation}
                />
              </div>
            </Arm>
            <Arm
              label="BDP similar boats — 1 photo"
              caption="Same anatomy as the homepage card. Same recommendation, and the highest-intent surface of the three."
            >
              <div className={frameWidth}>
                <BoatCard
                  boat={withPhotos(galleryBoat, 4, "type-bdp")}
                  mediaLayout="hero"
                  galleryView={variation}
                />
              </div>
            </Arm>
          </div>
        </Section>

        {/* Proposal */}
        <section className="mt-12 rounded-xl border border-border-card bg-neutral-100 p-6">
          <h2 className="mb-4 text-body-1 font-bold text-foreground">
            The proposal
          </h2>
          <dl className="space-y-4 text-body-2">
            <QA
              q="The recommendation splits by card layout"
              a="On the SRP, where three photos are already visible, run Control vs Variation B: keep the layout and spend the last thumbnail on the route into the full gallery. On the homepage and the BDP's similar-boats rail, where the card shows a single photo, run the brief's carousel as written — there is no breadth to trade, so it is pure gain. One feature, two answers, because production has two anatomies."
              status="ready"
            />
            <QA
              q="Do not ship one card layout to rule them all"
              a="Unifying the three cards would be a bigger change than this test, would touch the homepage and BDP at the same time, and would confound the result. Keep the anatomies as they are and let the photo feature adapt to each."
              status="ready"
            />
            <QA
              q="Restate the control in the brief"
              a="“Current listing card with one image” is not what ships. Production serves three photos at every breakpoint, so the honest framing is three static photos versus a route into 24. Part of the brief's own objective — previewing several images from the SRP — already shipped, which also means the expected engagement lift is smaller than the brief implies."
              status="ready"
            />
            <QA
              q="If Variation A is run anyway: counter, and no affordance under 2 photos"
              a="Section B — the counter is the only indicator that survives a 20-photo listing, states the total before the first interaction, and stays legible without adding a scrim. Section C — a single-photo listing gets no arrows, no indicator and no terminal frame."
              status="ready"
            />
            <QA
              q="Terminal frame advertises the listing total"
              a="“View all 24 photos”, not the number previewed in the card. Wired through totalPhotoCount; the card preview is capped at five per the brief."
              status="ready"
            />
            <QA
              q="Average photos per listing, and % under 3"
              a="Still unanswerable here — the prototype dataset caps at four real photos and only one boat has a gallery at all. It no longer blocks the recommendation, since Variation B degrades to plain production behaviour when a listing has one photo, but it does decide how often the gallery tile appears at all."
              status="blocked"
            />
            <QA
              q="Mobile, desktop or both"
              a="A scoping call, not a design one. Both variations are responsive either way."
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
