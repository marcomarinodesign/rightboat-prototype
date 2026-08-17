import type { FiltersState } from "@/components/filters/types"

export type InterpretedChipSource = "filter" | "description"

export type InterpretedFilterGroup =
  | "boatType"
  | "boatClass"
  | "price"
  | "length"
  | "condition"
  | "location"
  | "manufacturer"
  | "fuelType"
  | "intent"

export type InterpretedChip = {
  id: string
  label: string
  filterGroup: InterpretedFilterGroup
  source: InterpretedChipSource
  intentTag?: string
}

export type ConversationalParseResult = {
  query: string
  filters: FiltersState
  chips: InterpretedChip[]
  unmatched: string[]
  hasDescriptionBased: boolean
}

export const INTENT_LABELS: Record<string, string> = {
  cabin: "Cabin",
  family: "Family-friendly",
  liveaboard: "Liveaboard",
  bluewater: "Bluewater",
  "twin-outboards": "Twin outboards",
  fast: "Fast",
  "day-boat": "Day boat",
  offshore: "Offshore",
}

/** Keywords used to match listing descriptions / lifestyle tags. */
export const INTENT_KEYWORDS: Record<string, readonly string[]> = {
  cabin: ["cabin", "cuddy", "aft cabin", "pilothouse"],
  family: ["family", "families", "family-friendly"],
  liveaboard: ["liveaboard", "living aboard", "live aboard"],
  bluewater: ["bluewater", "blue-water", "blue water", "offshore cruising"],
  "twin-outboards": ["twin outboard", "twin outboards", "twin engines"],
  fast: ["fast", "performance", "high-performance"],
  "day-boat": ["day boat", "dayboat", "daysailer", "day cruiser"],
  offshore: ["offshore", "bluewater"],
}
