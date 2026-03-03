"use client"

import Image from "next/image"
import { Anchor } from "lucide-react"
import { cn } from "@/lib/utils"

const WIZARD_IMAGE = {
  src: "https://images.unsplash.com/photo-1543140313-318677635120?w=1920&q=80",
  alt: "Aerial photography of motorboat on sea",
}

interface SellBWizardLayoutProps {
  /** Current step for progress display */
  currentStep: number
  /** Total steps (default 3) */
  totalSteps?: number
  /** When true, hide the step 1 header (anchor + title + subtitle) */
  hideStepHeader?: boolean
  children: React.ReactNode
  className?: string
}

export function SellBWizardLayout({
  currentStep,
  totalSteps = 3,
  hideStepHeader = false,
  children,
  className,
}: SellBWizardLayoutProps) {
  const progressPercent = Math.round((currentStep / totalSteps) * 100)

  return (
    <div
      className={cn(
        "grid h-screen w-screen max-w-none grid-cols-1 grid-rows-[auto_1fr] overflow-hidden bg-white lg:grid-cols-[minmax(0,0.42fr)_minmax(0,0.58fr)] lg:grid-rows-1",
        className
      )}
    >
      {/* Left column: image — on mobile/tablet top banner (responsive height), on lg full-height sidebar */}
      <div className="relative h-40 w-full shrink-0 sm:h-48 md:h-56 lg:h-full lg:min-h-0">
        <Image
          src={WIZARD_IMAGE.src}
          alt={WIZARD_IMAGE.alt}
          fill
          className="object-cover"
          sizes="(max-width: 1023px) 100vw, 42vw"
          priority
        />
      </div>

      {/* Right column: scrollable form area — full width responsive */}
      <div className="relative flex min-h-0 min-w-0 flex-1 flex-col overflow-auto bg-white">
        <div className="mx-auto w-full max-w-[730px] flex-1 px-4 py-5 sm:px-6 sm:py-6 md:px-8 md:py-8 lg:px-[68px] lg:py-10">
          {/* Progress */}
          <div className="mb-6 sm:mb-8">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm font-medium text-foreground">
                Step {currentStep} of {totalSteps}
              </span>
              <span className="text-sm font-medium text-foreground">
                {progressPercent}%
              </span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-primary transition-[width] duration-300 ease-out"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Step 1 header: anchor + title + subtitle (only show on step 1 for Figma match) */}
          {!hideStepHeader && currentStep === 1 && (
            <div className="mb-6 text-center sm:mb-8">
              <div className="mb-2 inline-flex h-10 w-10 items-center justify-center rounded-full bg-muted sm:mb-3 sm:h-12 sm:w-12">
                <Anchor className="h-5 w-5 text-primary sm:h-6 sm:w-6" aria-hidden />
              </div>
              <h2 className="text-xl font-bold text-foreground sm:text-2xl">
                Sell Your Boat
              </h2>
              <p className="mt-1 text-sm text-muted-foreground sm:text-base">
                Takes less than 2 minutes.
              </p>
            </div>
          )}

          {/* Form content (BoatForm) */}
          {children}
        </div>
      </div>
    </div>
  )
}
