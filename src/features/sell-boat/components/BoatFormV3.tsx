"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { motion, AnimatePresence } from "framer-motion"
import {
  boatFormV3Schema,
  wizardStep2Fields,
  wizardStep3Fields,
  type BoatFormV3Data,
} from "../types-v3"
import { STORAGE_KEY } from "@/components/sell-b-v3/SignupModal"
import { WizardStep2V3 } from "./WizardStep2V3"
import { WizardStep3V3 } from "./WizardStep3V3"
import SuccessScreen from "./SuccessScreen"
import { Button } from "@/components/ui/button"
import { getSupabase } from "../lib/supabase"
import { toast } from "sonner"
import { Loader2, ArrowLeft } from "lucide-react"

export interface BoatFormV3Props {
  /** Layout variant: default = card wrapper, fullWidth = no card */
  variant?: "default" | "fullWidth"
  /** Optional callback when the current step changes */
  onStepChange?: (step: number) => void
}

export function BoatFormV3({
  variant = "fullWidth",
  onStepChange,
}: BoatFormV3Props) {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [images, setImages] = useState<File[]>([])
  const [initialData, setInitialData] = useState<{
    brand: string
    model: string
    year: number
    signupEmail?: string
    signupFullName?: string
  } | null>(null)
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    const stored = sessionStorage.getItem(STORAGE_KEY)
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        setInitialData(parsed)
      } catch {
        router.replace("/sell-b-v3")
      }
    } else {
      router.replace("/sell-b-v3")
    }
    setIsHydrated(true)
  }, [router])

  useEffect(() => {
    onStepChange?.(step)
  }, [step, onStepChange])

  const form = useForm<BoatFormV3Data>({
    resolver: zodResolver(boatFormV3Schema),
    defaultValues: {
      brand: "",
      model: "",
      year: "" as unknown as number,
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
      email: "",
      phone: "",
      preferredContact: "",
      gdprConsent: false as unknown as true,
    },
    mode: "onChange",
  })

  useEffect(() => {
    if (initialData && isHydrated) {
      form.setValue("brand", initialData.brand)
      form.setValue("model", initialData.model)
      form.setValue("year", initialData.year)
      if (initialData.signupFullName) {
        form.setValue("fullName", initialData.signupFullName)
      }
      if (initialData.signupEmail) {
        form.setValue("email", initialData.signupEmail)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialData, isHydrated])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [step])

  const validateStep = async (stepNum: number) => {
    const fields =
      stepNum === 1 ? wizardStep2Fields : wizardStep3Fields
    return form.trigger(fields as Parameters<typeof form.trigger>[0])
  }

  const nextStep = async () => {
    const valid = await validateStep(step)
    if (valid) setStep(step + 1)
  }

  const prevStep = () => setStep(step - 1)

  const uploadImages = async (): Promise<string[]> => {
    const urls: string[] = []
    for (const file of images) {
      const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${file.name.split(".").pop()}`
      const { error } = await getSupabase()
        .storage.from("boat-images")
        .upload(fileName, file)
      if (!error) {
        const { data } = getSupabase()
          .storage.from("boat-images")
          .getPublicUrl(fileName)
        urls.push(data.publicUrl)
      }
    }
    return urls
  }

  const onSubmit = async (data: BoatFormV3Data) => {
    setIsSubmitting(true)
    try {
      const imageUrls = await uploadImages()

      const { error } = await getSupabase().from("boat_submissions").insert({
        boat_type: data.boatType,
        brand: data.brand,
        model: data.model,
        year: data.year,
        length_ft: data.length,
        location: data.location,
        listed_elsewhere: data.listedElsewhere,
        expected_price: data.expectedPrice || null,
        condition: data.condition,
        engine_hours: data.engineHours || null,
        last_maintenance_year: data.lastMaintenanceYear || null,
        extras: data.extras,
        image_urls: imageUrls,
        full_name: data.fullName,
        email: data.email,
        phone: data.phone,
        preferred_contact: data.preferredContact,
        gdpr_consent: data.gdprConsent,
      })

      if (error) throw error
      sessionStorage.removeItem(STORAGE_KEY)
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
    router.push("/sell-b-v3")
  }

  if (!isHydrated || !initialData) {
    return null
  }

  if (isSuccess) return <SuccessScreen onReset={handleReset} />

  const ctaLabels = ["Continue", "Sell my boat"]
  const isLastStep = step === 2
  const isFullWidth = variant === "fullWidth"

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className={isFullWidth ? "relative flex flex-col min-h-0" : "relative"}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.25 }}
        >
          {step === 1 && (
            <WizardStep2V3
              form={form}
              images={images}
              setImages={setImages}
            />
          )}
          {step === 2 && <WizardStep3V3 form={form} />}
        </motion.div>
      </AnimatePresence>

      <div
        className={
          isFullWidth
            ? "sticky bottom-0 left-0 right-0 -mx-4 border-t border-border bg-white px-4 pt-4 mt-6 sm:-mx-6 sm:px-6 md:-mx-8 md:px-8 lg:-mx-[68px] lg:px-[68px]"
            : "sticky bottom-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-t border-border pt-4 pb-6 mt-6 -mx-6 px-6"
        }
        style={
          isFullWidth
            ? {
                paddingBottom:
                  "max(1.5rem, env(safe-area-inset-bottom, 0px))",
              }
            : undefined
        }
      >
        <div className="flex w-full gap-3">
          {step > 1 && (
            <Button type="button" variant="outline" onClick={prevStep}>
              <ArrowLeft className="w-4 h-4 mr-1" /> Back
            </Button>
          )}
          <Button
            type={isLastStep ? "submit" : "button"}
            onClick={isLastStep ? undefined : nextStep}
            disabled={isSubmitting}
            size="lg"
            className="flex-1 text-base font-semibold"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Submitting...
              </>
            ) : (
              ctaLabels[step - 1]
            )}
          </Button>
        </div>
      </div>
    </form>
  )
}
