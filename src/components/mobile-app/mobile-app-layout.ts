/**
 * Single source of truth for native `/app/*` spacing so topbar + page headers stay aligned.
 * Top breathing matches tab bar: `max(1.25rem, safe-area)`.
 */
export const mobileAppGutterXClass = "px-[var(--mobile-margin)]"

/** Padding under status bar (symmetric intent with bottom tab bar inset). */
export const mobileAppTopbarSafeTopClass =
  "pt-[max(1.25rem,env(safe-area-inset-top,0px))]"

/** Toolbar row height (iOS-style ~44pt control strip). */
export const mobileAppTopbarRowClass = "h-12 min-h-12"

/**
 * Space between the sticky topbar and the first line of page content
 * (title row or trailing icon row).
 */
export const mobileAppBelowTopbarGapClass = "pt-4"

/** Space between optional `topTrailing` row and the large title. */
export const mobileAppHeaderAfterTrailingClass = "mb-3"

/**
 * Sticky offset for controls that should stay pinned while scrolling.
 * Topbar is NOT sticky, so controls pin to the top of the scroll container.
 */
export const mobileAppStickyUnderTopbarClass = "top-0"
