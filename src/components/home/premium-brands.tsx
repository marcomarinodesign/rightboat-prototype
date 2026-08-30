"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"

import {
  listingsHref,
  useHomeSurface,
} from "@/components/home/home-surface-context"
import { premiumBrands } from "@/data/brands"
import { CarouselRail } from "@/components/patterns/carousel-rail"
import { ChevronLeft, ChevronRight } from "lucide-react"

// All brands ride in the carousel rail; the rail arrows replace the old paging.
const PAGE_SIZE = 8

export function PremiumBrands() {
  const surface = useHomeSurface()
  const [page, setPage] = useState(0)

  const totalPages = Math.ceil(premiumBrands.length / PAGE_SIZE)
  const visible = premiumBrands.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE)

  return (
    <section className="space-y-6" aria-labelledby="brands-heading">
      <div>
        <h2 id="brands-heading" className="heading-sm">
          Our premium brands
        </h2>
        <p className="mt-2 text-muted-foreground">
          Browse boats from leading global manufacturers. Compare new and used
          boats for sale from trusted brands across multiple countries and
          markets.
        </p>
      </div>

      <div className="space-y-4">
        <CarouselRail
          label="Premium brands"
          itemClassName="basis-[calc((100%-40px)/3)] sm:basis-[calc((100%-80px)/5)] lg:basis-[calc((100%-80px)/5)]"
        >
          {visible.map((brand) => (
            <BrandLogoCard key={brand.id} brand={brand} surface={surface} />
          ))}
        </CarouselRail>

        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              disabled={page === 0}
              className="rounded-full p-1 text-muted-foreground transition-colors hover:text-foreground disabled:opacity-30"
              aria-label="Previous brands"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <div className="flex gap-1.5">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i)}
                  className={`h-2 w-2 rounded-full transition-all ${
                    i === page ? "bg-primary" : "bg-muted-foreground/30"
                  }`}
                  aria-label={`Page ${i + 1}`}
                />
              ))}
            </div>
            <button
              onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
              disabled={page === totalPages - 1}
              className="rounded-full p-1 text-muted-foreground transition-colors hover:text-foreground disabled:opacity-30"
              aria-label="Next brands"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </section>
  )
}

function BrandLogoCard({
  brand,
  surface,
}: {
  brand: (typeof premiumBrands)[0]
  surface: ReturnType<typeof useHomeSurface>
}) {
  const [imageError, setImageError] = useState(false)

  return (
    <Link
      href={listingsHref(`/boats-for-sale?brand=${brand.slug}`, surface)}
      className="group flex h-[140px] items-center justify-center rounded-[15px] border border-[rgb(228,229,233)] bg-white px-4 transition-shadow hover:shadow-sm"
    >
      {imageError ? (
        <span className="text-sm font-semibold text-muted-foreground transition-colors group-hover:text-foreground">
          {brand.name}
        </span>
      ) : (
        // Figma BrandBox: the mark fills most of the 217×140 tile.
        <div className="relative h-[92px] w-full">
          <Image
            src={brand.logo}
            alt={brand.name}
            fill
            sizes="220px"
            className="object-contain object-center grayscale transition-[filter] group-hover:grayscale-0"
            onError={() => setImageError(true)}
            unoptimized
          />
        </div>
      )}
    </Link>
  )
}
