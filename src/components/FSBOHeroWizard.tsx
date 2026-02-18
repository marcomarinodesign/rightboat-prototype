"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export type WizardStep = 1 | 2 | 3

export interface FSBOFormData {
  make: string
  model: string
  price: string
  year: string
  length: string
  location: string
  firstName: string
  lastName: string
  email: string
}

const initialFormData: FSBOFormData = {
  make: "",
  model: "",
  price: "",
  year: "",
  length: "",
  location: "",
  firstName: "",
  lastName: "",
  email: "",
}

const STEP_TITLES: Record<WizardStep, string> = {
  1: "Boat details",
  2: "Price & location",
  3: "Your contact",
}

export interface FSBOHeroWizardProps {
  /** When provided, step changes are reported (e.g. for modal header / progress) */
  onStepChange?: (step: WizardStep, title: string) => void
  /** Compact layout for use inside modal (no outer card min-height) */
  compact?: boolean
}

export function FSBOHeroWizard({ onStepChange, compact = false }: FSBOHeroWizardProps) {
  const [step, setStep] = useState<WizardStep>(1)
  const [formData, setFormData] = useState<FSBOFormData>(initialFormData)

  // Notify parent when step changes (for modal title + progress)
  useEffect(() => {
    onStepChange?.(step, STEP_TITLES[step])
  }, [step, onStepChange])

  const update = (field: keyof FSBOFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const canAdvanceStep1 =
    formData.make.trim() !== "" && formData.model.trim() !== ""
  const canAdvanceStep2 =
    formData.price.trim() !== "" && formData.location.trim() !== ""

  const goBack = () => {
    if (step === 2) setStep(1)
    if (step === 3) setStep(2)
  }

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (canAdvanceStep1) setStep(2)
  }

  const handleStep2Submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (canAdvanceStep2) setStep(3)
  }

  const handleStep3Submit = (e: React.FormEvent) => {
    e.preventDefault()
    // No redirect – state only
  }

  return (
    <div className={cn("mx-auto max-w-md", compact && "max-w-none")}>
      <div
        className={cn(
          "rounded-2xl bg-white p-6 shadow-lg flex flex-col",
          !compact && "min-h-[280px] h-[440px] max-h-[440px]"
        )}
      >
        <div className="relative flex-1 overflow-hidden">
          {/* Step 1 */}
          <div
            role="tabpanel"
            aria-hidden={step !== 1}
            className={cn(
              "h-full transition-opacity duration-200",
              step === 1 ? "opacity-100" : "absolute inset-0 opacity-0 pointer-events-none"
            )}
          >
            <form onSubmit={handleStep1Submit} className="flex h-full flex-col">
              <div className="space-y-4">
                <Input
                  placeholder="Make"
                  value={formData.make}
                  onChange={(e) => update("make", e.target.value)}
                  className="w-full rounded-lg border-border focus-visible:ring-primary"
                  aria-label="Boat make"
                />
                <Input
                  placeholder="Model"
                  value={formData.model}
                  onChange={(e) => update("model", e.target.value)}
                  className="w-full rounded-lg border-border focus-visible:ring-primary"
                  aria-label="Boat model"
                />
              </div>
              <p className="mt-4 text-sm text-muted-foreground">
                No signup required to begin.
              </p>
              <div className="mt-auto pt-6">
                <Button
                  type="submit"
                  disabled={!canAdvanceStep1}
                  className="w-full rounded-lg py-3"
                >
                  Start My Listing
                </Button>
              </div>
            </form>
          </div>

          {/* Step 2 */}
          <div
            role="tabpanel"
            aria-hidden={step !== 2}
            className={cn(
              "h-full transition-opacity duration-200",
              step === 2 ? "opacity-100" : "absolute inset-0 opacity-0 pointer-events-none"
            )}
          >
            <form onSubmit={handleStep2Submit} className="flex h-full flex-col">
              <div className="space-y-4">
                <Input
                  placeholder="Price"
                  value={formData.price}
                  onChange={(e) => update("price", e.target.value)}
                  className="w-full rounded-lg border-border focus-visible:ring-primary"
                  aria-label="Price"
                />
                <Input
                  placeholder="Year"
                  value={formData.year}
                  onChange={(e) => update("year", e.target.value)}
                  className="w-full rounded-lg border-border focus-visible:ring-primary"
                  aria-label="Year"
                />
                <Input
                  placeholder="Length"
                  value={formData.length}
                  onChange={(e) => update("length", e.target.value)}
                  className="w-full rounded-lg border-border focus-visible:ring-primary"
                  aria-label="Length"
                />
                <Input
                  placeholder="Location"
                  value={formData.location}
                  onChange={(e) => update("location", e.target.value)}
                  className="w-full rounded-lg border-border focus-visible:ring-primary"
                  aria-label="Location"
                />
              </div>
              <div className="mt-auto space-y-3 pt-6">
                <Button
                  type="submit"
                  disabled={!canAdvanceStep2}
                  className="w-full rounded-lg py-3"
                >
                  Continue
                </Button>
                <button
                  type="button"
                  onClick={goBack}
                  className="w-full text-center text-sm text-primary hover:underline"
                >
                  Back
                </button>
              </div>
            </form>
          </div>

          {/* Step 3 */}
          <div
            role="tabpanel"
            aria-hidden={step !== 3}
            className={cn(
              "h-full transition-opacity duration-200",
              step === 3 ? "opacity-100" : "absolute inset-0 opacity-0 pointer-events-none"
            )}
          >
            <form onSubmit={handleStep3Submit} className="flex h-full flex-col">
              <div className="space-y-4">
                <Input
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={(e) => update("firstName", e.target.value)}
                  className="w-full rounded-lg border-border focus-visible:ring-primary"
                  aria-label="First name"
                />
                <Input
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={(e) => update("lastName", e.target.value)}
                  className="w-full rounded-lg border-border focus-visible:ring-primary"
                  aria-label="Last name"
                />
                <Input
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) => update("email", e.target.value)}
                  className="w-full rounded-lg border-border focus-visible:ring-primary"
                  aria-label="Email"
                />
              </div>
              <p className="mt-4 text-sm text-muted-foreground">
                Your boat details are already saved.
              </p>
              <div className="mt-auto space-y-3 pt-6">
                <Button type="submit" className="w-full rounded-lg py-3">
                  Create My Listing
                </Button>
                <button
                  type="button"
                  onClick={goBack}
                  className="w-full text-center text-sm text-primary hover:underline"
                >
                  Back
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
