"use client"

import dynamic from "next/dynamic"
import { useSearchParams } from "next/navigation"
import { SellBWizardLayout } from "@/components/sell-b/SellBWizardLayout"
import {
  figmaPreviewStepNumber,
  parseFsboFigmaPreviewStep,
  parseFsboPreviewMode,
} from "@/lib/fsbo/figma-preview"

const BoatFormFSBO = dynamic(
  () =>
    import("@/features/sell-boat/components/BoatFormFSBO").then(
      (m) => m.BoatFormFSBO
    ),
  { ssr: false }
)

export function FSBOWizardClient() {
  const searchParams = useSearchParams()
  const figmaPreview = parseFsboFigmaPreviewStep(
    searchParams.get("figmaPreview")
  )
  const previewMode = parseFsboPreviewMode(searchParams.get("previewMode"))
  const currentStep = figmaPreview ? figmaPreviewStepNumber(figmaPreview) : 1

  return (
    <SellBWizardLayout
      currentStep={currentStep}
      totalSteps={5}
      hideStepHeader
      hideImage
    >
      <BoatFormFSBO figmaPreview={figmaPreview} previewMode={previewMode} />
    </SellBWizardLayout>
  )
}
