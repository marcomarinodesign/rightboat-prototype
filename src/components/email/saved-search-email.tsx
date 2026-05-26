"use client"

/**
 * Saved Search Email Monetization — Email Template Components
 * PRD: Q2 2026  Product Roadmap / Product Requirements Document (PRD): Saved Search Email Monetization
 *
 * 7 ad placements:
 *   1. PremiumPartnerBanner   — hero full-bleed, top of email
 *   2. ServiceSponsorCard ×2  — native cards between listings
 *   4. TrustedPartnerBanner   — hero full-bleed, pre-footer
 *   5–7. FooterSponsor ×3     — value-add pills in Buyer Resources
 *
 * All ad creatives are static images (GAM Newsletter Ads beta limitation).
 * Targeting: matched to saved search context (boatType, priceRange, location).
 *
 * NOTE: These components represent the email UI in the prototype / Storybook.
 * The actual email HTML is rendered server-side in a separate email template
 * (e.g. React Email / MJML). Keep this file in sync with that template.
 */

import * as React from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { RIGHTBOAT_LOGO } from "@/lib/brand"
import { SPONSORED_LABEL } from "@/lib/sponsored-badge"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ListingCard } from "@/components/patterns/listing-card"

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

export type BoatType = "center-console" | "sailboat" | "yacht" | "catamaran" | "other"

export type SavedSearchContext = {
  boatType: BoatType
  priceRange?: { min?: number; max?: number }
  location?: string
  userFirstName?: string
  searchLabel: string
}

export type AdCreative = {
  imageUrl: string
  altText: string
  clickUrl: string
  sponsorName: string
  tagline?: string
}

export type SearchListing = {
  id: string
  title: string
  price: string
  location: string
  year: number
  images: string[]
  href: string
}

export const HOUSE_AD_FALLBACK: AdCreative = {
  imageUrl: "/brands/broker-placeholder.svg",
  altText: "Sponsored",
  clickUrl: "#",
  sponsorName: "Sponsor",
}

// ─────────────────────────────────────────────────────────────────────────────
// House ad placeholder (GAM fallback when no paid fill)
// ─────────────────────────────────────────────────────────────────────────────

function AdSlotPlaceholder({
  className,
  aspectClass,
  label = "Sponsored",
}: {
  className?: string
  aspectClass?: string
  label?: string
}) {
  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-lg bg-muted",
        aspectClass,
        className
      )}
      aria-hidden
    >
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Ad slot label (dev/preview only — never visible in production email)
// ─────────────────────────────────────────────────────────────────────────────

function AdSlotLabel({ slot, units }: { slot: string; units?: string }) {
  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex items-center justify-between px-3 py-1.5 bg-primary/80 text-neutral-white text-[10px] font-bold tracking-wide rounded-t-lg">
      <span>{slot}</span>
      {units && <span className="opacity-70">{units}</span>}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// 1. PremiumPartnerBanner — Slot 1
//    Hero full-bleed, top of email, max visibility
// ─────────────────────────────────────────────────────────────────────────────

export type PremiumPartnerBannerProps = {
  creative?: AdCreative | null
  showDevLabel?: boolean
  className?: string
}

export function PremiumPartnerBanner({
  creative,
  showDevLabel = false,
  className,
}: PremiumPartnerBannerProps) {
  if (!creative) {
    return (
      <div className={cn("relative", className)}>
        {showDevLabel && (
          <AdSlotLabel slot="① Premium Partner" units="1 unit · hero" />
        )}
        <AdSlotPlaceholder aspectClass="aspect-[4/1] w-full bg-neutral-200" />
      </div>
    )
  }

  return (
    <a
      href={creative.clickUrl}
      target="_blank"
      rel="noopener noreferrer sponsored"
      className={cn(
        "relative block w-full overflow-hidden rounded-lg",
        "transition-opacity hover:opacity-95",
        className
      )}
      aria-label={`Sponsored: ${creative.sponsorName} — ${creative.altText}`}
    >
      {showDevLabel && (
        <AdSlotLabel slot="① Premium Partner" units="1 unit · hero" />
      )}
      <div className="relative flex aspect-[4/1] w-full items-center justify-center rounded-lg bg-neutral-200 px-6">
        <div className="text-center">
          <p className="text-sm font-semibold text-foreground">{creative.sponsorName}</p>
          {creative.tagline ? (
            <p className="mt-1 text-xs text-muted-foreground">{creative.tagline}</p>
          ) : null}
        </div>
      </div>
      <div className="absolute bottom-3 right-3">
        <Badge variant="secondary">{SPONSORED_LABEL}</Badge>
      </div>
    </a>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// 2 & 3. ServiceSponsorCard — Slots 2–3
//    Native-style card inserted between listings
// ─────────────────────────────────────────────────────────────────────────────

export type ServiceSponsorCardProps = {
  creative?: AdCreative | null
  slotIndex?: 1 | 2
  showDevLabel?: boolean
  className?: string
}

export function ServiceSponsorCard({
  creative,
  slotIndex = 1,
  showDevLabel = false,
  className,
}: ServiceSponsorCardProps) {
  if (!creative) {
    return (
      <Card className={cn("overflow-hidden border-border-card", className)}>
        {showDevLabel && (
          <div className="relative">
            <AdSlotLabel
              slot={`${slotIndex === 1 ? "②" : "③"} Service Sponsor`}
              units="native card"
            />
          </div>
        )}
        <AdSlotPlaceholder className="m-4 min-h-[96px]" />
      </Card>
    )
  }

  return (
    <Card
      className={cn(
        "overflow-hidden border-border-card",
        "transition-all hover:-translate-y-0.5 hover:shadow-lg",
        className
      )}
    >
      {showDevLabel && (
        <div className="relative">
          <AdSlotLabel
            slot={`${slotIndex === 1 ? "②" : "③"} Service Sponsor`}
            units="native card"
          />
        </div>
      )}
      <a
        href={creative.clickUrl}
        target="_blank"
        rel="noopener noreferrer sponsored"
        className="flex min-h-[96px] items-center gap-4 p-4 group"
        aria-label={`Sponsored: ${creative.sponsorName}`}
      >
        <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded-lg bg-muted">
          <Image
            src={creative.imageUrl}
            alt={creative.altText}
            fill
            className="object-cover transition-transform duration-200 group-hover:scale-105"
            sizes="96px"
          />
        </div>
        <CardContent className="flex-1 p-0">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <p className="text-sm font-semibold text-foreground line-clamp-1">
                {creative.sponsorName}
              </p>
              {creative.tagline && (
                <p className="mt-0.5 text-xs text-muted-foreground line-clamp-2">
                  {creative.tagline}
                </p>
              )}
            </div>
            <Badge variant="secondary" className="shrink-0">
              {SPONSORED_LABEL}
            </Badge>
          </div>
          <p className="mt-2 text-xs font-medium text-primary group-hover:underline">
            Learn more →
          </p>
        </CardContent>
      </a>
    </Card>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// 4. TrustedPartnerBanner — Slot 4
//    Hero full-bleed, pre-footer, high visibility
// ─────────────────────────────────────────────────────────────────────────────

export type TrustedPartnerBannerProps = {
  creative?: AdCreative | null
  showDevLabel?: boolean
  className?: string
}

export function TrustedPartnerBanner({
  creative,
  showDevLabel = false,
  className,
}: TrustedPartnerBannerProps) {
  if (!creative) {
    return (
      <div className={cn("relative", className)}>
        {showDevLabel && (
          <AdSlotLabel slot="④ Trusted Partner" units="1 unit · pre-footer hero" />
        )}
        <AdSlotPlaceholder aspectClass="aspect-[3/1] w-full bg-neutral-200" />
      </div>
    )
  }

  return (
    <a
      href={creative.clickUrl}
      target="_blank"
      rel="noopener noreferrer sponsored"
      className={cn(
        "relative block w-full overflow-hidden rounded-lg",
        "transition-opacity hover:opacity-95",
        className
      )}
      aria-label={`Sponsored: ${creative.sponsorName} — ${creative.altText}`}
    >
      {showDevLabel && (
        <AdSlotLabel slot="④ Trusted Partner" units="1 unit · pre-footer hero" />
      )}
      <div className="relative flex aspect-[3/1] w-full items-center justify-center rounded-lg bg-neutral-200 px-6">
        <div className="text-center">
          <p className="text-sm font-semibold text-foreground">{creative.sponsorName}</p>
          {creative.tagline ? (
            <p className="mt-1 text-xs text-muted-foreground">{creative.tagline}</p>
          ) : null}
        </div>
      </div>
      <div className="absolute bottom-3 right-3">
        <Badge variant="secondary">{SPONSORED_LABEL}</Badge>
      </div>
    </a>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// 5–7. FooterSponsor — Slots 5, 6, 7
//    Value-add resource in Buyer Resources section
// ─────────────────────────────────────────────────────────────────────────────

export type FooterSponsorProps = {
  creative?: AdCreative | null
  slotIndex?: 1 | 2 | 3
  showDevLabel?: boolean
  className?: string
}

export function FooterSponsor({
  creative,
  slotIndex = 1,
  showDevLabel = false,
  className,
}: FooterSponsorProps) {
  const slotEmoji = ["⑤", "⑥", "⑦"][slotIndex - 1]

  if (!creative) {
    return (
      <div className={cn("relative", className)}>
        {showDevLabel && (
          <AdSlotLabel slot={`${slotEmoji} Footer Sponsor`} units="Buyer Resources" />
        )}
        <AdSlotPlaceholder aspectClass="aspect-video w-full bg-neutral-200" />
      </div>
    )
  }

  return (
    <a
      href={creative.clickUrl}
      target="_blank"
      rel="noopener noreferrer sponsored"
      className={cn(
        "relative flex flex-col overflow-hidden rounded-lg border border-border-card bg-card",
        "transition-all hover:-translate-y-0.5 hover:shadow-md",
        "group",
        className
      )}
      aria-label={`Sponsored resource: ${creative.sponsorName}`}
    >
      {showDevLabel && (
        <AdSlotLabel slot={`${slotEmoji} Footer Sponsor`} units="Buyer Resources" />
      )}
      <div className="relative flex aspect-video w-full items-center justify-center overflow-hidden bg-neutral-200 px-3">
        <p className="text-center text-[11px] font-semibold text-foreground line-clamp-2">
          {creative.sponsorName}
        </p>
      </div>
      <div className="p-3 flex-1 flex flex-col gap-1">
        {creative.tagline ? (
          <p className="text-[11px] text-muted-foreground line-clamp-2">
            {creative.tagline}
          </p>
        ) : null}
        <Badge variant="secondary" className="mt-auto self-start">
          {SPONSORED_LABEL}
        </Badge>
      </div>
    </a>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// SavedSearchEmail — full email template assembly (7 slots)
// ─────────────────────────────────────────────────────────────────────────────

export type SavedSearchEmailProps = {
  context: SavedSearchContext
  listings: SearchListing[]
  ads: {
    premiumPartner: AdCreative
    serviceSponsors: [AdCreative, AdCreative]
    trustedPartner: AdCreative
    footerSponsors: [AdCreative, AdCreative, AdCreative]
  }
  /** Show slot labels for design review / Storybook */
  showDevLabels?: boolean
}

export function SavedSearchEmail({
  context,
  listings,
  ads,
  showDevLabels = false,
}: SavedSearchEmailProps) {
  // Split listings: 2 before first native ad, 2 before second, rest after
  const [listingsA, listingsB, listingsC] = [
    listings.slice(0, 2),
    listings.slice(2, 4),
    listings.slice(4),
  ]

  return (
    <div className="mx-auto max-w-[600px] space-y-0 bg-background font-sans text-foreground">
      {/* ── Header ── */}
      <header className="flex items-center justify-between border-b border-border px-6 py-4">
        <div className="flex shrink-0 items-center">
          <Image
            src={RIGHTBOAT_LOGO.src}
            alt="Rightboat"
            width={RIGHTBOAT_LOGO.width}
            height={RIGHTBOAT_LOGO.height}
            className="h-[26px] w-auto"
            priority
          />
        </div>
        <p className="text-xs text-muted-foreground">
          Saved Search:{" "}
          <span className="font-medium text-foreground">{context.searchLabel}</span>
        </p>
      </header>

      {/* ── Intro ── */}
      <div className="px-6 pt-5 pb-3">
        <h1 className="text-xl font-bold text-foreground">
          {context.userFirstName
            ? `Hi ${context.userFirstName}, new boats for you`
            : "New boats matching your search"}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          We found new listings matching &ldquo;{context.searchLabel}&rdquo;
          {context.location ? ` in ${context.location}` : ""}.
        </p>
      </div>

      {/* ═══════════════════════════════════════
          SLOT 1 — Premium Partner (hero banner)
      ════════════════════════════════════════ */}
      <div className="px-6 pb-4">
        <PremiumPartnerBanner
          creative={ads.premiumPartner}
          showDevLabel={showDevLabels}
        />
      </div>

      {/* ── Listings A (2) ── */}
      <div className="px-6 grid grid-cols-1 sm:grid-cols-2 gap-4 pb-4">
        {listingsA.map((listing) => (
          <ListingCard
            key={listing.id}
            title={listing.title}
            description={`${listing.year} · ${listing.location}`}
            images={listing.images}
            price={listing.price}
            showDots
          />
        ))}
      </div>

      {/* ═══════════════════════════════════════
          SLOT 2 — Service Sponsor #1 (native card)
      ════════════════════════════════════════ */}
      <div className="px-6 pb-4">
        <ServiceSponsorCard
          creative={ads.serviceSponsors[0]}
          slotIndex={1}
          showDevLabel={showDevLabels}
        />
      </div>

      {/* ── Listings B (2) ── */}
      <div className="px-6 grid grid-cols-1 sm:grid-cols-2 gap-4 pb-4">
        {listingsB.map((listing) => (
          <ListingCard
            key={listing.id}
            title={listing.title}
            description={`${listing.year} · ${listing.location}`}
            images={listing.images}
            price={listing.price}
            showDots
          />
        ))}
      </div>

      {/* ═══════════════════════════════════════
          SLOT 3 — Service Sponsor #2 (native card)
      ════════════════════════════════════════ */}
      <div className="px-6 pb-4">
        <ServiceSponsorCard
          creative={ads.serviceSponsors[1]}
          slotIndex={2}
          showDevLabel={showDevLabels}
        />
      </div>

      {/* ── Listings C (remaining) ── */}
      {listingsC.length > 0 && (
        <div className="px-6 grid grid-cols-1 sm:grid-cols-2 gap-4 pb-4">
          {listingsC.map((listing) => (
            <ListingCard
              key={listing.id}
              title={listing.title}
              description={`${listing.year} · ${listing.location}`}
              images={listing.images}
              price={listing.price}
              showDots
            />
          ))}
        </div>
      )}

      {/* ── View all CTA ── */}
      <div className="px-6 pb-6 text-center">
        <Button variant="default" size="lg" className="w-full sm:w-auto">
          View all results
        </Button>
      </div>

      {/* ═══════════════════════════════════════
          SLOT 4 — Trusted Partner (pre-footer hero)
      ════════════════════════════════════════ */}
      <div className="px-6 pb-4">
        <TrustedPartnerBanner
          creative={ads.trustedPartner}
          showDevLabel={showDevLabels}
        />
      </div>

      {/* ── Footer ── */}
      <footer className="bg-midnight px-6 py-6 rounded-b-lg">
        {/* ═══════════════════════════════════════
            SLOTS 5–7 — Footer Sponsors (Buyer Resources)
        ════════════════════════════════════════ */}
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-neutral-400">
          Buyer Resources
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
          {ads.footerSponsors.map((sponsor, i) => (
            <FooterSponsor
              key={i}
              creative={sponsor}
              slotIndex={(i + 1) as 1 | 2 | 3}
              showDevLabel={showDevLabels}
            />
          ))}
        </div>

        <div className="border-t border-neutral-white/10 pt-4 space-y-2">
          <p className="text-[11px] text-neutral-400">
            You are receiving this email because you saved a search on Rightboat.com.
          </p>
          <div className="flex gap-4">
            <a href="#" className="text-[11px] text-neutral-400 hover:text-neutral-white underline">
              Unsubscribe
            </a>
            <a href="#" className="text-[11px] text-neutral-400 hover:text-neutral-white underline">
              Manage preferences
            </a>
            <a href="#" className="text-[11px] text-neutral-400 hover:text-neutral-white underline">
              Privacy Policy
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
