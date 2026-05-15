import { cn } from "@/lib/utils"

export const BOATS_FOR_SALE_LISTING_INTRO =
  "Discover a wide range of new and used powerboats for sale from trusted sellers across the globe. Whether you're looking for a high-performance center console, a comfortable cabin cruiser, or a smaller motorboat for weekend watersports or fishing, you'll find it here. Our listings feature gas/petrol and diesel engines, outboards and sterndrives, and hybrid options from brokers and private sellers worldwide."

type BoatsForSaleListingIntroProps = {
  className?: string
}

export function BoatsForSaleListingIntro({
  className,
}: BoatsForSaleListingIntroProps) {
  return (
    <p
      className={cn(
        "text-sm leading-relaxed text-muted-foreground",
        className
      )}
    >
      {BOATS_FOR_SALE_LISTING_INTRO}
    </p>
  )
}
