"use client"

import { useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { boatCategories } from "@/data/categories-extended"

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
          <h2 id="categories-heading" className="text-2xl font-bold">
            Boats by Categories
          </h2>
          <p className="mt-2 text-muted-foreground">
            Explore boats by type and find the perfect vessel for your needs
          </p>
        </div>
        <Link href="/boats-for-sale" className="text-sm text-primary">
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
              className="group relative block min-w-[280px] flex-shrink-0 overflow-hidden rounded-lg"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60" />
                <div className="absolute inset-0 flex flex-col items-center justify-between p-6 text-center">
                  <h3 className="text-xl font-bold leading-tight text-white">
                    {category.name}
                  </h3>
                  <div className="flex w-full flex-col items-center gap-4">
                    <span className="inline-flex h-9 items-center justify-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground">
                      Discover
                    </span>
                    <p className="text-sm text-white/90">
                      {category.description}
                    </p>
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
            className="absolute left-0 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white p-2 shadow-lg transition-opacity hover:opacity-90"
            aria-label="Previous categories"
          >
            <ChevronLeft className="h-5 w-5 text-primary" />
          </button>
        )}
        {canScrollRight && (
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white p-2 shadow-lg transition-opacity hover:opacity-90"
            aria-label="Next categories"
          >
            <ChevronRight className="h-5 w-5 text-primary" />
          </button>
        )}

        {/* Pagination Dots */}
        <div className="mt-4 flex items-center justify-start gap-2">
          <div className="flex items-center gap-1.5 rounded-lg bg-white px-3 py-1.5">
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
