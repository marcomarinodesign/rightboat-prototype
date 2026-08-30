"use client"

import type { MouseEvent } from "react"
import Link from "next/link"

import { Boat } from "@/data/boats"
import { cn } from "@/lib/utils"
import { ImageSlider } from "@/components/ui/image-slider"
import { PhotoTriptych } from "@/components/patterns/photo-triptych"
import { BrokerLogo } from "@/components/boats/broker-logo"
import type { SrpGridCardVariant } from "@/components/boats/srp-grid-card-variant"

type BoatCardProps = {
  boat: Boat
  variant?: "grid" | "list"
  /** SRP grid uses compact broker + CTA row (Figma Alt* variants). */
  gridLayout?: "default" | "srp"
  /** Visual variant for SRP grid (overrides featured / manufacturerListing flags). */
  srpVariant?: SrpGridCardVariant
  className?: string
  /** Detail URL (defaults to `/boats-for-sale/{makeSlug}/{modelSlug}/{id}`). */
  href?: string
}

function specsSummary(boat: Boat) {
  const len = boat.length.replace(/\s*ft\s*$/i, "ft").replace(/\s+/g, "")
  const type = boat.boatType ?? "Boat"
  return `${boat.year} · ${len} · ${type} · ${boat.conditionLabel ?? boat.condition}`
}

export function BoatCard({
  boat,
  variant = "grid",
  gridLayout = "default",
  srpVariant,
  className,
  href,
}: BoatCardProps) {
  const detailHref =
    href ?? `/boats-for-sale/${boat.makeSlug}/${boat.modelSlug}/${boat.id}`
  const images = boat.galleryImages?.length
    ? boat.galleryImages
    : [boat.image, boat.image, boat.image, boat.image]

  const boatName = `${boat.make} ${boat.model}`

  const srpGrid = variant === "grid" && gridLayout === "srp"
  const isSponsored =
    srpGrid && srpVariant
      ? srpVariant === "sponsored"
      : Boolean(boat.featured)
  const isManufacture =
    srpGrid && srpVariant
      ? srpVariant === "manufacture"
      : Boolean(boat.manufacturerListing)

  // Figma Boat Card variants: Simple (plain photo), Sponsored (carousel chrome),
  // Sponsored Alt / Manufacture (triptych). `boat.cardMedia` pins the anatomy per
  // slot the way the Figma grid does; otherwise it follows the listing flags.
  const mediaLayout =
    boat.cardMedia ??
    (isManufacture || (isSponsored && srpGrid)
      ? "triptych"
      : isSponsored
        ? "carousel"
        : "single")
  const useTriptych = mediaLayout === "triptych"
  const useCarouselChrome = mediaLayout === "carousel"

  const imageSection = (
    <div className="relative w-full overflow-hidden rounded-[8px]">
      {useTriptych ? (
        <PhotoTriptych images={images} alt={boatName} />
      ) : (
        <ImageSlider
          images={images}
          alt={boatName}
          showDots={useCarouselChrome}
          showNavArrows={useCarouselChrome}
          dotsPlacement="overlay"
          imageRoundedClassName="rounded-[8px]"
          slideBackdropClassName="bg-midnight/12"
          carouselFrameClassName="h-[200px]"
        />
      )}
      {isManufacture ? (
        <div className="absolute left-2 top-2 z-10 rounded-full bg-malibu-600 px-3 py-1.5">
          <span className="text-xs font-normal leading-4 text-neutral-white">
            Manufacture Listing
          </span>
        </div>
      ) : isSponsored ? (
        <div className="absolute left-2 top-2 z-10 rounded-full bg-malibu-300 px-3 py-1.5">
          <span className="text-xs font-normal leading-4 text-midnight">
            Sponsored
          </span>
        </div>
      ) : null}
    </div>
  )

  /** Figma: broker logo sits in a bordered 73×44 box, not a round avatar with a name. */
  const brokerLogoBox = (
    <div className="relative flex h-11 w-[73px] shrink-0 items-center justify-center overflow-hidden rounded-[8px] border border-border bg-card">
      <BrokerLogo
        key={`${boat.id}-${boat.broker}`}
        broker={boat.broker}
        alt={boat.broker || "Broker logo"}
        width={73}
        height={44}
        className="h-full w-full object-contain p-1"
      />
    </div>
  )

  const ctaHoverPrimary =
    "transition-colors duration-[var(--transition-duration-normal)] hover:border-primary hover:bg-primary hover:text-primary-foreground"

  const contactCta = (layout: "default" | "srp") => {
    const stopNav = (e: MouseEvent) => {
      e.preventDefault()
      e.stopPropagation()
    }

    void layout
    return (
      <button
        type="button"
        className="flex h-11 min-w-0 flex-1 items-center justify-center rounded-[8px] bg-primary px-8 text-sm font-medium text-primary-foreground transition-colors duration-[var(--transition-duration-normal)] hover:bg-primary/90"
        onClick={stopNav}
      >
        {isManufacture ? "Contact Manufacturer" : "Contact Seller"}
      </button>
    )
  }

  const detailsSection = (options?: {
    linkName?: boolean
    showContactCta?: boolean
    ctaLayout?: "default" | "srp"
  }) => (
    // Figma info order: specs → title → location → price → divider → broker + CTA row.
    <div className="flex min-w-0 flex-col gap-2 pt-3">
      <p className="line-clamp-2 text-sm leading-5 text-midnight">
        {specsSummary(boat)}
      </p>
      {options?.linkName ? (
        <Link
          href={detailHref}
          className="block min-w-0 truncate text-base font-bold leading-6 text-foreground transition-colors hover:text-primary"
          title={boatName}
        >
          {boatName}
        </Link>
      ) : (
        <span
          className="block min-w-0 truncate text-base font-bold leading-6 text-foreground"
          title={boatName}
        >
          {boatName}
        </span>
      )}
      <p className="line-clamp-2 text-sm leading-5 text-midnight">{boat.location}</p>
      <div className="text-base font-bold leading-6 text-primary">
        {boat.price}
      </div>
      <div className="h-px w-full bg-border-card" />
      {options?.showContactCta ? (
        <div className="flex w-full items-start gap-2">
          {brokerLogoBox}
          {contactCta(options.ctaLayout ?? "default")}
        </div>
      ) : (
        brokerLogoBox
      )}
    </div>
  )

  if (variant === "list") {
    return (
      <article
        className={cn(
          "overflow-hidden rounded-xl border border-border-card bg-card p-3",
          "transition-all hover:shadow-lg",
          "md:flex",
          className
        )}
      >
        <Link href={detailHref} className="relative block md:w-2/5 md:shrink-0">
          {imageSection}
        </Link>
        <div className="flex min-w-0 flex-1 flex-col md:w-3/5 md:pl-3">
          {detailsSection({ linkName: true, showContactCta: true })}
        </div>
      </article>
    )
  }

  return (
    <Link
      href={detailHref}
      className={cn(
        "flex w-full flex-col overflow-hidden rounded-xl border border-border-card bg-card p-3",
        "transition-all hover:shadow-lg",
        className
      )}
    >
      {imageSection}
      {detailsSection({
        linkName: false,
        showContactCta: true,
        ctaLayout: srpGrid ? "srp" : "default",
      })}
    </Link>
  )
}
