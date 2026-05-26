/**
 * Sponsored label — aligned with `Badge variant="secondary"` (`src/components/ui/badge.tsx`).
 *
 * Web: `<Badge variant="secondary">Sponsored</Badge>`
 * Email: `sponsoredBadgeEmailStyle(fontFamily)`
 */

export const SPONSORED_LABEL = "Sponsored"

/** Hex values from globals.css — Badge secondary (bg-muted, text-muted-foreground). */
export const sponsoredBadgeColors = {
  background: "#fafafa",
  foreground: "#7181b4",
} as const

export function sponsoredBadgeEmailStyle(fontFamily: string) {
  return {
    display: "inline-block" as const,
    margin: 0,
    padding: "6px 12px",
    fontSize: 12,
    fontWeight: 500,
    lineHeight: "16px",
    color: sponsoredBadgeColors.foreground,
    backgroundColor: sponsoredBadgeColors.background,
    borderRadius: 9999,
    border: "1px solid transparent",
    fontFamily,
  }
}
