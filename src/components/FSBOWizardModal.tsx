"use client"

import { useState, useCallback } from "react"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import { FSBOHeroWizard, type WizardStep } from "@/components/FSBOHeroWizard"
import { cn } from "@/lib/utils"

export interface FSBOWizardModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  /** Optional title shown above the step title (e.g. "Sell your boat") */
  modalTitle?: string
  className?: string
}

const STEP_LABELS: Record<WizardStep, string> = {
  1: "Boat details",
  2: "Price & location",
  3: "Your contact",
}

function stepToProgress(step: WizardStep): number {
  return (step / 3) * 100
}

export function FSBOWizardModal({
  open,
  onOpenChange,
  modalTitle = "List your boat",
  className,
}: FSBOWizardModalProps) {
  const [step, setStep] = useState<WizardStep>(1)
  const [stepTitle, setStepTitle] = useState<string>(STEP_LABELS[1])

  const handleStepChange = useCallback((s: WizardStep, title: string) => {
    setStep(s)
    setStepTitle(title)
  }, [])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          "max-w-[calc(100vw-2rem)] sm:max-w-md w-[calc(100vw-2rem)] p-4 sm:p-6",
          "max-h-[90vh] overflow-y-auto",
          className
        )}
        aria-describedby={undefined}
      >
        <div className="space-y-3">
          {modalTitle && (
            <DialogTitle className="text-lg sm:text-xl">
              {modalTitle}
            </DialogTitle>
          )}
          <div className="space-y-2">
            <p className="text-sm font-medium text-foreground">
              Step {step}: {stepTitle}
            </p>
            <Progress value={stepToProgress(step)} className="h-2" />
          </div>
        </div>
        <div className="mt-2">
          <FSBOHeroWizard onStepChange={handleStepChange} compact />
        </div>
      </DialogContent>
    </Dialog>
  )
}
