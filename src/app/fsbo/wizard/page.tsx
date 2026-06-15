import { Suspense } from "react"
import { FSBOWizardClient } from "./FSBOWizardClient"

export default function FSBOWizardPage() {
  return (
    <Suspense fallback={null}>
      <FSBOWizardClient />
    </Suspense>
  )
}
