"use client"

import { useMemo, useState } from "react"
import Link from "next/link"

import { FeaturedArticle } from "@/components/research-advice/featured-article"
import { ArticleFilters } from "@/components/research-advice/article-filters"
import { ArticlesGrid } from "@/components/research-advice/articles-grid"
import { Button } from "@/components/ui/button"
import {
  researchArticles,
  featuredArticle,
  type ArticleCategory,
} from "@/data/research-articles"

const ARTICLES_PER_PAGE = 9

export default function ResearchAdvicePage() {
  const [selectedCategory, setSelectedCategory] =
    useState<ArticleCategory>("All")
  const [visibleCount, setVisibleCount] = useState(ARTICLES_PER_PAGE)

  const filteredArticles = useMemo(() => {
    if (selectedCategory === "All") {
      return researchArticles.filter((article) => article.id !== featuredArticle.id)
    }
    return researchArticles.filter(
      (article) =>
        article.id !== featuredArticle.id &&
        article.category === selectedCategory
    )
  }, [selectedCategory])

  const displayedArticles = useMemo(() => {
    return filteredArticles.slice(0, visibleCount)
  }, [filteredArticles, visibleCount])

  const hasMoreArticles = visibleCount < filteredArticles.length

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + ARTICLES_PER_PAGE)
  }

  const handleCategoryChange = (category: ArticleCategory) => {
    setSelectedCategory(category)
    setVisibleCount(ARTICLES_PER_PAGE)
  }

  return (
    <div className="space-y-10">
      <header className="space-y-4">
        <div className="text-sm text-muted-foreground">
          <Link href="/">Home</Link> / Research & Advice
        </div>
        <div className="space-y-3">
          <h1 className="text-3xl font-bold md:text-4xl">
            Research & Advice
          </h1>
          <p className="text-lg text-muted-foreground">
            Discover expert guides, boat reviews, maintenance tips, and insights
            to help you make informed decisions about boats and boating.
          </p>
        </div>
      </header>

      <section aria-labelledby="featured-heading">
        <h2 id="featured-heading" className="sr-only">
          Featured article
        </h2>
        <FeaturedArticle article={featuredArticle} />
      </section>

      <section className="space-y-6" aria-labelledby="articles-heading">
        <div className="flex items-center justify-between">
          <h2 id="articles-heading" className="text-2xl font-bold">
            Articles
          </h2>
        </div>
        <ArticleFilters
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
        />
        <ArticlesGrid articles={displayedArticles} />
        {hasMoreArticles && (
          <div className="flex justify-center pt-4">
            <Button onClick={handleLoadMore} variant="outline" size="lg">
              Load more articles
            </Button>
          </div>
        )}
      </section>

      <section className="rounded-2xl border border-border/60 bg-muted/20 px-6 py-8 text-center">
        <p className="text-sm text-muted-foreground">
          Expert insights from the global boat marketplace
        </p>
      </section>
    </div>
  )
}
