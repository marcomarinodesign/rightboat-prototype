import Image from "next/image"
import Link from "next/link"

import { premiumBrands } from "@/data/brands"

export function PremiumBrands() {
  return (
    <section className="space-y-6" aria-labelledby="brands-heading">
      <div>
        <h2 id="brands-heading" className="text-2xl font-semibold">
          Our Premium Brands
        </h2>
        <p className="mt-2 text-muted-foreground">
          Trusted brands from leading manufacturers worldwide
        </p>
      </div>
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {premiumBrands.map((brand) => (
          <Link
            key={brand.id}
            href={`/boats-for-sale?brand=${brand.slug}`}
            className="group flex items-center justify-center rounded-lg border border-border/60 bg-card p-6 transition-all hover:border-primary/50 hover:shadow-md"
          >
            <div className="relative h-12 w-full">
              <Image
                src={brand.logo}
                alt={brand.name}
                fill
                className="object-contain grayscale transition-all group-hover:grayscale-0"
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 16vw"
              />
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
