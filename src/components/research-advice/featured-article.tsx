import Link from "next/link"

import { Article } from "@/data/articles"
import { CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ImageSlider } from "@/components/ui/image-slider"
import { InteractiveCard } from "@/components/patterns/interactive-card"

type FeaturedArticleProps = {
  article: Article
}

export function FeaturedArticle({ article }: FeaturedArticleProps) {
  return (
    <InteractiveCard className="group overflow-hidden" lift={false}>
      <div className="grid gap-0 lg:grid-cols-2">
        <Link href={article.href} className="relative block overflow-hidden rounded-t-lg lg:rounded-l-lg lg:rounded-tr-none">
          <ImageSlider
            images={[article.image]}
            alt={article.title}
            showDots={false}
            className="lg:min-h-[25rem]"
          />
        </Link>
        <div className="flex flex-col">
          <CardHeader className="space-y-3">
            {article.category && (
              <Badge variant="secondary" className="w-fit">
                {article.category}
              </Badge>
            )}
            <Link
              href={article.href}
              className="text-2xl font-bold leading-tight transition-colors hover:text-primary lg:text-3xl"
            >
              {article.title}
            </Link>
          </CardHeader>
          <CardContent className="flex flex-1 flex-col justify-between space-y-4">
            <p className="text-base leading-relaxed text-muted-foreground">
              {article.excerpt}
            </p>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                {article.author && <span>{article.author}</span>}
                {article.author && article.date && <span>•</span>}
                {article.date && <span>{article.date}</span>}
                {article.readingTime && (
                  <>
                    <span>•</span>
                    <span>{article.readingTime}</span>
                  </>
                )}
              </div>
              <Button asChild className="w-fit">
                <Link href={article.href}>Read article</Link>
              </Button>
            </div>
          </CardContent>
        </div>
      </div>
    </InteractiveCard>
  )
}
