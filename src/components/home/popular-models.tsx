"use client"

import Image from "next/image"
import Link from "next/link"

import {
  listingsHref,
  useHomeSurface,
} from "@/components/home/home-surface-context"
import { Button } from "@/components/ui/button"
import { popularModels } from "@/data/models"
import { CarouselRail } from "@/components/patterns/carousel-rail"

export function PopularModels() {
  const surface = useHomeSurface()
  return (
    <section className="space-y-6" aria-labelledby="models-heading">
      <div>
        <h2 id="models-heading" className="heading-sm">
          Popular Boat Models
        </h2>
        <p className="mt-2 text-muted-foreground">
          Search some of the most in-demand boat models currently listed on
          Rightboat. Compare pricing, specifications and availability across
          listings.
        </p>
      </div>
      <CarouselRail
        label="Popular boat models"
        itemClassName="basis-[308px] md:basis-[calc((100%-40px)/3)] lg:basis-[calc((100%-60px)/4)]"
      >
        {popularModels.slice(0, 4).map((model) => {
          const webHref = `/boats-for-sale/${model.brandSlug}/${model.slug}`
          const href = listingsHref(webHref, surface)
          return (
            <div
              key={model.id}
              className="overflow-hidden rounded-2xl border border-[rgb(242,242,242)] bg-white"
            >
              <div className="relative mx-3 mt-3 h-[180px] overflow-hidden rounded-[8px]">
                <Image
                  src={model.images[0]}
                  alt={`${model.brand} ${model.name}`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col items-center gap-2 px-3 pb-3 pt-2">
                <p className="text-base font-bold leading-6 text-foreground">
                  {model.brand} {model.name}
                </p>
                <Button
                  asChild
                  variant="outline"
                  className="h-11 w-[168px] rounded-[8px] border-primary text-[14px] font-medium text-primary hover:bg-primary/5"
                >
                  <Link href={href}>Discover model</Link>
                </Button>
              </div>
            </div>
          )
        })}
      </CarouselRail>
    </section>
  )
}
