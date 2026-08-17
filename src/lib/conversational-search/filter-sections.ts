import type { InterpretedFilterGroup } from "@/lib/conversational-search/types"

export const FILTER_SECTION_IDS: Record<InterpretedFilterGroup, string> = {
  location: "filter-section-location",
  price: "filter-section-price",
  length: "filter-section-length",
  condition: "filter-section-condition",
  boatType: "filter-section-boat-type",
  boatClass: "filter-section-boat-type",
  manufacturer: "filter-section-manufacturer",
  fuelType: "filter-section-fuel",
  intent: "conversational-search-srp",
}

export function scrollToFilterSection(sectionId: string, delayMs = 0) {
  const run = () => {
    document.getElementById(sectionId)?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    })
  }
  if (delayMs <= 0) {
    run()
    return
  }
  window.setTimeout(run, delayMs)
}
