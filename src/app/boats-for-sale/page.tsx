import Link from "next/link"

import { BoatCard } from "@/components/boats/boat-card"
import { BoatsForSaleFilters } from "@/components/filters/boats-for-sale-filters"
import { listingBoats } from "@/data/boats"
import {
  popularBrands,
  popularLocations,
  popularTypes,
} from "@/data/categories"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function BoatsForSalePage() {
  return (
    <div className="space-y-10">
      <div>
        <div className="text-sm text-muted-foreground">
          <Link href="/">Home</Link> / Boats for sale
        </div>
        <h1 className="mb-6 text-3xl font-bold">Boats for sale</h1>
      </div>

      <div className="space-y-6">
        <BoatsForSaleFilters />
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-border/60 bg-card px-5 py-4">
          <div>
            <p className="text-sm text-muted-foreground">Results</p>
            <p className="text-lg font-semibold">
              {listingBoats.length} boats near you
            </p>
          </div>
          <Select>
            <SelectTrigger className="w-44">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="featured">Featured</SelectItem>
              <SelectItem value="price-low">Price (low to high)</SelectItem>
              <SelectItem value="price-high">Price (high to low)</SelectItem>
              <SelectItem value="newest">Newest listings</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {listingBoats.map((boat) => (
            <BoatCard key={boat.id} boat={boat} />
          ))}
        </div>
      </div>

      <section className="grid gap-6 rounded-2xl border border-border/60 bg-muted/20 p-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-3">
          <h2 className="text-2xl font-bold">Receive new listings</h2>
          <p className="text-sm text-muted-foreground">
            Get alerts for new boats that match your preferences.
          </p>
          <div className="flex flex-wrap gap-3">
            <Input placeholder="Your email address" className="max-w-xs" />
            <Button>Subscribe</Button>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">
              Search by manufacturer
            </h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {popularBrands.map((brand) => (
                <Link
                  key={brand}
                  href="/boats-for-sale"
                  className="rounded-full border border-border/60 px-3 py-1 text-xs text-muted-foreground"
                >
                  {brand}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">
              Search by type
            </h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {popularTypes.map((type) => (
                <Link
                  key={type}
                  href="/boats-for-sale"
                  className="rounded-full border border-border/60 px-3 py-1 text-xs text-muted-foreground"
                >
                  {type}
                </Link>
              ))}
            </div>
          </div>
          <div className="md:col-span-2">
            <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">
              Search by location
            </h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {popularLocations.map((location) => (
                <Link
                  key={location}
                  href="/boats-for-sale"
                  className="rounded-full border border-border/60 px-3 py-1 text-xs text-muted-foreground"
                >
                  {location}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
