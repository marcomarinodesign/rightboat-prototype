import Image from "next/image"
import Link from "next/link"
import { ReactNode } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export interface ComparisonCard {
  title: string
  description: string
  features?: string[]
  cta?: { text: string; href?: string; onClick?: () => void }
  image?: { src: string; alt: string }
  /** Optional highlight (e.g. "Recommended") */
  badge?: string
}

export interface ComparisonSection3Props {
  /** Section heading */
  title: string
  /** Optional section description */
  description?: string
  /** 2 or 3 comparison cards */
  cards: ComparisonCard[]
  /** Section ID for aria-labelledby */
  headingId?: string
  /** Optional: "primary" = blue background; "muted" = full-width light grey band, 60px vertical padding */
  variant?: "default" | "primary" | "muted"
  className?: string
}

export function ComparisonSection3({
  title,
  description,
  cards,
  headingId = "comparison-heading",
  variant = "default",
  className,
}: ComparisonSection3Props) {
  const isPrimary = variant === "primary"
  const isMuted = variant === "muted"

  const content = (
    <section
      className={cn(
        "grid gap-6 px-4 sm:px-6 lg:px-8",
        isPrimary && "overflow-hidden rounded-lg bg-primary text-primary-foreground",
        !isMuted && "py-12",
        isMuted && "py-0",
        className
      )}
      aria-labelledby={headingId}
    >
      <div className="mx-auto w-full max-w-6xl space-y-6">
        <div className={cn(
          "space-y-2",
          isPrimary ? "text-primary-foreground" : "text-foreground"
        )}>
          <h2
            id={headingId}
            className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl"
          >
            {title}
          </h2>
          {description && (
            <p className={cn(
              "text-lg max-w-3xl",
              isPrimary ? "text-primary-foreground/90" : "text-muted-foreground"
            )}>
              {description}
            </p>
          )}
        </div>

        <div
          className={cn(
            "grid gap-6",
            cards.length === 2 && "md:grid-cols-2",
            cards.length === 3 && "md:grid-cols-3"
          )}
        >
          {cards.map((card, index) => (
            <Card
              key={index}
              className={cn(
                "flex flex-col overflow-hidden",
                isPrimary
                  ? "border-primary-foreground/20 bg-primary-foreground/5 text-primary-foreground"
                  : "border-border/60 bg-card"
              )}
            >
              {card.image && (
                <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-border/60 bg-muted">
                  <Image
                    src={card.image.src}
                    alt={card.image.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    unoptimized={card.image.src.startsWith("http") && !card.image.src.includes("rightboat")}
                  />
                </div>
              )}
              <CardHeader className="space-y-2">
                {card.badge && (
                  <span
                    className={cn(
                      "inline-block w-fit rounded-full px-2.5 py-0.5 text-xs font-medium",
                      isPrimary
                        ? "bg-primary-foreground/20 text-primary-foreground"
                        : "bg-primary/10 text-primary"
                    )}
                  >
                    {card.badge}
                  </span>
                )}
                <h3 className="text-xl font-semibold">{card.title}</h3>
                <p
                  className={cn(
                    "text-sm",
                    isPrimary ? "text-primary-foreground/80" : "text-muted-foreground"
                  )}
                >
                  {card.description}
                </p>
              </CardHeader>
              <CardContent className="mt-auto flex flex-col gap-4 pt-0">
                {card.features && card.features.length > 0 && (
                  <ul
                    className={cn(
                      "list-disc space-y-1.5 pl-5 text-sm",
                      isPrimary ? "text-primary-foreground/90" : "text-muted-foreground"
                    )}
                  >
                    {card.features.map((feature, i) => (
                      <li key={i}>{feature}</li>
                    ))}
                  </ul>
                )}
                {card.cta && (
                  <div className="pt-2">
                    {card.cta.onClick ? (
                      <Button
                        size="lg"
                        className={isPrimary ? "bg-background text-primary hover:bg-background/90" : undefined}
                        onClick={card.cta.onClick}
                      >
                        {card.cta.text}
                      </Button>
                    ) : card.cta.href ? (
                      <Button asChild size="lg" className={isPrimary ? "bg-background text-primary hover:bg-background/90" : undefined}>
                        <Link href={card.cta.href}>{card.cta.text}</Link>
                      </Button>
                    ) : null}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )

  if (isMuted) {
    return (
      <div className="w-full bg-muted py-[60px]">
        {content}
      </div>
    )
  }

  return content
}
