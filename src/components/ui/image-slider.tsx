"use client"

import * as React from "react"
import Image from "next/image"

import { cn } from "@/lib/utils"

type ImageSliderProps = {
  images: string[]
  alt?: string
  showDots?: boolean
  className?: string
}

export function ImageSlider({
  images,
  alt = "Gallery",
  showDots = true,
  className,
}: ImageSliderProps) {
  const scrollRef = React.useRef<HTMLDivElement>(null)
  const [index, setIndex] = React.useState(0)
  const [isDragging, setIsDragging] = React.useState(false)
  const dragStart = React.useRef({ x: 0, scrollLeft: 0 })

  const count = images.length
  const hasMultiple = count > 1

  const scrollTo = React.useCallback((i: number) => {
    const el = scrollRef.current
    if (!el) return
    const target = Math.max(0, Math.min(i, count - 1))
    el.scrollTo({ left: el.clientWidth * target, behavior: "smooth" })
    setIndex(target)
  }, [count])

  const handleScroll = React.useCallback(() => {
    const el = scrollRef.current
    if (!el || !hasMultiple) return
    const width = el.clientWidth
    const newIndex = Math.round(el.scrollLeft / width)
    setIndex(Math.max(0, Math.min(newIndex, count - 1)))
  }, [count, hasMultiple])

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

  if (!images.length) {
    return (
      <div
        className={cn(
          "relative w-full overflow-hidden rounded-xl bg-muted",
          "aspect-[3/2]",
          className
        )}
        aria-hidden
      >
        <div className="absolute inset-0 animate-pulse bg-muted-foreground/10" />
      </div>
    )
  }

  return (
    <div
      className={cn("w-full", className)}
      onKeyDown={handleKeyDown}
    >
      <div
        ref={scrollRef}
        role="region"
        aria-roledescription="carousel"
        aria-label={alt}
        tabIndex={hasMultiple ? 0 : undefined}
        className={cn(
          "relative flex w-full overflow-hidden rounded-xl",
          "aspect-[3/2] touch-pan-x flex-row",
          "snap-x snap-mandatory overflow-x-auto overscroll-x-contain",
          "scroll-smooth scrollbar-hide [-webkit-overflow-scrolling:touch]",
          "[&::-webkit-scrollbar]:hidden",
          hasMultiple && "cursor-grab active:cursor-grabbing"
        )}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={() => setIsDragging(false)}
      >
        {images.map((src, i) => (
          <div
            key={`${src}-${i}`}
            className="relative h-full min-w-full shrink-0 snap-start snap-always"
            role="group"
            aria-roledescription="slide"
            aria-label={`${alt} image ${i + 1} of ${count}`}
          >
            <div className="relative aspect-[3/2] w-full overflow-hidden rounded-xl bg-muted">
              <Image
                src={src}
                alt={count > 1 ? `${alt} (${i + 1}/${count})` : alt}
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
      </div>
      {showDots && hasMultiple && count > 1 && (
        <div
          className="mt-2 flex justify-center gap-1.5"
          role="tablist"
          aria-label="Slide indicator"
        >
          {images.map((_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={index === i}
              aria-label={`Go to image ${i + 1}`}
              onClick={() => scrollTo(i)}
              className={cn(
                "h-1.5 w-1.5 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                index === i ? "bg-foreground" : "bg-muted-foreground/40 hover:bg-muted-foreground/60"
              )}
            />
          ))}
        </div>
      )}
    </div>
  )
}
