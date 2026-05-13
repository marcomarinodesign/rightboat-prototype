import { BoatDetailPageView } from "@/components/boats/boat-detail-page-view"
import { featuredBoats, latestBoats, listingBoats } from "@/data/boats"

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

  return <BoatDetailPageView boat={boat} linkMode="web" />
}
