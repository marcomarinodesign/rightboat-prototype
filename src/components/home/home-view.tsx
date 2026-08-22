"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"

import { ArticleCard } from "@/components/blog/article-card"
import { BoatCard } from "@/components/boats/boat-card"
import {
  HomeSurfaceProvider,
  listingsHref,
  type HomeSurface,
  useHomeSurface,
} from "@/components/home/home-surface-context"
import { MobileNativePageHeader } from "@/components/mobile-app/mobile-native-page-header"
import { HeroSearch } from "@/components/search/hero-search"
import { HomeCategories } from "@/components/home/home-categories"
import { PopularModels } from "@/components/home/popular-models"
import { PremiumBrands } from "@/components/home/premium-brands"
import { WhyRightboat } from "@/components/home/why-rightboat"
import { Testimonials } from "@/components/home/testimonials"
import { FadeIn } from "@/components/motion/fade-in"
import { featuredBoats } from "@/data/boats"
import { latestArticles } from "@/data/articles"
import {
  easeOutExpo,
  staggerContainer,
  staggerItem,
} from "@/lib/motion-variants"
import { cn } from "@/lib/utils"

type HomeViewProps = {
  /** `app`: same homepage sections as web, links into `/app/*`, horizontal padding for shell-less layout. */
  surface?: HomeSurface
}

function HomeViewInner() {
  const surface = useHomeSurface()
  const discoverHref = listingsHref("/boats-for-sale", surface)

  return (
    <div className="space-y-16 md:space-y-20">
      <section
        className={cn(
          "flex flex-col items-center gap-4 text-center",
          surface === "app" ? "pt-0" : "pt-5"
        )}
      >
        {surface === "app" ? (
          <div className="w-full text-left">
            <MobileNativePageHeader
              className="px-0"
              title="Explore"
              description="Search over 35,000 new and used boats for sale worldwide, including yachts, sailboats, motorboats, catamarans and fishing boats."
            >
              <HeroSearch />
            </MobileNativePageHeader>
          </div>
        ) : (
          <>
            <motion.p
              className="text-xs font-normal leading-4 text-midnight"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: easeOutExpo }}
            >
              BOAT FOR SALE WORLDWIDE
            </motion.p>
            <motion.h1
              className="text-4xl font-bold leading-10 tracking-[-0.4px] text-foreground md:text-[3rem] md:leading-[3rem] md:tracking-[-0.48px]"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: easeOutExpo, delay: 0.04 }}
            >
              Buy &amp; Sell Boats on{" "}
              <span className="text-primary">Right Boat</span>.
            </motion.h1>
            <motion.p
              className="text-base font-normal leading-6 text-foreground"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: easeOutExpo, delay: 0.08 }}
            >
              Search over 35,000 new and used boats for sale worldwide,
              including yachts, sailboats, motorboats, catamarans and fishing
              boats.
            </motion.p>
            <motion.figure
              className="relative h-[220px] w-full overflow-hidden rounded-2xl bg-muted md:h-[400px]"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.65, ease: easeOutExpo, delay: 0.12 }}
            >
              <Image
                src="/home/hero-sponsor.png"
                alt="Sunreef Yachts"
                fill
                priority
                sizes="(max-width: 1280px) 100vw, 1280px"
                className="object-cover"
              />
              <figcaption className="sr-only">
                Sponsored placement — Sunreef Yachts
              </figcaption>
            </motion.figure>
            <motion.div
              className="w-full"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: easeOutExpo, delay: 0.18 }}
            >
              <HeroSearch />
            </motion.div>
          </>
        )}
      </section>

      <motion.section
        className="space-y-6"
        aria-labelledby="featured-heading"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        <motion.div
          className="flex items-center justify-between"
          variants={staggerItem}
        >
          <h2 id="featured-heading" className="heading-sm">
            Featured boats
          </h2>
          <Link href={discoverHref} className="primary-text-link">
            Discover more
          </Link>
        </motion.div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {featuredBoats.map((boat) => (
            <motion.div key={boat.id} variants={staggerItem}>
              <BoatCard
                boat={boat}
                {...(surface === "app" ? { href: `/app/boat/${boat.id}` } : {})}
              />
            </motion.div>
          ))}
        </div>
      </motion.section>

      <FadeIn>
        <HomeCategories />
      </FadeIn>

      <FadeIn delay={0.05}>
        <PopularModels />
      </FadeIn>

      <FadeIn delay={0.05}>
        <PremiumBrands />
      </FadeIn>

      <FadeIn delay={0.05}>
        <WhyRightboat />
      </FadeIn>

      <FadeIn delay={0.05}>
        <Testimonials />
      </FadeIn>

      <motion.section
        className="space-y-6"
        aria-labelledby="articles-heading"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        <motion.div
          className="flex items-center justify-between"
          variants={staggerItem}
        >
          <h2 id="articles-heading" className="heading-sm">
            Latest Boating Articles &amp; Buying Advice
          </h2>
          <Link
            href={
              surface === "app"
                ? "/app/research"
                : "https://www.rightboat.com/blog"
            }
            className="primary-text-link"
          >
            See more articles
          </Link>
        </motion.div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {latestArticles.map((article) => (
            <motion.div key={article.id} variants={staggerItem}>
              <ArticleCard article={article} />
            </motion.div>
          ))}
        </div>
      </motion.section>
    </div>
  )
}

export function HomeView({ surface = "web" }: HomeViewProps) {
  return (
    <HomeSurfaceProvider value={surface}>
      {surface === "app" ? (
        <div className="mx-auto w-full max-w-7xl px-[var(--mobile-margin)]">
          <HomeViewInner />
        </div>
      ) : (
        <HomeViewInner />
      )}
    </HomeSurfaceProvider>
  )
}
