"use client"

import Image from "next/image"
import Link from "next/link"
import { Heart, Info } from "lucide-react"

import { Boat } from "@/data/boats"
import { cn } from "@/lib/utils"

type BoatCardProps = {
  boat: Boat
  variant?: "grid" | "list"
}

export function BoatCard({ boat, variant = "grid" }: BoatCardProps) {
  const href = `/boats-for-sale/${boat.makeSlug}/${boat.modelSlug}/${boat.id}`

  const imageSection = (
    <div className="relative h-[250px] w-full overflow-hidden rounded-lg">
      {/* Main image */}
      <div className="absolute inset-x-0 top-0 h-[180px]">
        <Image
          src={boat.image}
          alt={`${boat.make} ${boat.model}`}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
      </div>
      {/* Heart / favourite */}
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
      {/* Thumbnails row */}
      <div className="absolute inset-x-0 bottom-0 flex gap-1">
        <div className="relative h-[66px] flex-1 overflow-hidden rounded-bl-lg">
          <Image
            src={boat.image}
            alt=""
            fill
            className="object-cover"
            sizes="50vw"
          />
        </div>
        <div className="relative h-[66px] flex-1 overflow-hidden rounded-br-lg">
          <Image
            src={boat.image}
            alt=""
            fill
            className="object-cover"
            sizes="50vw"
          />
        </div>
      </div>
    </div>
  )

  const boatName = `${boat.make} ${boat.model}`

  const detailsSection = (options?: { linkName?: boolean }) => (
    <div className="flex flex-col gap-2 p-2">
      {/* Year + Condition tags */}
      <div className="flex flex-wrap gap-2">
        <span className="rounded-md bg-[#F4F9FF] px-2 py-1 text-[11px] leading-4 text-foreground">
          {boat.year}
        </span>
        <span className="rounded-md bg-[#F4F9FF] px-2 py-1 text-[11px] leading-4 text-foreground">
          {boat.condition}
        </span>
      </div>
      {/* Boat name */}
      {options?.linkName ? (
        <Link
          href={href}
          className="truncate text-lg font-bold leading-[26px] text-foreground transition-colors hover:text-primary"
          title={boatName}
        >
          {boatName}
        </Link>
      ) : (
        <span
          className="truncate text-lg font-bold leading-[26px] text-foreground"
          title={boatName}
        >
          {boatName}
        </span>
      )}
      {/* Location | Broker */}
      <div className="flex items-center gap-1 text-[11px] leading-4 text-muted-foreground">
        <span>{boat.location}</span>
        <span className="h-3.5 w-px shrink-0 bg-muted-foreground/60" aria-hidden />
        <span>{boat.broker}</span>
      </div>
      {/* Seller logo + Price row */}
      <div className="flex items-center justify-between gap-2 pt-1">
        <div className="flex h-9 w-[63px] shrink-0 items-center justify-center overflow-hidden rounded-md border border-[#CACCD0] bg-card">
          <span className="truncate px-1 text-[10px] font-medium text-muted-foreground">
            {boat.broker}
          </span>
        </div>
        <div className="flex items-center gap-0.5">
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
      </div>
    </div>
  )

  if (variant === "list") {
    return (
      <article
        className={cn(
          "overflow-hidden rounded-2xl border border-[#E4E5E9] bg-card p-2",
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
        "flex w-full flex-col overflow-hidden rounded-2xl border border-[#E4E5E9] bg-card p-2",
        "transition-all hover:shadow-lg"
      )}
    >
      {imageSection}
      {detailsSection({ linkName: false })}
    </Link>
  )
}
