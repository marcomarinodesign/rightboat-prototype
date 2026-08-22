"use client"

import Image from "next/image"
import Link from "next/link"

import {
  listingsHref,
  useHomeSurface,
} from "@/components/home/home-surface-context"
import { boatCategories } from "@/data/categories-extended"
import { Button } from "@/components/ui/button"

const OVERLAY =
  "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.55) 45%, rgba(0,0,0,0.82) 100%)"

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

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {boatCategories.map((category) => (
          <Link
            key={category.id}
            href={listingsHref(
              `/boats-for-sale?type=${category.slug}`,
              surface
            )}
            className="group relative block h-[280px] overflow-hidden rounded-2xl"
          >
            <Image
              src={category.image}
              alt={category.name}
              fill
              sizes="(max-width: 1024px) 50vw, 25vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div
              className="pointer-events-none absolute inset-0 rounded-2xl"
              style={{ backgroundImage: OVERLAY }}
              aria-hidden
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 flex flex-col gap-2 rounded-b-2xl p-4">
              <span className="inline-flex w-fit items-center rounded-full bg-white/20 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
                {category.listingCount.toLocaleString()} boats
              </span>
              <h3 className="text-lg font-bold leading-6 text-white">
                {category.name}
              </h3>
              <p className="text-sm leading-5 text-white/80">
                {category.description}
              </p>
              <Button
                size="sm"
                className="mt-1 w-fit pointer-events-none"
                tabIndex={-1}
                aria-hidden
              >
                Discover category
              </Button>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
