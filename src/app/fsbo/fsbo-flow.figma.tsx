// FIGMA FILE: https://www.figma.com/design/1JdEElYI3kToAhnJwXedF0/FSBO-Page
// PAGE: Q2 Design Cursor (71-1508) — FSBO / Code Connect section
// LAST SYNC: 2026-06-15

import figma from "@figma/code-connect/react"

import { FSBOLandingClient } from "./FSBOLandingClient"
import { BoatFormFSBO } from "@/features/sell-boat/components/BoatFormFSBO"
import { FSBOSuccessScreen } from "@/features/sell-boat/components/FSBOSuccessScreen"
import { figmaPreviewBoatSummary } from "@/lib/fsbo/figma-preview"
import { SellBWizardLayout } from "@/components/sell-b/SellBWizardLayout"

const SCREEN_IMPORTS = [
  'import { FSBOLandingClient } from "@/app/fsbo/FSBOLandingClient"',
  'import { BoatFormFSBO } from "@/features/sell-boat/components/BoatFormFSBO"',
  'import { FSBOSuccessScreen } from "@/features/sell-boat/components/FSBOSuccessScreen"',
  'import { SellBWizardLayout } from "@/components/sell-b/SellBWizardLayout"',
]

function FsboLandingDesktop() {
  return <FSBOLandingClient figmaPreview="desktop" />
}

function FsboLandingMobile() {
  return <FSBOLandingClient figmaPreview="mobile" />
}

function FsboWizardStep1Desktop() {
  return (
    <SellBWizardLayout currentStep={1} totalSteps={5} hideStepHeader hideImage>
      <BoatFormFSBO figmaPreview="step-1" previewMode="desktop" />
    </SellBWizardLayout>
  )
}

function FsboWizardStep1Mobile() {
  return (
    <SellBWizardLayout currentStep={1} totalSteps={5} hideStepHeader hideImage>
      <BoatFormFSBO figmaPreview="step-1" previewMode="mobile" />
    </SellBWizardLayout>
  )
}

function FsboWizardStep2Desktop() {
  return (
    <SellBWizardLayout currentStep={2} totalSteps={5} hideStepHeader hideImage>
      <BoatFormFSBO figmaPreview="step-2" previewMode="desktop" />
    </SellBWizardLayout>
  )
}

function FsboWizardStep2Mobile() {
  return (
    <SellBWizardLayout currentStep={2} totalSteps={5} hideStepHeader hideImage>
      <BoatFormFSBO figmaPreview="step-2" previewMode="mobile" />
    </SellBWizardLayout>
  )
}

function FsboWizardStep3Desktop() {
  return (
    <SellBWizardLayout currentStep={3} totalSteps={5} hideStepHeader hideImage>
      <BoatFormFSBO figmaPreview="step-3" previewMode="desktop" />
    </SellBWizardLayout>
  )
}

function FsboWizardStep3Mobile() {
  return (
    <SellBWizardLayout currentStep={3} totalSteps={5} hideStepHeader hideImage>
      <BoatFormFSBO figmaPreview="step-3" previewMode="mobile" />
    </SellBWizardLayout>
  )
}

function FsboWizardStep4Desktop() {
  return (
    <SellBWizardLayout currentStep={4} totalSteps={5} hideStepHeader hideImage>
      <BoatFormFSBO figmaPreview="step-4" previewMode="desktop" />
    </SellBWizardLayout>
  )
}

function FsboWizardStep4Mobile() {
  return (
    <SellBWizardLayout currentStep={4} totalSteps={5} hideStepHeader hideImage>
      <BoatFormFSBO figmaPreview="step-4" previewMode="mobile" />
    </SellBWizardLayout>
  )
}

function FsboWizardStep5Desktop() {
  return (
    <SellBWizardLayout currentStep={5} totalSteps={5} hideStepHeader hideImage>
      <BoatFormFSBO figmaPreview="step-5" previewMode="desktop" />
    </SellBWizardLayout>
  )
}

function FsboWizardStep5Mobile() {
  return (
    <SellBWizardLayout currentStep={5} totalSteps={5} hideStepHeader hideImage>
      <BoatFormFSBO figmaPreview="step-5" previewMode="mobile" />
    </SellBWizardLayout>
  )
}

function FsboSuccessDesktop() {
  return (
    <div className="mx-auto min-h-[900px] max-w-lg bg-background px-4 py-8">
      <FSBOSuccessScreen
        plan="premium"
        boatSummary={figmaPreviewBoatSummary()}
        onReset={() => {}}
      />
    </div>
  )
}

function FsboSuccessMobile() {
  return (
    <div className="mx-auto min-h-[874px] w-full max-w-[402px] border-x border-border bg-background px-4 py-8">
      <FSBOSuccessScreen
        plan="premium"
        boatSummary={figmaPreviewBoatSummary()}
        onReset={() => {}}
      />
    </div>
  )
}

figma.connect(
  FsboLandingDesktop,
  "https://www.figma.com/design/1JdEElYI3kToAhnJwXedF0/FSBO-Page?node-id=74-14",
  { imports: SCREEN_IMPORTS, example: () => <FsboLandingDesktop /> }
)

figma.connect(
  FsboLandingMobile,
  "https://www.figma.com/design/1JdEElYI3kToAhnJwXedF0/FSBO-Page?node-id=74-17",
  { imports: SCREEN_IMPORTS, example: () => <FsboLandingMobile /> }
)

figma.connect(
  FsboWizardStep1Desktop,
  "https://www.figma.com/design/1JdEElYI3kToAhnJwXedF0/FSBO-Page?node-id=74-20",
  { imports: SCREEN_IMPORTS, example: () => <FsboWizardStep1Desktop /> }
)

figma.connect(
  FsboWizardStep1Mobile,
  "https://www.figma.com/design/1JdEElYI3kToAhnJwXedF0/FSBO-Page?node-id=74-23",
  { imports: SCREEN_IMPORTS, example: () => <FsboWizardStep1Mobile /> }
)

figma.connect(
  FsboWizardStep2Desktop,
  "https://www.figma.com/design/1JdEElYI3kToAhnJwXedF0/FSBO-Page?node-id=74-26",
  { imports: SCREEN_IMPORTS, example: () => <FsboWizardStep2Desktop /> }
)

figma.connect(
  FsboWizardStep2Mobile,
  "https://www.figma.com/design/1JdEElYI3kToAhnJwXedF0/FSBO-Page?node-id=74-29",
  { imports: SCREEN_IMPORTS, example: () => <FsboWizardStep2Mobile /> }
)

figma.connect(
  FsboWizardStep3Desktop,
  "https://www.figma.com/design/1JdEElYI3kToAhnJwXedF0/FSBO-Page?node-id=74-32",
  { imports: SCREEN_IMPORTS, example: () => <FsboWizardStep3Desktop /> }
)

figma.connect(
  FsboWizardStep3Mobile,
  "https://www.figma.com/design/1JdEElYI3kToAhnJwXedF0/FSBO-Page?node-id=74-35",
  { imports: SCREEN_IMPORTS, example: () => <FsboWizardStep3Mobile /> }
)

figma.connect(
  FsboWizardStep4Desktop,
  "https://www.figma.com/design/1JdEElYI3kToAhnJwXedF0/FSBO-Page?node-id=74-38",
  { imports: SCREEN_IMPORTS, example: () => <FsboWizardStep4Desktop /> }
)

figma.connect(
  FsboWizardStep4Mobile,
  "https://www.figma.com/design/1JdEElYI3kToAhnJwXedF0/FSBO-Page?node-id=74-41",
  { imports: SCREEN_IMPORTS, example: () => <FsboWizardStep4Mobile /> }
)

figma.connect(
  FsboWizardStep5Desktop,
  "https://www.figma.com/design/1JdEElYI3kToAhnJwXedF0/FSBO-Page?node-id=74-44",
  { imports: SCREEN_IMPORTS, example: () => <FsboWizardStep5Desktop /> }
)

figma.connect(
  FsboWizardStep5Mobile,
  "https://www.figma.com/design/1JdEElYI3kToAhnJwXedF0/FSBO-Page?node-id=74-47",
  { imports: SCREEN_IMPORTS, example: () => <FsboWizardStep5Mobile /> }
)

figma.connect(
  FsboSuccessDesktop,
  "https://www.figma.com/design/1JdEElYI3kToAhnJwXedF0/FSBO-Page?node-id=74-50",
  { imports: SCREEN_IMPORTS, example: () => <FsboSuccessDesktop /> }
)

figma.connect(
  FsboSuccessMobile,
  "https://www.figma.com/design/1JdEElYI3kToAhnJwXedF0/FSBO-Page?node-id=74-53",
  { imports: SCREEN_IMPORTS, example: () => <FsboSuccessMobile /> }
)
