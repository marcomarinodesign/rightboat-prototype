"use client"

import Image from "next/image"
import { useState } from "react"

import { premiumBrands } from "@/data/brands"

export function BrandLogo({ brand }: { brand: (typeof premiumBrands)[0] }) {
  const [imageError, setImageError] = useState(false)

  return (
    <div className="relative flex h-24 w-40 items-center justify-center">
      {imageError ? (
        <div className="flex h-full w-full items-center justify-center rounded border border-border/60 bg-muted">
          <span className="text-xs text-muted-foreground">{brand.name}</span>
        </div>
      ) : (
        <Image
          src={brand.logo}
          alt={brand.name}
          width={160}
          height={96}
          className="object-contain object-center"
          onError={() => setImageError(true)}
          unoptimized
        />
      )}
    </div>
  )
}
