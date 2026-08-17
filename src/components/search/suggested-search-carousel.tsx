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
import { cn } from "@/lib/utils"

function chunk<T>(items: readonly T[], size: number): T[][] {
  const pages: T[][] = []
  for (let i = 0; i < items.length; i += size) {
    pages.push(items.slice(i, i + size) as T[])
  }
  return pages
}

const arrowClassName =
  "h-8 w-8 rounded-full border-border bg-background shadow-sm"

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
      className="w-full"
      aria-label="Suggested searches"
    >
      <div className="relative px-10 sm:px-12">
        <CarouselContent className="-ml-3">
          {pages.map((page, pageIndex) => (
            <CarouselItem key={pageIndex} className="pl-3">
              <div className="grid grid-cols-2 items-stretch gap-3">
                {page.map((example) => (
                  <button
                    key={example.query}
                    type="button"
                    onClick={() => onSelect(example.query)}
                    className="h-full min-h-[4.75rem] rounded-lg border border-border bg-background px-3.5 py-3 text-left text-sm leading-5 text-foreground transition-colors duration-[var(--transition-duration-normal)] hover:border-primary hover:bg-tag-bg"
                  >
                    {example.label}
                  </button>
                ))}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious
          className={cn("left-0", arrowClassName)}
        />
        <CarouselNext className={cn("right-0", arrowClassName)} />
      </div>
      <CarouselDots className="mt-3" />
    </Carousel>
  )
}
