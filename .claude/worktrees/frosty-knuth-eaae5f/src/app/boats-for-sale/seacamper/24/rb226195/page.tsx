import Image from "next/image"
import Link from "next/link"

import { BdpInactiveBanner } from "@/components/boats/bdp/bdp-inactive-banner"
import { BdpSimilarBoats } from "@/components/boats/bdp/bdp-similar-boats"
import { BdpBreadcrumb } from "@/components/boats/bdp/bdp-breadcrumb"
import {
  BdpDetails,
  getDefaultBdpDetails,
} from "@/components/boats/bdp/bdp-details"
import { BdpPriceHistory } from "@/components/boats/bdp/bdp-price-history"
import { BdpAiExplorer } from "@/components/boats/bdp/bdp-ai-explorer"
import { BdpRightPanel } from "@/components/boats/bdp/bdp-right-panel"
import { BdpImageGrid } from "@/components/boats/bdp/bdp-image-grid"
import { BoatMeta } from "@/components/boats/boat-meta"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { detailGallery } from "@/data/boats"

// Demo: isInactive = true (hardcoded for review)
const MOCK_BOAT = {
  make: "Seacamper",
  model: "24",
  year: 2019,
  length: "7.3m",
  condition: "Used" as const,
  boatType: "Powerboats",
  location: "United Kingdom",
  broker: "Private Seller",
  id: "rb226195",
  listingId: "rb226195",
  price: "£24,500",
}

const GALLERY_IMAGES = [...detailGallery]

export default function InactiveBdpDemoPage() {
  return (
    <>
      <BdpInactiveBanner />

      <div className="mx-auto w-full max-w-7xl space-y-10 px-4 pb-6 pt-4 sm:px-6 lg:px-8">
        <BdpBreadcrumb make={MOCK_BOAT.make} model={MOCK_BOAT.model} />

        <section className="grid gap-8 lg:grid-cols-[1.4fr_0.6fr]">
          {/* ── Left column ── */}
          <div className="space-y-6">
            <BdpImageGrid
              images={GALLERY_IMAGES}
              videos={[{ youtubeId: "vpQNSZkrLag", title: "Walkthrough" }]}
              alt={`${MOCK_BOAT.year} ${MOCK_BOAT.make} ${MOCK_BOAT.model}`}
              galleryTitle={`${MOCK_BOAT.year} ${MOCK_BOAT.make} ${MOCK_BOAT.model}`}
              state="inactive"
              showImages={false}
            />

            {/* Title block */}
            <div className="space-y-3">
              <p className="text-sm uppercase tracking-wide text-muted-foreground">
                {MOCK_BOAT.condition} · {MOCK_BOAT.length}
              </p>
              <h1 className="text-3xl font-bold">
                {MOCK_BOAT.year} {MOCK_BOAT.make} {MOCK_BOAT.model}
              </h1>
              <p className="text-lg text-muted-foreground">
                {MOCK_BOAT.location}
              </p>
            </div>

            {/* Key specifications */}
            <Card>
              <CardHeader className="text-lg font-bold">
                Key specifications
              </CardHeader>
              <CardContent className="grid gap-6 md:grid-cols-3">
                <BoatMeta label="Price" value="Listed at £24,500" />
                <BoatMeta label="Length" value={MOCK_BOAT.length} />
                <BoatMeta label="Condition" value={MOCK_BOAT.condition} />
                <BoatMeta label="Year" value={`${MOCK_BOAT.year}`} />
                <BoatMeta label="Broker" value={MOCK_BOAT.broker} />
                <BoatMeta label="Listing ID" value={MOCK_BOAT.listingId} />
              </CardContent>
            </Card>

            <BdpDetails sections={getDefaultBdpDetails()} />

            <BdpPriceHistory
              summary="Boat published Nov. 2023. Price reduced once before sale."
              items={[
                { label: "Original price", value: "£26,500" },
                { label: "March 2024", value: "£25,000" },
                { label: "Listed at (sold)", value: "£24,500", emphasis: true },
              ]}
            />

            <BdpAiExplorer
              boatTitle={`${MOCK_BOAT.year} ${MOCK_BOAT.make} ${MOCK_BOAT.model}`}
            />

            <div className="space-y-3">
              <BdpRightPanel title="Features" />
              <BdpRightPanel title="Propulsion" />
              <BdpRightPanel title="Specifications" />
              <BdpRightPanel
                title="Description"
                summary={`${MOCK_BOAT.year} ${MOCK_BOAT.make} ${MOCK_BOAT.model}`}
              />
            </div>
          </div>

          {/* ── Right aside — inactive: no contact form ── */}
          <aside className="space-y-6">
            <Card>
              <CardContent className="space-y-5 pt-6">
                <div className="space-y-1">
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Listed price
                  </p>
                  <p className="heading-sm text-muted-foreground">£24,500</p>
                  <p className="text-sm text-muted-foreground">
                    This listing is no longer available.
                  </p>
                </div>

                <div className="border-t border-border/60 pt-4">
                  <Link
                    href="/boats-for-sale?type=power&make=seacamper"
                    className="flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-primary/80"
                  >
                    Find similar Seacamper boats →
                  </Link>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-lg font-bold">Video tour</CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                <Link
                  href="https://www.youtube.com/watch?v=vpQNSZkrLag"
                  className="block overflow-hidden rounded-lg border border-border/60"
                >
                  <Image
                    src="https://img.youtube.com/vi/vpQNSZkrLag/sddefault.jpg"
                    alt="Boat video tour"
                    width={640}
                    height={360}
                    className="h-40 w-full object-cover"
                  />
                </Link>
                <p>Watch the walkthrough for a closer look at this listing.</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-lg font-bold">
                Listing details
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                <p>
                  This listing is a representative example based on the
                  Rightboat catalogue. The boat has been sold and is no longer
                  available.
                </p>
                <p>
                  Browse similar listings below or use the search to find your
                  next boat.
                </p>
              </CardContent>
            </Card>
          </aside>
        </section>

        {/* Similar boats — anchored for banner CTA scroll */}
        <BdpSimilarBoats boatType={MOCK_BOAT.boatType} />
      </div>
    </>
  )
}
