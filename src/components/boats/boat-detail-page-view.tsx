import Image from "next/image"
import Link from "next/link"

import { BoatCard } from "@/components/boats/boat-card"
import { BoatMeta } from "@/components/boats/boat-meta"
import {
  BdpDetails,
  getBdpDetailsForBoat,
  getDefaultBdpDetails,
} from "@/components/boats/bdp/bdp-details"
import { BdpContactSeller } from "@/components/boats/bdp/bdp-contact-seller"
import { BdpPriceHistory } from "@/components/boats/bdp/bdp-price-history"
import { BdpAiExplorer } from "@/components/boats/bdp/bdp-ai-explorer"
import { BdpBreadcrumb } from "@/components/boats/bdp/bdp-breadcrumb"
import { AppBdpContactManufacturerCta } from "@/components/boats/bdp/app-bdp-contact-manufacturer-cta"
import { BdpRightPanel } from "@/components/boats/bdp/bdp-right-panel"
import { BdpImageGrid } from "@/components/boats/bdp/bdp-image-grid"
import { AppBdpTopCarousel } from "@/components/boats/bdp/app-bdp-top-carousel"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { detailGallery, listingBoats } from "@/data/boats"
import type { Boat } from "@/data/boats"
import { cn } from "@/lib/utils"

export type BoatDetailLinkMode = "web" | "app"

export type BoatDetailPageViewProps = {
  boat: Boat
  /** `app`: breadcrumb + similar boats point inside `/app/*`. */
  linkMode?: BoatDetailLinkMode
  className?: string
}

/** Shared BDP layout used by web `/boats-for-sale/.../[id]` and app prototype `/app/boat/[id]`. */
export function BoatDetailPageView({
  boat,
  linkMode = "web",
  className = "mx-auto w-full max-w-7xl space-y-10 px-4 pb-6 pt-4 sm:px-6 lg:px-8",
}: BoatDetailPageViewProps) {
  const isApp = linkMode === "app"
  const moreListingsHref = isApp ? "/app/boats-for-sale" : "/boats-for-sale"
  const boatTitle = `${boat.year} ${boat.make} ${boat.model}`

  return (
    <div className={className}>
      {/* Web: breadcrumb + Save/Share. App: omit — native shell / tab bar covers navigation. */}
      {!isApp ? (
        <BdpBreadcrumb make={boat.make} model={boat.model} />
      ) : null}

      {isApp ? (
        <AppBdpTopCarousel images={[boat.image, ...detailGallery]} boatTitle={boatTitle} />
      ) : null}

      {isApp ? (
        <AppBdpContactManufacturerCta
          price={boat.price}
          boatName={boatTitle}
          sellerName={boat.broker}
          sellerLocation={boat.location}
        />
      ) : null}

      {isApp ? (
        <div className="px-[var(--mobile-margin)]">
          <div className="mb-4">
            <h1 className="text-[26px] font-bold leading-[1.12] tracking-[-0.5px] text-foreground">
              {boatTitle}
            </h1>
            <p className="mt-1 text-[13px] font-medium text-foreground/85">
              {boat.condition} · {boat.length}
            </p>
            <p className="mt-0.5 text-[13px] text-muted-foreground">
              {boat.location}
            </p>
          </div>
        </div>
      ) : null}

      <section
        className={cn(
          "grid gap-8",
          isApp ? "grid-cols-1 px-[var(--mobile-margin)]" : "lg:grid-cols-[1.4fr_0.6fr]"
        )}
      >
        <div className="space-y-6">
          {!isApp ? (
            <BdpImageGrid
              galleryLayout="default"
              images={[boat.image, ...detailGallery]}
              videos={[{ youtubeId: "vpQNSZkrLag", title: "Walkthrough" }]}
              alt={`${boat.year} ${boat.make} ${boat.model}`}
              galleryTitle={`${boat.year} ${boat.make} ${boat.model}`}
              state="active"
            />
          ) : null}

          {!isApp ? (
            <div className="space-y-3">
              <p className="text-sm uppercase tracking-wide text-muted-foreground">
                {boat.condition} • {boat.length}
              </p>
              <h1 className="text-3xl font-bold">
                {boat.year} {boat.make} {boat.model}
              </h1>
              <p className="text-lg text-muted-foreground">{boat.location}</p>
            </div>
          ) : null}

          <Card className={cn(isApp ? "w-full" : undefined)}>
            <CardHeader className="text-lg font-bold">
              Key specifications
            </CardHeader>
            <CardContent
              className={cn(
                "grid gap-6",
                isApp ? "grid-cols-2" : "md:grid-cols-3"
              )}
            >
              <BoatMeta label="Price" value={boat.price} variant={isApp ? "bdp-spec" : "default"} />
              <BoatMeta label="Length" value={boat.length} variant={isApp ? "bdp-spec" : "default"} />
              <BoatMeta label="Condition" value={boat.condition} variant={isApp ? "bdp-spec" : "default"} />
              <BoatMeta label="Year" value={`${boat.year}`} variant={isApp ? "bdp-spec" : "default"} />
              <BoatMeta label="Broker" value={boat.broker} variant={isApp ? "bdp-spec" : "default"} />
              <BoatMeta label="Listing ID" value={boat.id} variant={isApp ? "bdp-spec" : "default"} />
            </CardContent>
          </Card>

          <BdpDetails
            sections={
              boat.id === "rb656595"
                ? getBdpDetailsForBoat({
                    boatType: boat.boatType,
                    make: boat.make,
                    model: boat.model,
                    loa: boat.loa,
                    beam: boat.beam,
                  })
                : getDefaultBdpDetails()
            }
          />

          <BdpPriceHistory
            layout={isApp ? "stacked" : "default"}
            summary="Boat published on Sept. 2024, $150,000 price drop from the publication."
            items={[
              { label: "Original price", value: "$1,800,000" },
              { label: "October 2024", value: "$1,780,000" },
              { label: "November 2024", value: "$1,750,000" },
              { label: "Current price", value: "$1,650,000", emphasis: true },
            ]}
          />

          <BdpAiExplorer
            boatTitle={`${boat.year} ${boat.make} ${boat.model}`}
          />

          <div className="space-y-3">
            <BdpRightPanel title="Features" />
            <BdpRightPanel title="Propulsion" />
            <BdpRightPanel title="Specifications" />
            <BdpRightPanel
              title="Description"
              summary={`${boat.year} ${boat.make} ${boat.model}`}
            />
          </div>
        </div>

        {!isApp ? (
        <aside className="space-y-6">
          <BdpContactSeller
            price={boat.price}
            boatName={boatTitle}
            sellerName={boat.broker}
            sellerLocation={boat.location}
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
            <CardHeader className="text-lg font-bold">
              Listing details
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <p>
                This listing is a representative example based on the Rightboat
                catalogue. Contact the seller for full specifications, pricing
                and availability.
              </p>
              <p>
                Save the listing to compare later and receive price updates on
                similar boats.
              </p>
            </CardContent>
          </Card>
        </aside>
        ) : null}
      </section>

      <section className={cn("space-y-6", isApp ? "px-[var(--mobile-margin)]" : undefined)}>
        <div
          className={cn(
            "flex justify-between gap-2",
            isApp ? "flex-col items-start" : "items-center"
          )}
        >
          <h2 className="heading-sm">Similar boats</h2>
          <Link href={moreListingsHref} className="primary-text-link">
            View more details
          </Link>
        </div>
        <div
          className={cn(
            "grid gap-2",
            isApp ? "grid-cols-1" : "md:grid-cols-2 lg:grid-cols-4"
          )}
        >
          {listingBoats.slice(0, 4).map((item) => (
            <BoatCard
              key={item.id}
              boat={item}
              {...(isApp ? { href: `/app/boat/${item.id}` } : {})}
            />
          ))}
        </div>
      </section>
    </div>
  )
}
