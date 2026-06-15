import { Suspense } from "react"

import { FSBOWizardClient } from "@/app/fsbo/wizard/FSBOWizardClient"

export default function MobileAppSellWizardPage() {
  return (
    <Suspense fallback={null}>
      <FSBOWizardClient />
    </Suspense>
  )
}
