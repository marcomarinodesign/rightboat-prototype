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

const arrowClassName =
  "hidden size-8 rounded-full border-border bg-background shadow-sm md:flex"

type SuggestedSearchCarouselProps = {
  onSelect: (query: string) => void
}

export function SuggestedSearchCarousel({
  onSelect,
}: SuggestedSearchCarouselProps) {
  return (
    <Carousel
      opts={{ align: "start" }}
      className="w-full"
      aria-label="Suggested searches"
    >
      <div className="relative md:px-12">
        <CarouselContent className="-ml-4">
          {SUGGESTED_SEARCH_CHIPS.map((example) => (
            <CarouselItem
              key={example.query}
              className="basis-full pl-4 md:basis-1/2"
            >
              <button
                type="button"
                title={example.label}
                onClick={() => onSelect(example.query)}
                className="flex h-11 w-full items-center overflow-hidden rounded-lg border border-input bg-background px-4 text-left text-sm leading-5 text-foreground transition-colors duration-[var(--transition-duration-normal)] hover:border-primary hover:bg-tag-bg"
              >
                <span className="min-w-0 truncate">{example.label}</span>
              </button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className={cn("left-0", arrowClassName)} />
        <CarouselNext className={cn("right-0", arrowClassName)} />
      </div>
      <CarouselDots className="mt-4" />
    </Carousel>
  )
}
