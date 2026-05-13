import { BoatDetailPageView } from "@/components/boats/boat-detail-page-view"
import { featuredBoats, latestBoats, listingBoats } from "@/data/boats"

type MobileBoatPageProps = {
  params: Promise<{ id: string }>
}

export default async function MobileAppBoatPage({ params }: MobileBoatPageProps) {
  const { id } = await params
  const allBoats = [...featuredBoats, ...latestBoats, ...listingBoats]
  const shearwaterDemo = featuredBoats.find((b) => b.id === "rb558443")
  const boat =
    allBoats.find((item) => item.id === id) ?? shearwaterDemo ?? allBoats[0]

  return (
    <BoatDetailPageView
      boat={boat}
      linkMode="app"
      className="w-full space-y-8 pb-6 pt-0"
    />
  )
}
