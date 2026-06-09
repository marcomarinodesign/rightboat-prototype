"use client"

import { motion } from "framer-motion"
import { ArrowLeft } from "lucide-react"
import { cn } from "@/lib/utils"

export interface WizardProgressProps {
  /** Current step number (1-based) */
  step: number
  /** Total number of steps */
  totalSteps: number
  /** Display name for the current step */
  stepName: string
  /** Called when back arrow is tapped. If undefined, back arrow is hidden. */
  onBack?: () => void
  className?: string
}

export function WizardProgress({
  step,
  totalSteps,
  stepName,
  onBack,
  className,
}: WizardProgressProps) {
  const progressPercent = (step / totalSteps) * 100

  return (
    <div
      className={cn(
        // Sticky at top, full bleed (compensate parent padding)
        "sticky top-0 z-20 bg-background",
        "-mx-4 px-4 sm:-mx-6 sm:px-6 md:-mx-8 md:px-8 lg:-mx-[68px] lg:px-[68px]",
        "border-b border-border pb-4 pt-4",
        className
      )}
    >
      {/* Row: back arrow + step label + step count */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3 min-w-0">
          {onBack ? (
            <button
              type="button"
              onClick={onBack}
              className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-muted transition-colors shrink-0 -ml-1"
              aria-label="Go back"
            >
              <ArrowLeft className="w-4 h-4 text-foreground" />
            </button>
          ) : (
            // Placeholder to keep layout stable when no back button
            <div className="w-7 shrink-0" />
          )}
          <span className="text-sm font-semibold text-foreground truncate">
            {stepName}
          </span>
        </div>
        <span className="text-xs font-medium text-muted-foreground shrink-0 ml-2">
          {step} / {totalSteps}
        </span>
      </div>

      {/* Animated progress bar */}
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
        <motion.div
          className="h-full rounded-full bg-primary"
          initial={false}
          animate={{ width: `${progressPercent}%` }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
        />
      </div>
    </div>
  )
}
