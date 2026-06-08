// FIGMA FILE: https://www.figma.com/design/VOCH4pGubqSYza7CbL30c7/El-Captain-DS
// PAGE: Mobile Overview (333-2055)
// LAST SYNC: 2026-05-27

/**
 * Code Connect — FiltersDrawer (mobile bottom sheet on SRP)
 */
import figma from "@figma/code-connect/react"
import * as React from "react"

import { FiltersDrawer } from "./filters-drawer"
import { defaultFilters } from "./types"
import { listingBoats } from "@/data/boats"

function FiltersDrawerMobileOpen() {
  const [filters, setFilters] = React.useState(defaultFilters)
  return (
    <FiltersDrawer
      open
      onOpenChange={() => undefined}
      filters={filters}
      onFiltersChange={setFilters}
      onClearAll={() => setFilters({ ...defaultFilters, condition: { ...defaultFilters.condition } })}
      resultCount={listingBoats.length}
      boats={listingBoats}
      previewMode="mobile"
    />
  )
}

function FiltersDrawerMobileScrolled() {
  const [filters, setFilters] = React.useState(defaultFilters)
  return (
    <FiltersDrawer
      open
      onOpenChange={() => undefined}
      filters={filters}
      onFiltersChange={setFilters}
      onClearAll={() => setFilters({ ...defaultFilters, condition: { ...defaultFilters.condition } })}
      resultCount={listingBoats.length}
      boats={listingBoats}
      previewMode="mobile"
      scrollOnOpen
    />
  )
}

figma.connect(
  FiltersDrawerMobileOpen,
  "https://www.figma.com/design/VOCH4pGubqSYza7CbL30c7/El-Captain-DS?node-id=337-5",
  {
    imports: [
      'import { FiltersDrawer } from "@/components/filters/filters-drawer"',
      'import { listingBoats } from "@/data/boats"',
    ],
    example: () => <FiltersDrawerMobileOpen />,
  }
)

figma.connect(
  FiltersDrawerMobileScrolled,
  "https://www.figma.com/design/VOCH4pGubqSYza7CbL30c7/El-Captain-DS?node-id=337-9",
  {
    imports: [
      'import { FiltersDrawer } from "@/components/filters/filters-drawer"',
      'import { listingBoats } from "@/data/boats"',
    ],
    example: () => <FiltersDrawerMobileScrolled />,
  }
)
