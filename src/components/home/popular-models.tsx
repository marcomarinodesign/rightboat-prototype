import Link from "next/link"

import { popularModels } from "@/data/models"
import { CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { ImageSlider } from "@/components/ui/image-slider"
import { Button } from "@/components/ui/button"
import { InteractiveCard } from "@/components/patterns/interactive-card"

export function PopularModels() {
  return (
    <section className="space-y-6" aria-labelledby="models-heading">
      <div>
        <h2 id="models-heading" className="text-2xl font-bold">
          Popular Models
        </h2>
        <p className="mt-2 text-muted-foreground">
          Discover the most searched and trending boat models
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {popularModels.map((model) => {
          const href = `/boats-for-sale/${model.brandSlug}/${model.slug}`
          return (
            <InteractiveCard key={model.id} className="group overflow-hidden" lift>
              <Link href={href} className="relative block overflow-hidden rounded-t-lg">
                <ImageSlider
                  images={[model.image]}
                  alt={`${model.brand} ${model.name}`}
                  showDots={false}
                />
              </Link>
              <CardHeader className="space-y-2">
                <div className="text-xs uppercase tracking-wide text-muted-foreground">
                  {model.brand}
                </div>
                <Link
                  href={href}
                  className="text-lg font-bold leading-tight transition-colors group-hover:text-primary"
                >
                  {model.name}
                </Link>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex flex-wrap gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Length: </span>
                    <span className="font-medium">{model.length}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Type: </span>
                    <span className="font-medium">{model.type}</span>
                  </div>
                </div>
                <div className="text-sm">
                  <span className="text-muted-foreground">Price range: </span>
                  <span className="font-medium">{model.priceRange}</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  asChild
                  variant="outline"
                  className="w-full"
                  size="sm"
                >
                  <Link href={href}>View model</Link>
                </Button>
              </CardFooter>
            </InteractiveCard>
          )
        })}
      </div>
    </section>
  )
}
