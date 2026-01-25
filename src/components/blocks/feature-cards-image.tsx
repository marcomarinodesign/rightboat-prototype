import Image from "next/image"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export interface FeatureCardImage {
  title: string
  description: string
  image?: { src: string; alt: string }
}

export interface FeatureCardsImageProps {
  title: string
  description: string
  features: FeatureCardImage[]
  headingId?: string
  className?: string
}

export function FeatureCardsImage({
  title,
  description,
  features,
  headingId,
  className,
}: FeatureCardsImageProps) {
  return (
    <section
      className={cn("space-y-12", className)}
      aria-labelledby={headingId}
    >
      <div className="mx-auto max-w-2xl space-y-3 text-center">
        <h2
          id={headingId}
          className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl"
        >
          {title}
        </h2>
        <p className="text-lg text-muted-foreground">{description}</p>
      </div>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, index) => (
          <Card key={index} className="border-border/60 overflow-hidden">
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
              {feature.image ? (
                <Image
                  src={feature.image.src}
                  alt={feature.image.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              ) : (
                <div
                  className="flex h-full w-full items-center justify-center text-sm text-muted-foreground"
                  aria-hidden
                >
                  Image placeholder
                </div>
              )}
            </div>
            <CardHeader>
              <CardTitle className="text-lg">{feature.title}</CardTitle>
              <CardDescription>{feature.description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </section>
  )
}
