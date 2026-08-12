import { getRegion } from "@/components/filters/region-data"
import { defaultFilters, type FiltersState } from "@/components/filters/types"

/**
 * Filters preset for a region landing URL
 * (/boats-for-sale/regions/[region] or ?region=…).
 */
export function regionInitialFilters(
  regionSlug: string | undefined
): FiltersState | undefined {
  if (!regionSlug || !getRegion(regionSlug)) return undefined
  return {
    ...defaultFilters,
    condition: { ...defaultFilters.condition },
    locationTab: "region",
    locationRegion: regionSlug,
    locationRegionExcluded: [],
    locationRegionAdded: [],
  }
}
