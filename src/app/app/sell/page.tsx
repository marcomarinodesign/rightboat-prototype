import type { Metadata } from "next"

import { FSBOLandingClient } from "@/app/fsbo/FSBOLandingClient"
import { parseFsboPreviewMode } from "@/lib/fsbo/figma-preview"

export const metadata: Metadata = {
  title: "Sell Your Boat Privately | Rightboat",
  description:
    "Sell your used boat privately, easily, and commission-free on Rightboat. Reach 2.5 million buyers.",
}

type MobileAppSellPageProps = {
  searchParams?: Promise<{ figmaPreview?: string }>
}

export default async function MobileAppSellPage({
  searchParams,
}: MobileAppSellPageProps) {
  const params = (await searchParams) ?? {}

  return (
    <FSBOLandingClient
      surface="app"
      figmaPreview={parseFsboPreviewMode(params.figmaPreview)}
    />
  )
}
