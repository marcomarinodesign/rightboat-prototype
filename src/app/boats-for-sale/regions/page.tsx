import type { Metadata } from "next"

import { BoatsForSaleListing } from "@/components/filters/boats-for-sale-listing"
import { regionInitialFilters } from "@/components/filters/region-initial-filters"
import { listingBoats } from "@/data/boats"

export const metadata: Metadata = {
  title: "Boats for Sale by Region | Rightboat",
  description:
    "Search boats by recognizable boating regions instead of picking states and countries one by one.",
}

type PageProps = {
  searchParams?: Promise<{ region?: string }>
}

export default async function BoatsForSaleRegionsPage({
  searchParams,
}: PageProps) {
  const sp = searchParams ? await searchParams : {}
  const initialFilters = regionInitialFilters(sp.region)

  return (
    <BoatsForSaleListing
      boats={listingBoats}
      initialFilters={initialFilters}
      enableRegions
    />
  )
}
