"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"

import {
  listingsHref,
  useHomeSurface,
} from "@/components/home/home-surface-context"
import { premiumBrands } from "@/data/brands"

export function PremiumBrands() {
  return (
    <section className="space-y-6" aria-labelledby="brands-heading">
      <div>
        <h2 id="brands-heading" className="heading-sm">
          Our Premium Brands
        </h2>
        <p className="mt-2 text-muted-foreground">
          Trusted brands from leading manufacturers worldwide
        </p>
      </div>

      {/* Logos carousel (logos7-style marquee) */}
      <div className="logo-marquee bg-card py-8">
        <div className="logo-marquee-track gap-14 px-8">
          {[...premiumBrands, ...premiumBrands].map((brand, index) => (
            <BrandLogoLink key={`${brand.id}-${index}`} brand={brand} />
          ))}
        </div>
      </div>
    </section>
  )
}

function BrandLogoLink({ brand }: { brand: (typeof premiumBrands)[0] }) {
  const surface = useHomeSurface()
  const [imageError, setImageError] = useState(false)

  return (
    <Link
      href={listingsHref(`/boats-for-sale?brand=${brand.slug}`, surface)}
      className="group flex h-24 w-40 items-center justify-center transition-opacity hover:opacity-70"
    >
      {imageError ? (
        <span className="text-sm font-semibold text-muted-foreground transition-colors group-hover:text-foreground">
          {brand.name}
        </span>
      ) : (
        <div className="relative h-24 w-40">
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
