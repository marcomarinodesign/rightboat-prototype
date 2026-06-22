"use client"

import Image from "next/image"
import { useRef, useEffect } from "react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

/**
 * Boat images for the hero carousel (Unsplash, demo use).
 * Replace with your own CDN or static assets in production.
 */
const BOAT_CAROUSEL_IMAGES = [
  { src: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&q=80", alt: "Yacht at sea" },
  { src: "https://images.unsplash.com/photo-1567894340315-735d7c361db0?w=600&q=80", alt: "Sailboat" },
  { src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80", alt: "Motorboat" },
  { src: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=600&q=80", alt: "Luxury yacht" },
  { src: "https://images.unsplash.com/photo-1514316454344-979c23fb994f?w=600&q=80", alt: "Boat in marina" },
  { src: "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=600&q=80", alt: "Sailing yacht" },
]

export interface HeroSection17Props {
  badge?: string
  heading: string
  headingHighlight?: string
  description: string
  ctaText: string
  onCtaClick: () => void
  /** Section ID for aria-labelledby */
  headingId?: string
  className?: string
}

export function HeroSection17({
  badge,
  heading,
  headingHighlight,
  description,
  ctaText,
  onCtaClick,
  headingId = "hero-heading",
  className,
}: HeroSection17Props) {
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    const width = el.scrollWidth / 2
    let animation: number
    const animate = () => {
      el.scrollLeft += 1
      if (el.scrollLeft >= width) el.scrollLeft = 0
      animation = requestAnimationFrame(animate)
    }
    animation = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animation)
  }, [])

  return (
    <section
      className={cn(
        "relative overflow-hidden px-4 pt-8 pb-12 sm:px-6 sm:pt-12 lg:px-8",
        "flex flex-col items-center text-center gap-6 sm:gap-8",
        className
      )}
      aria-labelledby={headingId}
    >
      {/* Stacked centered: badge → heading → description → CTA → carousel */}
      {badge && (
        <Badge variant="secondary" className="shrink-0">
          {badge}
        </Badge>
      )}
      <h1
        id={headingId}
        className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl xl:text-[3rem] max-w-3xl"
      >
        {heading}
        {headingHighlight && (
          <span className="text-primary"> {headingHighlight}</span>
        )}
      </h1>
      <p className="text-base text-muted-foreground sm:text-lg max-w-xl">
        {description}
      </p>
      <Button size="lg" onClick={onCtaClick} className="shrink-0">
        {ctaText}
      </Button>

      {/* Carousel centered below */}
      <div className="relative w-full max-w-4xl mx-auto mt-2">
        <div className="relative rounded-2xl overflow-hidden border border-border/60 bg-muted shadow-lg aspect-[4/3] sm:aspect-[16/10] max-h-[280px] sm:max-h-[340px] lg:max-h-[400px]">
          <div
            ref={scrollRef}
            className="absolute inset-0 flex w-[200%] overflow-x-auto overflow-y-hidden scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
            aria-hidden
          >
            {[...BOAT_CAROUSEL_IMAGES, ...BOAT_CAROUSEL_IMAGES].map((img, i) => (
              <div
                key={i}
                className="relative h-full min-w-[50%] flex-shrink-0"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 896px"
                  unoptimized
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
