import Image from "next/image"
import Link from "next/link"
import { ReactNode } from "react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

/**
 * Hero section 9 - Modern hero with gradient background, badge, heading, description, CTAs, and image.
 * Features a visually striking design with optional gradient background and centered layout.
 */
export interface HeroSection9Props {
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

export function HeroSection9({
  badge,
  heading,
  description,
  primaryButton,
  secondaryButton,
  image,
  headingId = "hero-heading",
  className,
}: HeroSection9Props) {
  return (
    <section
      className={cn(
        "relative overflow-hidden bg-gradient-to-b from-background via-background to-muted/20 px-4 py-24 sm:px-6 lg:px-8",
        className
      )}
      aria-labelledby={headingId}
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-4 top-0 h-[500px] w-[500px] rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -right-4 top-0 h-[500px] w-[500px] rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-center justify-center space-y-8 text-center">
          {badge && (
            <Badge variant="secondary" className="w-fit">
              {badge}
            </Badge>
          )}
          
          <h1
            id={headingId}
            className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
          >
            {heading}
          </h1>
          
          <p className="max-w-2xl text-lg text-muted-foreground sm:text-xl">
            {description}
          </p>

          {(primaryButton || secondaryButton) && (
            <div className="flex flex-wrap items-center justify-center gap-4">
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

          {image && (
            <div className="relative mt-12 w-full max-w-5xl overflow-hidden rounded-[12px] border border-border/60 bg-muted shadow-2xl">
              <div className="relative aspect-video w-full">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
                  priority
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
