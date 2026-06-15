import type { Metadata } from "next"
import { Suspense } from "react"

import { FSBOLandingClient } from "@/app/fsbo/FSBOLandingClient"

export const metadata: Metadata = {
  title: "Sell Your Boat Privately | Rightboat",
  description:
    "Sell your used boat privately, easily, and commission-free on Rightboat. Reach 2.5 million buyers.",
}

export default function MobileAppSellPage() {
  return (
    <Suspense fallback={null}>
      <FSBOLandingClient surface="app" />
    </Suspense>
  )
}
