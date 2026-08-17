import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"

import { BoatsForSaleListing } from "@/components/filters/boats-for-sale-listing"
import { ALL_REGIONS, getRegion } from "@/components/filters/region-data"
import { regionInitialFilters } from "@/components/filters/region-initial-filters"
import { listingBoats } from "@/data/boats"

type PageProps = {
  params: Promise<{ region: string }>
}

export function generateStaticParams() {
  return ALL_REGIONS.map((region) => ({ region: region.value }))
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { region: slug } = await params
  const region = getRegion(slug)
  if (!region) return { title: "Region not found | Rightboat" }
  return {
    title: `Boats for Sale in the ${region.label} | Rightboat`,
    description: `Browse boats for sale across the ${region.label} — ${region.summary}.`,
  }
}

/** Stable, readable region URL: /boats-for-sale/regions/pacific-northwest */
export default async function RegionLandingPage({ params }: PageProps) {
  const { region: slug } = await params
  const region = getRegion(slug)
  if (!region) notFound()

  return (
    <div className="space-y-8">
      <section className="rounded-2xl border border-border/60 bg-card px-6 py-6 sm:px-8">
        <div className="mb-1 text-sm text-muted-foreground">
          <Link href="/boats-for-sale" className="hover:underline">
            Boats for sale
          </Link>{" "}
          /{" "}
          <Link href="/boats-for-sale/regions" className="hover:underline">
            Regions
          </Link>{" "}
          / {region.label}
        </div>
        <h1 className="text-3xl font-bold text-foreground">
          Boats for sale in the {region.label}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">{region.summary}</p>
        <p className="mt-3 text-sm text-muted-foreground">
          Includes{" "}
          <span className="text-foreground">
            {region.locations.map((location) => location.label).join(", ")}
          </span>
          . Adjust the included locations from{" "}
          <span className="font-medium text-foreground">
            Filters → Location → Region
          </span>
          .
        </p>
      </section>

      <BoatsForSaleListing
        boats={listingBoats}
        initialFilters={regionInitialFilters(slug)}
        enableRegions
      />
    </div>
  )
}
