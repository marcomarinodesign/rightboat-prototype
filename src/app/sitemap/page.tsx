import type { Metadata } from "next"

import { SitemapExplorer } from "@/app/sitemap/sitemap-explorer"
import { getSiteMapByQuarter } from "@/data/site-map"

export const metadata: Metadata = {
  title: "Sitemap | Rightboat",
  description:
    "Every prototype exploration by quarter and area of interest, with all of its links.",
}

export default function SitemapPage() {
  const groups = getSiteMapByQuarter()

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-10 space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Sitemap
        </h1>
        <p className="max-w-3xl text-sm text-muted-foreground">
          Every exploration in this prototype, grouped by quarter and area of
          interest. Each card lists all of its routes and variants, and every
          link can be copied on its own.
        </p>
      </div>

      <SitemapExplorer groups={groups} />
    </main>
  )
}
