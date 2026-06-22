import Image from "next/image"
import Link from "next/link"
import { ReactNode } from "react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

/**
 * CTA Section 5 - Call-to-action section with blue primary background and white text.
 * Two-column layout with content on the left and image on the right.
 */
export interface CtaSection5Props {
  title: string | ReactNode
  description: string
  primaryButton?: { text: string; href?: string; onClick?: () => void }
  secondaryButton?: { text: string; href?: string; onClick?: () => void }
  image?: { src: string; alt: string }
  /** Section ID for aria-labelledby */
  headingId?: string
  className?: string
}

export function CtaSection5({
  title,
  description,
  primaryButton,
  secondaryButton,
  image,
  headingId = "cta-heading",
  className,
}: CtaSection5Props) {
  return (
    <section
      className={cn(
        "grid gap-6 overflow-hidden rounded-lg bg-primary px-3 py-12 text-primary-foreground md:grid-cols-2 md:items-center sm:px-6 lg:px-6",
        className
      )}
      aria-labelledby={headingId}
    >
      <div className="relative flex flex-col gap-6">
        <h2
          id={headingId}
          className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl"
        >
          {title}
        </h2>
        <p className="text-lg text-primary-foreground/90">
          {description}
        </p>
        {(primaryButton || secondaryButton) && (
          <div className="flex flex-wrap gap-4">
            {primaryButton && (
              primaryButton.onClick ? (
                <Button
                  size="lg"
                  className="bg-background text-primary hover:bg-background/90"
                  onClick={primaryButton.onClick}
                >
                  {primaryButton.text}
                </Button>
              ) : (
                primaryButton.href && (
                  <Button asChild size="lg" className="bg-background text-primary hover:bg-background/90">
                    <Link href={primaryButton.href}>{primaryButton.text}</Link>
                  </Button>
                )
              )
            )}
            {secondaryButton && (
              secondaryButton.onClick ? (
                <Button
                  variant="outline"
                  size="lg"
                  className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:border-primary-foreground/50"
                  onClick={secondaryButton.onClick}
                >
                  {secondaryButton.text}
                </Button>
              ) : (
                secondaryButton.href && (
                  <Button asChild variant="outline" size="lg" className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:border-primary-foreground/50">
                    <Link href={secondaryButton.href}>{secondaryButton.text}</Link>
                  </Button>
                )
              )
            )}
          </div>
        )}
      </div>
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg border border-primary-foreground/20 bg-primary/50 md:aspect-square lg:aspect-[4/3]">
        {image ? (
          <Image
            src={image.src}
            alt={image.alt}
            fill
            className="object-cover rounded-lg"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        ) : (
          <Image
            src="https://ui.shadcn.com/placeholder.svg"
            alt="CTA section visual"
            fill
            className="object-cover rounded-lg"
            unoptimized
          />
        )}
      </div>
    </section>
  )
}
