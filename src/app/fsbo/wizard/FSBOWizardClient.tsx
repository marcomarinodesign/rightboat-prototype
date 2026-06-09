"use client"

import dynamic from "next/dynamic"
import { SellBWizardLayout } from "@/components/sell-b/SellBWizardLayout"

const BoatFormFSBO = dynamic(
  () =>
    import("@/features/sell-boat/components/BoatFormFSBO").then(
      (m) => m.BoatFormFSBO
    ),
  { ssr: false }
)

export function FSBOWizardClient() {
  return (
    // hideStepHeader=true: WizardProgress handles its own header
    <SellBWizardLayout currentStep={1} totalSteps={5} hideStepHeader>
      <BoatFormFSBO />
    </SellBWizardLayout>
  )
}
