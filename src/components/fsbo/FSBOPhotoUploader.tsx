"use client"

import { useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { FSBOPhoto } from "@/features/sell-boat/types-fsbo"

const MAX_PHOTOS = 20
const ACCEPTED = "image/jpeg,image/png,image/webp,image/heic"

interface FSBOPhotoUploaderProps {
  currentCount: number
  onAdd: (photos: FSBOPhoto[]) => void
}

function processFiles(files: FileList | File[]): FSBOPhoto[] {
  return Array.from(files).map((file) => ({
    id: crypto.randomUUID(),
    url: URL.createObjectURL(file),
    file,
  }))
}

export function FSBOPhotoUploader({ currentCount, onAdd }: FSBOPhotoUploaderProps) {
  const cameraRef = useRef<HTMLInputElement>(null)
  const galleryRef = useRef<HTMLInputElement>(null)
  const [isDragging, setIsDragging] = useState(false)

  const remaining = MAX_PHOTOS - currentCount
  const atLimit = remaining <= 0

  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return
    const newPhotos = processFiles(files).slice(0, remaining)
    onAdd(newPhotos)
    e.target.value = ""
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    if (atLimit) return
    const files = Array.from(e.dataTransfer.files)
      .filter((f) => f.type.startsWith("image/"))
      .slice(0, remaining)
    if (files.length === 0) return
    onAdd(processFiles(files))
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Hidden file inputs */}
      <input
        ref={cameraRef}
        type="file"
        accept={ACCEPTED}
        capture="environment"
        multiple
        className="sr-only"
        onChange={handleFiles}
        aria-hidden="true"
      />
      <input
        ref={galleryRef}
        type="file"
        accept={ACCEPTED}
        multiple
        className="sr-only"
        onChange={handleFiles}
        aria-hidden="true"
      />

      {/* Drag-drop zone */}
      <div
        role="button"
        tabIndex={atLimit ? -1 : 0}
        aria-label="Upload photos — click or drag and drop"
        onClick={() => !atLimit && galleryRef.current?.click()}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault()
            if (!atLimit) galleryRef.current?.click()
          }
        }}
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
        onDragEnter={(e) => { e.preventDefault(); setIsDragging(true) }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={[
          "flex h-[250px] flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed text-center transition-colors",
          isDragging ? "border-primary bg-tag-bg" : "border-border bg-muted",
          atLimit ? "pointer-events-none opacity-50" : "cursor-pointer",
        ].join(" ")}
      >
        <span className="text-[28px] leading-none text-foreground" aria-hidden="true">↑</span>
        <p className="text-base font-bold text-foreground">Drag and drop photos here</p>
        <p className="text-sm text-foreground">or click to browse · JPEG, PNG up to 10MB each</p>
      </div>

      {/* Action buttons: Upload (outline, left) · Take a photo (primary, right) */}
      <div className="flex gap-4">
        <Button
          type="button"
          variant="outline"
          className="flex-1 gap-2"
          onClick={() => galleryRef.current?.click()}
          disabled={atLimit}
        >
          <GalleryIcon />
          Upload
        </Button>
        <Button
          type="button"
          className="flex-1 gap-2"
          onClick={() => cameraRef.current?.click()}
          disabled={atLimit}
        >
          <CameraIcon />
          Take a photo
        </Button>
      </div>

      {/* Count hints */}
      {!atLimit && currentCount > 0 && (
        <p className="text-xs text-muted-foreground text-center">
          {remaining} photo{remaining !== 1 ? "s" : ""} remaining (max {MAX_PHOTOS})
        </p>
      )}
      {atLimit && (
        <p className="text-xs text-muted-foreground text-center">
          Maximum {MAX_PHOTOS} photos reached
        </p>
      )}
    </div>
  )
}

function CameraIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path
        d="M6.5 3L5.2 4.8H3C2.2 4.8 1.5 5.5 1.5 6.3V14.3C1.5 15.1 2.2 15.8 3 15.8H15C15.8 15.8 16.5 15.1 16.5 14.3V6.3C16.5 5.5 15.8 4.8 15 4.8H12.8L11.5 3H6.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="9" cy="10.3" r="2.5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}

function GalleryIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <rect x="1.5" y="3" width="15" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M1.5 12L5.5 8L8.5 11L11.5 8L16.5 13"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="6" cy="7" r="1" fill="currentColor" />
    </svg>
  )
}
