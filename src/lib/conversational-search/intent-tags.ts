import type { Boat } from "@/data/boats"
import { INTENT_KEYWORDS } from "@/lib/conversational-search/types"

export function boatMatchesIntentTags(
  boat: Boat,
  intentTags: string[]
): boolean {
  if (intentTags.length === 0) return true
  const haystack = [
    ...(boat.lifestyleTags ?? []),
    boat.description ?? "",
    boat.boatType ?? "",
    boat.model,
    boat.make,
  ]
    .join(" ")
    .toLowerCase()

  return intentTags.every((tag) => {
    const keywords = INTENT_KEYWORDS[tag] ?? [tag.replace(/-/g, " ")]
    return keywords.some((keyword) => haystack.includes(keyword.toLowerCase()))
  })
}
