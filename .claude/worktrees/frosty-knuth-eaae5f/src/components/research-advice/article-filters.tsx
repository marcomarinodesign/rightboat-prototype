"use client"

import { Button } from "@/components/ui/button"
import { articleCategories, type ArticleCategory } from "@/data/research-articles"

type ArticleFiltersProps = {
  selectedCategory: ArticleCategory
  onCategoryChange: (category: ArticleCategory) => void
}

export function ArticleFilters({
  selectedCategory,
  onCategoryChange,
}: ArticleFiltersProps) {
  return (
    <nav
      aria-label="Article categories"
      className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide"
    >
      {articleCategories.map((category) => {
        const isActive = selectedCategory === category
        return (
          <Button
            key={category}
            variant={isActive ? "default" : "outline"}
            size="sm"
            onClick={() => onCategoryChange(category)}
            aria-pressed={isActive}
            aria-label={`Filter by ${category}`}
            className="whitespace-nowrap"
          >
            {category}
          </Button>
        )
      })}
    </nav>
  )
}
