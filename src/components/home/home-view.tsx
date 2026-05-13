"use client"

import Link from "next/link"
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
      <section className="space-y-6 text-center">
        <motion.div
          className={cn(
            "flex flex-col items-center justify-center gap-4",
            surface === "app" ? "pt-0" : "pt-5"
          )}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: easeOutExpo }}
        >
          {surface !== "app" ? (
            <p className="text-xs font-semibold leading-4 tracking-[2px] uppercase text-foreground">
              Boats for Sale Worldwide
            </p>
          ) : null}
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
              <h1 className="text-4xl font-bold leading-10 tracking-[-0.4px] text-foreground md:text-[3rem] md:leading-[3rem] md:tracking-[-0.48px]">
                Buy &amp; Sell Boats on{" "}
                <span className="text-primary">Right Boat</span>.
              </h1>
              <p className="text-base font-normal leading-6 text-foreground">
                Search over 35,000 new and used boats for sale worldwide,
                including yachts, sailboats, motorboats, catamarans and fishing
                boats.
              </p>
            </>
          )}
        </motion.div>

        {surface !== "app" ? (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: easeOutExpo, delay: 0.12 }}
          >
            <HeroSearch />
          </motion.div>
        ) : null}

        <motion.div
          className="relative aspect-video w-full overflow-hidden rounded-2xl bg-muted"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.65, ease: easeOutExpo, delay: 0.2 }}
        >
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
        </motion.div>
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
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
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
            Latest articles and boat reviews
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
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
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
