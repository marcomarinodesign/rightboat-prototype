import { z } from "zod";

export const boatFormSchema = z.object({
  // Step 1
  boatType: z.string().min(1, "Boat type is required"),
  brand: z.string().trim().min(1, "Brand is required").max(100),
  model: z.string().trim().min(1, "Model is required").max(100),
  year: z.coerce.number().min(1900, "Invalid year").max(new Date().getFullYear() + 1, "Invalid year"),
  length: z.coerce.number().min(1, "Length is required").max(500),
  location: z.string().trim().min(1, "Location is required").max(200),
  listedElsewhere: z.boolean(),

  // Step 2
  expectedPrice: z.coerce.number().optional().or(z.literal("")),
  condition: z.string().min(1, "Condition is required"),
  engineHours: z.coerce.number().optional().or(z.literal("")),
  lastMaintenanceYear: z.coerce.number().optional().or(z.literal("")),
  extras: z.array(z.string()),

  // Step 3
  fullName: z.string().trim().min(1, "Full name is required").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  phone: z.string().trim().min(1, "Phone is required").max(30),
  preferredContact: z.string().min(1, "Preferred contact method is required"),
  gdprConsent: z.literal(true, { errorMap: () => ({ message: "You must accept the privacy policy" }) }),
});

export type BoatFormData = z.infer<typeof boatFormSchema>;

export const BOAT_TYPES = [
  "Sailboat",
  "Motorboat",
  "Catamaran",
  "Yacht",
  "Fishing Boat",
  "Pontoon",
  "Jet Ski",
  "RIB",
  "Houseboat",
  "Other",
] as const;

export const EXTRAS_OPTIONS = [
  "GPS / Chartplotter",
  "Radar",
  "Autopilot",
  "VHF Radio",
  "Fish Finder",
  "Air Conditioning",
  "Generator",
  "Solar Panels",
  "Trailer",
  "Dinghy / Tender",
  "Recent Refit",
  "Watermaker",
] as const;

export const step1Fields = ["boatType", "brand", "model", "year", "length", "location", "listedElsewhere"] as const;
export const step2Fields = ["condition", "extras"] as const;
export const step3Fields = ["fullName", "email", "phone", "preferredContact", "gdprConsent"] as const;
