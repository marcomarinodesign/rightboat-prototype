import Image from "next/image"
import Link from "next/link"

import { BoatCard } from "@/components/boats/boat-card"
import { BoatMeta } from "@/components/boats/boat-meta"
import { BdpDetails, getBdpDetailsForBoat, getDefaultBdpDetails } from "@/components/boats/bdp/bdp-details"
import { BdpContactSeller } from "@/components/boats/bdp/bdp-contact-seller"
import { BdpPriceHistory } from "@/components/boats/bdp/bdp-price-history"
import { BdpAiExplorer } from "@/components/boats/bdp/bdp-ai-explorer"
import { BdpRightPanel } from "@/components/boats/bdp/bdp-right-panel"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselDots,
} from "@/components/ui/carousel"
import {
  detailGallery,
  featuredBoats,
  latestBoats,
  listingBoats,
} from "@/data/boats"

type BoatDetailPageProps = {
  params: {
    make: string
    model: string
    id: string
  }
}

export default function BoatDetailPage({ params }: BoatDetailPageProps) {
  const allBoats = [...featuredBoats, ...latestBoats, ...listingBoats]
  const boat =
    allBoats.find((item) => item.id === params.id) ?? allBoats[0]

  return (
    <div className="mx-auto w-full max-w-7xl space-y-10 px-4 pb-6 pt-4 sm:px-6 lg:px-8">
      <div className="space-y-2 text-sm text-muted-foreground">
        <div>
          <Link href="/">Home</Link> /{" "}
          <Link href="/boats-for-sale">Boats for sale</Link> / {boat.make}{" "}
          {boat.model}
        </div>
      </div>

      <section className="grid gap-8 lg:grid-cols-[1.4fr_0.6fr]">
        <div className="space-y-6">
          <Carousel className="w-full">
            <CarouselContent>
              {[boat.image, ...detailGallery].map((image, index) => (
                <CarouselItem key={index}>
                  <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-muted">
                    <Image
                      src="https://ui.shadcn.com/placeholder.svg"
                      alt="Gallery placeholder"
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
            <CarouselDots />
          </Carousel>

          <div className="space-y-3">
            <p className="text-sm uppercase tracking-wide text-muted-foreground">
              {boat.condition} • {boat.length}
            </p>
            <h1 className="text-3xl font-bold">
              {boat.year} {boat.make} {boat.model}
            </h1>
            <p className="text-lg text-muted-foreground">{boat.location}</p>
          </div>

          <Card>
            <CardHeader className="text-lg font-bold">
              Key specifications
            </CardHeader>
            <CardContent className="grid gap-6 md:grid-cols-3">
              <BoatMeta label="Price" value={boat.price} />
              <BoatMeta label="Length" value={boat.length} />
              <BoatMeta label="Condition" value={boat.condition} />
              <BoatMeta label="Year" value={`${boat.year}`} />
              <BoatMeta label="Broker" value={boat.broker} />
              <BoatMeta label="Listing ID" value={boat.id} />
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
            summary="Boat published on Sept. 2024, $150,000 price drop from the publication."
            items={[
              { label: "Original price", value: "$1,800,000" },
              { label: "October 2024", value: "$1,780,000" },
              { label: "November 2024", value: "$1,750,000" },
              { label: "Current price", value: "$1,650,000", emphasis: true },
            ]}
            chartSrc="/propel/program-offers.png"
          />

          <BdpAiExplorer
            boatTitle={`${boat.year} ${boat.make} ${boat.model}`}
          />

          <div className="space-y-3">
            <BdpRightPanel title="Features" />
            <BdpRightPanel title="Propulsion" />
            <BdpRightPanel
              title="Specifications"
            />
            <BdpRightPanel
              title="Description"
              summary={`${boat.year} ${boat.make} ${boat.model}`}
            />
          </div>
        </div>

        <aside className="space-y-6">
          <div className="lg:sticky lg:top-6">
            <BdpContactSeller
              price={boat.price}
              boatName={`${boat.year} ${boat.make} ${boat.model}`}
              sellerName={boat.broker}
              sellerLocation={boat.location}
            />
          </div>

          <Card>
            <CardHeader className="text-lg font-bold">Video tour</CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <Link
                href="https://www.youtube.com/watch?v=vpQNSZkrLag"
                className="block overflow-hidden rounded-xl border border-border/60"
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
      </section>

      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Similar boats</h2>
          <Link href="/boats-for-sale" className="text-sm text-primary">
            View more details
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {listingBoats.slice(0, 3).map((item) => (
            <BoatCard key={item.id} boat={item} />
          ))}
        </div>
      </section>
    </div>
  )
}
