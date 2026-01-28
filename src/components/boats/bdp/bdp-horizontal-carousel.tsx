"use client"

import { useId, useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type BdpHorizontalCarouselProps = {
  title: string
  children: React.ReactNode
  className?: string
}

export function BdpHorizontalCarousel({
  title,
  children,
  className,
}: BdpHorizontalCarouselProps) {
  const id = useId()
  const scrollerRef = useRef<HTMLDivElement | null>(null)

  const scrollByCards = (direction: -1 | 1) => {
    const el = scrollerRef.current
    if (!el) return
    const amount = Math.round(el.clientWidth * 0.8)
    el.scrollBy({ left: direction * amount, behavior: "smooth" })
  }

  return (
    <section className={cn("space-y-3", className)} aria-labelledby={id}>
      <h2 id={id} className="text-lg font-bold leading-6">
        {title}
      </h2>

      <div className="flex items-center gap-4">
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="h-8 w-8 rounded-full"
          aria-label={`Scroll ${title} left`}
          onClick={() => scrollByCards(-1)}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <div
          ref={scrollerRef}
          className={cn(
            "flex flex-1 gap-5 overflow-x-auto scroll-smooth",
            "scrollbar-hide"
          )}
        >
          {children}
        </div>

        <Button
          type="button"
          variant="outline"
          size="icon"
          className="h-8 w-8 rounded-full"
          aria-label={`Scroll ${title} right`}
          onClick={() => scrollByCards(1)}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </section>
  )
}

