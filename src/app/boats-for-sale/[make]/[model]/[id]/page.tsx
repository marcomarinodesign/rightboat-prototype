import Image from "next/image"
import Link from "next/link"

import { BoatCard } from "@/components/boats/boat-card"
import { BoatMeta } from "@/components/boats/boat-meta"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
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
    <div className="space-y-10">
      <div className="space-y-2 text-sm text-muted-foreground">
        <div>
          <Link href="/">Home</Link> /{" "}
          <Link href="/boats-for-sale">Boats for sale</Link> / {boat.make}{" "}
          {boat.model}
        </div>
      </div>

      <section className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-6">
          <div className="space-y-3">
            <p className="text-sm uppercase tracking-wide text-muted-foreground">
              {boat.condition} • {boat.length}
            </p>
            <h1 className="text-3xl font-semibold">
              {boat.year} {boat.make} {boat.model}
            </h1>
            <p className="text-lg text-muted-foreground">{boat.location}</p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {detailGallery.map((image) => (
              <Image
                key={image}
                src={image}
                alt={`${boat.make} ${boat.model}`}
                width={640}
                height={420}
                className="h-64 w-full rounded-2xl object-cover"
              />
            ))}
          </div>

          <Card>
            <CardHeader className="text-lg font-semibold">
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
        </div>

        <aside className="space-y-6">
          <Card>
            <CardHeader className="space-y-2">
              <p className="text-sm uppercase tracking-wide text-muted-foreground">
                Price
              </p>
              <h2 className="text-3xl font-semibold">{boat.price}</h2>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Offered by</p>
                <p className="font-medium">{boat.broker}</p>
              </div>
              <Button className="w-full">Contact seller</Button>
              <Button variant="outline" className="w-full">
                Request details
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="text-lg font-semibold">Video tour</CardHeader>
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
            <CardHeader className="text-lg font-semibold">
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
          <h2 className="text-2xl font-semibold">Similar boats</h2>
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
