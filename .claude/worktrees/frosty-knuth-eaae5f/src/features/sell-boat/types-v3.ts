import { z } from "zod"
import { BOAT_TYPES, EXTRAS_OPTIONS } from "./types"

/** LP Step 1: only Brand, Model, Year (per Joe's feedback) */
export const step1LPSchema = z.object({
  brand: z.string().trim().min(1, "Brand is required").max(100),
  model: z.string().trim().min(1, "Model is required").max(100),
  year: z
    .string()
    .min(1, "Year is required")
    .refine(
      (v) => {
        const n = parseInt(v, 10)
        return !Number.isNaN(n) && n >= 1900 && n <= new Date().getFullYear() + 1
      },
      { message: "Invalid year" }
    )
    .transform((v) => parseInt(v, 10)),
})

export type Step1LPData = z.infer<typeof step1LPSchema>
/** Form input type (year is string from SearchableSelect) */
export type Step1LPFormInput = z.input<typeof step1LPSchema>

/** Wizard Step 2: boat details (boatType, length, location, listedElsewhere + StepTwo fields) */
export const wizardStep2Schema = z.object({
  boatType: z.string().min(1, "Boat type is required"),
  length: z.coerce.number().min(1, "Length is required").max(500),
  location: z.string().trim().min(1, "Location is required").max(200),
  listedElsewhere: z.boolean(),
  expectedPrice: z.coerce.number().optional().or(z.literal("")),
  condition: z.string().min(1, "Condition is required"),
  engineHours: z.coerce.number().optional().or(z.literal("")),
  lastMaintenanceYear: z.coerce.number().optional().or(z.literal("")),
  extras: z.array(z.string()),
})

/** Wizard Step 3: contact info */
export const wizardStep3Schema = z.object({
  fullName: z.string().trim().min(1, "Full name is required").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  phone: z.string().trim().min(1, "Phone is required").max(30),
  preferredContact: z.string().min(1, "Preferred contact method is required"),
  gdprConsent: z.literal(true, {
    errorMap: () => ({ message: "You must accept the privacy policy" }),
  }),
})

export type WizardStep2Data = z.infer<typeof wizardStep2Schema>
export type WizardStep3Data = z.infer<typeof wizardStep3Schema>

/** Full form data for v3 wizard (step 1 from LP + step 2 + step 3) */
export type BoatFormV3Data = Step1LPData & WizardStep2Data & WizardStep3Data

export const wizardStep2Fields = [
  "boatType",
  "length",
  "location",
  "listedElsewhere",
  "condition",
  "extras",
] as const
export const wizardStep3Fields = [
  "fullName",
  "email",
  "phone",
  "preferredContact",
  "gdprConsent",
] as const

export const step1LPFields = ["brand", "model", "year"] as const

/** Full schema for BoatFormV3 (step1 from LP + wizard steps 2 & 3) */
export const boatFormV3Schema = step1LPSchema
  .merge(wizardStep2Schema)
  .merge(wizardStep3Schema)

export { BOAT_TYPES, EXTRAS_OPTIONS }
