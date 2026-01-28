import Image from "next/image"
import Link from "next/link"
import { ReactNode } from "react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

/**
 * Hero section with image on the right (hero-section-1 layout).
 * Optional badge, heading, description, two CTAs, and image.
 */
export interface HeroSection1Props {
  badge?: string
  heading: string | ReactNode
  description: string
  primaryButton?: { text: string; href?: string; onClick?: () => void }
  secondaryButton?: { text: string; href?: string; onClick?: () => void }
  image?: { src: string; alt: string }
  /** Section ID for aria-labelledby */
  headingId?: string
  className?: string
}

export function HeroSection1({
  badge,
  heading,
  description,
  primaryButton,
  secondaryButton,
  image,
  headingId = "hero-heading",
  className,
}: HeroSection1Props) {
  return (
    <section
      className={cn("grid gap-8 md:grid-cols-2 md:items-center", className)}
      aria-labelledby={headingId}
    >
      <div className="flex flex-col gap-6">
        {badge && (
          <Badge variant="secondary" className="w-fit">
            {badge}
          </Badge>
        )}
        <h1
          id={headingId}
          className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl md:text-5xl"
        >
          {heading}
        </h1>
        <p className="text-lg text-muted-foreground">{description}</p>
        <div className="flex flex-wrap gap-4">
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
      </div>
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[12px] border border-border/60 bg-muted md:aspect-square lg:aspect-[4/3]">
        {image ? (
          <Image
            src={image.src}
            alt={image.alt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        ) : (
          <Image
            src="https://ui.shadcn.com/placeholder.svg"
            alt="Hero section visual"
            fill
            className="object-cover"
            unoptimized
            priority
          />
        )}
      </div>
    </section>
  )
}
