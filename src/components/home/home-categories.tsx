import Image from "next/image"
import Link from "next/link"

import { boatCategories } from "@/data/categories-extended"
import { Card, CardContent } from "@/components/ui/card"

export function HomeCategories() {
  return (
    <section className="space-y-6" aria-labelledby="categories-heading">
      <div>
        <h2 id="categories-heading" className="text-2xl font-semibold">
          Boats by Categories
        </h2>
        <p className="mt-2 text-muted-foreground">
          Explore boats by type and find the perfect vessel for your needs
        </p>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {boatCategories.map((category) => (
          <Card
            key={category.id}
            className="group overflow-hidden border-border/60 transition-all hover:-translate-y-0.5 hover:shadow-lg"
          >
            <Link
              href={`/boats-for-sale?type=${category.slug}`}
              className="relative block"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-lg font-semibold text-foreground">
                    {category.name}
                  </h3>
                </div>
              </div>
            </Link>
            <CardContent className="p-4 pt-2">
              <p className="text-sm text-muted-foreground">
                {category.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
