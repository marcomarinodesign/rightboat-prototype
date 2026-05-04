import Link from "next/link"

import { BdpInactiveSimilarCarousel } from "@/components/boats/bdp/bdp-inactive-similar-carousel"

type BdpInactiveVariantBTopProps = {
  boatType: string
  viewAllHref: string
  viewAllLabel: string
}

/** Grey band: warning copy + “View all …” link and similar-boats carousel (Figma BDP Inactive Variant B). */
export function BdpInactiveVariantBTop({
  boatType,
  viewAllHref,
  viewAllLabel,
}: BdpInactiveVariantBTopProps) {
  return (
    <section className="w-full bg-muted pb-5 pt-0" aria-label="Similar listings callout">
      <div className="mx-auto w-full max-w-7xl space-y-4 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-lg bg-status-warning-100 px-4 py-2 sm:px-6">
          <div className="min-w-0 space-y-1">
            <p className="text-base font-bold text-foreground">This boat has been sold</p>
            <p className="text-sm text-muted-foreground">
              But we&apos;ve found similar options that might interest you
            </p>
          </div>
          <Link
            href={viewAllHref}
            className="shrink-0 text-[13px] font-medium text-primary hover:text-primary/80"
          >
            {viewAllLabel}
          </Link>
        </div>
        <BdpInactiveSimilarCarousel boatType={boatType} />
      </div>
    </section>
  )
}
