import Image from "next/image"
import Link from "next/link"

import { ArticleCard } from "@/components/blog/article-card"
import { BoatCard } from "@/components/boats/boat-card"
import { HomeCategories } from "@/components/home/home-categories"
import { PopularModels } from "@/components/home/popular-models"
import { PremiumBrands } from "@/components/home/premium-brands"
import { WhyRightboat } from "@/components/home/why-rightboat"
import { Testimonials } from "@/components/home/testimonials"
import { featuredBoats } from "@/data/boats"
import { latestArticles } from "@/data/articles"

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

      <section className="space-y-6" aria-labelledby="featured-heading">
        <div className="flex items-center justify-between">
          <h2 id="featured-heading" className="text-2xl font-semibold">
            Featured boats
          </h2>
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

      <HomeCategories />

      <PopularModels />

      <PremiumBrands />

      <WhyRightboat />

      <Testimonials />

      <section className="space-y-6" aria-labelledby="articles-heading">
        <div className="flex items-center justify-between">
          <h2 id="articles-heading" className="text-2xl font-semibold">
            Latest articles and boat reviews
          </h2>
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
    </div>
  )
}
