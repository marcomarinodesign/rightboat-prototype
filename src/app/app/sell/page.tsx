import type { Metadata } from "next"

import { FSBOLandingClient } from "@/app/fsbo/FSBOLandingClient"

export const metadata: Metadata = {
  title: "Sell Your Boat Privately | Rightboat",
  description:
    "Sell your used boat privately, easily, and commission-free on Rightboat. Reach 2.5 million buyers.",
}

export default function MobileAppSellPage() {
  return <FSBOLandingClient surface="app" />
}
