import type { Metadata } from "next"
import { SellBv3LandingClient } from "./SellBv3LandingClient"

export const metadata: Metadata = {
  title: "Sell Your Boat Privately | Rightboat",
  description:
    "Sell your used boat privately, easily, and commission-free on Rightboat. Reach 2.5 million buyers.",
}

export default function SellBv3Page() {
  return <SellBv3LandingClient />
}
