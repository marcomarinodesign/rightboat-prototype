"use client"

import { useState } from "react"
import dynamic from "next/dynamic"
import { SellBWizardLayout } from "@/components/sell-b/SellBWizardLayout"

const BoatForm = dynamic(
  () =>
    import("@/features/sell-boat/components/BoatForm").then((m) => m.default),
  { ssr: false }
)

export function SellBWizardClient() {
  const [step, setStep] = useState(1)

  return (
    <SellBWizardLayout currentStep={step}>
      <BoatForm
        variant="fullWidth"
        hideStepTitle
        onStepChange={setStep}
      />
    </SellBWizardLayout>
  )
}
