"use client"

import Image from "next/image"
import Link from "next/link"

import {
  listingsHref,
  useHomeSurface,
} from "@/components/home/home-surface-context"
import { Button } from "@/components/ui/button"
import { popularModels } from "@/data/models"

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
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {popularModels.slice(0, 4).map((model) => {
          const webHref = `/boats-for-sale/${model.brandSlug}/${model.slug}`
          const href = listingsHref(webHref, surface)
          return (
            <div
              key={model.id}
              className="overflow-hidden rounded-2xl border border-border/60 bg-card"
            >
              <div className="relative h-[200px] w-full overflow-hidden">
                <Image
                  src={model.images[0]}
                  alt={`${model.brand} ${model.name}`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col gap-3 p-4">
                <p className="text-sm font-semibold text-foreground">
                  {model.brand} {model.name}
                </p>
                <Button asChild variant="outline" size="sm" className="w-full">
                  <Link href={href}>Discover model</Link>
                </Button>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
