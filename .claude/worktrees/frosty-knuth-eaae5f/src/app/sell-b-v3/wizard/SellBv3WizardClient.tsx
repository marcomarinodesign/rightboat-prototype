"use client"

import { useState } from "react"
import dynamic from "next/dynamic"
import { SellBWizardLayout } from "@/components/sell-b/SellBWizardLayout"

const BoatFormV3 = dynamic(
  () =>
    import("@/features/sell-boat/components/BoatFormV3").then((m) => m.BoatFormV3),
  { ssr: false }
)

export function SellBv3WizardClient() {
  const [step, setStep] = useState(1)

  return (
    <SellBWizardLayout currentStep={step} totalSteps={2} hideStepHeader>
      <BoatFormV3 variant="fullWidth" onStepChange={setStep} />
    </SellBWizardLayout>
  )
}
