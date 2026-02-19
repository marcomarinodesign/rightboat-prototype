import Image from "next/image"
import Link from "next/link"
import { ReactNode } from "react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { RBImage } from "@/components/ui/RBImage"
import { cn } from "@/lib/utils"

/**
 * Hero section 10 - Centered hero with badge, heading, description, CTAs, and image.
 * Modern centered layout with optional badge, multiple CTAs, and image.
 */
export interface HeroSection10Props {
  badge?: string
  heading: string | ReactNode
  description: string
  primaryButton?: { text: string; href?: string; onClick?: () => void }
  secondaryButton?: { text: string; href?: string; onClick?: () => void }
  image?: { src: string; alt: string }
  video?: { src: string; poster?: string; ariaLabel?: string }
  /** Section ID for aria-labelledby */
  headingId?: string
  className?: string
}

export function HeroSection10({
  badge,
  heading,
  description,
  primaryButton,
  secondaryButton,
  image,
  video,
  headingId = "hero-heading",
  className,
}: HeroSection10Props) {
  return (
    <section
      className={cn(
        "flex flex-col items-center justify-center space-y-6 px-4 pt-12 pb-0 text-center sm:px-6 lg:px-8",
        className
      )}
      aria-labelledby={headingId}
    >
      {badge && (
        <Badge variant="secondary" className="w-fit">
          {badge}
        </Badge>
      )}
      <h1
        id={headingId}
        className="text-[48px] font-bold leading-tight tracking-tight"
      >
        {heading}
      </h1>
      <p className="max-w-2xl text-lg text-muted-foreground sm:text-xl">
        {description}
      </p>
      {(primaryButton || secondaryButton) && (
        <div className="mb-0 flex flex-wrap items-center justify-center gap-4">
          {primaryButton && (
            primaryButton.onClick ? (
              <Button size="lg" onClick={primaryButton.onClick}>
                {primaryButton.text}
              </Button>
            ) : (
              primaryButton.href && (
                <Button asChild size="lg">
                  <Link href={primaryButton.href}>{primaryButton.text}</Link>
                </Button>
              )
            )
          )}
          {secondaryButton && (
            secondaryButton.onClick ? (
              <Button variant="outline" size="lg" onClick={secondaryButton.onClick}>
                {secondaryButton.text}
              </Button>
            ) : (
              secondaryButton.href && (
                <Button asChild variant="outline" size="lg">
                  <Link href={secondaryButton.href}>{secondaryButton.text}</Link>
                </Button>
              )
            )
          )}
        </div>
      )}
      <div className="relative mt-6 w-full max-w-4xl overflow-hidden rounded-lg border border-border/60 bg-muted">
        {video ? (
          <div className="relative aspect-video w-full">
            <video
              className="h-full w-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              controls={false}
              poster={video.poster}
              aria-label={video.ariaLabel ?? "Hero video"}
            >
              <source src={video.src} />
            </video>
          </div>
        ) : image ? (
          <RBImage
            src={image.src}
            alt={image.alt}
            variant="hero"
            priority
          />
        ) : (
          <Image
            src="https://ui.shadcn.com/placeholder.svg"
            alt="Hero section visual"
            width={1600}
            height={900}
            className="w-full h-auto object-cover"
            unoptimized
            priority
          />
        )}
      </div>
    </section>
  )
}
