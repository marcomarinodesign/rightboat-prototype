import Image from "next/image"

import { Button } from "@/components/ui/button"
import { HeroSearch } from "@/components/search/hero-search"

export function CustomHero() {
  return (
    <section className="space-y-6">
      {/* Top section: Title left, Description + CTA right */}
      <div className="grid gap-8 md:grid-cols-2 md:items-start">
        {/* Left column: Title */}
        <div className="space-y-4">
          <h1 className="text-4xl font-bold leading-tight tracking-tight md:text-5xl">
            The right place to find the right boat.
          </h1>
        </div>

        {/* Right column: Description + CTA */}
        <div className="flex flex-col gap-6">
          <p className="text-lg text-muted-foreground">
            Discover thousands of new and used listings worldwide. Compare
            models, filter by type and location, and contact brokers directly.
          </p>
          <div>
            <Button size="lg">Sell your boat</Button>
          </div>
        </div>
      </div>

      {/* Search block */}
      <HeroSearch />

      {/* Image placeholder */}
      <div className="relative w-full overflow-hidden rounded-lg border border-border bg-muted">
        <div className="relative aspect-video w-full">
          <Image
            alt="Hero section visual"
            src="https://ui.shadcn.com/placeholder.svg"
            fill
            className="h-full w-full object-cover"
            unoptimized
          />
        </div>
      </div>
    </section>
  )
}
