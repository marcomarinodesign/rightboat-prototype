import Image from "next/image"
import Link from "next/link"

import { MobileNativePageHeader } from "@/components/mobile-app/mobile-native-page-header"
import { Button } from "@/components/ui/button"
import type { Article } from "@/data/articles"
import { researchArticles } from "@/data/research-articles"

const SITE_URL = "https://www.rightboat.com"

type MobileResearchArticleViewProps = {
  article: Article
  children: React.ReactNode
  /** Formula boats etc. */
  ctaButton?: { text: string; href: string }
}

export function MobileResearchArticleView({
  article,
  children,
  ctaButton,
}: MobileResearchArticleViewProps) {
  const shareUrl = article.externalUrl ?? `${SITE_URL}${article.href}`
  const related = researchArticles
    .filter((a) => a.slug && a.id !== article.id)
    .slice(0, 6)

  return (
    <article className="pb-8">
      <MobileNativePageHeader
        title={article.title}
        titleClassName="text-[26px] leading-[1.15] tracking-[-0.5px] sm:text-[28px]"
        description={
          <>
            {article.date}
            {article.author ? (
              <>
                {" · "}
                <span className="font-medium text-foreground">{article.author}</span>
              </>
            ) : null}
            {article.readingTime ? (
              <>
                {" · "}
                {article.readingTime}
              </>
            ) : null}
          </>
        }
      />

      <div className="mt-4 px-[var(--mobile-margin)]">
        <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-border bg-muted">
          <Image
            src={article.image}
            alt={article.title}
            fill
            className="object-cover"
            sizes="(max-width: 430px) 100vw, 400px"
            priority
          />
        </div>
      </div>

      <div className="mt-6 space-y-6 px-[var(--mobile-margin)] text-[15px] leading-relaxed text-foreground">
        {children}
      </div>

      <div className="mt-8 flex flex-col gap-3 border-t border-border px-[var(--mobile-margin)] pt-6">
        {ctaButton ? (
          <Button asChild className="w-full">
            <Link href={ctaButton.href}>{ctaButton.text}</Link>
          </Button>
        ) : null}
        {article.externalUrl ? (
          <Button asChild variant="secondary" className="w-full">
            <a href={article.externalUrl} target="_blank" rel="noopener noreferrer">
              Read full article on Rightboat
            </a>
          </Button>
        ) : null}
        <p className="text-center text-xs text-muted-foreground">
          Share:{" "}
          <a
            href={`https://twitter.com/share?url=${encodeURIComponent(shareUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline underline-offset-2"
          >
            Twitter
          </a>
          {" · "}
          <a
            href={`mailto:?subject=${encodeURIComponent(article.title)}&body=${encodeURIComponent(shareUrl)}`}
            className="text-primary underline underline-offset-2"
          >
            Email
          </a>
        </p>
      </div>

      {related.length > 0 ? (
        <section className="mt-10 space-y-3 px-[var(--mobile-margin)]">
          <h2 className="text-lg font-bold text-foreground">More on Rightboat</h2>
          <ul className="flex flex-col gap-2">
            {related.map((a) =>
              a.slug ? (
                <li key={a.id}>
                  <Link
                    href={`/app/research/${a.slug}`}
                    className="block rounded-lg border border-border/60 bg-muted/30 px-3 py-2.5 text-sm font-medium text-foreground active:bg-muted/60 [-webkit-tap-highlight-color:transparent]"
                  >
                    {a.title}
                  </Link>
                </li>
              ) : null
            )}
          </ul>
        </section>
      ) : null}
    </article>
  )
}
