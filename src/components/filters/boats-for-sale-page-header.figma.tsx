// COMPONENT: SRP / Page Header — El-Captain-DS → Complex Components
// FIGMA FILE: https://www.figma.com/design/VOCH4pGubqSYza7CbL30c7/El-Captain-DS
// NODE: https://www.figma.com/design/VOCH4pGubqSYza7CbL30c7/El-Captain-DS?node-id=595-9355
// LAST SYNC: 2026-05-21

/**
 * Code Connect — SRP page header card (breadcrumb + H1 + intro)
 * Same block as the hero in BoatsForSaleListing.
 */
import figma from "@figma/code-connect/react"
import Link from "next/link"

import { BoatsForSaleListingIntro } from "./boats-for-sale-listing-intro"

function BoatsForSalePageHeader() {
  return (
    <div className="rounded-2xl border border-border/60 bg-card px-6 py-6 sm:px-8 sm:py-8">
      <div className="mb-1 text-sm text-muted-foreground">
        <Link href="/" className="hover:underline">
          Home
        </Link>{" "}
        / Boats for sale
      </div>
      <div>
        <h1 className="text-3xl font-bold text-foreground">Boats for sale</h1>
        <BoatsForSaleListingIntro className="mt-1" />
      </div>
    </div>
  )
}

figma.connect(
  BoatsForSalePageHeader,
  "https://www.figma.com/design/VOCH4pGubqSYza7CbL30c7/El-Captain-DS?node-id=595-9355",
  {
    imports: [
      'import Link from "next/link"',
      'import { BoatsForSaleListingIntro } from "@/components/filters/boats-for-sale-listing-intro"',
    ],
    example: () => <BoatsForSalePageHeader />,
  }
)
