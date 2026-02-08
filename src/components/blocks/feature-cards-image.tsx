import Image from "next/image"

import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ImageSlider } from "@/components/ui/image-slider"
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
            {feature.image ? (
              <ImageSlider
                images={[feature.image.src]}
                alt={feature.image.alt}
                showDots={false}
              />
            ) : (
              <div className="relative aspect-[3/2] w-full overflow-hidden bg-muted">
                <Image
                  src="https://ui.shadcn.com/placeholder.svg"
                  alt="Card image placeholder"
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
            )}
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
