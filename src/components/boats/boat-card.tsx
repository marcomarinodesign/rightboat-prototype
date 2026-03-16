"use client"

import Link from "next/link"
import Image from "next/image"
import { Heart, Info } from "lucide-react"

import { Boat } from "@/data/boats"
import { cn } from "@/lib/utils"
import { ImageSlider } from "@/components/ui/image-slider"
import { premiumBrands } from "@/data/brands"

type BoatCardProps = {
  boat: Boat
  variant?: "grid" | "list"
}

export function BoatCard({ boat, variant = "grid" }: BoatCardProps) {
  const href = `/boats-for-sale/${boat.makeSlug}/${boat.modelSlug}/${boat.id}`
  const images = boat.galleryImages?.length
    ? boat.galleryImages
    : // When we only have a single image, repeat it so the
      // carousel layout (including dots) is consistent across cards.
      [boat.image, boat.image, boat.image, boat.image]

  const imageSection = (
    <div className="relative w-full overflow-hidden rounded-lg">
      <ImageSlider
        images={images}
        alt={`${boat.make} ${boat.model}`}
        showDots
      />
      <button
        type="button"
        className="absolute right-2 top-2 z-10 flex h-6 w-6 items-center justify-center rounded-full text-white transition-opacity hover:opacity-90"
        aria-label="Add to favourites"
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
        }}
      >
        <Heart className="h-5 w-5" strokeWidth={2} />
      </button>
    </div>
  )

  const boatName = `${boat.make} ${boat.model}`

  const detailsSection = (options?: { linkName?: boolean; showContactCta?: boolean }) => (
    <div className="flex flex-col gap-2 p-2">
      {/* Year + Condition tags */}
      <div className="flex flex-wrap gap-2">
        <span className="rounded-md bg-tag-bg px-2 py-1 text-xs leading-4 text-foreground">
          {boat.year}
        </span>
        <span className="rounded-md bg-tag-bg px-2 py-1 text-xs leading-4 text-foreground">
          {boat.condition}
        </span>
      </div>
      {/* Boat name */}
      {options?.linkName ? (
        <Link
          href={href}
          className="truncate text-lg font-bold leading-snug text-foreground transition-colors hover:text-primary"
          title={boatName}
        >
          {boatName}
        </Link>
      ) : (
        <span
          className="truncate text-lg font-bold leading-snug text-foreground"
          title={boatName}
        >
          {boatName}
        </span>
      )}
      {/* Price row */}
      <div className="flex items-center justify-between gap-2 pt-1">
        <span className="text-xl font-bold leading-7 text-primary">
          {boat.price}
        </span>
        <button
          type="button"
          className="flex h-5 w-5 shrink-0 items-center justify-center text-primary"
          aria-label="Price information"
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
          }}
        >
          <Info className="h-4 w-4" strokeWidth={2} />
        </button>
      </div>
      {/* Location | Broker */}
      <div className="flex items-center gap-1 text-xs leading-4 text-muted-foreground">
        <span>{boat.location}</span>
        <span className="h-3.5 w-px shrink-0 bg-muted-foreground/60" aria-hidden />
        <span>{boat.broker}</span>
      </div>
      {/* Seller logo + CTA */}
      <div className="flex items-center gap-3 pt-2">
        {/* Fixed-width logo placeholder so all cards align */}
        <div className="flex h-9 w-24 shrink-0 items-center justify-center overflow-hidden rounded-md border border-border bg-card px-2">
          <Image
            src={
              premiumBrands[Math.abs(boat.id.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0)) % premiumBrands.length]?.logo ??
              "/brands/placeholder-logo.png"
            }
            alt={boat.broker || "Broker logo"}
            width={96}
            height={36}
            className="h-full w-full object-contain"
          />
        </div>
        {options?.showContactCta && (
          <button
            type="button"
            className="flex h-9 flex-1 items-center justify-center rounded-md bg-primary px-3 text-sm font-semibold text-primary-foreground"
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
            }}
          >
            Contact Seller
          </button>
        )}
      </div>
    </div>
  )

  if (variant === "list") {
    return (
      <article
        className={cn(
          "overflow-hidden rounded-2xl border border-border-card bg-card p-2",
          "transition-all hover:shadow-lg",
          "md:flex"
        )}
      >
        <Link href={href} className="relative block md:w-2/5 md:shrink-0">
          {imageSection}
        </Link>
        <div className="flex flex-1 flex-col md:w-3/5">
          {detailsSection({ linkName: true })}
        </div>
      </article>
    )
  }

  return (
    <Link
      href={href}
      className={cn(
        "flex w-full flex-col overflow-hidden rounded-2xl border border-border-card bg-card p-2",
        "transition-all hover:shadow-lg"
      )}
    >
      {imageSection}
      {detailsSection({ linkName: false, showContactCta: true })}
    </Link>
  )
}
