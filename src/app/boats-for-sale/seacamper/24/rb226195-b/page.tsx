import Image from "next/image"
import Link from "next/link"

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
import { BdpInactiveListedPriceAside } from "@/components/boats/bdp/bdp-inactive-listed-price-aside"
import { BdpInactiveVariantBTop } from "@/components/boats/bdp/bdp-inactive-variant-b-top"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { detailGallery } from "@/data/boats"

/** Demo: BDP Inactive Variant B — carousel + callout above listing (Figma 212:1627). */
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

export default function InactiveBdpVariantBDemoPage() {
  return (
    <>
      <div className="mx-auto w-full max-w-7xl px-4 pt-4 sm:px-6 lg:px-8">
        <BdpBreadcrumb make={MOCK_BOAT.make} model={MOCK_BOAT.model} />
      </div>

      <BdpInactiveVariantBTop
        boatType={MOCK_BOAT.boatType}
        viewAllHref={`/boats-for-sale?type=${encodeURIComponent(MOCK_BOAT.boatType.toLowerCase())}`}
        viewAllLabel={`View all ${MOCK_BOAT.boatType} →`}
      />

      <div className="mx-auto w-full max-w-7xl space-y-10 px-4 pb-6 pt-6 sm:px-6 lg:px-8">
        <section className="grid gap-8 lg:grid-cols-[1.4fr_0.6fr]">
          <div className="space-y-6">
            <BdpImageGrid
              images={GALLERY_IMAGES}
              videos={[{ youtubeId: "vpQNSZkrLag", title: "Walkthrough" }]}
              alt={`${MOCK_BOAT.year} ${MOCK_BOAT.make} ${MOCK_BOAT.model}`}
              galleryTitle={`${MOCK_BOAT.year} ${MOCK_BOAT.make} ${MOCK_BOAT.model}`}
              state="inactive"
              showImages={false}
            />

            <div className="space-y-1.5">
              <p className="text-[12px] uppercase tracking-[0.6px] text-muted-foreground">
                {MOCK_BOAT.condition} · {MOCK_BOAT.length}
              </p>
              <h1 className="text-2xl font-bold tracking-tight text-foreground">
                {MOCK_BOAT.year} {MOCK_BOAT.make} {MOCK_BOAT.model}
              </h1>
              <p className="text-base text-muted-foreground">{MOCK_BOAT.location}</p>
            </div>

            <Card>
              <CardHeader className="text-base font-bold">Key specifications</CardHeader>
              <CardContent className="grid gap-6 md:grid-cols-3">
                <BoatMeta
                  variant="bdp-spec"
                  label="Price"
                  value="Listed at £24,500"
                  valueClassName="text-primary"
                />
                <BoatMeta variant="bdp-spec" label="Length" value={MOCK_BOAT.length} />
                <BoatMeta variant="bdp-spec" label="Condition" value={MOCK_BOAT.condition} />
                <BoatMeta variant="bdp-spec" label="Year" value={`${MOCK_BOAT.year}`} />
                <BoatMeta variant="bdp-spec" label="Broker" value={MOCK_BOAT.broker} />
                <BoatMeta variant="bdp-spec" label="Listing ID" value={MOCK_BOAT.listingId} />
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

          <aside className="space-y-6">
            <BdpInactiveListedPriceAside
              listedPrice="£24,500"
              findSimilarHref="/boats-for-sale?type=power&make=seacamper"
              findSimilarLabel="Find similar Seacamper boats"
              ctaLayout="find-primary-only"
            />

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
              <CardHeader className="text-lg font-bold">Listing details</CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                <p>
                  This listing is a representative example based on the Rightboat catalogue. The
                  boat has been sold and is no longer available.
                </p>
                <p>
                  Browse similar listings on the carousel above or use the search to find your
                  next boat.
                </p>
              </CardContent>
            </Card>
          </aside>
        </section>
      </div>
    </>
  )
}
