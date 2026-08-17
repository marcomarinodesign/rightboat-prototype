import { regionTestFiltersFromSearchParams } from "@/components/filters/location-regions"
import { MobileSearchScreen } from "@/components/mobile-app/screens/search-screen"

type PageProps = {
  searchParams?: Promise<{
    locationVariant?: string
    region?: string | string[]
    includeLocation?: string | string[]
    excludeLocation?: string | string[]
    q?: string
  }>
}

export default async function MobileAppBoatsForSalePage({
  searchParams,
}: PageProps) {
  const sp = searchParams ? await searchParams : {}
  const locationVariant =
    sp.locationVariant === "region-test" ? ("region-test" as const) : undefined
  const initialFilters = locationVariant
    ? regionTestFiltersFromSearchParams(sp)
    : undefined
  const conversationalQuery = typeof sp.q === "string" ? sp.q : undefined

  return (
    <MobileSearchScreen
      initialFilters={initialFilters}
      locationVariant={locationVariant}
      conversationalQuery={conversationalQuery}
    />
  )
}
