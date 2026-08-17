"use client"

import * as React from "react"
import { useRouter } from "next/navigation"

import type { FiltersState } from "@/components/filters/types"

type UseRegionFilterUrlSyncOptions = {
  enabled: boolean
  filters: FiltersState
}

/** Keeps only the experimental regional selections in the URL. Legacy URL fields stay untouched. */
export function useRegionFilterUrlSync({
  enabled,
  filters,
}: UseRegionFilterUrlSyncOptions) {
  const router = useRouter()

  React.useEffect(() => {
    if (!enabled) return

    const nextParams = new URLSearchParams(window.location.search)
    nextParams.delete("region")
    nextParams.delete("includeLocation")
    nextParams.delete("excludeLocation")

    filters.selectedRegionIds.forEach((id) => nextParams.append("region", id))
    filters.includedLocationIds.forEach((id) =>
      nextParams.append("includeLocation", id)
    )
    filters.excludedLocationIds.forEach((id) =>
      nextParams.append("excludeLocation", id)
    )

    const currentQuery = window.location.search.slice(1)
    const nextQuery = nextParams.toString()
    if (nextQuery === currentQuery) return

    router.replace(
      nextQuery
        ? `${window.location.pathname}?${nextQuery}`
        : window.location.pathname,
      {
      scroll: false,
      }
    )
  }, [
    enabled,
    filters.excludedLocationIds,
    filters.includedLocationIds,
    filters.selectedRegionIds,
    router,
  ])
}
