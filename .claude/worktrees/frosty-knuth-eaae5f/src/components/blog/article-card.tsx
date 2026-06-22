import Link from "next/link"

import { Article } from "@/data/articles"
import { CardContent, CardHeader } from "@/components/ui/card"
import { ImageSlider } from "@/components/ui/image-slider"
import { InteractiveCard } from "@/components/patterns/interactive-card"

type ArticleCardProps = {
  article: Article
}

/** Homepage article tiles — Figma Card `58:875` (Latest articles) */
export function ArticleCard({ article }: ArticleCardProps) {
  return (
    <InteractiveCard
      className="group flex h-full flex-col overflow-hidden rounded-lg border-border bg-card shadow-sm"
      lift
    >
      <Link
        href={article.href}
        className="relative block w-full shrink-0 overflow-hidden rounded-t-lg"
      >
        <ImageSlider
          images={[article.image]}
          alt={article.title}
          showDots={false}
          imageRoundedClassName="rounded-t-lg rounded-b-none"
        />
      </Link>
      <CardHeader className="flex flex-1 flex-col gap-2 space-y-0 p-0 px-6 pb-0 pt-6">
        <div className="flex min-h-4 flex-wrap items-center gap-x-2 text-xs font-normal leading-4 text-midnight">
          {article.category ? (
            <>
              <span>{article.category}</span>
              <span className="text-midnight/35" aria-hidden>
                ·
              </span>
            </>
          ) : null}
          <span>{article.date}</span>
        </div>
        <Link
          href={article.href}
          className="line-clamp-2 text-lg font-semibold leading-[22.5px] text-midnight transition-colors group-hover:text-primary"
        >
          {article.title}
        </Link>
      </CardHeader>
      <CardContent className="flex-1 p-0 px-6 pb-6 pt-2">
        <p className="line-clamp-3 text-sm font-normal leading-5 text-midnight">
          {article.excerpt}
        </p>
      </CardContent>
    </InteractiveCard>
  )
}
