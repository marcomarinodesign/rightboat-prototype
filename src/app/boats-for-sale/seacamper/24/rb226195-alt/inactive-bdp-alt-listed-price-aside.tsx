"use client"

import { BdpInactiveListedPriceAside } from "@/components/boats/bdp/bdp-inactive-listed-price-aside"

import { usePromoteInactiveAltModal } from "./inactive-bdp-alt-modal-controller"

export function InactiveBdpAltListedPriceAside({
  listedPrice,
  findSimilarHref,
  findSimilarLabel,
}: {
  listedPrice: string
  findSimilarHref: string
  findSimilarLabel: string
}) {
  const promoteToFull = usePromoteInactiveAltModal()

  return (
    <BdpInactiveListedPriceAside
      listedPrice={listedPrice}
      findSimilarHref={findSimilarHref}
      findSimilarLabel={findSimilarLabel}
      ctaLayout="two-step"
      onSeeSimilarClick={() => promoteToFull?.()}
    />
  )
}
