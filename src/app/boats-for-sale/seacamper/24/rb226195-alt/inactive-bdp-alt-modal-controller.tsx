"use client"

import * as React from "react"

import { BdpInactiveOverlay } from "@/components/boats/bdp/bdp-inactive-overlay"

type ModalStage = "half" | "full"

const PromoteContext = React.createContext<(() => void) | null>(null)

export function usePromoteInactiveAltModal() {
  return React.useContext(PromoteContext)
}

export function InactiveBdpAltModalController({
  boatType,
  children,
  initialStage = "half",
}: {
  boatType: string
  children?: React.ReactNode
  initialStage?: ModalStage
}) {
  const [modalStage, setModalStage] = React.useState<ModalStage>(initialStage)
  const promoteToFull = React.useCallback(() => setModalStage("full"), [])

  return (
    <PromoteContext.Provider value={promoteToFull}>
      {children}
      <BdpInactiveOverlay
        stage={modalStage}
        boatType={boatType}
        onPromoteToFull={() => setModalStage("full")}
        onBackToHalf={() => setModalStage("half")}
      />
    </PromoteContext.Provider>
  )
}
