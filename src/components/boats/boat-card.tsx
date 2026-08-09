"use client"

import type { MouseEvent } from "react"
import Image from "next/image"
import Link from "next/link"
import { Images } from "lucide-react"

import { Boat } from "@/data/boats"
import { cn } from "@/lib/utils"
import { ImageSlider, type SliderIndicator } from "@/components/ui/image-slider"
import { BrokerLogo } from "@/components/boats/broker-logo"
import type { SrpGridCardVariant } from "@/components/boats/srp-grid-card-variant"

/** Q3 SRP Gallery View A/B test — the variation arm. Omit for the control. */
export type GalleryViewConfig = {
  /** Position indicator style under evaluation. */
  indicator?: SliderIndicator
  /** Append the terminal "View all photos" frame linking to the BDP gallery. */
  viewAll?: boolean
  /** Reveal arrows on hover instead of always-on. */
  arrowsOnHover?: boolean
}

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
  /** Enables the Gallery View variation on this card. Omitted = control. */
  galleryView?: GalleryViewConfig
  /**
   * Media anatomy.
   * - `single`: one 3:2 image (this prototype's original card).
   * - `triptych`: hero + two thumbnails, mirroring the card that ships on
   *   rightboat.com today. This is the real SRP control — see
   *   docs/PRODUCTION_ALIGNMENT.md §4.
   */
  mediaLayout?: "single" | "triptych"
}

function specsSummary(boat: Boat) {
  const len = boat.length.replace(/\s*ft\s*$/i, "ft").replace(/\s+/g, "")
  const type = boat.boatType ?? "Boat"
  return `${boat.year} · ${len} · ${type} · ${boat.condition}`
}

export function BoatCard({
  boat,
  variant = "grid",
  gridLayout = "default",
  srpVariant,
  className,
  href,
  galleryView,
  mediaLayout = "single",
}: BoatCardProps) {
  const detailHref =
    href ?? `/boats-for-sale/${boat.makeSlug}/${boat.modelSlug}/${boat.id}`
  /**
   * A listing shows only the photos it actually has. Padding the track with
   * repeats of the hero image made every card look like a 4-photo gallery and
   * hid the sub-3-photo edge case the A/B test needs to account for.
   */
  const allPhotos = boat.galleryImages?.length
    ? boat.galleryImages
    : [boat.image]
  /** The brief previews four or five in the card; the rest live on the BDP. */
  const PREVIEW_LIMIT = 5
  const images = allPhotos.slice(0, PREVIEW_LIMIT)

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
  const showMediaChrome = srpGrid && (isSponsored || isManufacture)

  const badge = isManufacture ? (
    <div className="absolute left-2 top-2 z-10 rounded-full bg-primary px-3 py-1.5">
      <span className="text-xs font-normal leading-4 text-primary-foreground">
        Manufacture Listing
      </span>
    </div>
  ) : isSponsored ? (
    <div
      className={cn(
        "absolute left-2 top-2 z-10 rounded-full px-3 py-1.5",
        srpGrid ? "bg-neutral-200" : "bg-primary"
      )}
    >
      <span
        className={cn(
          "text-xs font-normal leading-4",
          srpGrid ? "text-midnight" : "text-primary-foreground"
        )}
      >
        Sponsored
      </span>
    </div>
  ) : null

  const IMG_SIZES = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"

  /**
   * Production anatomy: a 160px hero over a 2-up row of 80px thumbnails inside
   * a 256px media box. Three photos are visible at once — there is no carousel.
   * A listing with a single photo lets the hero take the full box rather than
   * leaving a gap.
   */
  const thumbs = images.slice(1, 3)
  const triptychSection = (
    <div className="relative flex h-64 w-full flex-col overflow-hidden">
      <div className="flex flex-col">
        <div
          className={cn(
            "relative w-full overflow-hidden rounded-t-lg",
            thumbs.length ? "h-40" : "h-64"
          )}
        >
          <Image
            src={images[0]}
            alt={boatName}
            fill
            sizes={IMG_SIZES}
            className="object-cover"
          />
        </div>
        {thumbs.length > 0 && (
          <div className="grid grid-cols-2 gap-1 pt-1">
            {thumbs.map((src, i) => {
              /*
               * Variation B: rather than replacing three visible photos with
               * one, keep production's layout and turn the last thumbnail into
               * the route to the full gallery. Breadth is preserved and the
               * brief's "View all N photos" endpoint still gets its entry
               * point.
               */
              const isGalleryTile =
                Boolean(galleryView?.viewAll) && i === thumbs.length - 1
              return (
                <div
                  key={`${src}-${i}`}
                  className="relative h-20 overflow-hidden rounded-b"
                >
                  <Image
                    src={src}
                    alt={`${boatName} (${i + 2}/${allPhotos.length})`}
                    fill
                    sizes={IMG_SIZES}
                    className="object-cover"
                  />
                  {isGalleryTile && (
                    <span className="absolute inset-0 flex flex-col items-center justify-center gap-0.5 bg-primary-chinese-blue/65 text-primary-white">
                      <Images className="size-4 shrink-0" aria-hidden strokeWidth={1.75} />
                      <span className="text-body-3 font-bold leading-4">
                        View all {allPhotos.length}
                      </span>
                    </span>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>
      {badge}
    </div>
  )

  const singleSection = (
    <div className="relative w-full overflow-hidden rounded-[8px]">
      <ImageSlider
        images={images}
        alt={boatName}
        showDots={galleryView ? true : srpGrid ? showMediaChrome : true}
        showNavArrows={galleryView ? true : showMediaChrome}
        indicator={galleryView?.indicator ?? "dots"}
        arrowsOnHover={galleryView?.arrowsOnHover ?? false}
        viewAllHref={galleryView?.viewAll ? `${detailHref}?gallery=1` : undefined}
        totalPhotoCount={allPhotos.length}
        dotsPlacement="overlay"
        imageRoundedClassName="rounded-[8px]"
        slideBackdropClassName="bg-midnight/12"
      />
      {badge}
    </div>
  )

  const imageSection = mediaLayout === "triptych" ? triptychSection : singleSection

  const brokerRow = (
    <div className="flex min-w-0 flex-1 items-center gap-2 overflow-hidden">
      <div className="relative flex size-7 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white p-0.5 shadow-sm ring-1 ring-neutral-200">
        <BrokerLogo
          key={`${boat.id}-${boat.broker}`}
          broker={boat.broker}
          alt={boat.broker || "Broker logo"}
          width={28}
          height={28}
          className="size-full object-contain"
        />
      </div>
      <span className="truncate text-xs leading-4 text-midnight">{boat.broker}</span>
    </div>
  )

  const ctaHoverPrimary =
    "transition-colors duration-[var(--transition-duration-normal)] hover:border-primary hover:bg-primary hover:text-primary-foreground"

  const contactCta = (layout: "default" | "srp") => {
    const stopNav = (e: MouseEvent) => {
      e.preventDefault()
      e.stopPropagation()
    }

    if (layout === "srp") {
      const prominent = isSponsored || isManufacture
      if (prominent) {
        return (
          <button
            type="button"
            className={cn(
              "flex h-11 min-w-0 flex-1 items-center justify-center rounded-lg border border-input bg-background px-5 text-sm font-medium text-foreground",
              ctaHoverPrimary
            )}
            onClick={stopNav}
          >
            Contact Seller
          </button>
        )
      }
      return (
        <button
          type="button"
          className={cn(
            "shrink-0 rounded-lg px-3 py-2 text-sm font-medium text-foreground",
            ctaHoverPrimary
          )}
          onClick={stopNav}
        >
          Contact Seller
        </button>
      )
    }

    return (
      <button
        type="button"
        className={cn(
          "flex h-11 w-full items-center justify-center rounded-lg px-8 text-sm font-medium transition-colors duration-[var(--transition-duration-normal)]",
          boat.featured || boat.manufacturerListing
            ? "bg-primary text-primary-foreground hover:bg-primary/90"
            : cn(
                "border border-input bg-background text-foreground",
                ctaHoverPrimary
              )
        )}
        onClick={stopNav}
      >
        Contact Seller
      </button>
    )
  }

  const detailsSection = (options?: {
    linkName?: boolean
    showContactCta?: boolean
    ctaLayout?: "default" | "srp"
  }) => (
    <div className="flex min-w-0 flex-col gap-2 pt-3">
      <div className="text-base font-bold leading-6 text-primary">
        {boat.price}
      </div>
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
      <p className="line-clamp-2 text-sm leading-5 text-midnight">
        {specsSummary(boat)}
      </p>
      <p className="line-clamp-2 text-sm leading-5 text-midnight">{boat.location}</p>
      <div className="h-px w-full bg-border-card" />
      {options?.showContactCta && options.ctaLayout === "srp" ? (
        <div className="flex w-full items-center gap-2">
          {brokerRow}
          {contactCta("srp")}
        </div>
      ) : (
        <>
          {brokerRow}
          {options?.showContactCta ? contactCta("default") : null}
        </>
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

  if (mediaLayout === "triptych") {
    // Shell copied from the card that ships on rightboat.com.
    return (
      <Link
        href={detailHref}
        className={cn(
          "flex w-full min-h-[29rem] cursor-pointer flex-col rounded-2xl border border-wireframe-4/95 bg-card p-2 shadow-sm",
          "transition-shadow duration-[var(--transition-duration-normal)] hover:shadow-lg motion-reduce:transition-none",
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
