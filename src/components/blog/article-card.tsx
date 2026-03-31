import Link from "next/link"

import { Article } from "@/data/articles"
import { CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ImageSlider } from "@/components/ui/image-slider"
import { InteractiveCard } from "@/components/patterns/interactive-card"

type ArticleCardProps = {
  article: Article
}

export function ArticleCard({ article }: ArticleCardProps) {
  return (
    <InteractiveCard className="group overflow-hidden" lift>
      <Link href={article.href} className="relative block overflow-hidden rounded-t-lg">
        <ImageSlider
          images={[article.image]}
          alt={article.title}
          showDots={false}
        />
      </Link>
      <CardHeader className="space-y-2">
        <div className="flex items-center gap-2">
          {article.category && (
            <Badge variant="default" className="text-[11px] px-2 py-0.5">
              {article.category}
            </Badge>
          )}
          <p className="text-xs text-muted-foreground">
            {article.date}
          </p>
        </div>
        <Link
          href={article.href}
          className="text-lg font-semibold leading-tight transition-colors group-hover:text-primary"
        >
          {article.title}
        </Link>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{article.excerpt}</p>
      </CardContent>
    </InteractiveCard>
  )
}
