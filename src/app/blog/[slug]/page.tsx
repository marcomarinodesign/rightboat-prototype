import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { BlogArticleLayout } from "@/components/blog/blog-article-layout"
import { FormulaBoatsQAContent } from "@/components/blog/article-contents/formula-boats-q-a-content"
import {
  researchArticles,
  getArticleBySlug,
} from "@/data/research-articles"

const SITE_URL = "https://www.rightboat.com"

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return researchArticles
    .filter((a) => a.slug)
    .map((a) => ({ slug: a.slug! }))
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

export default async function BlogArticlePage({ params }: Props) {
  const { slug } = await params
  const article = getArticleBySlug(slug)
  if (!article) notFound()

  const shareUrl = article.externalUrl ?? `${SITE_URL}${article.href}`
  const imageAlt = article.title

  const isFormulaBoats = slug === "formula-boats-q-a"

  return (
    <BlogArticleLayout
      title={article.title}
      date={article.date}
      author={article.author}
      authorUrl={article.authorUrl}
      authorBio={article.authorBio}
      image={{ src: article.image, alt: imageAlt }}
      shareUrl={shareUrl}
      relatedArticles={researchArticles}
      currentArticleId={article.id}
      ctaButton={isFormulaBoats ? { text: "See All Formula Boats for Sale", href: "/boats-for-sale" } : undefined}
      externalReadUrl={article.externalUrl}
    >
      {isFormulaBoats ? (
        <FormulaBoatsQAContent />
      ) : (
        <section className="space-y-6" aria-labelledby="excerpt-heading">
          <h2 id="excerpt-heading" className="sr-only">
            Article summary
          </h2>
          <p className="text-lg leading-relaxed text-foreground">{article.excerpt}</p>
        </section>
      )}
    </BlogArticleLayout>
  )
}
