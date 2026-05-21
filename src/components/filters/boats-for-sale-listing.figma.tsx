// FIGMA FILE: https://www.figma.com/design/VOCH4pGubqSYza7CbL30c7/El-Captain-DS
// LAST SYNC: 2026-05-21
//
// SRP / Split view — node 279-1422 (no modificar SRP legacy 83-737)
// SRP / Default      — node 83-737

/**
 * Code Connect — BoatsForSaleListing (split + default layouts)
 *
 * Split:  /boats-for-sale?layout=split  → sidebar FiltersFormBody + 3-col grid
 * Default: /boats-for-sale             → Filters drawer + 4-col grid
 */
import figma from "@figma/code-connect/react"

import { BoatsForSaleListing } from "./boats-for-sale-listing"
import { listingBoats } from "@/data/boats"

function SrpSplitView() {
  return (
    <BoatsForSaleListing boats={listingBoats} layoutVariant="split" />
  )
}

function SrpDefaultView() {
  return (
    <BoatsForSaleListing boats={listingBoats} layoutVariant="default" />
  )
}

figma.connect(
  SrpSplitView,
  "https://www.figma.com/design/VOCH4pGubqSYza7CbL30c7/El-Captain-DS?node-id=279-1422",
  {
    imports: [
      "// Split: src/app/boats-for-sale/page.tsx?layout=split",
      'import { BoatsForSaleListing } from "@/components/filters/boats-for-sale-listing"',
      'import { listingBoats } from "@/data/boats"',
    ],
    example: () => <SrpSplitView />,
  }
)

figma.connect(
  SrpDefaultView,
  "https://www.figma.com/design/VOCH4pGubqSYza7CbL30c7/El-Captain-DS?node-id=83-737",
  {
    imports: [
      "// Default: src/app/boats-for-sale/page.tsx",
      'import { BoatsForSaleListing } from "@/components/filters/boats-for-sale-listing"',
      'import { listingBoats } from "@/data/boats"',
    ],
    example: () => <SrpDefaultView />,
  }
)
