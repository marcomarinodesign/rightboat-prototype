# FSBO Wizard — Cursor Prompt · Phase 4: Step 2 — Photos

## Context

Phase 3 complete. `/fsbo/wizard` now has a working Step 1 (Your Boat).

Phase 4 builds Step 2: the photo upload experience. This is critical for listing quality — photos are the #1 factor in buyer engagement on Rightboat.

**Step 2 goal:** Make it effortless to add great photos from mobile. Camera-first. Quality coaching built in. Cover photo is always the first item in the array.

---

## ⚠️ DS Rules — no exceptions

Same rules as all FSBO phases. Verify before committing:
- `rounded-lg` on all controls, cards, and image tiles
- `h-11` for buttons (use `Button size="lg"` from DS — do NOT set custom height)
- `transition-colors duration-[var(--transition-duration-fast)]` for all hover/state changes
- Semantic color tokens only: `bg-muted`, `text-muted-foreground`, `border-border`, `text-destructive`, `bg-primary`, `text-primary-foreground`
- No `h-[52px]`, no `rounded-xl` on controls, no hardcoded hex

---

## Architecture decision — photos storage

Photos are `File` objects and cannot be serialised to localStorage or React Hook Form state.

**Approach for prototype:**
- Manage `photos: FSBOPhoto[]` in local component state inside `BoatFormFSBO`, passed down as a prop to Step 2
- Use `URL.createObjectURL(file)` for previews (memory-only, cleaned up on unmount)
- Only persist `photoCount` in the RHF form — used for per-step validation on Step 2
- No upload to Supabase Storage in this phase — deferred to production implementation

---

## New types (add to `src/features/sell-boat/types-fsbo.ts`)

Add this interface and update the form schema:

```ts
// Photo item managed outside RHF
export interface FSBOPhoto {
  id: string      // crypto.randomUUID()
  url: string     // Object URL — memory only
  file: File
}

// Update fsboFormSchema to add photoCount for Step 2 validation
// In the .extend({}) call, add:
photoCount: z.number().min(1, "Please add at least one photo").default(0),

// Update FSBOFormData type alias to include photoCount
// (it's auto-derived from fsboFormSchema so it's included automatically)
```

Update `FSBO_STEPS` — Step 2 fields:

```ts
{ step: 2, name: "Photos", fields: ["photoCount"] },
```

---

## Update `BoatFormFSBO` to own photo state

**File:** `src/features/sell-boat/components/BoatFormFSBO.tsx`

Add photo state at the orchestrator level (so photos survive step navigation):

```tsx
import { FSBOPhoto } from "../types-fsbo"

// Inside BoatFormFSBO component, alongside existing state:
const [photos, setPhotos] = useState<FSBOPhoto[]>([])

// Cleanup object URLs on unmount to avoid memory leaks
useEffect(() => {
  return () => {
    photos.forEach((p) => URL.revokeObjectURL(p.url))
  }
}, []) // only on unmount

// Keep RHF photoCount in sync when photos change
useEffect(() => {
  form.setValue("photoCount", photos.length, { shouldValidate: true })
}, [photos, form])

// Pass to Step 2:
case 2:
  return (
    <FSBOStep2Photos
      form={form}
      photos={photos}
      onPhotosChange={setPhotos}
    />
  )
```

---

## New components to build

| Component | File | Purpose |
|---|---|---|
| `FSBOPhotoGrid` | `src/components/fsbo/FSBOPhotoGrid.tsx` | Responsive grid of uploaded photos |
| `FSBOPhotoUploader` | `src/components/fsbo/FSBOPhotoUploader.tsx` | Camera + gallery upload triggers |
| `FSBOStep2Photos` | `src/features/sell-boat/components/fsbo/FSBOStep2Photos.tsx` | Full Step 2 assembled |

---

## Task 1 — Create `FSBOPhotoGrid` component

**File:** `src/components/fsbo/FSBOPhotoGrid.tsx`

Responsive photo grid. First photo = cover (shows "Cover" badge). Each photo has a delete button.

```tsx
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
```

---

## Task 2 — Create `FSBOPhotoUploader` component

**File:** `src/components/fsbo/FSBOPhotoUploader.tsx`

Two upload triggers: camera (primary on mobile) and gallery (secondary). Uses hidden `<input type="file">` elements — no OS-level file picker UI exposed.

```tsx
"use client"

import { useRef } from "react"
import { Button } from "@/components/ui/button"
import { FSBOPhoto } from "@/features/sell-boat/types-fsbo"

const MAX_PHOTOS = 20
const ACCEPTED = "image/jpeg,image/png,image/webp,image/heic"

interface FSBOPhotoUploaderProps {
  currentCount: number
  onAdd: (photos: FSBOPhoto[]) => void
}

function processFiles(files: FileList): FSBOPhoto[] {
  return Array.from(files).map((file) => ({
    id: crypto.randomUUID(),
    url: URL.createObjectURL(file),
    file,
  }))
}

export function FSBOPhotoUploader({ currentCount, onAdd }: FSBOPhotoUploaderProps) {
  const cameraRef  = useRef<HTMLInputElement>(null)
  const galleryRef = useRef<HTMLInputElement>(null)

  const remaining = MAX_PHOTOS - currentCount
  const atLimit   = remaining <= 0

  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return
    const newPhotos = processFiles(files).slice(0, remaining)
    onAdd(newPhotos)
    // Reset input so the same file can be re-selected
    e.target.value = ""
  }

  return (
    <div className="space-y-2">
      {/* Hidden file inputs */}
      <input
        ref={cameraRef}
        type="file"
        accept={ACCEPTED}
        capture="environment"  /* Opens rear camera on mobile */
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

      <div className="flex gap-2">
        {/* Primary: Take photo — most common action on mobile */}
        <Button
          type="button"
          size="lg"
          className="flex-1 gap-2"
          onClick={() => cameraRef.current?.click()}
          disabled={atLimit}
        >
          <CameraIcon />
          Take a photo
        </Button>

        {/* Secondary: Upload from library */}
        <Button
          type="button"
          variant="outline"
          size="lg"
          className="flex-1 gap-2"
          onClick={() => galleryRef.current?.click()}
          disabled={atLimit}
        >
          <GalleryIcon />
          Upload
        </Button>
      </div>

      {/* Remaining count hint */}
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

// Inline SVG icons — no external dependency
function CameraIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path
        d="M6.5 3L5.2 4.8H3C2.2 4.8 1.5 5.5 1.5 6.3V14.3C1.5 15.1 2.2 15.8 3 15.8H15C15.8 15.8 16.5 15.1 16.5 14.3V6.3C16.5 5.5 15.8 4.8 15 4.8H12.8L11.5 3H6.5Z"
        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
      />
      <circle cx="9" cy="10.3" r="2.5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}

function GalleryIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <rect x="1.5" y="3" width="15" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M1.5 12L5.5 8L8.5 11L11.5 8L16.5 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="6" cy="7" r="1" fill="currentColor" />
    </svg>
  )
}
```

---

## Task 3 — Build `FSBOStep2Photos` — assembled step

**File:** `src/features/sell-boat/components/fsbo/FSBOStep2Photos.tsx`

```tsx
"use client"

import { UseFormReturn } from "react-hook-form"
import { FSBOFormData, FSBOPhoto } from "../../types-fsbo"
import { FSBOPhotoUploader } from "@/components/fsbo/FSBOPhotoUploader"
import { FSBOPhotoGrid } from "@/components/fsbo/FSBOPhotoGrid"

interface FSBOStep2PhotosProps {
  form: UseFormReturn<FSBOFormData>
  photos: FSBOPhoto[]
  onPhotosChange: (photos: FSBOPhoto[]) => void
}

const MIN_RECOMMENDED = 5

export function FSBOStep2Photos({ form, photos, onPhotosChange }: FSBOStep2PhotosProps) {
  const { formState: { errors } } = form

  const handleAdd = (newPhotos: FSBOPhoto[]) => {
    onPhotosChange([...photos, ...newPhotos])
  }

  const handleRemove = (id: string) => {
    const updated = photos.filter((p) => p.id !== id)
    // Revoke the object URL to free memory
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
      <FSBOPhotoUploader
        currentCount={photos.length}
        onAdd={handleAdd}
      />

      {/* RHF validation error for photoCount */}
      {errors.photoCount && (
        <p className="text-sm text-destructive mt-1">{errors.photoCount.message}</p>
      )}

      {/* Quality coaching card — shown until minimum reached */}
      {!hasEnough && (
        <div className="rounded-lg bg-muted p-4 space-y-2">
          <p className="text-sm font-semibold text-foreground">📸 Tips for great photos</p>
          <ul className="space-y-1 text-sm text-muted-foreground">
            <li>Shoot in daylight — natural light makes boats look their best</li>
            <li>Start with the exterior from the bow (front)</li>
            <li>Include the helm, cabin, and cockpit</li>
            <li>Show the engine bay, even if it's not pretty</li>
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

    </div>
  )
}
```

---

## Task 4 — Update `types-fsbo.ts`

**File:** `src/features/sell-boat/types-fsbo.ts`

Add `FSBOPhoto` interface and `photoCount` to the form schema:

```ts
// Add FSBOPhoto interface (at the top, before schemas)
export interface FSBOPhoto {
  id: string
  url: string
  file: File
}

// In fsboFormSchema .extend({}) — add:
photoCount: z.number().min(1, "Please add at least one photo").default(0),

// Update FSBO_STEPS — Step 2:
{ step: 2, name: "Photos", fields: ["photoCount"] },
```

---

## Task 5 — Update `BoatFormFSBO` orchestrator

**File:** `src/features/sell-boat/components/BoatFormFSBO.tsx`

Add photos state alongside the RHF form:

```tsx
import { FSBOPhoto } from "../types-fsbo"
import { FSBOStep2Photos } from "./fsbo/FSBOStep2Photos"

// Inside component body:
const [photos, setPhotos] = useState<FSBOPhoto[]>([])

// Clean up object URLs on unmount
useEffect(() => {
  return () => {
    photos.forEach((p) => URL.revokeObjectURL(p.url))
  }
}, []) // intentional empty deps — only cleanup on unmount

// Sync photo count to RHF for step validation
useEffect(() => {
  form.setValue("photoCount", photos.length, { shouldValidate: currentStep === 2 })
}, [photos.length]) // eslint-disable-line react-hooks/exhaustive-deps

// In renderStep() / switch statement, replace Step 2 placeholder:
case 2:
  return (
    <FSBOStep2Photos
      form={form}
      photos={photos}
      onPhotosChange={setPhotos}
    />
  )
```

---

## Verification checklist

- [ ] `/fsbo/wizard` → complete Step 1 → arrives at Step 2 "Add photos"
- [ ] On mobile (390px), the "Take a photo" button opens the rear camera
- [ ] "Upload" button opens the photo library / file picker
- [ ] Selecting photos shows them in a 2-column grid
- [ ] First photo in the grid has a "Cover" badge
- [ ] Tapping the ✕ on a photo removes it from the grid
- [ ] Photo grid appears above the upload buttons (not below)
- [ ] Quality tips card is shown until ≥5 photos are added
- [ ] Once ≥5 photos added, tips card is replaced by the "✓ X photos added" card
- [ ] Tapping "Continue" with 0 photos shows: "Please add at least one photo" (inline, no emoji)
- [ ] Tapping "Continue" with ≥1 photo advances to Step 3
- [ ] Max 20 photos enforced — buttons become disabled at limit
- [ ] No `h-[52px]`, `rounded-xl` on controls, or hardcoded hex in any new file
- [ ] No TypeScript errors: `npx tsc --noEmit`

---

## What is NOT in scope for Phase 4

- Drag-to-reorder (use array order; cover = first photo)
- Supabase Storage upload — deferred to production
- Image compression / resizing — deferred
- Video upload — Nick confirmed optional for Premium only; deferred to Phase 6
- Step 3 Your Details — Phase 5
