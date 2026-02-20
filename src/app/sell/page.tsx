import type { Metadata } from "next"
import { SellPageClient } from "./SellPageClient"

export const metadata: Metadata = {
  title: "Sell Your Boat | Rightboat",
  description:
    "List your boat for sale on Rightboat. Fill in a few details and our marine experts will get back to you within 24 hours.",
}

export default function SellPage() {
  return (
    <div className="mx-auto max-w-lg py-10">
      <SellPageClient />
    </div>
  )
}
