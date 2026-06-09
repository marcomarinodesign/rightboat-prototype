"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { motion, AnimatePresence } from "framer-motion"
import { toast } from "sonner"

import { runAIPreFill, type AIPreFillResult } from "@/lib/fsbo/ai-prefill"
import { popularModels } from "@/data/models"
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
  1: "Continue →",
  2: "Continue →",
  3: "Continue →",
  4: "Continue to payment →",
  5: "Publish my listing →",
}

export function BoatFormFSBO() {
  const router = useRouter()
  const [step, setStep] = useState<FSBOStepNumber>(1)
  const [direction, setDirection] = useState<1 | -1>(1)
  const [photos, setPhotos] = useState<FSBOPhoto[]>([])
  const photosRef = useRef(photos)
  photosRef.current = photos
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isHydrated, setIsHydrated] = useState(false)
  const [aiResult, setAIResult] = useState<AIPreFillResult | null>(null)
  const [aiBannerDismissed, setAIBannerDismissed] = useState(false)
  const [userEditedAIFields, setUserEditedAIFields] = useState<Set<string>>(new Set())

  const form = useForm<FSBOFormData>({
    resolver: zodResolver(fsboFormSchema),
    defaultValues: {
      brand: "",
      model: "",
      year: "" as unknown as number,
      email: "",
      boatType: "",
      length: "" as unknown as number,
      location: "",
      listedElsewhere: false,
      expectedPrice: "" as unknown as number,
      condition: "",
      engineHours: "",
      lastMaintenanceYear: "",
      extras: [],
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

  // Hydrate from localStorage
  useEffect(() => {
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
  }, [router, form])

  // AI pre-fill from LP make/model/year (once on mount)
  useEffect(() => {
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

      setAIResult(result)
    } catch {
      // Silently ignore parse errors
    }
  }, [form])

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
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [step])

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

  const brand = form.watch("brand")
  const model = form.watch("model")
  const year = form.watch("year")
  const boatSummary = formatBoatSummary(brand, model, year)

  if (!isHydrated) return null
  if (isSuccess) {
    return (
      <div className="fixed inset-0 z-50 overflow-y-auto bg-background">
        <div className="mx-auto max-w-lg px-4 py-8">
          <FSBOSuccessScreen
            plan={form.getValues("selectedPlan")}
            boatSummary={boatSummary}
            onReset={handleReset}
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

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="relative flex flex-col min-h-0"
    >
      {/* Sticky progress header */}
      <WizardProgress
        step={step}
        totalSteps={TOTAL_STEPS}
        stepName={currentStepMeta.name}
        onBack={step > 1 ? goBack : undefined}
      />

      {/* Scrollable step content */}
      <div className="flex-1 py-6">
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
                showAIBanner={!aiBannerDismissed && activeAIFields.size > 0}
                onDismissAIBanner={() => setAIBannerDismissed(true)}
                onUserEditAIField={handleUserEditAIField}
              />
            )}
            {step === 2 && (
              <FSBOStep2Photos
                form={form}
                photos={photos}
                onPhotosChange={setPhotos}
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

      {/* Sticky footer CTA */}
      <WizardFooter
        label={CTA_LABELS[step]}
        onClick={isLastStep ? () => void handlePublish() : goNext}
        isSubmit={false}
        disabled={continueDisabled}
        isLoading={isSubmitting}
      />
    </form>
  )
}
