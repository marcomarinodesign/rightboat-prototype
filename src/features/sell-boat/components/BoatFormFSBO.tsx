"use client"

import { useState, useEffect, useRef, type ReactNode } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { motion, AnimatePresence } from "framer-motion"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { runAIPreFill, type AIPreFillResult } from "@/lib/fsbo/ai-prefill"
import {
  figmaPreviewMockAIResult,
  figmaPreviewMockFormValues,
  figmaPreviewMockPhotos,
  figmaPreviewStepNumber,
  type FsboFigmaPreviewStep,
  type FsboPreviewMode,
} from "@/lib/fsbo/figma-preview"
import { popularModels } from "@/data/models"
import { cn } from "@/lib/utils"
import { fsboFormSchema, FSBOFormData, FSBOPhoto, FSBOStepNumber, FSBO_STEPS } from "../types-fsbo"
import { WizardProgress } from "@/components/fsbo/WizardProgress"
import { WizardFooter } from "@/components/fsbo/WizardFooter"
import { FSBOStep1YourBoat } from "./fsbo/FSBOStep1YourBoat"
import { FSBOStep2Photos } from "./fsbo/FSBOStep2Photos"
import { FSBOStep3YourDetails } from "./fsbo/FSBOStep3YourDetails"
import { FSBOStep4ChoosePlan } from "./fsbo/FSBOStep4ChoosePlan"
import { FSBOStep5Payment } from "./fsbo/FSBOStep5Payment"
import { FSBOSuccessScreen } from "./FSBOSuccessScreen"

const STORAGE_KEY = "rightboat-fsbo-v1"
const TOTAL_STEPS = 5

function formatBoatSummary(brand: string, model: string, year: number | string) {
  const modelEntry = popularModels.find((m) => m.slug === model)
  const modelLabel = modelEntry ? `${modelEntry.brand} ${modelEntry.name}` : model
  return [brand, modelLabel, year].filter(Boolean).join(" · ")
}

/** CTA label per step */
const CTA_LABELS: Record<FSBOStepNumber, string> = {
  1: "Next",
  2: "Next",
  3: "Next",
  4: "Next",
  5: "Publish my listing →",
}

const STEP4_DISCLAIMER = "Cancel or change plan any time from your dashboard. No long-term commitment."

type BoatFormFSBOProps = {
  /** Dev/capture-only step preset (Figma Code Connect). */
  figmaPreview?: FsboFigmaPreviewStep
  /** Force mobile/desktop layout for Figma capture. */
  previewMode?: FsboPreviewMode
  initialStep?: FSBOStepNumber
}

export function BoatFormFSBO({
  figmaPreview,
  previewMode,
  initialStep,
}: BoatFormFSBOProps = {}) {
  const router = useRouter()
  const isFigmaPreview = Boolean(figmaPreview)
  const previewStep = figmaPreview ? figmaPreviewStepNumber(figmaPreview) : undefined
  const [step, setStep] = useState<FSBOStepNumber>(
    initialStep ?? previewStep ?? 1
  )
  const [direction, setDirection] = useState<1 | -1>(1)
  const [photos, setPhotos] = useState<FSBOPhoto[]>(() =>
    isFigmaPreview && previewStep && previewStep >= 2
      ? figmaPreviewMockPhotos()
      : []
  )
  const photosRef = useRef(photos)
  photosRef.current = photos
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isHydrated, setIsHydrated] = useState(isFigmaPreview)
  const [aiResult, setAIResult] = useState<AIPreFillResult | null>(() =>
    isFigmaPreview ? figmaPreviewMockAIResult() : null
  )
  const [userEditedAIFields, setUserEditedAIFields] = useState<Set<string>>(new Set())
  const [showExitDialog, setShowExitDialog] = useState(false)

  const form = useForm<FSBOFormData>({
    resolver: zodResolver(fsboFormSchema),
    defaultValues: {
      brand: "",
      model: "",
      year: "" as unknown as number,
      email: "",
      boatType: "",
      category: "",
      hullMaterial: "",
      length: "" as unknown as number,
      location: "",
      listedElsewhere: false,
      expectedPrice: "" as unknown as number,
      condition: "",
      engineHours: "",
      lastMaintenanceYear: "",
      extras: [],
      description: "",
      engineMake: "",
      numberOfEngines: "",
      beam: "",
      draft: "",
      cabinsBerths: "",
      fullName: "",
      phone: "",
      preferredContact: "",
      gdprConsent: false as unknown as true,
      password: "",
      selectedPlan: "premium",
      photoCount: 0,
    },
    mode: "onChange",
  })

  // Clean up object URLs on unmount
  useEffect(() => {
    return () => {
      photosRef.current.forEach((p) => URL.revokeObjectURL(p.url))
    }
  }, [])

  // Sync photo count to RHF for step validation
  useEffect(() => {
    form.setValue("photoCount", photos.length, {
      shouldValidate: step === 2,
    })
  }, [photos.length, step, form])

  // Figma Code Connect — seed mock data without localStorage
  useEffect(() => {
    if (!isFigmaPreview) return
    const mock = figmaPreviewMockFormValues()
    ;(Object.keys(mock) as (keyof FSBOFormData)[]).forEach((key) => {
      const value = mock[key]
      if (value !== undefined) {
        form.setValue(key, value as FSBOFormData[typeof key], {
          shouldValidate: false,
        })
      }
    })
    setIsHydrated(true)
  }, [isFigmaPreview, form])

  // Hydrate from localStorage
  useEffect(() => {
    if (isFigmaPreview) return
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        const { _step, ...savedValues } = parsed as Record<string, unknown>

        // Restore all saved wizard fields (LP + steps 1–4)
        ;(Object.keys(form.getValues()) as (keyof FSBOFormData)[]).forEach((key) => {
          const value = savedValues[key as string]
          if (value !== undefined && value !== null && value !== "") {
            form.setValue(key, value as FSBOFormData[typeof key])
          }
        })

        if (typeof _step === "number" && _step > 1) {
          setStep(_step as FSBOStepNumber)
        }
      } catch {
        router.replace("/fsbo")
        return
      }
    } else {
      router.replace("/fsbo")
      return
    }
    setIsHydrated(true)
  }, [isFigmaPreview, router, form])

  // AI pre-fill from LP make/model/year (once on mount)
  useEffect(() => {
    if (isFigmaPreview) return
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) return
    try {
      const data = JSON.parse(stored)
      const { brand, model, year } = data
      if (!brand && !model) return

      const result = runAIPreFill({
        brand: brand ?? "",
        model: model ?? "",
        year: typeof year === "number" ? year : parseInt(year ?? "0", 10),
      })

      if (result.filledFields.size === 0) return

      if (result.values.boatType) {
        form.setValue("boatType", result.values.boatType, { shouldValidate: false })
      }
      if (result.values.length) {
        form.setValue("length", result.values.length, { shouldValidate: false })
      }
      if (result.values.condition) {
        form.setValue("condition", result.values.condition, { shouldValidate: false })
      }
      if (result.values.category) {
        form.setValue("category", result.values.category, { shouldValidate: false })
      }
      if (result.values.hullMaterial) {
        form.setValue("hullMaterial", result.values.hullMaterial, { shouldValidate: false })
      }
      if (result.values.description) {
        form.setValue("description", result.values.description as string, { shouldValidate: false })
      }

      setAIResult(result)
    } catch {
      // Silently ignore parse errors
    }
  }, [isFigmaPreview, form])

  const handleUserEditAIField = (fieldName: string) => {
    setUserEditedAIFields((prev) => {
      const next = new Set(prev)
      next.add(fieldName)
      return next
    })
  }

  const activeAIFields = aiResult
    ? new Set([...aiResult.filledFields].filter((f) => !userEditedAIFields.has(f)))
    : new Set<string>()

  // Scroll to top on step change
  useEffect(() => {
    if (isFigmaPreview) return
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [isFigmaPreview, step])

  // Auto-save to localStorage on step complete
  const saveProgress = (nextStep: FSBOStepNumber) => {
    const values = form.getValues()
    const stored = localStorage.getItem(STORAGE_KEY)
    const existing = stored ? JSON.parse(stored) : {}
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ ...existing, ...values, _step: nextStep })
    )
  }

  const goNext = async () => {
    // Validate only the fields for the current step
    const currentStepMeta = FSBO_STEPS.find((s) => s.step === step)
    const fieldsToValidate = currentStepMeta?.fields ?? []

    const valid =
      fieldsToValidate.length > 0
        ? await form.trigger(fieldsToValidate as Parameters<typeof form.trigger>[0])
        : true

    if (!valid) return

    const nextStep = (step + 1) as FSBOStepNumber
    saveProgress(nextStep)
    setDirection(1)
    setStep(nextStep)
  }

  const goBack = () => {
    setDirection(-1)
    setStep((step - 1) as FSBOStepNumber)
  }

  const handleSkipPhotos = () => {
    form.setValue("photoCount", 0, { shouldValidate: false })
    const nextStep = 3 as FSBOStepNumber
    saveProgress(nextStep)
    setDirection(1)
    setStep(nextStep)
  }

  /** Prototype publish — mock payment, no Zod gate (card fields are visual only) */
  const handlePublish = async () => {
    setIsSubmitting(true)
    try {
      form.setValue("photoCount", photos.length, { shouldValidate: false })
      // TODO production: Stripe + Supabase submit
      await new Promise((r) => setTimeout(r, 1200))
      photosRef.current.forEach((p) => URL.revokeObjectURL(p.url))
      localStorage.removeItem(STORAGE_KEY)
      setIsSuccess(true)
    } catch (err) {
      toast.error("Something went wrong. Please try again.")
      console.error(err)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleReset = () => {
    form.reset()
    photos.forEach((p) => URL.revokeObjectURL(p.url))
    setPhotos([])
    setStep(1)
    setIsSuccess(false)
    router.push("/fsbo")
  }

  const handleExitConfirm = () => {
    setShowExitDialog(false)
    photos.forEach((p) => URL.revokeObjectURL(p.url))
    router.push("/fsbo")
  }

  const brand = form.watch("brand")
  const model = form.watch("model")
  const year = form.watch("year")
  const boatSummary = formatBoatSummary(brand, model, year)

  const showSuccess = isSuccess || figmaPreview === "success"

  const previewShell = (children: ReactNode) => {
    if (previewMode === "mobile") {
      return (
        <div className="mx-auto w-full max-w-[402px] min-h-[874px] border-x border-border bg-background">
          {children}
        </div>
      )
    }
    if (previewMode === "desktop") {
      return (
        <div className="w-full min-h-[900px] bg-background">{children}</div>
      )
    }
    return children
  }

  if (!isHydrated) return null
  if (showSuccess) {
    return previewShell(
      <div
        className={cn(
          "overflow-y-auto bg-background",
          isFigmaPreview ? "px-4 py-8" : "fixed inset-0 z-50"
        )}
      >
        <div className="mx-auto max-w-lg px-4 py-8">
          <FSBOSuccessScreen
            plan={form.getValues("selectedPlan")}
            boatSummary={boatSummary}
            onReset={isFigmaPreview ? () => {} : handleReset}
          />
        </div>
      </div>
    )
  }

  const currentStepMeta = FSBO_STEPS.find((s) => s.step === step)!
  const isLastStep = step === TOTAL_STEPS

  const boatType = form.watch("boatType")
  const condition = form.watch("condition")
  const length = form.watch("length")
  const location = form.watch("location")
  const expectedPrice = form.watch("expectedPrice")

  const isStep1Complete =
    !!boatType &&
    !!condition &&
    Number(length) >= 1 &&
    !!location?.trim() &&
    Number(expectedPrice) >= 1000

  const continueDisabled =
    isSubmitting || (step === 1 && !isStep1Complete)

  const slideVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? 40 : -40, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -40 : 40, opacity: 0 }),
  }

  return previewShell(
    <form
      onSubmit={(e) => e.preventDefault()}
      className="relative flex flex-col min-h-0"
    >
      {/* Exit confirmation dialog */}
      <Dialog open={showExitDialog} onOpenChange={setShowExitDialog}>
        <DialogContent>
          <DialogTitle>Exit your listing?</DialogTitle>
          <DialogDescription>
            Your progress will be saved. You can continue from where you left off next time.
          </DialogDescription>
          <div className="mt-6 flex justify-end gap-3">
            <DialogClose asChild>
              <Button variant="tertiary">Keep editing</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button variant="destructive" onClick={handleExitConfirm}>
                Exit anyway
              </Button>
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>

      {/* Progress header */}
      <WizardProgress
        step={step}
        totalSteps={TOTAL_STEPS}
        stepName={currentStepMeta.name}
        onClose={isFigmaPreview ? undefined : () => setShowExitDialog(true)}
      />

      {/* Scrollable step content */}
      <div className="flex-1 pt-4 pb-6">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={step}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.25, ease: "easeInOut" }}
          >
            {step === 1 && (
              <FSBOStep1YourBoat
                form={form}
                aiFields={activeAIFields}

                onUserEditAIField={handleUserEditAIField}
              />
            )}
            {step === 2 && (
              <FSBOStep2Photos
                form={form}
                photos={photos}
                onPhotosChange={setPhotos}
                onSkip={handleSkipPhotos}
              />
            )}
            {step === 3 && <FSBOStep3YourDetails form={form} />}
            {step === 4 && <FSBOStep4ChoosePlan form={form} />}
            {step === 5 && (
              <FSBOStep5Payment
                form={form}
                selectedPlan={form.watch("selectedPlan")}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer CTA */}
      <WizardFooter
        label={CTA_LABELS[step]}
        onClick={isLastStep ? () => void handlePublish() : goNext}
        isSubmit={false}
        disabled={continueDisabled}
        isLoading={isSubmitting}
        onBack={step > 1 ? goBack : undefined}
        skipLabel={step === 2 ? "Skip for now" : undefined}
        onSkip={step === 2 ? handleSkipPhotos : undefined}
        disclaimer={step === 4 ? STEP4_DISCLAIMER : undefined}
      />
    </form>
  )
}
