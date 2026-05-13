import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { FormulaBoatsQAContent } from "@/components/blog/article-contents/formula-boats-q-a-content"
import { MobileResearchArticleView } from "@/components/mobile-app/screens/research-article-view"
import {
  researchArticles,
  getArticleBySlug,
} from "@/data/research-articles"

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return researchArticles.filter((a) => a.slug).map((a) => ({ slug: a.slug! }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const article = getArticleBySlug(slug)
  if (!article) return { title: "Article | Rightboat" }
  return {
    title: `${article.title} | Rightboat`,
    description: article.excerpt,
  }
}

export default async function MobileAppResearchArticlePage({ params }: Props) {
  const { slug } = await params
  const article = getArticleBySlug(slug)
  if (!article) notFound()

  const isFormulaBoats = slug === "formula-boats-q-a"

  return (
    <MobileResearchArticleView
      article={article}
      ctaButton={
        isFormulaBoats
          ? { text: "See all Formula boats for sale", href: "/app/boats-for-sale" }
          : undefined
      }
    >
      {isFormulaBoats ? (
        <FormulaBoatsQAContent />
      ) : (
        <section className="space-y-4" aria-labelledby="excerpt-heading">
          <h2 id="excerpt-heading" className="sr-only">
            Article summary
          </h2>
          <p className="text-base leading-relaxed text-muted-foreground">{article.excerpt}</p>
          <p className="text-sm text-muted-foreground">
            Open the full article on Rightboat.com for the complete story, images,
            and updates.
          </p>
        </section>
      )}
    </MobileResearchArticleView>
  )
}
