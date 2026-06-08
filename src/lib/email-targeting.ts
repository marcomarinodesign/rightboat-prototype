import type { BoatType, AdCreative } from "@/components/email/saved-search-email"
import { HOUSE_AD_FALLBACK } from "@/components/email/saved-search-email"

export type PickedAds = {
  premiumPartner: AdCreative
  trustedPartner: AdCreative
  footerSponsors: [AdCreative, AdCreative, AdCreative]
}

/**
 * Returns the recommended sponsor category for a given boat type.
 * Based on PRD behavioral targeting examples.
 */
export function getSponsorCategories(boatType: BoatType): string[] {
  const map: Record<BoatType, string[]> = {
    "center-console": ["Insurance", "Trailer"],
    sailboat: ["Insurance", "Electronics"],
    yacht: ["Financing", "Crew services"],
    catamaran: ["Transport"],
    other: ["Insurance"],
  }
  return map[boatType] ?? map.other
}

function resolveCreative(
  allCreatives: Record<string, AdCreative>,
  keys: string[],
  fallback: AdCreative = HOUSE_AD_FALLBACK
): AdCreative {
  for (const key of keys) {
    const creative = allCreatives[key]
    if (creative) return creative
  }
  return fallback
}

/**
 * Picks the contextually relevant ad creatives for a saved search context.
 * In production this logic lives server-side (GAM targeting); this helper
 * is for prototype demo and Storybook stories only.
 *
 * Updated Q2 2026: removed serviceSponsors (Slots 2–3 removed per feedback).
 */
export function pickAdsForContext(
  boatType: BoatType,
  allCreatives: Record<string, AdCreative>
): PickedAds {
  const categories = getSponsorCategories(boatType)
  const [primaryCategory] = categories

  const categorySlug = (category?: string) =>
    category?.toLowerCase().replace(/\s+/g, "-") ?? "insurance"

  const premiumKeys = [
    `${boatType}-premium`,
    `${categorySlug(primaryCategory)}-premium`,
    "premium",
  ]
  const trustedKeys = [
    `${boatType}-trusted`,
    `${categorySlug(primaryCategory)}-trusted`,
    "trusted",
  ]
  const footerKeys = (index: number) => [
    `${boatType}-footer-${index}`,
    `${categorySlug(categories[index - 1] ?? primaryCategory)}-footer`,
    `footer-${index}`,
  ]

  return {
    premiumPartner: resolveCreative(allCreatives, premiumKeys),
    trustedPartner: resolveCreative(allCreatives, trustedKeys),
    footerSponsors: [
      resolveCreative(allCreatives, footerKeys(1)),
      resolveCreative(allCreatives, footerKeys(2)),
      resolveCreative(allCreatives, footerKeys(3)),
    ],
  }
}
