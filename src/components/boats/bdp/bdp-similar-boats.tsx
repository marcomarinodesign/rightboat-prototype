import Link from "next/link"
import * as React from "react"

import { listingBoats } from "@/data/boats"
import { BoatCard } from "@/components/boats/boat-card"

type BdpSimilarBoatsProps = {
  boatType?: string
}

export function BdpSimilarBoats({ boatType = "Powerboats" }: BdpSimilarBoatsProps) {
  const normalizedType = boatType.toLowerCase()

  const primary = listingBoats.filter(
    (b) => (b.boatType ?? "").toLowerCase() === normalizedType
  )

  // Always render 12 cards (3 rows of 4 on desktop). If we don't have enough
  // matches for `boatType`, fill with other listings (no duplicates).
  const display = React.useMemo(() => {
    const picked: typeof listingBoats = []
    const seen = new Set<string>()

    for (const b of primary) {
      if (picked.length >= 12) break
      if (seen.has(b.id)) continue
      picked.push(b)
      seen.add(b.id)
    }

    if (picked.length < 12) {
      for (const b of listingBoats) {
        if (picked.length >= 12) break
        if (seen.has(b.id)) continue
        picked.push(b)
        seen.add(b.id)
      }
    }

    return picked
  }, [primary])

  return (
    <section
      id="similar-boats"
      className="scroll-mt-32 space-y-6 bg-muted px-4 py-12 sm:px-6 lg:px-8"
    >
      <div className="mx-auto w-full max-w-7xl space-y-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold tracking-tight text-foreground">Similar {boatType}</h2>
            <p className="text-[13px] text-muted-foreground">Based on type, size &amp; location</p>
          </div>
          <Link
            href={`/boats-for-sale?type=${encodeURIComponent(boatType.toLowerCase())}`}
            className="shrink-0 text-[13px] font-medium text-primary hover:text-primary/80"
          >
            View all {boatType} →
          </Link>
        </div>

        {/* Mobile: horizontal scroll; Desktop (lg): 4-column grid */}
        <div className="overflow-x-auto scrollbar-hide lg:overflow-visible">
          <div className="flex w-max gap-2 pb-2 lg:w-auto lg:grid lg:grid-cols-4 lg:gap-2 lg:pb-0">
            {display.map((boat) => (
              <div key={boat.id} className="w-[260px] lg:w-auto">
                <BoatCard boat={boat} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
