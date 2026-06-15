import { FSBOWizardClient } from "./FSBOWizardClient"
import {
  parseFsboFigmaPreviewStep,
  parseFsboPreviewMode,
} from "@/lib/fsbo/figma-preview"

type FSBOWizardPageProps = {
  searchParams?: Promise<{ figmaPreview?: string; previewMode?: string }>
}

export default async function FSBOWizardPage({
  searchParams,
}: FSBOWizardPageProps) {
  const params = (await searchParams) ?? {}

  return (
    <FSBOWizardClient
      figmaPreview={parseFsboFigmaPreviewStep(params.figmaPreview)}
      previewMode={parseFsboPreviewMode(params.previewMode)}
    />
  )
}
