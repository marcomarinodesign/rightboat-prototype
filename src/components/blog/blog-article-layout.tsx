import Image from "next/image"
import Link from "next/link"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArticleCard } from "@/components/blog/article-card"
import type { Article } from "@/data/articles"

export interface BlogArticleLayoutProps {
  title: string
  date: string
  author?: string
  authorUrl?: string
  authorBio?: string
  image: { src: string; alt: string }
  shareUrl: string
  relatedArticles: Article[]
  currentArticleId?: string
  ctaButton?: { text: string; href: string }
  externalReadUrl?: string
  children: React.ReactNode
}

export function BlogArticleLayout({
  title,
  date,
  author,
  authorUrl,
  authorBio,
  image,
  shareUrl,
  relatedArticles,
  currentArticleId,
  ctaButton,
  externalReadUrl,
  children,
}: BlogArticleLayoutProps) {
  const filteredRelated = relatedArticles.filter((a) => a.id !== currentArticleId).slice(0, 3)

  return (
    <article className="mx-auto max-w-3xl space-y-10 pb-16">
      <header className="space-y-4">
        <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
          <ol className="flex flex-wrap items-center gap-x-1 gap-y-1">
            <li>
              <Link href="/" className="transition-colors hover:text-foreground">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href="/research-advice" className="transition-colors hover:text-foreground">
                Research &amp; Advice
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-foreground" aria-current="page">
              {title}
            </li>
          </ol>
        </nav>
        <h1 className="text-3xl font-bold leading-tight tracking-tight md:text-4xl lg:text-5xl">
          {title}
        </h1>
        <p className="text-muted-foreground">
          {date}
          {author && (
            <>
              {" by "}
              {authorUrl ? (
                <a
                  href={authorUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-foreground underline decoration-primary underline-offset-2 transition-colors hover:text-primary"
                >
                  {author}
                </a>
              ) : (
                <span className="font-semibold text-foreground">{author}</span>
              )}
            </>
          )}
        </p>
      </header>

      <section className="space-y-6" aria-labelledby="hero-heading">
        <h2 id="hero-heading" className="sr-only">
          Article image
        </h2>
        <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-border bg-muted">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 896px"
            priority
          />
        </div>
      </section>

      {children}

      <section className="flex flex-wrap items-center gap-4 border-y border-border py-6">
        {ctaButton && (
          <Button asChild>
            <Link href={ctaButton.href}>{ctaButton.text}</Link>
          </Button>
        )}
        {externalReadUrl && (
          <Button asChild>
            <a href={externalReadUrl} target="_blank" rel="noopener noreferrer">
              Read full article
            </a>
          </Button>
        )}
        <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
          <span>Share:</span>
          <a
            href={`https://www.facebook.com/sharer.php?u=${encodeURIComponent(shareUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-primary underline-offset-2 hover:text-primary"
          >
            Facebook
          </a>
          <span aria-hidden="true">·</span>
          <a
            href={`https://twitter.com/share?url=${encodeURIComponent(shareUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-primary underline-offset-2 hover:text-primary"
          >
            Twitter
          </a>
          <span aria-hidden="true">·</span>
          <a
            href={`mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(shareUrl)}`}
            className="underline decoration-primary underline-offset-2 hover:text-primary"
          >
            Email
          </a>
        </div>
      </section>

      {(author || authorBio) && (
        <section aria-labelledby="author-heading">
          <Card className="border-border-card">
            <CardHeader>
              <h2 id="author-heading" className="text-xl font-bold">
                Written By
              </h2>
              {author && (
                <p className="font-semibold">
                  {authorUrl ? (
                    <a
                      href={authorUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary underline decoration-primary underline-offset-2 hover:opacity-90"
                    >
                      {author}
                    </a>
                  ) : (
                    <span className="text-foreground">{author}</span>
                  )}
                </p>
              )}
            </CardHeader>
            {authorBio && (
              <CardContent className="pt-0">
                <p className="text-sm leading-relaxed text-muted-foreground">{authorBio}</p>
              </CardContent>
            )}
          </Card>
        </section>
      )}

      <nav className="space-y-4 border-t border-border pt-8" aria-label="Related and previous">
        <Link
          href="/research-advice"
          className="inline-block text-sm text-muted-foreground underline decoration-primary underline-offset-2 transition-colors hover:text-primary"
        >
          &larr; View previous story
        </Link>
        <h2 className="text-2xl font-bold">Related Articles and Guides</h2>
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredRelated.map((a) => (
            <li key={a.id}>
              <ArticleCard article={a} />
            </li>
          ))}
        </ul>
      </nav>
    </article>
  )
}
