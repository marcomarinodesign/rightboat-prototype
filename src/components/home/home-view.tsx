"use client"

import Link from "next/link"
import { motion } from "framer-motion"

import { ArticleCard } from "@/components/blog/article-card"
import { BoatCard } from "@/components/boats/boat-card"
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

export function HomeView() {
  return (
    <div className="space-y-16 md:space-y-20">
      <section className="space-y-6 text-center">
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: easeOutExpo }}
        >
          <h1 className="mt-2 text-4xl font-bold leading-10 tracking-[-0.4px] text-foreground md:text-[3rem] md:leading-[3rem] md:tracking-[-0.48px]">
            The right place to find the{" "}
            <span className="text-primary">Right Boat</span>.
          </h1>
          <p className="text-base font-normal leading-6 text-foreground">
            Discover thousands of new and used listings worldwide. Compare
            models, filter by type and location, and contact brokers directly.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: easeOutExpo, delay: 0.12 }}
        >
          <HeroSearch />
        </motion.div>

        <motion.div
          className="relative h-[400px] w-full overflow-hidden rounded-2xl bg-muted"
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
          <Link href="/boats-for-sale" className="primary-text-link">
            Discover more
          </Link>
        </motion.div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {featuredBoats.map((boat) => (
            <motion.div key={boat.id} variants={staggerItem}>
              <BoatCard boat={boat} />
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
            href="https://www.rightboat.com/blog"
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
