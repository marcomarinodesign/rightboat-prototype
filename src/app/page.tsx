import Link from "next/link"

import { ArticleCard } from "@/components/blog/article-card"
import { BoatCard } from "@/components/boats/boat-card"
import { HeroSearch } from "@/components/search/hero-search"
import { HomeCategories } from "@/components/home/home-categories"
import { PopularModels } from "@/components/home/popular-models"
import { PremiumBrands } from "@/components/home/premium-brands"
import { WhyRightboat } from "@/components/home/why-rightboat"
import { Testimonials } from "@/components/home/testimonials"
import { featuredBoats } from "@/data/boats"
import { latestArticles } from "@/data/articles"

export default function Home() {
  return (
    <div className="space-y-[60px]">
      <section className="space-y-6 text-center">
        <div className="space-y-6">
          <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight md:text-5xl">
            The right place to find the{" "}
            <span className="text-primary">Right Boat</span>.
          </h1>
          <p className="text-lg text-muted-foreground">
            Discover thousands of new and used listings worldwide. Compare
            models, filter by type and location, and contact brokers directly.
          </p>
        </div>
        <HeroSearch />

        {/* Video: Sailing in the middle of the ocean — Lars H Knudsen / Pexels */}
        <div className="relative w-full h-[400px] overflow-hidden rounded-xl bg-muted">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 h-full w-full object-cover"
            aria-label="Sailing in the middle of the ocean"
          >
            <source
              src="https://videos.pexels.com/video-files/3083871/3083871-hd_1920_1080_25fps.mp4"
              type="video/mp4"
            />
          </video>
        </div>
      </section>

      <section className="space-y-6" aria-labelledby="featured-heading">
        <div className="flex items-center justify-between">
          <h2 id="featured-heading" className="text-2xl font-bold">
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
          <h2 id="articles-heading" className="text-2xl font-bold">
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
