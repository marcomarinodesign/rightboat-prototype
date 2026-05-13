import { mobileToolbarTitleForPath } from "@/components/mobile-app/mobile-toolbar-titles"

export type MobileTopBarConfig = {
  /** Announced to assistive tech (`sr-only` in the bar). */
  ariaTitle: string
  showBack: boolean
  backHref?: string
  backLabel?: string
}

export function mobileTopBarConfig(
  pathname: string | null | undefined
): MobileTopBarConfig {
  const p = pathname ?? ""

  if (p.startsWith("/app/boat/")) {
    return {
      ariaTitle: "Listing",
      showBack: true,
      backHref: "/app/boats-for-sale",
      backLabel: "Boats",
    }
  }

  if (p.startsWith("/app/research/") && p !== "/app/research") {
    return {
      ariaTitle: "Article",
      showBack: true,
      backHref: "/app/research",
      backLabel: "Research",
    }
  }

  if (p.startsWith("/app/sell/") && p !== "/app/sell") {
    return {
      ariaTitle: "Sell",
      showBack: true,
      backHref: "/app/sell",
      backLabel: "Sell",
    }
  }

  return {
    ariaTitle: mobileToolbarTitleForPath(p),
    showBack: false,
  }
}
