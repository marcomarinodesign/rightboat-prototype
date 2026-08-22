"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"

import {
  listingsHref,
  useHomeSurface,
} from "@/components/home/home-surface-context"
import { premiumBrands } from "@/data/brands"
import { ChevronLeft, ChevronRight } from "lucide-react"

const PAGE_SIZE = 5

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
        <div className="grid grid-cols-3 gap-4 sm:grid-cols-5">
          {visible.map((brand) => (
            <BrandLogoCard key={brand.id} brand={brand} surface={surface} />
          ))}
        </div>

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
      className="group flex h-20 items-center justify-center rounded-xl border border-border/60 bg-card px-4 transition-shadow hover:shadow-sm"
    >
      {imageError ? (
        <span className="text-sm font-semibold text-muted-foreground transition-colors group-hover:text-foreground">
          {brand.name}
        </span>
      ) : (
        <div className="relative h-10 w-full">
          <Image
            src={brand.logo}
            alt={brand.name}
            fill
            className="object-contain object-center grayscale transition-[filter] group-hover:grayscale-0"
            onError={() => setImageError(true)}
            unoptimized
          />
        </div>
      )}
    </Link>
  )
}
