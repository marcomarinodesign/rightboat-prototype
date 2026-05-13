"use client"

import Link from "next/link"

import {
  listingsHref,
  useHomeSurface,
} from "@/components/home/home-surface-context"
import { ImageSlider } from "@/components/ui/image-slider"
import { Button } from "@/components/ui/button"
import { InteractiveCard } from "@/components/patterns/interactive-card"
import { popularModels } from "@/data/models"

export function PopularModels() {
  const surface = useHomeSurface()
  return (
    <section className="space-y-6" aria-labelledby="models-heading">
      <div>
        <h2 id="models-heading" className="heading-sm">
          Popular Models
        </h2>
        <p className="mt-2 text-muted-foreground">
          Discover the most searched and trending boat models
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {popularModels.map((model) => {
          const webHref = `/boats-for-sale/${model.brandSlug}/${model.slug}`
          const href = listingsHref(webHref, surface)
          return (
            <InteractiveCard
              key={model.id}
              className="group flex flex-col gap-1 overflow-hidden"
              lift
            >
              <div className="relative block">
                <ImageSlider
                  images={model.images}
                  alt={`${model.brand} ${model.name}`}
                  showDots
                  showNavArrows
                  dotsPlacement="overlay"
                  dotsOverlayClassName="bottom-[10px]"
                  imageRoundedClassName="rounded-t-lg"
                  slideBackdropClassName="bg-neutral-300"
                  carouselFrameClassName="h-[250px] shrink-0"
                  navButtonClassName="size-6 bg-background text-foreground shadow-sm"
                />
              </div>
              <div className="flex flex-col gap-1 px-4 pb-2 pt-4 text-card-foreground">
                <p className="text-xs font-normal uppercase leading-4 tracking-wide">
                  {model.brand}
                </p>
                <Link
                  href={href}
                  className="text-base font-bold leading-6 transition-colors group-hover:text-primary"
                >
                  {model.name}
                </Link>
                <p className="text-sm font-normal leading-5">
                  Length: {model.length} — Type: {model.type}
                </p>
              </div>
              <div className="h-px w-full shrink-0 bg-border" aria-hidden />
              <div className="flex items-center justify-between px-4 pb-4 pt-3">
                <span className="text-base font-bold leading-6 text-primary">
                  {model.priceRange}
                </span>
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="h-10 px-4 text-[13px] font-medium"
                >
                  <Link href={href}>View Model</Link>
                </Button>
              </div>
            </InteractiveCard>
          )
        })}
      </div>
    </section>
  )
}
