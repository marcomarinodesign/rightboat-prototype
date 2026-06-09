"use client"

import { cn } from "@/lib/utils"
import { FSBOPhoto } from "@/features/sell-boat/types-fsbo"

interface FSBOPhotoGridProps {
  photos: FSBOPhoto[]
  onRemove: (id: string) => void
}

export function FSBOPhotoGrid({ photos, onRemove }: FSBOPhotoGridProps) {
  if (photos.length === 0) return null

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
      {photos.map((photo, index) => (
        <div key={photo.id} className="relative group aspect-square">
          {/* Photo thumbnail */}
          <img
            src={photo.url}
            alt={`Photo ${index + 1}`}
            className="w-full h-full object-cover rounded-lg"
          />

          {/* Cover badge — first photo only */}
          {index === 0 && (
            <div className="absolute bottom-1.5 left-1.5">
              <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-primary text-primary-foreground leading-none">
                Cover
              </span>
            </div>
          )}

          {/* Delete button */}
          <button
            type="button"
            onClick={() => onRemove(photo.id)}
            aria-label="Remove photo"
            className={cn(
              "absolute top-1.5 right-1.5",
              "flex items-center justify-center w-6 h-6",
              "rounded-lg bg-foreground/70 text-background",
              "transition-colors duration-[var(--transition-duration-fast)]",
              "hover:bg-foreground",
              // Always visible on touch devices; fade in on hover for desktop
              "opacity-100 sm:opacity-0 sm:group-hover:opacity-100"
            )}
          >
            <svg
              width="10"
              height="10"
              viewBox="0 0 10 10"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M1 1L9 9M9 1L1 9"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      ))}
    </div>
  )
}
