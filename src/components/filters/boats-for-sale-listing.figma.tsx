// FIGMA FILE: https://www.figma.com/design/VOCH4pGubqSYza7CbL30c7/El-Captain-DS
// LAST SYNC: 2026-08-17
//
// SRP / Split view — node 279-1422 (canonical SRP after Q2)
// SRP / Archived grid — node 83-737 (Q2 A/B loser; do not evolve)

/**
 * Code Connect — BoatsForSaleListing
 *
 * Split (live):     /boats-for-sale              → sidebar + 3-col grid
 * Archived grid:    /archive/srp-grid            → 4-col grid + filters drawer
 */
import figma from "@figma/code-connect/react"

import { BoatsForSaleListing } from "./boats-for-sale-listing"
import { listingBoats } from "@/data/boats"

function SrpSplitView() {
  return <BoatsForSaleListing boats={listingBoats} layoutVariant="split" />
}

function SrpArchivedGridView() {
  return (
    <BoatsForSaleListing boats={listingBoats} layoutVariant="archived-grid" />
  )
}

figma.connect(
  SrpSplitView,
  "https://www.figma.com/design/VOCH4pGubqSYza7CbL30c7/El-Captain-DS?node-id=558-6909",
  {
    imports: [
      "// Live SRP: src/app/boats-for-sale/page.tsx",
      'import { BoatsForSaleListing } from "@/components/filters/boats-for-sale-listing"',
      'import { listingBoats } from "@/data/boats"',
    ],
    example: () => <SrpSplitView />,
  }
)

// Archived Q2 A/B (4-col grid + drawer): the Figma frame 83-737 no longer exists
// (verified 2026-08-30 — deleted from El-Captain-DS). The prototype route
// src/app/archive/srp-grid/page.tsx remains the only artifact; no Code Connect
// mapping is published for it. Do not evolve.
