 "use client"

import { useRef, useState, useEffect } from "react"

import Image from "next/image"
import { ImageIcon, Play, ChevronLeft, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type BdpGalleryProps = {
  images: string[]
  alt: string
  photosCount?: number
  videosCount?: number
}

export function BdpGallery({
  images,
  alt,
  photosCount = 34,
  videosCount = 2,
}: BdpGalleryProps) {
  const safeImages = images.length ? images : Array(8).fill("")
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const [isOpen, setIsOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const totalPhotos = photosCount ?? images.length ?? 0

  // Ensure we have at least 8 images for the slider
  const displayImages = safeImages.length >= 8 ? safeImages : [
    ...safeImages,
    ...Array(8 - safeImages.length).fill("")
  ]

  useEffect(() => {
    const checkScroll = () => {
      if (!scrollContainerRef.current) return
      const container = scrollContainerRef.current
      const { scrollLeft, scrollWidth, clientWidth } = container
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
    }

    checkScroll()
    const container = scrollContainerRef.current
    container?.addEventListener("scroll", checkScroll)
    window.addEventListener("resize", checkScroll)

    return () => {
      container?.removeEventListener("scroll", checkScroll)
      window.removeEventListener("resize", checkScroll)
    }
  }, [])

  const scroll = (direction: "left" | "right") => {
    if (!scrollContainerRef.current) return

    const container = scrollContainerRef.current
    const cardWidth = container.querySelector("div")?.offsetWidth || 0
    const gap = 16 // gap-4 = 16px
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
    const cardWidth = container.querySelector("div")?.offsetWidth || 0
    const gap = 16
    const newIndex = Math.round(scrollLeft / (cardWidth + gap))
    setCurrentIndex(newIndex)
  }

  const goToSlide = (index: number) => {
    if (!scrollContainerRef.current) return

    const container = scrollContainerRef.current
    const cardWidth = container.querySelector("div")?.offsetWidth || 0
    const gap = 16
    const scrollAmount = index * (cardWidth + gap)

    container.scrollTo({
      left: scrollAmount,
      behavior: "smooth",
    })
  }

  function openAt(index: number) {
    setActiveIndex(index)
    setIsOpen(true)
  }

  function close() {
    setIsOpen(false)
  }

  return (
    <section aria-label="Gallery" className="space-y-4">
      {/* Top two-column layout */}
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:items-stretch">
        {/* Left: main image (360°) */}
        <div
          className="relative overflow-hidden rounded-[12px] bg-muted lg:h-[360px] cursor-pointer"
          onClick={() => displayImages[0] && openAt(0)}
        >
          {displayImages[0] ? (
            <Image
              src={displayImages[0]}
              alt={alt}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 600px"
              priority
            />
          ) : (
            <div className="h-[260px] w-full bg-muted lg:h-full" />
          )}

          {/* 360 badge bottom-left */}
          <div className="absolute bottom-3 left-3 flex h-9 items-center gap-2 rounded-full bg-black/70 px-3 text-xs font-medium text-white">
            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-white/40 text-[10px]">
              360°
            </span>
          </div>
        </div>

        {/* Right: slider inside right column */}
        <div className="relative lg:h-[360px]">
          <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="flex h-full gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {displayImages.map((image, index) => {
              if (index === 0) {
                return null
              }

              return (
                <div
                  key={index}
                  className={cn(
                    "relative min-w-[200px] flex-shrink-0 overflow-hidden rounded-[12px] bg-muted",
                    "h-[260px] lg:h-full cursor-pointer"
                  )}
                  onClick={() => image && openAt(index)}
                >
                  {image ? (
                    <Image
                      src={image}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 240px, 240px"
                    />
                  ) : (
                    <div className="h-full w-full bg-muted" />
                  )}
                </div>
              )
            })}
          </div>

          {/* Navigation Arrows */}
          {canScrollLeft && (
            <button
              onClick={() => scroll("left")}
              className="absolute left-0 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white p-2 shadow-lg transition-opacity hover:opacity-90"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-5 w-5 text-foreground" />
            </button>
          )}
          {canScrollRight && (
            <button
              onClick={() => scroll("right")}
              className="absolute right-0 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white p-2 shadow-lg transition-opacity hover:opacity-90"
              aria-label="Next image"
            >
              <ChevronRight className="h-5 w-5 text-foreground" />
            </button>
          )}
        </div>
      </div>

      {isOpen ? (
        <div className="fixed inset-0 z-40 bg-black/85">
          <div className="mx-auto flex h-full max-w-5xl flex-col px-4 py-4">
            <button
              type="button"
              onClick={close}
              className="mb-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-sm font-semibold text-foreground shadow"
              aria-label="Close gallery"
            >
              ←
            </button>
            <div className="relative flex-1 overflow-hidden rounded-[12px] bg-muted">
              {displayImages[activeIndex] ? (
                <Image
                  src={displayImages[activeIndex]}
                  alt={alt}
                  fill
                  className="object-cover"
                  sizes="100vw"
                />
              ) : (
                <div className="h-full w-full bg-muted" />
              )}

              {/* 360 badge bottom-left */}
              <div className="absolute bottom-3 left-3 flex h-9 items-center gap-2 rounded-full bg-black/70 px-3 text-xs font-medium text-white">
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-white/40 text-[10px]">
                  360°
                </span>
              </div>

              {/* Counter bottom-right */}
              <div className="absolute bottom-3 right-3 rounded-[12px] bg-black/70 px-3 py-1 text-xs font-medium text-white">
                {activeIndex + 1} / {totalPhotos || images.length || 0}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  )
}

