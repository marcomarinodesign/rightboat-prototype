/**
 * SRP grid card variants — priority & volume (Figma SRP 279-1422):
 * 1. Manufacture (majority, highest-paying listings)
 * 2. Sponsored
 * 3. Simple (remainder)
 *
 * Base ratio for 15 slots: 8 manufacture · 4 sponsored · 3 simple.
 */
export type SrpGridCardVariant = "manufacture" | "sponsored" | "simple"

const BASE_TOTAL = 15
const BASE_MANUFACTURE = 8
const BASE_SPONSORED = 4

export function srpGridVariantCounts(total: number) {
  if (total <= 0) {
    return { manufacture: 0, sponsored: 0, simple: 0 }
  }

  let manufacture = Math.max(1, Math.round((total * BASE_MANUFACTURE) / BASE_TOTAL))
  let sponsored = Math.round((total * BASE_SPONSORED) / BASE_TOTAL)
  let simple = total - manufacture - sponsored

  if (simple < 0) {
    simple = 0
    sponsored = Math.max(0, total - manufacture)
  }

  while (manufacture <= sponsored && sponsored > 0) {
    manufacture += 1
    sponsored -= 1
  }
  while (manufacture <= simple && simple > 0) {
    manufacture += 1
    simple -= 1
  }

  const sum = manufacture + sponsored + simple
  if (sum !== total) {
    simple = Math.max(0, total - manufacture - sponsored)
  }

  return { manufacture, sponsored, simple }
}

/** Grid order: manufacture slots first, then sponsored, then simple. */
export function srpGridCardVariantAt(
  index: number,
  total: number
): SrpGridCardVariant {
  const { manufacture, sponsored } = srpGridVariantCounts(total)
  if (index < manufacture) return "manufacture"
  if (index < manufacture + sponsored) return "sponsored"
  return "simple"
}
