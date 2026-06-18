"use client"

import { cn } from "@/lib/utils"

interface SellBWizardLayoutProps {
  currentStep: number
  totalSteps?: number
  /** When true, hide the step 1 header (anchor + title + subtitle) — kept for compat, unused */
  hideStepHeader?: boolean
  /** When true, hide the left image column entirely */
  hideImage?: boolean
  children: React.ReactNode
  className?: string
}

export function SellBWizardLayout({
  hideImage = false,
  children,
  className,
}: SellBWizardLayoutProps) {
  if (hideImage) {
    // FSBO wizard: gray page + centered white card
    return (
      <div className={cn("min-h-screen bg-[#fafafa]", className)}>
        <div className="mx-auto max-w-[728px] px-4 py-6">
          <div className="bg-white rounded-3xl border border-[#e4e5e9] px-4 py-6 sm:px-8 sm:py-8">
            {children}
          </div>
        </div>
      </div>
    )
  }

  // Legacy: two-column layout with image
  return (
    <div
      className={cn(
        "grid h-screen w-screen max-w-none overflow-hidden bg-background",
        "grid-cols-1 grid-rows-[auto_1fr] lg:grid-cols-[minmax(0,0.42fr)_minmax(0,0.58fr)] lg:grid-rows-1",
        className
      )}
    >
      <div className="relative flex min-h-0 min-w-0 flex-1 flex-col overflow-auto bg-background">
        <div className="mx-auto w-full max-w-[730px] flex-1 px-4 py-5 sm:px-6 sm:py-6 md:px-8 md:py-8 lg:px-[68px] lg:py-10">
          {children}
        </div>
      </div>
    </div>
  )
}
