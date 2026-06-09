"use client"

import { FSBOSuccessScreen } from "@/features/sell-boat/components/FSBOSuccessScreen"

export default function FSBOSuccessPreviewPage() {
  return (
    <div className="mx-auto min-h-screen max-w-lg bg-background px-4 py-8">
      <FSBOSuccessScreen
        plan="premium"
        boatSummary="Bavaria · Vision 46 · 2018"
        onReset={() => {
          window.location.href = "/fsbo"
        }}
      />
    </div>
  )
}
