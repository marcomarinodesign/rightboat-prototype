"use client"

import { useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { boatCategories } from "@/data/categories-extended"
import { Badge } from "@/components/ui/badge"

/** Light frosted strip: only bottom ~55% (title block); top of card stays clear */
const CATEGORY_CARD_OVERLAY_BOTTOM =
  "linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.06) 28%, rgba(255,255,255,0.2) 58%, rgba(255,255,255,0.36) 100%)"

export function HomeCategories() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const scroll = (direction: "left" | "right") => {
    if (!scrollContainerRef.current) return

    const container = scrollContainerRef.current
    const cardWidth = container.querySelector("a")?.offsetWidth || 0
    const gap = 24 // gap-6 = 24px
    const scrollAmount = cardWidth + gap

    const newScrollLeft =
      direction === "left"
        ? container.scrollLeft - scrollAmount
        : container.scrollLeft + scrollAmount

    container.scrollTo({
      left: newScrollLeft,
      behavior: "smooth",
    })
  }

  const handleScroll = () => {
    if (!scrollContainerRef.current) return

    const container = scrollContainerRef.current
    const { scrollLeft, scrollWidth, clientWidth } = container

    setCanScrollLeft(scrollLeft > 0)
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)

    // Calculate current index based on scroll position
    const cardWidth = container.querySelector("a")?.offsetWidth || 0
    const gap = 24
    const newIndex = Math.round(scrollLeft / (cardWidth + gap))
    setCurrentIndex(newIndex)
  }

  const goToSlide = (index: number) => {
    if (!scrollContainerRef.current) return

    const container = scrollContainerRef.current
    const cardWidth = container.querySelector("a")?.offsetWidth || 0
    const gap = 24
    const scrollAmount = index * (cardWidth + gap)

    container.scrollTo({
      left: scrollAmount,
      behavior: "smooth",
    })
  }

  return (
    <section className="space-y-6" aria-labelledby="categories-heading">
      <div className="flex items-center justify-between">
        <div>
          <h2 id="categories-heading" className="heading-sm">
            Boats by Categories
          </h2>
          <p className="mt-2 text-muted-foreground">
            Explore boats by type and find the perfect vessel for your needs
          </p>
        </div>
        <Link href="/boats-for-sale" className="primary-text-link">
          See all
        </Link>
      </div>

      <div className="relative">
        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
        >
          {boatCategories.map((category) => (
            <Link
              key={category.id}
              href={`/boats-for-sale?type=${category.slug}`}
              className="group relative block h-[280px] w-[290px] min-w-[290px] shrink-0 overflow-hidden rounded-lg"
            >
              <Image
                src={category.image}
                alt={category.name}
                fill
                sizes="290px"
                className="rounded-lg object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div
                className="pointer-events-none absolute inset-x-0 bottom-0 h-[55%] rounded-b-lg backdrop-blur-[16px] [mask-image:linear-gradient(to_bottom,transparent_0%,black_32%,black_100%)] [-webkit-mask-image:linear-gradient(to_bottom,transparent_0%,black_32%,black_100%)]"
                style={{ backgroundImage: CATEGORY_CARD_OVERLAY_BOTTOM }}
                aria-hidden
              />
              <div className="pointer-events-none absolute inset-0 flex flex-col justify-end rounded-lg p-4">
                <div className="flex w-full flex-col gap-1">
                  <h3 className="heading-sm text-white">
                    {category.name}
                  </h3>
                  <p className="text-sm font-normal leading-5 text-white/90">
                    {category.description}
                  </p>
                  <div className="flex w-full items-center justify-between">
                    <Badge
                      variant="secondary"
                      className="pointer-events-none border-0 bg-neutral-100 px-3 py-1.5 text-xs font-normal leading-4 text-midnight"
                    >
                      {category.listingCount.toLocaleString()} boats
                    </Badge>
                    <span className="text-sm font-medium text-white">
                      Discover more
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Navigation Arrows */}
        {canScrollLeft && (
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 z-10 -translate-y-1/2 rounded-full bg-card p-2 shadow-lg transition-opacity hover:opacity-90"
            aria-label="Previous categories"
          >
            <ChevronLeft className="h-5 w-5 text-primary" />
          </button>
        )}
        {canScrollRight && (
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 z-10 -translate-y-1/2 rounded-full bg-card p-2 shadow-lg transition-opacity hover:opacity-90"
            aria-label="Next categories"
          >
            <ChevronRight className="h-5 w-5 text-primary" />
          </button>
        )}

        {/* Pagination Dots */}
        <div className="mt-4 flex items-center justify-start gap-2">
          <div className="flex items-center gap-1.5 rounded-lg bg-card px-3 py-1.5">
            {boatCategories.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-2 w-2 rounded-full transition-all ${
                  index === currentIndex
                    ? "bg-primary"
                    : "bg-muted-foreground/30"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
