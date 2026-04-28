"use client"

import Link from "next/link"
import * as React from "react"
import { ChevronLeft, ChevronRight, Info } from "lucide-react"

import { BoatCard } from "@/components/boats/boat-card"
import { listingBoats } from "@/data/boats"

type BdpInactiveOverlayProps = {
  boatType?: string
  title?: string
  subtitle?: string
}

export function BdpInactiveOverlay({
  boatType = "Powerboats",
  title = "This boat has been sold",
  subtitle = "But we've found similar options that might interest you",
}: BdpInactiveOverlayProps) {
  const normalizedType = boatType.toLowerCase()
  const scrollerRef = React.useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = React.useState(false)
  const [canScrollRight, setCanScrollRight] = React.useState(false)

  const display = React.useMemo(() => {
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

  const pages = React.useMemo(() => {
    const out: Array<typeof display> = []
    for (let i = 0; i < display.length; i += 4) out.push(display.slice(i, i + 4))
    return out
  }, [display])

  const viewAllHref = `/boats-for-sale?type=${encodeURIComponent(normalizedType)}`

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
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/35 backdrop-blur-[2px]" />

      <div className="relative flex h-full w-full items-end">
        <div className="w-full max-h-[calc(100vh-5rem)] overflow-hidden rounded-t-2xl border border-border/60 bg-background shadow-2xl">
          <div className="border-b border-border bg-tag-bg">
            <div className="flex items-center justify-between gap-4 px-6 py-2">
              <div className="flex items-center gap-3">
                <Info className="h-5 w-5 shrink-0 text-primary" aria-hidden />
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-semibold text-foreground">{title}</p>
                  <p className="text-[13px] leading-normal text-muted-foreground">{subtitle}</p>
                </div>
              </div>

              <Link href={viewAllHref} className="shrink-0 text-[13px] font-medium text-primary hover:text-primary/80">
                View all {boatType} →
              </Link>
            </div>
          </div>

          <div className="flex max-h-[calc(100vh-5rem-64px)] flex-col overflow-y-auto px-6 py-5">
            <div className="relative">
              {/* Mobile/tablet: free scroll cards. Desktop: paged slides of 4 cards (snap). */}
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
        </div>
      </div>
    </div>
  )
}

