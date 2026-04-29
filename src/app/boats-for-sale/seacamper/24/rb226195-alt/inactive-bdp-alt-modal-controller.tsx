"use client"

import * as React from "react"

import { BdpInactiveOverlay } from "@/components/boats/bdp/bdp-inactive-overlay"

type ModalStage = "half" | "full"

export function InactiveBdpAltModalController({
  boatType,
}: {
  boatType: string
}) {
  const [modalStage, setModalStage] = React.useState<ModalStage>("half")

  return (
    <BdpInactiveOverlay
      stage={modalStage}
      boatType={boatType}
      onPromoteToFull={() => setModalStage("full")}
      onBackToHalf={() => setModalStage("half")}
    />
  )
}

