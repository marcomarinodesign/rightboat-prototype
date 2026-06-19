import { popularModels } from "@/data/models"

// ─── Brand → Boat Type mapping ──────────────────────────────────────────────
const BRAND_TYPE_MAP: Record<string, string> = {
  // Sailing
  Bavaria: "Sailboat",
  Beneteau: "Sailboat",
  Jeanneau: "Sailboat",
  Hallberg: "Sailboat",
  Catalina: "Sailboat",
  Hunter: "Sailboat",
  Dehler: "Sailboat",
  Hanse: "Sailboat",
  "X-Yachts": "Sailboat",
  Moody: "Sailboat",
  Westerly: "Sailboat",
  Contessa: "Sailboat",
  Dufour: "Sailboat",
  Elan: "Sailboat",
  Sirius: "Sailboat",
  Oyster: "Sailboat",
  Swan: "Sailboat",
  Amel: "Sailboat",
  Malo: "Sailboat",
  Najad: "Sailboat",
  Rival: "Sailboat",
  Southerly: "Sailboat",
  Island: "Sailboat",
  // Motorboats
  Sunseeker: "Motorboat",
  Princess: "Motorboat",
  Fairline: "Motorboat",
  Sealine: "Motorboat",
  Cobalt: "Motorboat",
  Regal: "Motorboat",
  Bayliner: "Motorboat",
  "Sea Ray": "Motorboat",
  "Four Winns": "Motorboat",
  Chaparral: "Motorboat",
  Broom: "Motorboat",
  Shetland: "Motorboat",
  Hardy: "Motorboat",
  Nimbus: "Motorboat",
  Aquastar: "Motorboat",
  Freeman: "Motorboat",
  Birchwood: "Motorboat",
  Fletcher: "Motorboat",
  // Rigid Inflatable Boats → Motorboat
  Ribeye: "Motorboat",
  Avon: "Motorboat",
  Zodiac: "Motorboat",
  Narwhal: "Motorboat",
  Humber: "Motorboat",
  Honwave: "Motorboat",
  Bombard: "Motorboat",
  // Catamarans → Sailboat
  Lagoon: "Sailboat",
  Leopard: "Sailboat",
  Fountaine: "Sailboat",
  Catana: "Sailboat",
  Privilege: "Sailboat",
  // Canal Boats → Motorboat
  Springer: "Motorboat",
  "Liverpool Boats": "Motorboat",
  "Heritage Narrowboats": "Motorboat",
  // Fishing Boats → Motorboat
  Orkney: "Motorboat",
  "Boston Whaler": "Motorboat",
  Stabicraft: "Motorboat",
}

function inferBoatType(brand: string): string | null {
  const b = brand.trim().toLowerCase()
  for (const [key, type] of Object.entries(BRAND_TYPE_MAP)) {
    if (b.includes(key.toLowerCase())) return type
  }
  return null
}

// ─── Infer category from boat type ──────────────────────────────────────────
function inferCategory(boatType: string): string | null {
  const map: Record<string, string> = {
    Sailboat: "Cruising Sailboats",
    Motorboat: "Cruisers",
    Catamaran: "Catamaran",
    RIB: "RIB boats",
    "Canal Boat": "Narrowboats",
    "Fishing Boat": "Fishing boats",
  }
  return map[boatType] ?? null
}

// ─── Generate a template description ────────────────────────────────────────
function generateDescription(brand: string, model: string, year: number, boatType: string): string {
  const displayName = [brand, model].filter(Boolean).join(" ")
  const typeLabel = boatType || "boat"
  return `This ${year ? year + " " : ""}${displayName} is a well-maintained ${typeLabel.toLowerCase()} offering a great combination of performance, comfort, and reliability. She has been carefully looked after and is ready for her next adventure. Full service history available on request. Viewing highly recommended.`
}

const MIN_LENGTH_FT = 10
const MAX_LENGTH_FT = 120

function parseLengthFeet(value: string): number | null {
  const n = parseInt(value.replace(/\D/g, ""), 10)
  if (Number.isNaN(n) || n < MIN_LENGTH_FT || n > MAX_LENGTH_FT) return null
  return n
}

/** LP stores model slug — resolve length from catalog when possible */
function lookupCatalogLength(model: string, brand?: string): number | null {
  const key = model.trim().toLowerCase()
  if (!key) return null

  const brandKey = brand?.trim().toLowerCase()

  const match = popularModels.find((m) => {
    const slug = m.slug.toLowerCase()
    const name = m.name.toLowerCase()
    const full = `${m.brand} ${m.name}`.toLowerCase()
    if (slug === key || name === key || full === key) return true
    if (brandKey && m.brand.toLowerCase() === brandKey && slug === key) return true
    return false
  })

  if (!match) return null
  return parseLengthFeet(match.length)
}

// ─── Extract length from model name or slug ─────────────────────────────────
function inferLength(model: string, brand?: string): number | null {
  const fromCatalog = lookupCatalogLength(model, brand)
  if (fromCatalog) return fromCatalog

  const normalized = model.trim()
  if (!normalized) return null

  // Slugs like v65, r27, 39xp — digits at end without word boundary
  const suffixDigits = normalized.match(/[a-z]+(\d{2,3})$/i)
  if (suffixDigits) {
    const n = parseInt(suffixDigits[1], 10)
    if (n >= MIN_LENGTH_FT && n <= MAX_LENGTH_FT) return n
  }

  // Slugs like vision-46, sun-odyssey-410 (prefer last hyphen segment)
  const hyphenSegments = normalized.match(/-(\d{1,3})(?:-|$)/g)
  if (hyphenSegments) {
    for (let i = hyphenSegments.length - 1; i >= 0; i--) {
      const n = parseInt(hyphenSegments[i].replace(/\D/g, ""), 10)
      if (n >= MIN_LENGTH_FT && n <= MAX_LENGTH_FT) return n
    }
  }

  // Free text: "Bavaria 34 Cruiser", "Sunseeker 52"
  const matches = normalized.match(/\b(\d{1,3})\b/g)
  if (!matches) return null
  for (const m of matches) {
    const n = parseInt(m, 10)
    if (n >= MIN_LENGTH_FT && n <= MAX_LENGTH_FT) return n
  }
  return null
}

// ─── Infer condition from year ───────────────────────────────────────────────
function inferCondition(year: number): string {
  const age = new Date().getFullYear() - year
  if (age <= 3) return "Excellent"
  if (age <= 10) return "Good"
  return "Good"
}

// ─── Public API ──────────────────────────────────────────────────────────────
export interface AIPreFillInput {
  brand: string
  model: string
  year: number
}

export interface AIPreFillResult {
  filledFields: Set<string>
  values: {
    boatType?: string
    length?: number
    condition?: string
    category?: string
    hullMaterial?: string
    description?: string
  }
}

export function runAIPreFill(input: AIPreFillInput): AIPreFillResult {
  const filledFields = new Set<string>()
  const values: AIPreFillResult["values"] = {}

  const boatType = inferBoatType(input.brand)
  if (boatType) {
    values.boatType = boatType
    filledFields.add("boatType")

    const category = inferCategory(boatType)
    if (category) {
      values.category = category
      filledFields.add("category")
    }
  }

  // Always set hull material when brand is known
  if (input.brand) {
    values.hullMaterial = "GRP"
    filledFields.add("hullMaterial")
  }

  const length = inferLength(input.model, input.brand)
  if (length) {
    values.length = length
    filledFields.add("length")
  }

  if (input.year && input.year > 1900) {
    values.condition = inferCondition(input.year)
    filledFields.add("condition")
  }

  if (input.brand || input.model) {
    values.description = generateDescription(
      input.brand,
      input.model,
      input.year,
      values.boatType ?? ""
    )
    filledFields.add("description")
  }

  return { filledFields, values }
}
