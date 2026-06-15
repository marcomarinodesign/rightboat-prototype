import { FSBOWizardClient } from "@/app/fsbo/wizard/FSBOWizardClient"
import {
  parseFsboFigmaPreviewStep,
  parseFsboPreviewMode,
} from "@/lib/fsbo/figma-preview"

type MobileAppSellWizardPageProps = {
  searchParams?: Promise<{ figmaPreview?: string; previewMode?: string }>
}

export default async function MobileAppSellWizardPage({
  searchParams,
}: MobileAppSellWizardPageProps) {
  const params = (await searchParams) ?? {}

  return (
    <FSBOWizardClient
      figmaPreview={parseFsboFigmaPreviewStep(params.figmaPreview)}
      previewMode={parseFsboPreviewMode(params.previewMode)}
    />
  )
}
