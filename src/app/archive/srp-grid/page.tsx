import type { Metadata } from "next"
import Link from "next/link"

import { BoatsForSaleListing } from "@/components/filters/boats-for-sale-listing"
import { listingBoats } from "@/data/boats"

export const metadata: Metadata = {
  title: "Archived SRP grid | Rightboat",
  description:
    "Q2 A/B loser: 4-column SRP grid with a filters drawer. Split view won and is now the live listing.",
}

/** Archived Q2 A/B variant — not the live SRP. */
export default function ArchivedSrpGridPage() {
  return (
    <div className="space-y-6">
      <aside className="rounded-2xl border border-border/60 bg-muted/30 px-6 py-4">
        <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
          Archived — Q2 2026
        </p>
        <h1 className="mt-1 text-lg font-semibold text-foreground">
          SRP 4-column grid (A/B loser)
        </h1>
        <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
          Split view won the Q2 listing experiment and is the live SRP: filters
          sidebar plus a 3-column grid on desktop. This page keeps the original
          4-column grid and filters drawer for reference.
        </p>
        <p className="mt-3 text-sm">
          <Link href="/boats-for-sale" className="underline underline-offset-4">
            Open the live split-view SRP
          </Link>
        </p>
      </aside>

      <BoatsForSaleListing
        boats={listingBoats}
        layoutVariant="archived-grid"
      />
    </div>
  )
}
