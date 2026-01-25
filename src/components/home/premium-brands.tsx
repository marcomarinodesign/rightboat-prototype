"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"

import { premiumBrands } from "@/data/brands"

export function PremiumBrands() {
  return (
    <section className="space-y-6" aria-labelledby="brands-heading">
      <div>
        <h2 id="brands-heading" className="text-2xl font-bold">
          Our Premium Brands
        </h2>
        <p className="mt-2 text-muted-foreground">
          Trusted brands from leading manufacturers worldwide
        </p>
      </div>
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {premiumBrands.map((brand) => (
          <BrandLogoLink key={brand.id} brand={brand} />
        ))}
      </div>
    </section>
  )
}

function BrandLogoLink({ brand }: { brand: (typeof premiumBrands)[0] }) {
  const [imageError, setImageError] = useState(false)

  return (
    <Link
      href={`/boats-for-sale?brand=${brand.slug}`}
      className="group flex items-center justify-center rounded-lg border border-border/60 bg-card p-6 transition-all hover:border-primary/50 hover:shadow-md"
    >
      {imageError ? (
        <span className="text-sm font-semibold text-muted-foreground transition-colors group-hover:text-foreground">
          {brand.name}
        </span>
      ) : (
        <div className="relative h-12 w-full">
          <Image
            src={brand.logo}
            alt={brand.name}
            fill
            className="object-contain object-center transition-opacity group-hover:opacity-80"
            onError={() => setImageError(true)}
            unoptimized
          />
        </div>
      )}
    </Link>
  )
}
