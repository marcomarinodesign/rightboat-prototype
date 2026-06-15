"use client"

import dynamic from "next/dynamic"
import { SellBWizardLayout } from "@/components/sell-b/SellBWizardLayout"
import {
  figmaPreviewStepNumber,
  type FsboFigmaPreviewStep,
  type FsboPreviewMode,
} from "@/lib/fsbo/figma-preview"

const BoatFormFSBO = dynamic(
  () =>
    import("@/features/sell-boat/components/BoatFormFSBO").then(
      (m) => m.BoatFormFSBO
    ),
  { ssr: false }
)

type FSBOWizardClientProps = {
  figmaPreview?: FsboFigmaPreviewStep
  previewMode?: FsboPreviewMode
}

export function FSBOWizardClient({
  figmaPreview,
  previewMode,
}: FSBOWizardClientProps) {
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
