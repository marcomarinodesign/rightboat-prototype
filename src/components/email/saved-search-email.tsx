"use client"

/**
 * Saved Search Email Monetization — Email Template Components
 * PRD: Q2 2026 Product Roadmap / Product Requirements Document (PRD): Saved Search Email Monetization
 *
 * 5 ad placements (updated per Q2 feedback — Joe Lingerfelt 2026-06-05):
 *   1. PremiumPartnerBanner   — hero full-bleed, top of email
 *   2. TrustedPartnerBanner   — hero full-bleed, pre-footer
 *   3–5. FooterSponsor ×3     — value-add tiles in Buyer Resources
 *
 * Slots 2–3 (ServiceSponsorCard) removed from main flow.
 * Listings now render as horizontal rows (image left, content right), max 5.
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
  /** Boat length in feet, e.g. "27" */
  length?: string
  /** Condition label, e.g. "Used" | "New" | "Pre-owned" */
  condition?: string
  /** Number of photos available — drives "See X photos" pill */
  photoCount?: number
  images: string[]
  href: string
}

export const HOUSE_AD_FALLBACK: AdCreative = {
  imageUrl: "/brands/broker-placeholder.svg",
  altText: "Sponsored",
  clickUrl: "#",
  sponsorName: "Sponsor",
}

const BOAT_TYPE_LABEL: Record<BoatType, string> = {
  "center-console": "Center Console",
  sailboat: "Sailboat",
  yacht: "Yacht",
  catamaran: "Catamaran",
  other: "Other",
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
// HorizontalListingRow — email listing card (horizontal layout)
//   Image left (fixed width) · Content right (fills remaining space)
//   Matches Figma: El-Captain-DS · node 383:9
// ─────────────────────────────────────────────────────────────────────────────

type HorizontalListingRowProps = {
  listing: SearchListing
  boatType: BoatType
  className?: string
}

function HorizontalListingRow({ listing, boatType, className }: HorizontalListingRowProps) {
  const specsLine = [
    listing.year,
    listing.length ? `${listing.length}ft` : null,
    BOAT_TYPE_LABEL[boatType],
    listing.condition ?? null,
  ]
    .filter(Boolean)
    .join(" · ")

  return (
    <div
      className={cn(
        "flex items-center gap-4 border-b border-border py-[14px]",
        className
      )}
    >
      {/* Image — pill absolutely pinned to bottom-right inside the frame */}
      <div className="relative h-[160px] w-[280px] shrink-0 overflow-hidden rounded-[4px] bg-neutral-200">
        {listing.images[0] && (
          <Image
            src={listing.images[0]}
            alt={listing.title}
            fill
            className="z-0 object-cover"
            sizes="280px"
          />
        )}
        {listing.photoCount != null && listing.photoCount > 0 && (
          <div className="absolute bottom-2 right-2 z-10 rounded-full bg-[#b8e7ff] px-3 py-1.5">
            <span className="whitespace-nowrap text-[11px] font-semibold text-midnight">
              See {listing.photoCount} photos
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex min-w-0 flex-1 flex-col gap-[5px]">
        <p className="text-base font-bold leading-6 text-foreground line-clamp-2">
          {listing.title}
        </p>
        <p className="text-sm text-muted-foreground">{listing.location}</p>
        <p className="text-sm text-muted-foreground">{specsLine}</p>
        <p className="text-base font-bold leading-6 text-primary">{listing.price}</p>
        <a
          href={listing.href}
          className="inline-flex h-10 items-center justify-center rounded-[12px] bg-primary px-4 py-2 text-[13px] font-medium text-white transition-colors hover:bg-primary/90 self-start"
        >
          View listing →
        </a>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// 1. PremiumPartnerBanner — Slot 1
//    Hero full-bleed, top of email, max visibility · 552×138px
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
          <AdSlotLabel slot="① Premium Partner" units="Slot 1 · hero · 552×138px" />
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
        <AdSlotLabel slot="① Premium Partner" units="Slot 1 · hero · 552×138px" />
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
// ServiceSponsorCard — kept for backward compat, NOT used in main flow
//   (Removed per Q2 feedback — Joe Lingerfelt 2026-06-05)
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
              units="native card · deprecated"
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
            units="native card · deprecated"
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
// 2. TrustedPartnerBanner — Slot 2
//    Hero full-bleed, pre-footer, high visibility · 600×160px
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
          <AdSlotLabel slot="② Trusted Partner" units="Slot 2 · pre-footer · 600×160px" />
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
        <AdSlotLabel slot="② Trusted Partner" units="Slot 2 · pre-footer · 600×160px" />
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
// 3–5. FooterSponsor — Slots 3, 4, 5
//    Value-add resource tile in Buyer Resources section
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
  const slotEmoji = ["③", "④", "⑤"][slotIndex - 1]
  const slotNum = slotIndex + 2 // maps to Slot 3, 4, 5

  if (!creative) {
    return (
      <div className={cn("relative", className)}>
        {showDevLabel && (
          <AdSlotLabel
            slot={`${slotEmoji} Sponsor Resource`}
            units={`Slot ${slotNum} · Buyer Resources`}
          />
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
        <AdSlotLabel
          slot={`${slotEmoji} Sponsor Resource`}
          units={`Slot ${slotNum} · Buyer Resources`}
        />
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
// SavedSearchEmail — full email template assembly (5 ad slots)
// ─────────────────────────────────────────────────────────────────────────────

export type SavedSearchEmailProps = {
  context: SavedSearchContext
  listings: SearchListing[]
  ads: {
    premiumPartner: AdCreative
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
  // Cap at 5 listings per Figma spec + Joe's feedback (2026-06-05)
  const visibleListings = listings.slice(0, 5)

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
        <p className="text-xs text-foreground">Saved Search Alert</p>
      </header>

      {/* ── Intro ── */}
      <div className="flex flex-col gap-1 px-6 pb-3 pt-5 text-center">
        <h1 className="text-[30px] font-bold leading-9 tracking-[-0.3px] text-foreground">
          {context.userFirstName ? (
            <>
              <span className="text-primary">Hi {context.userFirstName}, </span>
              <span>new boats for you</span>
            </>
          ) : (
            "New boats matching your search"
          )}
        </h1>
        <p className="text-sm text-muted-foreground">
          We found new listings matching &ldquo;
          <strong className="font-bold text-foreground">{context.searchLabel}</strong>
          &rdquo;{context.location ? ` in ${context.location}` : ""}.
        </p>
      </div>

      {/* ═══════════════════════════════════════
          SLOT 1 — Premium Partner (hero banner)
      ════════════════════════════════════════ */}
      <div className="px-6 pb-5">
        <PremiumPartnerBanner
          creative={ads.premiumPartner}
          showDevLabel={showDevLabels}
        />
      </div>

      {/* ── Listings (max 5, horizontal layout) ── */}
      <div className="px-6 py-2">
        {visibleListings.map((listing) => (
          <HorizontalListingRow
            key={listing.id}
            listing={listing}
            boatType={context.boatType}
          />
        ))}
      </div>

      {/* ── View all CTA ── */}
      <div className="px-6 pb-5 pt-1 text-center">
        <Button variant="default" className="h-10 rounded-[12px] px-4 text-[13px] font-medium">
          View all results
        </Button>
      </div>

      {/* ═══════════════════════════════════════
          SLOT 2 — Trusted Partner (pre-footer hero)
      ════════════════════════════════════════ */}
      <div className="px-6 pb-5">
        <TrustedPartnerBanner
          creative={ads.trustedPartner}
          showDevLabel={showDevLabels}
        />
      </div>

      {/* ── Footer ── */}
      <footer className="flex flex-col gap-4 bg-midnight px-6 py-6 rounded-b-lg">
        {/* ═══════════════════════════════════════
            SLOTS 3–5 — Footer Sponsors (Buyer Resources)
        ════════════════════════════════════════ */}
        <p className="text-xs font-bold leading-4 text-white">
          BUYER RESOURCES
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {ads.footerSponsors.map((sponsor, i) => (
            <FooterSponsor
              key={i}
              creative={sponsor}
              slotIndex={(i + 1) as 1 | 2 | 3}
              showDevLabel={showDevLabels}
            />
          ))}
        </div>

        {/* Divider */}
        <div className="h-px w-full bg-white/[0.08]" />

        <div className="flex gap-5">
          <a href="#" className="text-xs text-white hover:underline">Unsubscribe</a>
          <a href="#" className="text-xs text-white hover:underline">Manage preferences</a>
          <a href="#" className="text-xs text-white hover:underline">Privacy Policy</a>
        </div>
        <p className="text-xs leading-4 text-white">
          You are receiving this email because you saved a search on Rightboat.com.
        </p>
      </footer>
    </div>
  )
}
