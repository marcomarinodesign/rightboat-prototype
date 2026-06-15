# FSBO Wizard — Cursor Prompt · Phase 2: Wizard Shell

## Context

Phase 1 is complete. The FSBO flow lives at `/fsbo` and `/fsbo/wizard`.

`FSBOWizardClient` currently renders `SellBWizardLayout` + `BoatFormV3` (2 steps, old flow).

Phase 2 builds the **new wizard shell**: sticky progress header, sticky footer CTA, and a new `BoatFormFSBO` orchestrator with 5 placeholder steps. No UI content changes yet — steps get real content in Phases 3–7.

**Do NOT modify `BoatFormV3.tsx`** — it is still used by `/app/sell/wizard`.

---

## Architecture overview

```
FSBOWizardClient
  └── SellBWizardLayout            (left image + right scrollable column — keep as-is)
       └── BoatFormFSBO            (NEW — replaces BoatFormV3 for FSBO)
            ├── WizardProgress     (NEW — sticky top header)
            ├── [step content]     (placeholder components, one per step)
            └── WizardFooter       (NEW — sticky bottom CTA)
```

---

## Task 1 — Create `WizardProgress` component

**File:** `src/components/fsbo/WizardProgress.tsx`

Sticky header shown at the top of the wizard form area on every step.

```tsx
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
```

---

## Task 2 — Create `WizardFooter` component

**File:** `src/components/fsbo/WizardFooter.tsx`

Sticky footer shown at the bottom of the wizard form area on every step.

```tsx
"use client"

import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export interface WizardFooterProps {
  /** Primary CTA label */
  label: string
  /** Called on primary CTA click. If type="submit" is needed, set isSubmit=true. */
  onClick?: () => void
  /** If true, renders as type="submit" (for the last step form submission) */
  isSubmit?: boolean
  /** Disables the primary CTA */
  disabled?: boolean
  /** Shows a loading spinner inside the button */
  isLoading?: boolean
  /** Optional secondary text link below the button */
  secondaryLabel?: string
  /** Called when secondary link is clicked */
  onSecondary?: () => void
  className?: string
}

export function WizardFooter({
  label,
  onClick,
  isSubmit = false,
  disabled = false,
  isLoading = false,
  secondaryLabel,
  onSecondary,
  className,
}: WizardFooterProps) {
  return (
    <div
      className={cn(
        // Sticky at bottom, full bleed (compensate parent padding)
        "sticky bottom-0 z-20 bg-background",
        "-mx-4 px-4 sm:-mx-6 sm:px-6 md:-mx-8 md:px-8 lg:-mx-[68px] lg:px-[68px]",
        "border-t border-border pt-4",
        className
      )}
      style={{
        paddingBottom: "max(1.5rem, env(safe-area-inset-bottom, 0px))",
      }}
    >
      <Button
        type={isSubmit ? "submit" : "button"}
        onClick={isSubmit ? undefined : onClick}
        disabled={disabled || isLoading}
        size="lg"
        className="w-full rounded-xl text-base font-semibold h-[52px]"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Please wait...
          </>
        ) : (
          label
        )}
      </Button>

      {secondaryLabel && onSecondary && (
        <button
          type="button"
          onClick={onSecondary}
          className="w-full mt-3 text-sm text-muted-foreground hover:text-foreground transition-colors text-center"
        >
          {secondaryLabel}
        </button>
      )}
    </div>
  )
}
```

---

## Task 3 — Create 5 placeholder step components

Create these 5 files. They will be replaced with real content in Phases 3–7.  
Keep them minimal — just enough to verify navigation works.

**`src/features/sell-boat/components/fsbo/FSBOStep1YourBoat.tsx`**
```tsx
"use client"
import { UseFormReturn } from "react-hook-form"
import { FSBOFormData } from "../types-fsbo"

interface Props { form: UseFormReturn<FSBOFormData> }

export function FSBOStep1YourBoat({ form }: Props) {
  return (
    <div className="space-y-4 py-6">
      <h2 className="text-xl font-bold">Step 1 — Your Boat</h2>
      <p className="text-muted-foreground text-sm">
        Boat type, condition, length, location, price, engine hours.
      </p>
      <p className="text-xs text-muted-foreground bg-muted rounded-lg p-3">
        🚧 Content coming in Phase 3
      </p>
    </div>
  )
}
```

**`src/features/sell-boat/components/fsbo/FSBOStep2Photos.tsx`**
```tsx
"use client"
import { FSBOImages } from "../types-fsbo"

interface Props {
  images: File[]
  setImages: (images: File[]) => void
}

export function FSBOStep2Photos({ images, setImages }: Props) {
  return (
    <div className="space-y-4 py-6">
      <h2 className="text-xl font-bold">Step 2 — Photos</h2>
      <p className="text-muted-foreground text-sm">
        Camera-first photo upload. 5+ photos recommended.
      </p>
      <p className="text-xs text-muted-foreground bg-muted rounded-lg p-3">
        🚧 Content coming in Phase 4
      </p>
    </div>
  )
}
```

**`src/features/sell-boat/components/fsbo/FSBOStep3YourDetails.tsx`**
```tsx
"use client"
import { UseFormReturn } from "react-hook-form"
import { FSBOFormData } from "../types-fsbo"

interface Props { form: UseFormReturn<FSBOFormData> }

export function FSBOStep3YourDetails({ form }: Props) {
  return (
    <div className="space-y-4 py-6">
      <h2 className="text-xl font-bold">Step 3 — Your Details</h2>
      <p className="text-muted-foreground text-sm">
        Full name, phone, preferred contact method, password, GDPR.
      </p>
      <p className="text-xs text-muted-foreground bg-muted rounded-lg p-3">
        🚧 Content coming in Phase 5
      </p>
    </div>
  )
}
```

**`src/features/sell-boat/components/fsbo/FSBOStep4ChoosePlan.tsx`**
```tsx
"use client"
import { UseFormReturn } from "react-hook-form"
import { FSBOFormData } from "../types-fsbo"

interface Props { form: UseFormReturn<FSBOFormData> }

export function FSBOStep4ChoosePlan({ form }: Props) {
  return (
    <div className="space-y-4 py-6">
      <h2 className="text-xl font-bold">Step 4 — Choose Your Plan</h2>
      <p className="text-muted-foreground text-sm">
        Basic ($49/mo) vs Premium ($99/mo — Recommended).
      </p>
      <p className="text-xs text-muted-foreground bg-muted rounded-lg p-3">
        🚧 Content coming in Phase 6
      </p>
    </div>
  )
}
```

**`src/features/sell-boat/components/fsbo/FSBOStep5Payment.tsx`**
```tsx
"use client"
import { UseFormReturn } from "react-hook-form"
import { FSBOFormData } from "../types-fsbo"

interface Props {
  form: UseFormReturn<FSBOFormData>
  selectedPlan: "basic" | "premium"
}

export function FSBOStep5Payment({ form, selectedPlan }: Props) {
  return (
    <div className="space-y-4 py-6">
      <h2 className="text-xl font-bold">Step 5 — Payment</h2>
      <p className="text-muted-foreground text-sm">
        Selected plan: <strong>{selectedPlan === "premium" ? "Premium — $99/mo" : "Basic — $49/mo"}</strong>
      </p>
      <p className="text-xs text-muted-foreground bg-muted rounded-lg p-3">
        🚧 Content coming in Phase 7 (mocked for prototype)
      </p>
    </div>
  )
}
```

---

## Task 4 — Create FSBO types file

**File:** `src/features/sell-boat/types-fsbo.ts`

New types file for the FSBO flow. Extends the existing v3 types.

```ts
import { z } from "zod"
import { step1LPSchema, wizardStep2Schema, wizardStep3Schema } from "./types-v3"

/** Package selection */
export const fsboPlanSchema = z.object({
  selectedPlan: z.enum(["basic", "premium"]).default("premium"),
})

/** Full FSBO form data = LP + Step1 boat data + Step2 (photos are File[] separate) + Step3 details + Step4 plan */
export const fsboFormSchema = step1LPSchema
  .merge(wizardStep2Schema)
  .merge(wizardStep3Schema)
  .merge(fsboPlanSchema)

export type FSBOFormData = z.infer<typeof fsboFormSchema>
export type FSBOPlan = "basic" | "premium"

/** Step metadata — used by WizardProgress and BoatFormFSBO */
export const FSBO_STEPS = [
  { step: 1, name: "Your Boat",     fields: ["boatType", "condition", "length", "location", "expectedPrice", "engineHours"] },
  { step: 2, name: "Photos",        fields: [] },
  { step: 3, name: "Your Details",  fields: ["fullName", "phone", "preferredContact", "gdprConsent"] },
  { step: 4, name: "Choose Plan",   fields: ["selectedPlan"] },
  { step: 5, name: "Payment",       fields: [] },
] as const

export type FSBOStepNumber = 1 | 2 | 3 | 4 | 5
```

---

## Task 5 — Create `BoatFormFSBO` orchestrator

**File:** `src/features/sell-boat/components/BoatFormFSBO.tsx`

The new form orchestrator for the FSBO wizard. Uses `WizardProgress`, `WizardFooter`, and the 5 step components.

```tsx
"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { motion, AnimatePresence } from "framer-motion"
import { toast } from "sonner"

import { fsboFormSchema, FSBOFormData, FSBOStepNumber, FSBO_STEPS } from "../types-fsbo"
import { WizardProgress } from "@/components/fsbo/WizardProgress"
import { WizardFooter } from "@/components/fsbo/WizardFooter"
import { FSBOStep1YourBoat } from "./fsbo/FSBOStep1YourBoat"
import { FSBOStep2Photos } from "./fsbo/FSBOStep2Photos"
import { FSBOStep3YourDetails } from "./fsbo/FSBOStep3YourDetails"
import { FSBOStep4ChoosePlan } from "./fsbo/FSBOStep4ChoosePlan"
import { FSBOStep5Payment } from "./fsbo/FSBOStep5Payment"
import SuccessScreen from "./SuccessScreen"

const STORAGE_KEY = "rightboat-fsbo-v1"
const TOTAL_STEPS = 5

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
  const [images, setImages] = useState<File[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isHydrated, setIsHydrated] = useState(false)

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
      expectedPrice: "",
      condition: "",
      engineHours: "",
      lastMaintenanceYear: "",
      extras: [],
      fullName: "",
      phone: "",
      preferredContact: "",
      gdprConsent: false as unknown as true,
      selectedPlan: "premium",
    },
    mode: "onChange",
  })

  // Hydrate from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        // Pre-fill LP fields from stored data
        if (parsed.brand) form.setValue("brand", parsed.brand)
        if (parsed.model) form.setValue("model", parsed.model)
        if (parsed.year) form.setValue("year", parsed.year)
        if (parsed.email) form.setValue("email", parsed.email)
        // Restore wizard progress if user resumes
        if (parsed._step && parsed._step > 1) {
          setStep(parsed._step as FSBOStepNumber)
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

  const onSubmit = async (data: FSBOFormData) => {
    setIsSubmitting(true)
    try {
      // TODO Phase 7: real payment + Supabase submit
      // For prototype: simulate a short delay then show success
      await new Promise((r) => setTimeout(r, 1200))
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
    setImages([])
    setStep(1)
    setIsSuccess(false)
    router.push("/fsbo")
  }

  if (!isHydrated) return null
  if (isSuccess) return <SuccessScreen onReset={handleReset} />

  const currentStepMeta = FSBO_STEPS.find((s) => s.step === step)!
  const isLastStep = step === TOTAL_STEPS

  const slideVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? 40 : -40, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -40 : 40, opacity: 0 }),
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
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
            {step === 1 && <FSBOStep1YourBoat form={form} />}
            {step === 2 && <FSBOStep2Photos images={images} setImages={setImages} />}
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
        onClick={isLastStep ? undefined : goNext}
        isSubmit={isLastStep}
        disabled={isSubmitting}
        isLoading={isSubmitting}
      />
    </form>
  )
}
```

---

## Task 6 — Update `FSBOWizardClient` to use `BoatFormFSBO`

**File:** `src/app/fsbo/wizard/FSBOWizardClient.tsx`

Replace the dynamic import of `BoatFormV3` with `BoatFormFSBO`:

```tsx
"use client"

import dynamic from "next/dynamic"
import { SellBWizardLayout } from "@/components/sell-b/SellBWizardLayout"

const BoatFormFSBO = dynamic(
  () =>
    import("@/features/sell-boat/components/BoatFormFSBO").then(
      (m) => m.BoatFormFSBO
    ),
  { ssr: false }
)

export function FSBOWizardClient() {
  return (
    // hideStepHeader=true: WizardProgress handles its own header
    <SellBWizardLayout currentStep={1} totalSteps={5} hideStepHeader>
      <BoatFormFSBO />
    </SellBWizardLayout>
  )
}
```

Note: `currentStep` and `totalSteps` are passed to `SellBWizardLayout` for any legacy usage, but the inline progress bar inside `SellBWizardLayout` is already hidden via `hideStepHeader`. `WizardProgress` handles its own display.

---

## Task 7 — Hide `SellBWizardLayout`'s inline progress bar when `hideStepHeader` is true

**File:** `src/components/sell-b/SellBWizardLayout.tsx`

The inline progress bar in `SellBWizardLayout` should be hidden when `hideStepHeader` is `true` (since `WizardProgress` handles it):

```tsx
// Find the progress block inside SellBWizardLayout and wrap it:
{!hideStepHeader && (
  <div className="mb-6 sm:mb-8">
    {/* ... existing progress bar div ... */}
  </div>
)}
```

---

## Verification checklist

- [ ] `http://localhost:3000/fsbo/wizard` loads without errors
- [ ] `WizardProgress` is visible at the top with step name "Your Boat" and "1 / 5"
- [ ] Progress bar shows 20% on step 1
- [ ] No back arrow on step 1; back arrow appears from step 2 onward
- [ ] Tapping back arrow navigates to the previous step
- [ ] "Continue →" button advances to the next step
- [ ] Step transition has a smooth slide animation (Framer Motion)
- [ ] On step 5, CTA is "Publish my listing →" and submits the form
- [ ] After submit (1.2s delay), `SuccessScreen` renders
- [ ] `WizardFooter` is sticky at the bottom on mobile (390px viewport)
- [ ] `WizardProgress` is sticky at the top (doesn't scroll away)
- [ ] `/app/sell/wizard` still works (uses `BoatFormV3`, unchanged)
- [ ] No TypeScript errors (`npx tsc --noEmit`)

---

## What is NOT in scope for Phase 2

- Real field content for Steps 1–5 — Phases 3–7
- `BoatTypeSelector`, `PillGroup`, `PackageCard`, `PhotoUploader` — Phases 3+
- AI pre-fill — TBC (Q#11)
- Real Supabase submission — wired in Phase 7
- Payment integration — Phase 7
