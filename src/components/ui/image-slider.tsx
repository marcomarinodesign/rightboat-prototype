"use client"

import * as React from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { ChevronLeft, ChevronRight, Images } from "lucide-react"

import { cn } from "@/lib/utils"

/** Position indicator styles under evaluation for the SRP Gallery View A/B test. */
export type SliderIndicator = "dots" | "counter" | "progress"

type ImageSliderProps = {
  images: string[]
  alt?: string
  showDots?: boolean
  /** When true, prev/next chevrons are hidden (e.g. marketplace cards). */
  showNavArrows?: boolean
  /** Dots below the carousel (default) or overlaid at the bottom of the image. */
  dotsPlacement?: "below" | "overlay"
  /**
   * Position indicator style. Defaults to `dots` (current production behaviour).
   * `counter` renders a `2/5` pill; `progress` renders a segmented bar.
   */
  indicator?: SliderIndicator
  /**
   * Appends a terminal "View all photos" slide after the last image.
   * Clicking it opens the given href (the BDP in full-gallery mode).
   */
  viewAllHref?: string
  /** Copy for the terminal slide. Defaults to `View all {n} photos`. */
  viewAllLabel?: string
  /**
   * Total photos on the listing, which is normally larger than the handful
   * previewed in the card. The terminal frame advertises this number — "View
   * all 24 photos" is the hook; "View all 5 photos" is not. Defaults to the
   * number of images passed in.
   */
  totalPhotoCount?: number
  /** Reveal nav arrows only on hover (fine pointers). Always visible on touch. */
  arrowsOnHover?: boolean
  /** Applied to the scroll frame and slide masks; defaults to rounded corners matching other carousels. */
  imageRoundedClassName?: string
  /** Backdrop behind slides (e.g. Figma Boat Card: midnight @ 12% opacity). */
  slideBackdropClassName?: string
  /**
   * Replaces the default `aspect-[3/2]` track sizing (e.g. Popular Model card: `h-[250px] shrink-0`).
   * When set, default slide inner wrapper becomes full-height unless `slideImageWrapperClassName` is passed.
   */
  carouselFrameClassName?: string
  /** Inner wrapper around each slide image; defaults by layout (aspect vs fill-height). */
  slideImageWrapperClassName?: string
  /** Merged into prev/next control buttons (e.g. white circular arrows from Figma). */
  navButtonClassName?: string
  /** When `dotsPlacement` is `overlay`, merged into the dots container (e.g. `bottom-5`). */
  dotsOverlayClassName?: string
  className?: string
}

export function ImageSlider({
  images,
  alt = "Gallery",
  showDots = true,
  showNavArrows = true,
  dotsPlacement = "below",
  indicator = "dots",
  viewAllHref,
  viewAllLabel,
  totalPhotoCount,
  arrowsOnHover = false,
  imageRoundedClassName = "rounded-xl",
  slideBackdropClassName = "bg-muted",
  carouselFrameClassName,
  slideImageWrapperClassName,
  navButtonClassName,
  dotsOverlayClassName,
  className,
}: ImageSliderProps) {
  const router = useRouter()
  const scrollRef = React.useRef<HTMLDivElement>(null)
  const [index, setIndex] = React.useState(0)
  const [isDragging, setIsDragging] = React.useState(false)
  const dragStart = React.useRef({ x: 0, scrollLeft: 0 })

  const imageCount = images.length
  /**
   * The terminal "View all photos" frame is a slide, but never a photo.
   * It requires a real gallery: on a single-photo listing it would manufacture
   * a swipeable track and a nonsensical "1/1" counter for one image.
   */
  const hasViewAll = Boolean(viewAllHref) && imageCount > 1
  const slideCount = imageCount + (hasViewAll ? 1 : 0)
  const hasMultiple = slideCount > 1
  const isTerminal = hasViewAll && index >= imageCount
  /** Clamped so the counter never reads "5/4" while on the terminal frame. */
  const photoPosition = Math.min(index + 1, imageCount)

  const scrollTo = React.useCallback((i: number) => {
    const el = scrollRef.current
    if (!el) return
    const target = Math.max(0, Math.min(i, slideCount - 1))
    el.scrollTo({ left: el.clientWidth * target, behavior: "smooth" })
    setIndex(target)
  }, [slideCount])

  const handleScroll = React.useCallback(() => {
    const el = scrollRef.current
    if (!el || !hasMultiple) return
    const width = el.clientWidth
    const newIndex = Math.round(el.scrollLeft / width)
    setIndex(Math.max(0, Math.min(newIndex, slideCount - 1)))
  }, [slideCount, hasMultiple])

  const handlePointerDown = React.useCallback(
    (e: React.PointerEvent) => {
      if (!hasMultiple) return
      setIsDragging(true)
      dragStart.current = { x: e.clientX, scrollLeft: scrollRef.current?.scrollLeft ?? 0 }
      ;(e.target as HTMLElement).setPointerCapture?.(e.pointerId)
    },
    [hasMultiple]
  )

  const handlePointerMove = React.useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging || !scrollRef.current || !hasMultiple) return
      const dx = dragStart.current.x - e.clientX
      scrollRef.current.scrollLeft = dragStart.current.scrollLeft + dx
    },
    [isDragging, hasMultiple]
  )

  const handlePointerUp = React.useCallback(
    (e: React.PointerEvent) => {
      if (!hasMultiple) return
      ;(e.target as HTMLElement).releasePointerCapture?.(e.pointerId)
      setIsDragging(false)
      const el = scrollRef.current
      if (!el) return
      const width = el.clientWidth
      const snapIndex = Math.round(el.scrollLeft / width)
      scrollTo(snapIndex)
    },
    [hasMultiple, scrollTo]
  )

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent) => {
      if (!hasMultiple) return
      if (e.key === "ArrowLeft") {
        e.preventDefault()
        scrollTo(index - 1)
      } else if (e.key === "ArrowRight") {
        e.preventDefault()
        scrollTo(index + 1)
      }
    },
    [hasMultiple, index, scrollTo]
  )

  React.useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    el.addEventListener("scroll", handleScroll, { passive: true })
    return () => el.removeEventListener("scroll", handleScroll)
  }, [handleScroll])

  /**
   * Touch has no hover, so arrows stay visible on coarse pointers and swipe
   * remains the primary gesture there.
   */
  const hoverArrowClassName = cn(
    "[@media(pointer:fine)]:opacity-0 [@media(pointer:fine)]:group-hover/slider:opacity-100",
    "[@media(pointer:fine)]:focus-visible:opacity-100",
    "transition-opacity duration-[var(--transition-duration-fast)] motion-reduce:transition-none"
  )

  const frameSizing = carouselFrameClassName ?? "aspect-[3/2]"
  const slideInnerDefault = carouselFrameClassName
    ? "relative h-full w-full min-h-0 overflow-hidden"
    : "relative aspect-[3/2] w-full overflow-hidden"
  const slideInner = slideImageWrapperClassName ?? slideInnerDefault

  if (!images.length) {
    return (
      <div
        className={cn(
          "relative w-full overflow-hidden",
          slideBackdropClassName,
          imageRoundedClassName,
          carouselFrameClassName ?? "aspect-[3/2]",
          className
        )}
        aria-hidden
      >
        <div className="absolute inset-0 animate-pulse bg-foreground/5" />
      </div>
    )
  }

  return (
    <div
      className={cn("group/slider relative w-full", className)}
      onKeyDown={handleKeyDown}
    >
      <div
        ref={scrollRef}
        role="region"
        aria-roledescription="carousel"
        aria-label={alt}
        tabIndex={hasMultiple ? 0 : undefined}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={() => setIsDragging(false)}
        className={cn(
          "flex w-full overflow-hidden",
          imageRoundedClassName,
          frameSizing,
          "touch-pan-x flex-row",
          "snap-x snap-mandatory overflow-x-auto overscroll-x-contain",
          "scroll-smooth scrollbar-hide [-webkit-overflow-scrolling:touch]",
          "[&::-webkit-scrollbar]:hidden",
          hasMultiple && "cursor-grab active:cursor-grabbing"
        )}
      >
        {images.map((src, i) => (
          <div
            key={`${src}-${i}`}
            className="relative h-full min-w-full shrink-0 snap-start snap-always"
            role="group"
            aria-roledescription="slide"
            aria-label={`${alt} image ${i + 1} of ${imageCount}`}
          >
            <div
              className={cn(
                slideInner,
                slideBackdropClassName,
                imageRoundedClassName
              )}
            >
              <Image
                src={src}
                alt={imageCount > 1 ? `${alt} (${i + 1}/${imageCount})` : alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover"
                loading="lazy"
                placeholder="blur"
                blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iOSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSIwIDAgMTYgOSI+PHJlY3Qgd2lkdGg9IjE2IiBoZWlnaHQ9IjkiIGZpbGw9IiNmM2Y0ZjYiLz48L3N2Zz4="
              />
            </div>
          </div>
        ))}

        {hasViewAll && (
          <div
            className="relative h-full min-w-full shrink-0 snap-start snap-always"
            role="group"
            aria-roledescription="slide"
            aria-label="View all photos"
          >
            {/*
              A button rather than a link: the slider is routinely rendered
              inside a card-wide <Link>, and a nested anchor is invalid HTML
              that breaks hydration.
            */}
            <button
              type="button"
              className={cn(
                slideInner,
                imageRoundedClassName,
                "flex flex-col items-center justify-center gap-2 bg-midnight text-white"
              )}
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                router.push(viewAllHref!)
              }}
            >
              <Images className="size-6 shrink-0" aria-hidden strokeWidth={1.75} />
              <span className="px-4 text-center text-sm font-medium leading-5">
                {viewAllLabel ?? `View all ${totalPhotoCount ?? imageCount} photos`}
              </span>
            </button>
          </div>
        )}
      </div>

      {hasMultiple && showNavArrows && (
        <>
          <button
            type="button"
            aria-label="Previous image"
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              scrollTo(index - 1)
            }}
            className={cn(
              "absolute left-2 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-black/55 text-white shadow-sm",
              arrowsOnHover && hoverArrowClassName,
              navButtonClassName
            )}
          >
            <ChevronLeft className="size-3 shrink-0" aria-hidden strokeWidth={2.25} />
          </button>
          <button
            type="button"
            aria-label="Next image"
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              scrollTo(index + 1)
            }}
            className={cn(
              "absolute right-2 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-black/55 text-white shadow-sm",
              arrowsOnHover && hoverArrowClassName,
              navButtonClassName
            )}
          >
            <ChevronRight className="size-3 shrink-0" aria-hidden strokeWidth={2.25} />
          </button>
        </>
      )}
      {/*
        Dots and progress segments are white with no background of their own, so
        they vanish over a bright photo. The counter carries its own pill and
        does not need this.
      */}
      {showDots &&
        hasMultiple &&
        indicator !== "counter" &&
        dotsPlacement === "overlay" && (
          <div
            aria-hidden
            className={cn(
              "pointer-events-none absolute inset-x-0 bottom-0 z-[5] h-16",
              "bg-gradient-to-t from-black/45 to-transparent",
              imageRoundedClassName
            )}
          />
        )}

      {showDots && hasMultiple && indicator === "dots" && (
        <div
          className={cn(
            "flex justify-center gap-1.5",
            dotsPlacement === "below" && "mt-2",
            dotsPlacement === "overlay" &&
              cn(
                "pointer-events-auto absolute bottom-3 left-1/2 z-20 -translate-x-1/2",
                dotsOverlayClassName
              )
          )}
          role="tablist"
          aria-label="Slide indicator"
        >
          {Array.from({ length: slideCount }, (_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={index === i}
              aria-label={
                hasViewAll && i === imageCount
                  ? "Go to all photos"
                  : `Go to image ${i + 1}`
              }
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                scrollTo(i)
              }}
              className={cn(
                "size-2 shrink-0 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                dotsPlacement === "overlay"
                  ? index === i
                    ? "bg-white"
                    : "bg-white/45 hover:bg-white/70"
                  : index === i
                    ? "bg-foreground"
                    : "bg-muted-foreground/40 hover:bg-muted-foreground/60"
              )}
            />
          ))}
        </div>
      )}

      {showDots && hasMultiple && indicator === "counter" && (
        <div
          className={cn(
            "pointer-events-none absolute bottom-3 right-3 z-20 rounded-full bg-black/60 px-2 py-0.5",
            "text-xs font-medium leading-4 tabular-nums text-white",
            dotsOverlayClassName
          )}
          aria-live="polite"
        >
          {isTerminal ? "All photos" : `${photoPosition}/${imageCount}`}
        </div>
      )}

      {showDots && hasMultiple && indicator === "progress" && (
        <div
          className={cn(
            "pointer-events-none absolute bottom-3 left-1/2 z-20 flex w-[60%] -translate-x-1/2 gap-1",
            dotsOverlayClassName
          )}
          role="progressbar"
          aria-valuemin={1}
          aria-valuemax={slideCount}
          aria-valuenow={index + 1}
          aria-label="Slide indicator"
        >
          {Array.from({ length: slideCount }, (_, i) => (
            <span
              key={i}
              className={cn(
                "h-0.5 flex-1 rounded-full transition-colors duration-[var(--transition-duration-fast)] motion-reduce:transition-none",
                i <= index ? "bg-white" : "bg-white/35"
              )}
            />
          ))}
        </div>
      )}
    </div>
  )
}
