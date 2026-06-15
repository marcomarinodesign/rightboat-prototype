"use client"

import { UseFormReturn } from "react-hook-form"
import { Camera, ArrowRight } from "lucide-react"
import { FSBOFormData, FSBOPhoto } from "../../types-fsbo"
import { FSBOPhotoUploader } from "@/components/fsbo/FSBOPhotoUploader"
import { FSBOPhotoGrid } from "@/components/fsbo/FSBOPhotoGrid"

interface FSBOStep2PhotosProps {
  form: UseFormReturn<FSBOFormData>
  photos: FSBOPhoto[]
  onPhotosChange: (photos: FSBOPhoto[]) => void
  onSkip: () => void
}

const MIN_RECOMMENDED = 5

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

  const hasEnough = photos.length >= MIN_RECOMMENDED

  return (
    <div className="space-y-7">
      {/* Step intro */}
      <div className="space-y-1">
        <h2 className="text-xl font-bold tracking-tight">Add photos</h2>
        <p className="text-sm text-muted-foreground">
          Listings with 5+ photos get 3× more enquiries. First photo = cover image.
        </p>
      </div>

      {/* Photo grid — shown above uploader once photos exist */}
      {photos.length > 0 && (
        <FSBOPhotoGrid photos={photos} onRemove={handleRemove} />
      )}

      {/* Upload buttons */}
      <FSBOPhotoUploader currentCount={photos.length} onAdd={handleAdd} />

      {/* RHF validation error for photoCount */}
      {errors.photoCount && (
        <p className="text-sm text-destructive mt-1">{errors.photoCount.message}</p>
      )}

      {/* Quality coaching card — shown until minimum reached */}
      {!hasEnough && (
        <div className="rounded-lg bg-muted p-4 space-y-2">
          <p className="flex items-center gap-2 text-sm font-semibold text-foreground">
            <Camera
              className="h-4 w-4 shrink-0 text-muted-foreground"
              aria-hidden="true"
            />
            Tips for great photos
          </p>
          <ul className="space-y-1 text-sm text-muted-foreground">
            <li>Shoot in daylight — natural light makes boats look their best</li>
            <li>Start with the exterior from the bow (front)</li>
            <li>Include the helm, cabin, and cockpit</li>
            <li>Show the engine bay, even if it&apos;s not pretty</li>
            <li>Capture any damage honestly — it builds trust with buyers</li>
          </ul>
        </div>
      )}

      {/* Progress indicator once minimum is met */}
      {hasEnough && (
        <div className="rounded-lg bg-muted p-4">
          <p className="text-sm font-semibold text-foreground">
            ✓ {photos.length} photo{photos.length !== 1 ? "s" : ""} added
          </p>
          <p className="text-sm text-muted-foreground mt-0.5">
            You can add up to 20 — more photos, more enquiries.
          </p>
        </div>
      )}

      {/* Skip option */}
      {photos.length === 0 && (
        <div className="pt-2 text-center">
          <button
            type="button"
            onClick={onSkip}
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Skip for now — add photos later
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
          <p className="mt-1 text-xs text-muted-foreground">
            You can always add photos from your dashboard after publishing.
          </p>
        </div>
      )}
    </div>
  )
}
