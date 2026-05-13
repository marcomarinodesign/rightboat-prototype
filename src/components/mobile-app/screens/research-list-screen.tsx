import Image from "next/image"
import Link from "next/link"

import { MobileNativePageHeader } from "@/components/mobile-app/mobile-native-page-header"
import { researchArticles } from "@/data/research-articles"

/** Research tab: vertical list, mobile-first full-width cards. */
export function MobileResearchListScreen() {
  const withSlug = researchArticles.filter((a) => a.slug)

  return (
    <div className="space-y-5 pb-8">
      <MobileNativePageHeader
        title="Research"
        description="Guides, reviews, and advice from the Rightboat editorial team."
      />

      <ul className="flex flex-col gap-3 px-[var(--mobile-margin)]">
        {withSlug.map((article) => (
          <li key={article.id}>
            <Link
              href={`/app/research/${article.slug}`}
              className="flex gap-3 overflow-hidden rounded-xl border border-border-card bg-card p-3 shadow-sm transition-colors active:bg-muted/40 [-webkit-tap-highlight-color:transparent]"
            >
              <div className="relative size-[88px] shrink-0 overflow-hidden rounded-lg bg-muted">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover"
                  sizes="88px"
                />
              </div>
              <div className="flex min-w-0 flex-1 flex-col justify-center gap-1">
                <div className="flex flex-wrap items-center gap-x-1.5 text-[11px] text-muted-foreground">
                  {article.category ? (
                    <span className="font-medium text-foreground/80">
                      {article.category}
                    </span>
                  ) : null}
                  {article.category ? <span aria-hidden>·</span> : null}
                  <span>{article.date}</span>
                  {article.readingTime ? (
                    <>
                      <span aria-hidden>·</span>
                      <span>{article.readingTime}</span>
                    </>
                  ) : null}
                </div>
                <p
                  className="line-clamp-2 text-[15px] font-semibold leading-snug text-foreground"
                  suppressHydrationWarning
                >
                  {article.title}
                </p>
                <p
                  className="line-clamp-2 text-xs leading-relaxed text-muted-foreground"
                  suppressHydrationWarning
                >
                  {article.excerpt}
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
