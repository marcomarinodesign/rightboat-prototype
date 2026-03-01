import type { Metadata } from "next"
import { SellBWizardClient } from "./SellBWizardClient"

export const metadata: Metadata = {
  title: "Sell Your Boat – Start Your Listing | Rightboat",
  description:
    "Fill in your boat details to create your listing. Takes less than 2 minutes.",
}

export default function SellBWizardPage() {
  return <SellBWizardClient />
}
