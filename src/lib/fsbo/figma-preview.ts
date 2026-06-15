import type { FSBOFormData, FSBOPhoto, FSBOStepNumber } from "@/features/sell-boat/types-fsbo"
import type { AIPreFillResult } from "@/lib/fsbo/ai-prefill"

/** Dev/capture-only wizard step presets for Figma Code Connect frames. */
export type FsboFigmaPreviewStep =
  | "step-1"
  | "step-2"
  | "step-3"
  | "step-4"
  | "step-5"
  | "success"

export type FsboPreviewMode = "desktop" | "mobile"

const PREVIEW_PHOTO_URL =
  "https://www.rightboat.com/boat_images/image_24403046/3267a932434742d9b76334f6c3d2422aa541b5c487484d9d854c181311f4482d.webp"

export function figmaPreviewStepNumber(
  preview?: FsboFigmaPreviewStep
): FSBOStepNumber {
  if (!preview || preview === "success") return 1
  const n = Number.parseInt(preview.replace("step-", ""), 10)
  if (n >= 1 && n <= 5) return n as FSBOStepNumber
  return 1
}

export function figmaPreviewMockFormValues(): Partial<FSBOFormData> {
  return {
    brand: "bavaria",
    model: "vision-46",
    year: 2018,
    email: "seller@example.com",
    boatType: "Sailboat",
    condition: "Used",
    length: 14,
    location: "Southampton, UK",
    expectedPrice: 85000,
    fullName: "Alex Mariner",
    phone: "+44 7700 900123",
    preferredContact: "email",
    gdprConsent: true,
    listedElsewhere: false,
    extras: [],
    password: "securePass1",
    selectedPlan: "premium",
    photoCount: 3,
  }
}

export function figmaPreviewMockPhotos(): FSBOPhoto[] {
  return [0, 1, 2].map((index) => ({
    id: `figma-preview-photo-${index}`,
    url: PREVIEW_PHOTO_URL,
    file: new File([], `preview-${index}.jpg`, { type: "image/jpeg" }),
  }))
}

export function figmaPreviewMockAIResult(): AIPreFillResult {
  return {
    filledFields: new Set(["boatType", "condition", "length"]),
    values: {
      boatType: "Sailboat",
      condition: "Used",
      length: 14,
    },
  }
}

export function figmaPreviewBoatSummary() {
  return "Bavaria · Vision 46 · 2018"
}

const FSBO_PREVIEW_STEPS: FsboFigmaPreviewStep[] = [
  "step-1",
  "step-2",
  "step-3",
  "step-4",
  "step-5",
  "success",
]

export function parseFsboFigmaPreviewStep(
  value: string | null | undefined
): FsboFigmaPreviewStep | undefined {
  if (value && FSBO_PREVIEW_STEPS.includes(value as FsboFigmaPreviewStep)) {
    return value as FsboFigmaPreviewStep
  }
  return undefined
}

export function parseFsboPreviewMode(
  value: string | null | undefined
): FsboPreviewMode | undefined {
  if (value === "desktop" || value === "mobile") return value
  return undefined
}
