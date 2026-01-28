"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export interface FeatureSet {
  label: string
  title: string
  description: string
  icon?: React.ReactNode
  link?: { text: string; href?: string; onClick?: () => void }
  /** Optional image per tab (overrides section image when set) */
  image?: { src: string; alt: string }
}

export interface FeatureSection16Props {
  title: string
  description: string
  featureSets: FeatureSet[]
  image?: { src: string; alt: string }
  headingId?: string
  sectionId?: string
  className?: string
}

export function FeatureSection16({
  title,
  description,
  featureSets,
  image,
  headingId,
  sectionId,
  className,
}: FeatureSection16Props) {
  const [activeIndex, setActiveIndex] = useState(0)
  const activeFeature = featureSets[activeIndex]
  const activeImage = activeFeature.image ?? image

  const imageContent = activeImage ? (
    <Image
      src={activeImage.src}
      alt={activeImage.alt}
      width={1200}
      height={600}
      className="max-h-[560px] w-full rounded-lg object-cover"
    />
  ) : (
    <div
      className="flex h-full w-full items-center justify-center bg-muted text-sm text-muted-foreground rounded-lg"
      aria-hidden
    >
      Image placeholder
    </div>
  )

  return (
    <section
      id={sectionId}
      className={cn("space-y-12", className)}
      aria-labelledby={headingId}
    >
      {/* Title and description centered */}
      <div className="mx-auto max-w-2xl space-y-4 text-center">
        <h2
          id={headingId}
          className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl"
        >
          {title}
        </h2>
        <p className="text-lg text-muted-foreground">{description}</p>
      </div>

      {/* Tab buttons centered */}
      <div className="flex justify-center flex-wrap gap-2">
        {featureSets.map((featureSet, index) => (
          <Button
            key={index}
            type="button"
            variant={activeIndex === index ? "default" : "outline"}
            onClick={() => setActiveIndex(index)}
            size="sm"
            className="whitespace-nowrap"
          >
            {featureSet.label}
          </Button>
        ))}
      </div>

      {/* Active feature content */}
      <div className="flex flex-col items-stretch gap-6 lg:flex-row">
        {/* Left column: card with icon, title, description, and button */}
        <div className="bg-muted/80 dark:bg-card/80 flex flex-1 flex-col gap-4 rounded-lg p-6 lg:max-w-lg lg:justify-between lg:gap-8 lg:p-8 border border-border/50">
          <div className="flex flex-col items-start gap-6">
            {/* Icon container */}
            {activeFeature.icon}
            <h3 className="text-foreground text-4xl font-bold mb-[200px]">
              {activeFeature.title}
            </h3>
          </div>
          <div className="flex flex-col gap-6">
            <p className="text-muted-foreground text-base leading-[1.75] text-pretty">
              {activeFeature.description}
            </p>
            {activeFeature.link && (
              <div className="flex flex-col gap-3 sm:flex-row">
                {activeFeature.link.onClick ? (
                  <Button variant="default" size="sm" onClick={activeFeature.link.onClick}>
                    {activeFeature.link.text}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                ) : (
                  activeFeature.link.href && (
                    <Button asChild variant="default" size="sm">
                      <Link href={activeFeature.link.href}>
                        {activeFeature.link.text}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  )
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right column: image */}
        <div className="w-full flex-1">
          {imageContent}
        </div>
      </div>
    </section>
  )
}
