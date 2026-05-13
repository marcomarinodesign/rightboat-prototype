export function mobileToolbarTitleForPath(pathname: string | null | undefined) {
  const p = pathname ?? ""

  if (p === "/app" || p === "/app/home") return "Rightboat"
  if (p === "/app/boats-for-sale") return "Boats"
  if (p.startsWith("/app/boat/")) return "Listing"
  if (p === "/app/research") return "Research"
  if (p.startsWith("/app/research/")) return "Article"
  if (p === "/app/sell") return "Sell"
  if (p.startsWith("/app/sell/")) return "Sell"
  if (p === "/app/messages") return "Messages"
  if (p === "/app/profile") return "Profile"
  if (p === "/app/saved") return "Saved"
  if (p === "/app/search") return "Search"

  return "Rightboat"
}

