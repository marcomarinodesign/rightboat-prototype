import Image from "next/image"
import Link from "next/link"

import { Article } from "@/data/articles"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

type ArticleCardProps = {
  article: Article
}

export function ArticleCard({ article }: ArticleCardProps) {
  return (
    <Card className="group overflow-hidden border-border/60 transition-all hover:-translate-y-0.5 hover:shadow-lg">
      <Link href={article.href} className="relative block overflow-hidden">
        <Image
          src={article.image}
          alt={article.title}
          width={640}
          height={420}
          className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </Link>
      <CardHeader className="space-y-2">
        <p className="text-xs uppercase tracking-wide text-muted-foreground">
          {article.date}
        </p>
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
    </Card>
  )
}
