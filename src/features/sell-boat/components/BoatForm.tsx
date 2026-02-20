"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { motion, AnimatePresence } from "framer-motion"
import { BoatFormData, boatFormSchema, step1Fields, step2Fields, step3Fields } from "../types"
import ProgressBar from "./ProgressBar"
import StepOne from "./StepOne"
import StepTwo from "./StepTwo"
import StepThree from "./StepThree"
import SuccessScreen from "./SuccessScreen"
import { Button } from "@/components/ui/button"
import { getSupabase } from "../lib/supabase"
import { toast } from "sonner"
import { Loader2, ArrowLeft } from "lucide-react"

const BoatForm = () => {
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [images, setImages] = useState<File[]>([])

  const form = useForm<BoatFormData>({
    resolver: zodResolver(boatFormSchema),
    defaultValues: {
      boatType: "",
      brand: "",
      model: "",
      year: "" as unknown as number,
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
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [step])

  const validateStep = async (stepNum: number) => {
    const fields =
      stepNum === 1 ? step1Fields : stepNum === 2 ? step2Fields : step3Fields
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
      const { error } = await getSupabase().storage.from("boat-images").upload(fileName, file)
      if (!error) {
        const { data } = getSupabase().storage.from("boat-images").getPublicUrl(fileName)
        urls.push(data.publicUrl)
      }
    }
    return urls
  }

  const onSubmit = async (data: BoatFormData) => {
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
  }

  if (isSuccess) return <SuccessScreen onReset={handleReset} />

  const ctaLabels = ["Continue", "Review & Continue", "Publish My Boat"]
  const isLastStep = step === 3

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="relative">
      <ProgressBar currentStep={step} totalSteps={3} />

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.25 }}
        >
          {step === 1 && <StepOne form={form} />}
          {step === 2 && <StepTwo form={form} images={images} setImages={setImages} />}
          {step === 3 && <StepThree form={form} />}
        </motion.div>
      </AnimatePresence>

      <div className="sticky bottom-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-t border-border pt-4 pb-6 mt-6 -mx-6 px-6">
        <div className="flex gap-3">
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

export default BoatForm
