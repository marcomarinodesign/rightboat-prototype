"use client"

import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { SUGGESTED_SEARCH_CHIPS } from "@/lib/conversational-search/examples"

function chunk<T>(items: readonly T[], size: number): T[][] {
  const pages: T[][] = []
  for (let i = 0; i < items.length; i += size) {
    pages.push(items.slice(i, i + size) as T[])
  }
  return pages
}

type SuggestedSearchCarouselProps = {
  onSelect: (query: string) => void
}

export function SuggestedSearchCarousel({
  onSelect,
}: SuggestedSearchCarouselProps) {
  const pages = chunk(SUGGESTED_SEARCH_CHIPS, 2)

  return (
    <Carousel
      opts={{ align: "start" }}
      className="relative w-full md:px-12"
      aria-label="Suggested searches"
    >
      <CarouselContent>
        {pages.map((page, pageIndex) => (
          <CarouselItem key={pageIndex}>
            <div className="grid grid-cols-2 gap-2">
              {page.map((example) => (
                <button
                  key={example.query}
                  type="button"
                  onClick={() => onSelect(example.query)}
                  className="h-full rounded-lg border border-border bg-background px-3 py-2.5 text-left text-sm leading-5 text-foreground transition-colors duration-[var(--transition-duration-normal)] hover:border-primary hover:bg-tag-bg sm:px-3.5"
                >
                  {example.label}
                </button>
              ))}
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="hidden md:flex" />
      <CarouselNext className="hidden md:flex" />
      <CarouselDots />
    </Carousel>
  )
}
