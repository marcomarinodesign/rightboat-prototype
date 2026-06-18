"use client"

import { UseFormReturn } from "react-hook-form"
import { Lightbulb } from "lucide-react"
import { FSBOFormData, FSBOPhoto } from "../../types-fsbo"
import { FSBOPhotoUploader } from "@/components/fsbo/FSBOPhotoUploader"
import { FSBOPhotoGrid } from "@/components/fsbo/FSBOPhotoGrid"

interface FSBOStep2PhotosProps {
  form: UseFormReturn<FSBOFormData>
  photos: FSBOPhoto[]
  onPhotosChange: (photos: FSBOPhoto[]) => void
  onSkip: () => void
}

const TIPS = [
  "Shoot in daylight — natural light makes boats look their best",
  "Start with the exterior from the bow (front)",
  "Include the helm, cabin, and cockpit",
  "Show the engine bay, even if it's not pretty",
  "Capture any damage honestly — it builds trust with buyers",
]

export function FSBOStep2Photos({ form, photos, onPhotosChange, onSkip }: FSBOStep2PhotosProps) {
  const {
    formState: { errors },
  } = form

  const handleAdd = (newPhotos: FSBOPhoto[]) => {
    onPhotosChange([...photos, ...newPhotos])
  }

  const handleRemove = (id: string) => {
    const updated = photos.filter((p) => p.id !== id)
    const removed = photos.find((p) => p.id === id)
    if (removed) URL.revokeObjectURL(removed.url)
    onPhotosChange(updated)
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Title */}
      <h2 className="text-2xl font-bold tracking-tight text-foreground leading-8">Add photos</h2>

      {/* Subtitle */}
      <p className="text-base text-foreground">
        We&apos;ll use this to create your listing and suggest a competitive price.
      </p>

      {/* Photo grid — shown above uploader once photos exist */}
      {photos.length > 0 && (
        <FSBOPhotoGrid photos={photos} onRemove={handleRemove} />
      )}

      {/* Drag-drop zone + Upload / Take a photo buttons */}
      <FSBOPhotoUploader currentCount={photos.length} onAdd={handleAdd} />

      {/* RHF validation error */}
      {errors.photoCount && (
        <p className="text-sm text-destructive">{errors.photoCount.message}</p>
      )}

      {/* Tips for great photos */}
      <div className="rounded-xl bg-[#f4f9ff] p-4 flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <Lightbulb className="h-4 w-4 shrink-0 text-foreground" aria-hidden="true" />
          <p className="text-base font-bold text-foreground">Tips for great photos</p>
        </div>
        {TIPS.map((tip) => (
          <p key={tip} className="text-sm text-foreground leading-5">{tip}</p>
        ))}
      </div>

    </div>
  )
}
