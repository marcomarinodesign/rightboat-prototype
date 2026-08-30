"use client"

import Image from "next/image"
import Link from "next/link"

import {
  listingsHref,
  useHomeSurface,
} from "@/components/home/home-surface-context"
import { boatCategories } from "@/data/categories-extended"
import { Button } from "@/components/ui/button"
import { CarouselRail } from "@/components/patterns/carousel-rail"

export function HomeCategories() {
  const surface = useHomeSurface()

  return (
    <section className="space-y-6" aria-labelledby="categories-heading">
      <div>
        <h2 id="categories-heading" className="heading-sm">
          Browse Boats for Sale by Category
        </h2>
        <p className="mt-2 text-muted-foreground">
          Explore thousands of boats for sale across the most popular categories.
          Whether you&apos;re looking for a luxury motor yacht, a cruising
          sailboat, a fishing boat or a versatile day boat, compare listings from
          sellers worldwide and find the right boat for your lifestyle.
        </p>
      </div>

      <CarouselRail
        label="Boat categories"
        itemClassName="basis-[308px] md:basis-[calc((100%-40px)/3)] lg:basis-[calc((100%-60px)/4)]"
      >
        {boatCategories.map((category) => (
          <Link
            key={category.id}
            href={listingsHref(
              `/boats-for-sale?type=${category.slug}`,
              surface
            )}
            className="group relative block h-[380px] w-full overflow-hidden rounded-[16px]"
          >
            <Image
              src={category.image}
              alt={category.name}
              fill
              sizes="(max-width: 1024px) 50vw, 25vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {/* Gradient overlay — bottom 280px, GRADIENT_LINEAR opacity 0.75 */}
            <div
              className="pointer-events-none absolute inset-x-0 bottom-0 h-[280px]"
              style={{
                background:
                  "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.75) 100%)",
              }}
              aria-hidden
            />
            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-end gap-2 p-4 text-center">
              <span className="inline-flex w-fit items-center rounded-full bg-malibu-200 px-3 py-1.5 text-xs font-normal leading-4 text-midnight">
                {category.listingCount.toLocaleString()} boats
              </span>
              <h3 className="text-2xl font-bold leading-8 tracking-[-0.24px] text-white">
                {category.name}
              </h3>
              <p className="text-sm font-normal leading-5 text-white/90">
                {category.description}
              </p>
              <Button
                size="sm"
                className="pointer-events-none mt-1 h-10 rounded-[8px] px-4 py-2 text-[13px] font-medium"
                tabIndex={-1}
                aria-hidden
              >
                Discover category
              </Button>
            </div>
          </Link>
        ))}
      </CarouselRail>
    </section>
  )
}
