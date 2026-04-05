"use client"

import Link from "next/link"

import { Boat } from "@/data/boats"
import { cn } from "@/lib/utils"
import { ImageSlider } from "@/components/ui/image-slider"
import { BrokerLogo } from "@/components/boats/broker-logo"

type BoatCardProps = {
  boat: Boat
  variant?: "grid" | "list"
}

function specsSummary(boat: Boat) {
  const len = boat.length.replace(/\s*ft\s*$/i, "ft").replace(/\s+/g, "")
  const type = boat.boatType ?? "Boat"
  return `${boat.year} · ${len} · ${type} · ${boat.condition}`
}

export function BoatCard({ boat, variant = "grid" }: BoatCardProps) {
  const href = `/boats-for-sale/${boat.makeSlug}/${boat.modelSlug}/${boat.id}`
  const images = boat.galleryImages?.length
    ? boat.galleryImages
    : [boat.image, boat.image, boat.image, boat.image]

  const boatName = `${boat.make} ${boat.model}`

  const imageSection = (
    <div className="relative w-full overflow-hidden rounded-[8px]">
      <ImageSlider
        images={images}
        alt={boatName}
        showDots
        showNavArrows={false}
        dotsPlacement="overlay"
        imageRoundedClassName="rounded-[8px]"
        slideBackdropClassName="bg-midnight/12"
      />
      {boat.featured ? (
        <div className="absolute left-2 top-2 z-10 rounded-full bg-primary px-3 py-1.5">
          <span className="text-xs font-medium leading-none text-primary-foreground">
            Sponsored
          </span>
        </div>
      ) : null}
    </div>
  )

  const detailsSection = (options?: { linkName?: boolean; showContactCta?: boolean }) => (
    <div className="flex min-w-0 flex-col gap-2 pt-3">
      <div className="text-base font-bold leading-6 text-primary">
        {boat.price}
      </div>
      {options?.linkName ? (
        <Link
          href={href}
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
      <div className="flex items-center gap-2">
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
      {options?.showContactCta ? (
        <button
          type="button"
          className="flex h-11 w-full items-center justify-center rounded-lg bg-primary px-8 text-sm font-medium text-primary-foreground"
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
          }}
        >
          Contact Seller
        </button>
      ) : null}
    </div>
  )

  if (variant === "list") {
    return (
      <article
        className={cn(
          "overflow-hidden rounded-xl border border-border-card bg-card p-3",
          "transition-all hover:shadow-lg",
          "md:flex"
        )}
      >
        <Link href={href} className="relative block md:w-2/5 md:shrink-0">
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
      href={href}
      className={cn(
        "flex w-full flex-col overflow-hidden rounded-xl border border-border-card bg-card p-3",
        "transition-all hover:shadow-lg"
      )}
    >
      {imageSection}
      {detailsSection({ linkName: false, showContactCta: true })}
    </Link>
  )
}
