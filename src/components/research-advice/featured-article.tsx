import Image from "next/image"
import Link from "next/link"

import { Article } from "@/data/articles"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

type FeaturedArticleProps = {
  article: Article
}

export function FeaturedArticle({ article }: FeaturedArticleProps) {
  return (
    <Card className="group overflow-hidden border-border/60 transition-all hover:shadow-lg">
      <div className="grid gap-0 lg:grid-cols-2">
        <Link href={article.href} className="relative block overflow-hidden">
          <Image
            src={article.image}
            alt={article.title}
            width={800}
            height={600}
            className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-105 lg:h-full lg:min-h-[400px]"
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
    </Card>
  )
}
