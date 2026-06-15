import { z } from "zod"
import { step1LPSchema, wizardStep2Schema, wizardStep3Schema } from "./types-v3"

export type { AIPreFillResult } from "@/lib/fsbo/ai-prefill"

/** Photo item managed outside RHF */
export interface FSBOPhoto {
  id: string
  url: string
  file: File
}

/** Package selection */
export const fsboPlanSchema = z.object({
  selectedPlan: z.enum(["basic", "premium"]).default("premium"),
})

/** Full FSBO form data = LP + Step1 boat data + Step2 (photos are File[] separate) + Step3 details + Step4 plan */
export const fsboFormSchema = step1LPSchema
  .merge(wizardStep2Schema)
  .merge(wizardStep3Schema)
  .merge(fsboPlanSchema)
  .extend({
    expectedPrice: z.coerce
      .number({
        required_error: "Please enter an asking price",
        invalid_type_error: "Please enter a valid price",
      })
      .min(1000, "Minimum price is £1,000"),
    photoCount: z
      .number()
      .min(0)
      .default(0),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(128, "Password is too long"),
  })

export type FSBOFormData = z.infer<typeof fsboFormSchema>
export type FSBOPlan = "basic" | "premium"

/** Step metadata — used by WizardProgress and BoatFormFSBO */
export const FSBO_STEPS = [
  {
    step: 1,
    name: "Your Boat",
    fields: ["boatType", "condition", "length", "location", "expectedPrice"],
  },
  { step: 2, name: "Photos", fields: ["photoCount"] },
  {
    step: 3,
    name: "Your Details",
    fields: ["fullName", "phone", "preferredContact", "gdprConsent", "password"],
  },
  { step: 4, name: "Choose Plan",   fields: ["selectedPlan"] },
  { step: 5, name: "Payment",       fields: [] },
] as const

export type FSBOStepNumber = 1 | 2 | 3 | 4 | 5
