"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { BoatCard } from "@/components/boats/boat-card"
import { listingBoats } from "@/data/boats"

type BdpInactiveSimilarCarouselProps = {
  boatType?: string
  className?: string
}

function useSimilarBoatsDisplay(boatType: string) {
  const normalizedType = boatType.toLowerCase()

  return React.useMemo(() => {
    const limit = 16
    const primary = listingBoats.filter(
      (b) => (b.boatType ?? "").toLowerCase() === normalizedType
    )

    const picked: typeof listingBoats = []
    const seen = new Set<string>()

    for (const b of primary) {
      if (picked.length >= limit) break
      if (seen.has(b.id)) continue
      picked.push(b)
      seen.add(b.id)
    }

    if (picked.length < limit) {
      for (const b of listingBoats) {
        if (picked.length >= limit) break
        if (seen.has(b.id)) continue
        picked.push(b)
        seen.add(b.id)
      }
    }

    return picked
  }, [normalizedType])
}

/** Horizontal similar-boats strip (mobile scroll / desktop paged). Used in inactive overlay and Variant B page. */
export function BdpInactiveSimilarCarousel({
  boatType = "Powerboats",
  className,
}: BdpInactiveSimilarCarouselProps) {
  const display = useSimilarBoatsDisplay(boatType)
  const scrollerRef = React.useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = React.useState(false)
  const [canScrollRight, setCanScrollRight] = React.useState(false)

  const pages = React.useMemo(() => {
    const out: Array<typeof display> = []
    for (let i = 0; i < display.length; i += 4) out.push(display.slice(i, i + 4))
    return out
  }, [display])

  const updateScrollButtons = React.useCallback(() => {
    const el = scrollerRef.current
    if (!el) return
    const max = el.scrollWidth - el.clientWidth
    setCanScrollLeft(el.scrollLeft > 2)
    setCanScrollRight(el.scrollLeft < max - 2)
  }, [])

  React.useEffect(() => {
    updateScrollButtons()
    const el = scrollerRef.current
    if (!el) return
    el.addEventListener("scroll", updateScrollButtons, { passive: true })
    window.addEventListener("resize", updateScrollButtons)
    return () => {
      el.removeEventListener("scroll", updateScrollButtons)
      window.removeEventListener("resize", updateScrollButtons)
    }
  }, [updateScrollButtons])

  function scrollByCards(direction: "left" | "right") {
    const el = scrollerRef.current
    if (!el) return
    const amount = el.clientWidth * (direction === "left" ? -1 : 1)
    el.scrollBy({ left: amount, behavior: "smooth" })
  }

  return (
    <div className={className}>
      <div className="relative">
        <div className="lg:hidden">
          <div className="overflow-x-auto scrollbar-hide">
            <div className="flex w-max items-stretch gap-4 pb-2">
              {display.map((boat) => (
                <div key={boat.id} className="w-[260px] shrink-0 sm:w-[280px]">
                  <BoatCard boat={boat} className="h-full" />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="hidden items-stretch gap-4 lg:flex">
          <button
            type="button"
            aria-label="Scroll similar boats left"
            onClick={() => scrollByCards("left")}
            disabled={!canScrollLeft}
            className="shrink-0 self-center rounded-full border border-border/60 bg-background p-2 shadow-sm transition disabled:opacity-40"
          >
            <ChevronLeft className="h-5 w-5" aria-hidden />
          </button>

          <div
            ref={scrollerRef}
            className="min-w-0 flex-1 overflow-x-auto scroll-smooth scrollbar-hide snap-x snap-mandatory"
          >
            <div className="flex w-full">
              {pages.map((page, idx) => (
                <div key={idx} className="w-full shrink-0 snap-start pb-2">
                  <div className="grid grid-cols-4 gap-4">
                    {page.map((boat) => (
                      <BoatCard key={boat.id} boat={boat} className="h-full" />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            type="button"
            aria-label="Scroll similar boats right"
            onClick={() => scrollByCards("right")}
            disabled={!canScrollRight}
            className="shrink-0 self-center rounded-full border border-border/60 bg-background p-2 shadow-sm transition disabled:opacity-40"
          >
            <ChevronRight className="h-5 w-5" aria-hidden />
          </button>
        </div>
      </div>
    </div>
  )
}
