import Link from "next/link"
import Image from "next/image"

import { Article } from "@/data/articles"
import { Button } from "@/components/ui/button"

type ArticleCardProps = {
  article: Article
}

/** Homepage article tiles — pixel-perfect Figma spec (305×424, radius 16, padding 12) */
export function ArticleCard({ article }: ArticleCardProps) {
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-[rgb(242,242,242)] bg-white">
      <Link
        href={article.href}
        className="relative mx-3 mt-3 block h-[180px] shrink-0 overflow-hidden rounded-[8px]"
      >
        <Image
          src={article.image}
          alt={article.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-300 hover:scale-105"
        />
      </Link>
      <div className="flex flex-1 flex-col gap-2 p-3">
        <span className="text-xs font-normal leading-4 text-muted-foreground">
          {article.date}
        </span>
        <Link
          href={article.href}
          className="line-clamp-3 text-base font-bold leading-6 text-foreground hover:text-primary transition-colors"
        >
          {article.title}
        </Link>
        <p className="line-clamp-3 flex-1 text-sm font-normal leading-5 text-muted-foreground">
          {article.excerpt}
        </p>
        <Button
          asChild
          variant="outline"
          className="mt-1 h-10 w-full rounded-[8px] border-[rgb(228,229,233)] text-[13px] font-medium text-foreground"
        >
          <Link href={article.href}>Read article</Link>
        </Button>
      </div>
    </div>
  )
}
