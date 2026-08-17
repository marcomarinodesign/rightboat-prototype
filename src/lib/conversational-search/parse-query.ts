import { US_COUNTRY_VALUE } from "@/components/filters/location-geo-data"
import { clearLocationFields } from "@/components/filters/location-filter-helpers"
import { defaultFilters, type FiltersState } from "@/components/filters/types"
import {
  INTENT_LABELS,
  type ConversationalParseResult,
  type InterpretedChip,
  type InterpretedFilterGroup,
} from "@/lib/conversational-search/types"

type Span = {
  start: number
  end: number
  apply: (filters: FiltersState, chips: InterpretedChip[]) => void
}

const STOPWORDS = new Set([
  "a",
  "an",
  "and",
  "are",
  "as",
  "at",
  "be",
  "boat",
  "boats",
  "by",
  "find",
  "for",
  "from",
  "get",
  "i",
  "im",
  "i'm",
  "in",
  "is",
  "kind",
  "looking",
  "me",
  "my",
  "near",
  "of",
  "on",
  "or",
  "please",
  "search",
  "show",
  "suitable",
  "that",
  "the",
  "to",
  "want",
  "with",
  "you",
  "we",
  "could",
  "our",
  "weekend",
  "weekends",
  "comfortable",
  "something",
  "ready",
  "days",
  "take",
  "around",
  "ideally",
  "quiet",
  "coastal",
  "lake",
])

type LocationHit = {
  pattern: RegExp
  label: string
  zipMatch?: string
  city?: string
  state?: string
  country?: string
}

const LOCATION_HITS: LocationHit[] = [
  {
    pattern: /\bpuget\s+sound\b/i,
    label: "Puget Sound",
    zipMatch: "Washington",
  },
  {
    pattern: /\bfort\s+lauderdale\b/i,
    label: "Fort Lauderdale",
    city: "fort-lauderdale",
    state: "florida",
    country: US_COUNTRY_VALUE,
  },
  {
    pattern: /\bmiami\b/i,
    label: "Miami",
    city: "miami",
    state: "florida",
    country: US_COUNTRY_VALUE,
  },
  {
    pattern: /\bseattle\b/i,
    label: "Seattle",
    city: "seattle",
    state: "washington",
    country: US_COUNTRY_VALUE,
  },
  {
    pattern: /\bflorida\b/i,
    label: "Florida",
    zipMatch: "Florida",
  },
  {
    pattern: /\bwashington\b/i,
    label: "Washington",
    zipMatch: "Washington",
  },
  {
    pattern: /\bcalifornia\b/i,
    label: "California",
    zipMatch: "California",
  },
  {
    pattern: /\btexas\b/i,
    label: "Texas",
    zipMatch: "Texas",
  },
  {
    pattern: /\bannapolis\b/i,
    label: "Annapolis",
    city: "annapolis",
    state: "maryland",
    country: US_COUNTRY_VALUE,
  },
  {
    pattern: /\b(united\s+kingdom|\buk)\b/i,
    label: "United Kingdom",
    zipMatch: "United Kingdom",
  },
  { pattern: /\bmonaco\b/i, label: "Monaco", zipMatch: "Monaco" },
]

type TypeHit = {
  pattern: RegExp
  label: string
  boatType: string
  boatClass?: "power" | "sail" | "unpowered"
  intentTag?: string
}

const TYPE_HITS: TypeHit[] = [
  {
    pattern: /\bcenter\s+consoles?\b/i,
    label: "Center console",
    boatType: "Center console",
    boatClass: "power",
  },
  {
    pattern: /\bcabin\s+cruisers?\b/i,
    label: "Cabin cruisers",
    boatType: "Cabin cruisers",
    boatClass: "power",
  },
  {
    pattern: /\bfamily\s+cruis(?:er|ing)s?\b/i,
    label: "Cabin cruisers",
    boatType: "Cabin cruisers",
    boatClass: "power",
    intentTag: "family",
  },
  {
    pattern: /\bcruising\s+boats?\b/i,
    label: "Cabin cruisers",
    boatType: "Cabin cruisers",
    boatClass: "power",
  },
  {
    pattern: /\bfishing\s+boats?\b|\bfishing\b/i,
    label: "Fishing boats",
    boatType: "Fishing boats",
    boatClass: "power",
  },
  {
    pattern: /\bsail\s*boats?\b|\bsail\b/i,
    label: "Sailboats",
    boatType: "Sailboats",
    boatClass: "sail",
  },
  {
    pattern: /\bcatamarans?\b/i,
    label: "Catamaran",
    boatType: "Catamaran",
  },
  {
    pattern: /\byachts?\b/i,
    label: "Yachts",
    boatType: "Yachts",
    boatClass: "power",
  },
  {
    pattern: /\btrawlers?\b/i,
    label: "Trawlers",
    boatType: "Trawlers",
    boatClass: "power",
  },
  {
    pattern: /\bbowriders?\b/i,
    label: "Bowrider",
    boatType: "Bowrider",
    boatClass: "power",
  },
  {
    pattern: /\bpontoon\s+boats?\b|\bpontons?\b/i,
    label: "Pontoon boats",
    boatType: "Pontoon boats",
    boatClass: "power",
  },
  {
    pattern: /\bflybridge\b/i,
    label: "Flybridge",
    boatType: "Flybridge",
    boatClass: "power",
  },
  {
    pattern: /\bpower\s*boats?\b/i,
    label: "Powerboats",
    boatType: "Powerboats",
    boatClass: "power",
  },
]

type IntentHit = {
  pattern: RegExp
  tag: string
}

const INTENT_HITS: IntentHit[] = [
  { pattern: /\bliv(?:e|ing)\s+aboard\b|\bliveaboard\b/i, tag: "liveaboard" },
  { pattern: /\bblue[\s-]?water\b/i, tag: "bluewater" },
  { pattern: /\btwin\s+outboards?\b/i, tag: "twin-outboards" },
  { pattern: /\boffshore\b/i, tag: "offshore" },
  { pattern: /\bday\s+boats?\b|\bdayboat\b|\bdaysailers?\b/i, tag: "day-boat" },
  { pattern: /\bfamily(?:-friendly)?\b/i, tag: "family" },
  { pattern: /\bfast\b/i, tag: "fast" },
  { pattern: /\bcabin\b/i, tag: "cabin" },
]

const MANUFACTURER_HITS = [
  "Boston Whaler",
  "Jeanneau",
  "Beneteau",
  "Bayliner",
  "Sunseeker",
  "Princess",
  "Lagoon",
  "Grady-White",
  "Sea Ray",
  "Formula",
]

function cloneFilters(): FiltersState {
  return {
    ...defaultFilters,
    condition: { ...defaultFilters.condition },
    intentTags: [],
  }
}

function feetToMeters(feet: number): string {
  return (feet / 3.28084).toFixed(1)
}

function parseMoney(raw: string, thousandSuffix: boolean): string {
  const n = parseFloat(raw.replace(/,/g, ""))
  if (Number.isNaN(n)) return ""
  return String(Math.round(thousandSuffix ? n * 1000 : n))
}

function formatPriceChip(max?: string, min?: string): string {
  const fmt = (value: string) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(Number(value))
  if (min && max) return `${fmt(min)}–${fmt(max)}`
  if (max) return `Under ${fmt(max)}`
  if (min) return `From ${fmt(min)}`
  return ""
}

function addSpan(spans: Span[], match: RegExpExecArray, apply: Span["apply"]) {
  spans.push({
    start: match.index,
    end: match.index + match[0].length,
    apply,
  })
}

function pickNonOverlapping(spans: Span[]): Span[] {
  const sorted = [...spans].sort((a, b) => {
    const lengthDelta = b.end - b.start - (a.end - a.start)
    if (lengthDelta !== 0) return lengthDelta
    return a.start - b.start
  })
  const chosen: Span[] = []
  for (const span of sorted) {
    const overlaps = chosen.some(
      (other) => span.start < other.end && span.end > other.start
    )
    if (!overlaps) chosen.push(span)
  }
  return chosen.sort((a, b) => a.start - b.start)
}

function leftoverPhrases(query: string, spans: Span[]): string[] {
  const occupied = pickNonOverlapping(spans)
  let cursor = 0
  const leftover: string[] = []
  const lower = query

  const pushChunk = (chunk: string) => {
    const cleaned = chunk
      .replace(/[.,!?;:]+/g, " ")
      .split(/\s+/)
      .map((token) => token.trim())
      .filter((token) => token && !STOPWORDS.has(token.toLowerCase()))
      .join(" ")
      .trim()
    if (cleaned) leftover.push(cleaned)
  }

  for (const span of occupied) {
    pushChunk(lower.slice(cursor, span.start))
    cursor = span.end
  }
  pushChunk(lower.slice(cursor))
  return leftover
}

function applyLocation(filters: FiltersState, hit: LocationHit) {
  if (hit.city && hit.state && hit.country) {
    filters.locationTab = "city-state"
    filters.locationCountry = hit.country
    filters.locationState = hit.state
    filters.locationCity = hit.city
    return
  }
  if (hit.zipMatch) {
    filters.locationTab = "zip"
    filters.locationZip = hit.zipMatch
  }
}

export function parseConversationalQuery(
  rawQuery: string
): ConversationalParseResult {
  const query = rawQuery.trim()
  const filters = cloneFilters()
  const chips: InterpretedChip[] = []
  const spans: Span[] = []

  if (!query) {
    return {
      query,
      filters,
      chips,
      unmatched: [],
      hasDescriptionBased: false,
    }
  }

  const collect = (pattern: RegExp, apply: Span["apply"]) => {
    const regex = new RegExp(pattern.source, pattern.flags.includes("g") ? pattern.flags : `${pattern.flags}g`)
    let match: RegExpExecArray | null
    while ((match = regex.exec(query)) !== null) {
      addSpan(spans, match, apply)
    }
  }

  for (const hit of LOCATION_HITS) {
    collect(hit.pattern, (next, nextChips) => {
      if (next.locationZip || next.locationCity) return
      applyLocation(next, hit)
      nextChips.push({
        id: `location-${hit.label}`,
        label: hit.label,
        filterGroup: "location",
        source: "filter",
      })
    })
  }

  for (const hit of TYPE_HITS) {
    collect(hit.pattern, (next, nextChips) => {
      if (next.boatType) return
      next.boatType = hit.boatType
      if (hit.boatClass) next.boatClass = hit.boatClass
      nextChips.push({
        id: `type-${hit.boatType}`,
        label: hit.label,
        filterGroup: "boatType",
        source: "filter",
      })
      if (hit.intentTag && !next.intentTags.includes(hit.intentTag)) {
        next.intentTags = [...next.intentTags, hit.intentTag]
        nextChips.push({
          id: `intent-${hit.intentTag}`,
          label: INTENT_LABELS[hit.intentTag] ?? hit.intentTag,
          filterGroup: "intent",
          source: "description",
          intentTag: hit.intentTag,
        })
      }
    })
  }

  for (const hit of INTENT_HITS) {
    collect(hit.pattern, (next, nextChips) => {
      if (next.intentTags.includes(hit.tag)) return
      // "cabin cruiser" already implies cabin; keep the type chip only.
      if (hit.tag === "cabin" && /cabin cruiser/i.test(next.boatType)) return
      next.intentTags = [...next.intentTags, hit.tag]
      nextChips.push({
        id: `intent-${hit.tag}`,
        label: INTENT_LABELS[hit.tag] ?? hit.tag,
        filterGroup: "intent",
        source: "description",
        intentTag: hit.tag,
      })
    })
  }

  for (const brand of MANUFACTURER_HITS) {
    collect(new RegExp(`\\b${brand.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "i"), (next, nextChips) => {
      if (next.manufacturer) return
      next.manufacturer = brand
      nextChips.push({
        id: `mfr-${brand}`,
        label: brand,
        filterGroup: "manufacturer",
        source: "filter",
      })
    })
  }

  collect(/\bused\s+and\s+new\b|\bnew\s+and\s+used\b/i, (next, nextChips) => {
    next.condition = { new: true, used: true }
    nextChips.push({
      id: "condition-both",
      label: "Used and new",
      filterGroup: "condition",
      source: "filter",
    })
  })
  collect(/\b(?:brand\s+)?new\b/i, (next, nextChips) => {
    if (next.condition.new || next.condition.used) return
    next.condition = { new: true, used: false }
    nextChips.push({
      id: "condition-new",
      label: "New",
      filterGroup: "condition",
      source: "filter",
    })
  })
  collect(/\bused\b|\bpre-owned\b|\bsecond[-\s]?hand\b/i, (next, nextChips) => {
    if (next.condition.new || next.condition.used) return
    next.condition = { new: false, used: true }
    nextChips.push({
      id: "condition-used",
      label: "Used",
      filterGroup: "condition",
      source: "filter",
    })
  })

  const priceMaxRegex =
    /(?:under|below|less\s+than|up\s+to|max(?:imum)?)\s*\$?\s*([\d,.]+)\s*(k)?/gi
  let priceMatch: RegExpExecArray | null
  while ((priceMatch = priceMaxRegex.exec(query)) !== null) {
    const captured = priceMatch
    addSpan(spans, captured, (next, nextChips) => {
      if (next.priceMax) return
      const value = parseMoney(captured[1], Boolean(captured[2]))
      if (!value) return
      next.priceMax = value
      nextChips.push({
        id: "price-max",
        label: formatPriceChip(value),
        filterGroup: "price",
        source: "filter",
      })
    })
  }

  const priceMinRegex =
    /(?:over|above|more\s+than|from|at\s+least)\s*\$?\s*([\d,.]+)\s*(k)?/gi
  while ((priceMatch = priceMinRegex.exec(query)) !== null) {
    const captured = priceMatch
    addSpan(spans, captured, (next, nextChips) => {
      if (next.priceMin) return
      const value = parseMoney(captured[1], Boolean(captured[2]))
      if (!value) return
      next.priceMin = value
      nextChips.push({
        id: "price-min",
        label: formatPriceChip(undefined, value),
        filterGroup: "price",
        source: "filter",
      })
    })
  }

  const lengthMaxRegex =
    /(?:under|below|less\s+than|up\s+to)\s*([\d.]+)\s*(?:feet|foot|ft|'|′)/gi
  let lengthMatch: RegExpExecArray | null
  while ((lengthMatch = lengthMaxRegex.exec(query)) !== null) {
    const captured = lengthMatch
    addSpan(spans, captured, (next, nextChips) => {
      if (next.lengthMax) return
      const feet = parseFloat(captured[1])
      if (Number.isNaN(feet)) return
      next.lengthMax = feetToMeters(feet)
      nextChips.push({
        id: "length-max",
        label: `Under ${captured[1]} ft`,
        filterGroup: "length",
        source: "filter",
      })
    })
  }

  const lengthMinRegex =
    /(?:over|above|more\s+than|at\s+least)\s*([\d.]+)\s*(?:feet|foot|ft|'|′)/gi
  while ((lengthMatch = lengthMinRegex.exec(query)) !== null) {
    const captured = lengthMatch
    addSpan(spans, captured, (next, nextChips) => {
      if (next.lengthMin) return
      const feet = parseFloat(captured[1])
      if (Number.isNaN(feet)) return
      next.lengthMin = feetToMeters(feet)
      nextChips.push({
        id: "length-min",
        label: `Over ${captured[1]} ft`,
        filterGroup: "length",
        source: "filter",
      })
    })
  }

  collect(/\b(?:diesel)\b/i, (next, nextChips) => {
    if (next.fuelType) return
    next.fuelType = "Diesel"
    nextChips.push({
      id: "fuel-diesel",
      label: "Diesel",
      filterGroup: "fuelType",
      source: "filter",
    })
  })

  const capacityRegex =
    /\b(?:for\s+)?(\d+|two|three|four|five|six|seven|eight|nine|ten)\s+(?:people|persons|guests|berths?)\b|\bsleeps\s+(\d+)\b/gi
  let capacityMatch: RegExpExecArray | null
  while ((capacityMatch = capacityRegex.exec(query)) !== null) {
    addSpan(spans, capacityMatch, () => {
      /* unmatched on purpose — no capacity filter */
    })
  }

  const selected = pickNonOverlapping(spans)
  for (const span of selected) {
    span.apply(filters, chips)
  }

  const unmatchedFromCapacity: string[] = []
  const capacityReplay = new RegExp(capacityRegex.source, "gi")
  let cap: RegExpExecArray | null
  while ((cap = capacityReplay.exec(query)) !== null) {
    unmatchedFromCapacity.push(cap[0].replace(/\s+/g, " ").trim())
  }

  const leftover = leftoverPhrases(query, selected).filter((phrase) => {
    const lower = phrase.toLowerCase()
    return !unmatchedFromCapacity.some(
      (item) => item.toLowerCase() === lower
    )
  })

  const unmatched = [...unmatchedFromCapacity, ...leftover]

  return {
    query,
    filters,
    chips,
    unmatched,
    hasDescriptionBased: chips.some((chip) => chip.source === "description"),
  }
}

export function conversationalChipIsActive(
  chip: InterpretedChip,
  filters: FiltersState
): boolean {
  switch (chip.filterGroup) {
    case "boatType":
      return Boolean(filters.boatType)
    case "boatClass":
      return Boolean(filters.boatClass)
    case "price":
      return Boolean(filters.priceMin || filters.priceMax)
    case "length":
      return Boolean(filters.lengthMin || filters.lengthMax)
    case "condition":
      return filters.condition.new || filters.condition.used
    case "location":
      return Boolean(
        filters.locationZip ||
          filters.locationCity ||
          filters.locationState ||
          filters.locationRegion
      )
    case "manufacturer":
      return Boolean(filters.manufacturer)
    case "fuelType":
      return Boolean(filters.fuelType)
    case "intent":
      return Boolean(
        chip.intentTag && filters.intentTags.includes(chip.intentTag)
      )
    default:
      return true
  }
}

export function clearConversationalChip(
  chip: InterpretedChip,
  filters: FiltersState
): FiltersState {
  const next: FiltersState = {
    ...filters,
    condition: { ...filters.condition },
    intentTags: [...filters.intentTags],
  }
  switch (chip.filterGroup) {
    case "boatType":
      next.boatType = ""
      next.boatClass = ""
      break
    case "boatClass":
      next.boatClass = ""
      break
    case "price":
      next.priceMin = ""
      next.priceMax = ""
      break
    case "length":
      next.lengthMin = ""
      next.lengthMax = ""
      break
    case "condition":
      next.condition = { new: false, used: false }
      break
    case "location":
      Object.assign(next, clearLocationFields())
      break
    case "manufacturer":
      next.manufacturer = ""
      next.model = ""
      break
    case "fuelType":
      next.fuelType = ""
      break
    case "intent":
      next.intentTags = next.intentTags.filter((tag) => tag !== chip.intentTag)
      break
  }
  return next
}

export type BroadenAction = {
  id: string
  label: string
  filterGroup: InterpretedFilterGroup
}

export function broadenActions(
  filters: FiltersState
): BroadenAction[] {
  const actions: BroadenAction[] = []
  if (filters.priceMax || filters.priceMin) {
    actions.push({
      id: "price",
      label: "Remove the price limit",
      filterGroup: "price",
    })
  }
  if (
    filters.locationZip ||
    filters.locationCity ||
    filters.locationState ||
    filters.locationRegion
  ) {
    actions.push({
      id: "location",
      label: "Search a wider area",
      filterGroup: "location",
    })
  }
  if (filters.intentTags.length > 0) {
    actions.push({
      id: "intent",
      label: "Drop lifestyle requirements",
      filterGroup: "intent",
    })
  }
  if (filters.lengthMax || filters.lengthMin) {
    actions.push({
      id: "length",
      label: "Widen the length range",
      filterGroup: "length",
    })
  }
  if (filters.boatType || filters.boatClass) {
    actions.push({
      id: "boatType",
      label: "Search all boat types",
      filterGroup: "boatType",
    })
  }
  return actions
}

/** @deprecated Prefer broadenActions; kept for copy-only fallbacks. */
export function broadenSuggestions(result: ConversationalParseResult): string[] {
  const actions = broadenActions(result.filters)
  if (actions.length === 0) return ["Try one of the suggested searches"]
  return actions.map((action) => action.label)
}

export function clearFilterGroup(
  group: InterpretedFilterGroup,
  filters: FiltersState
): FiltersState {
  if (group === "intent") {
    return {
      ...filters,
      condition: { ...filters.condition },
      intentTags: [],
    }
  }
  return clearConversationalChip(
    {
      id: `clear-${group}`,
      label: group,
      filterGroup: group,
      source: "filter",
    },
    filters
  )
}
