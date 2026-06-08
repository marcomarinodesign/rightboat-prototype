import { defaultFilters, type FiltersState } from "@/components/filters/types"

/** Dev/capture-only states for Figma Mobile Overview frames. */
export type FigmaPreviewState =
  | "default"
  | "filters-open"
  | "active-filters"
  | "empty"
  | "sort-open"
  | "filters-scrolled"
  | "save-search-toast"
  | "marketing-footer"

export function parseFigmaPreviewState(
  value: string | undefined
): FigmaPreviewState | undefined {
  const valid: FigmaPreviewState[] = [
    "default",
    "filters-open",
    "active-filters",
    "empty",
    "sort-open",
    "filters-scrolled",
    "save-search-toast",
    "marketing-footer",
  ]
  if (value && valid.includes(value as FigmaPreviewState)) {
    return value as FigmaPreviewState
  }
  return undefined
}

export function figmaPreviewInitialFilters(
  state: FigmaPreviewState | undefined
): FiltersState | undefined {
  if (state === "active-filters") {
    return {
      ...defaultFilters,
      condition: { ...defaultFilters.condition },
      boatClass: "power",
      priceMin: "50000",
    }
  }
  if (state === "empty") {
    return {
      ...defaultFilters,
      condition: { ...defaultFilters.condition },
      priceMin: "999999999",
    }
  }
  return undefined
}

export function figmaPreviewInitialDrawerOpen(
  state: FigmaPreviewState | undefined
): boolean {
  return (
    state === "filters-open" ||
    state === "filters-scrolled"
  )
}

export function figmaPreviewScrollDrawer(
  state: FigmaPreviewState | undefined
): boolean {
  return state === "filters-scrolled"
}

export function figmaPreviewInitialSortOpen(
  state: FigmaPreviewState | undefined
): boolean {
  return state === "sort-open"
}

export function figmaPreviewShowToast(
  state: FigmaPreviewState | undefined
): boolean {
  return state === "save-search-toast"
}
