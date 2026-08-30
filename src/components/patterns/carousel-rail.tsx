"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { cn } from "@/lib/utils"

type CarouselRailProps = {
  children: React.ReactNode
  /** Accessible name for the scrollable region. */
  label: string
  /** Tailwind basis classes controlling how many items are visible per breakpoint. */
  itemClassName?: string
  className?: string
}

/**
 * Figma "Gallery / Nav Arrow" rail used by the homepage carousels
 * (Categories, Popular Models, Premium Brands, Articles).
 * Arrows are 32px Neutral/300 circles sitting outside the track, 20px gutter.
 */
export function CarouselRail({
  children,
  label,
  itemClassName = "basis-[calc((100%-60px)/4)]",
  className,
}: CarouselRailProps) {
  const trackRef = React.useRef<HTMLDivElement>(null)

  const scrollBy = (direction: -1 | 1) => {
    const track = trackRef.current
    if (!track) return
    const first = track.firstElementChild as HTMLElement | null
    const step = first ? first.offsetWidth + 20 : track.clientWidth * 0.8
    track.scrollBy({ left: step * direction, behavior: "smooth" })
  }

  return (
    <div className={cn("flex items-center gap-5", className)}>
      <NavArrow direction="left" onClick={() => scrollBy(-1)} />
      <div
        ref={trackRef}
        role="group"
        aria-label={label}
        className="scrollbar-hide flex min-w-0 flex-1 snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth"
      >
        {React.Children.map(children, (child) => (
          <div className={cn("min-w-0 shrink-0 snap-start", itemClassName)}>
            {child}
          </div>
        ))}
      </div>
      <NavArrow direction="right" onClick={() => scrollBy(1)} />
    </div>
  )
}

function NavArrow({
  direction,
  onClick,
}: {
  direction: "left" | "right"
  onClick: () => void
}) {
  const Icon = direction === "left" ? ChevronLeft : ChevronRight
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={direction === "left" ? "Previous" : "Next"}
      className="hidden size-8 shrink-0 items-center justify-center rounded-full bg-neutral-300 text-midnight transition-colors hover:bg-neutral-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 md:inline-flex"
    >
      <Icon className="size-3" aria-hidden />
    </button>
  )
}
