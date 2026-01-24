import Image from "next/image"
import Link from "next/link"

import { ArticleCard } from "@/components/blog/article-card"
import { BoatCard } from "@/components/boats/boat-card"
import { latestArticles } from "@/data/articles"
import { featuredBoats, latestBoats } from "@/data/boats"
import {
  popularBrands,
  popularLocations,
  popularTypes,
} from "@/data/categories"

export default function Home() {
  return (
    <div className="space-y-20">
      <section className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div className="space-y-6">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Boats for sale
          </p>
          <h1 className="text-4xl font-bold leading-tight tracking-tight md:text-5xl">
            The right place to find the right boat.
          </h1>
          <p className="text-lg text-muted-foreground">
            Discover thousands of new and used listings worldwide. Compare
            models, filter by type and location, and contact brokers directly.
          </p>
        </div>
        <div className="relative overflow-hidden rounded-3xl border border-border/60 shadow-sm">
          <Image
            src="https://www.rightboat.com/carousel_images/0/0/127/Mastercraft.jpg"
            alt="Rightboat hero boat"
            width={680}
            height={720}
            className="h-full w-full object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Featured boats for sale</h2>
          <Link href="/boats-for-sale" className="text-sm text-primary">
            View more details
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {featuredBoats.map((boat) => (
            <BoatCard key={boat.id} boat={boat} />
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Latest boats near you</h2>
          <Link href="/boats-for-sale" className="text-sm text-primary">
            View more details
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {latestBoats.map((boat) => (
            <BoatCard key={boat.id} boat={boat} />
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Latest articles and reviews</h2>
          <Link
            href="https://www.rightboat.com/blog"
            className="text-sm text-primary"
          >
            See more articles
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {latestArticles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </section>

      <section className="grid gap-10 rounded-3xl border border-border/60 bg-muted/20 p-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">
            Rightboat.com - the right place to find the right boat
          </h2>
          <p className="text-muted-foreground">
            Whether you want to buy a boat or sell one, you are in the right
            place. Find power boats, sailing boats, catamarans, yachts and more,
            curated by trusted brokers worldwide.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/boats-for-sale" className="text-sm text-primary">
              Buy a boat
            </Link>
            <span className="text-muted-foreground">•</span>
            <Link href="/boats-for-sale" className="text-sm text-primary">
              Sell a boat
            </Link>
          </div>
        </div>
        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
              Popular boat brands
            </h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {popularBrands.map((brand) => (
                <span
                  key={brand}
                  className="rounded-full border border-border/60 px-3 py-1 text-xs text-muted-foreground"
                >
                  {brand}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
              Popular boat types
            </h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {popularTypes.map((type) => (
                <span
                  key={type}
                  className="rounded-full border border-border/60 px-3 py-1 text-xs text-muted-foreground"
                >
                  {type}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
              Popular locations
            </h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {popularLocations.map((location) => (
                <span
                  key={location}
                  className="rounded-full border border-border/60 px-3 py-1 text-xs text-muted-foreground"
                >
                  {location}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
