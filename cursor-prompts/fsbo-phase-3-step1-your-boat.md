# FSBO Wizard — Cursor Prompt · Phase 3: Step 1 — Your Boat

## Context

Phases 1 & 2 are complete. `/fsbo/wizard` renders the new `BoatFormFSBO` with `WizardProgress` + `WizardFooter` and 5 placeholder steps.

Phase 3 replaces the Step 1 placeholder (`FSBOStep1YourBoat`) with the real content.

**Step 1 goal:** Capture all factual boat listing data in a single focused step. Mobile-first (390px primary). Pre-filled summary of Make/Model/Year from the LP step is shown at top.

---

## ⚠️ Design System Rules — follow strictly in every component

The repo has a design system (`DESIGN_SYSTEM.md`). All FSBO components must comply:

| Rule | ✅ Correct | ❌ Wrong |
|---|---|---|
| Input / button height | `h-11` (DS default — no override needed) | `h-[52px]`, `h-12` |
| Radius (controls) | `rounded-lg` | `rounded-xl`, `rounded-[12px]` |
| Radius (chips/pills) | `rounded-full` | hardcoded pixel values |
| Transitions | `transition-colors duration-[var(--transition-duration-fast)]` | `transition-all duration-150` |
| Selected soft fill | `bg-tag-bg` | `bg-primary/5`, `bg-blue-50` |
| Selected border | `border-primary` | `border-[#0257fc]`, `border-blue-500` |
| Error text | `text-destructive` (text only, no emoji) | `text-red-500`, adding `⚠️` emoji |
| Muted surface | `bg-muted` | `bg-neutral-100`, `bg-gray-50` |
| No hardcoded hex | — | `#0257fc`, `#13022c` |

---

## New components to build (Phase 3)

| Component | File | Purpose |
|---|---|---|
| `BoatTypeSelector` | `src/components/fsbo/BoatTypeSelector.tsx` | 8-tile emoji+label grid for boat type |
| `LengthInput` | `src/components/fsbo/LengthInput.tsx` | Number input with ft/m unit toggle |
| `PriceInput` | `src/components/fsbo/PriceInput.tsx` | Currency input with £ prefix |
| `FSBOStep1YourBoat` | `src/features/sell-boat/components/fsbo/FSBOStep1YourBoat.tsx` | Full Step 1 form |

> **Note:** `PillGroup` already exists at `src/components/ui/pill-group.tsx` — do NOT recreate it.

---

## Task 1 — Create `BoatTypeSelector` component

**File:** `src/components/fsbo/BoatTypeSelector.tsx`

8 boat types as tappable emoji+label tiles arranged in a 2×4 grid on mobile.

```tsx
"use client"

import { cn } from "@/lib/utils"

const BOAT_TYPE_OPTIONS = [
  { value: "Motorboat",    label: "Motorboat",   emoji: "🚤" },
  { value: "Sailboat",     label: "Sailboat",    emoji: "⛵" },
  { value: "RIB",          label: "RIB",         emoji: "🛥️" },
  { value: "Catamaran",    label: "Catamaran",   emoji: "⛵" },
  { value: "Fishing Boat", label: "Fishing",     emoji: "🎣" },
  { value: "Canal Boat",   label: "Canal Boat",  emoji: "🚢" },
  { value: "Yacht",        label: "Yacht",       emoji: "⚓" },
  { value: "Other",        label: "Other",       emoji: "🔵" },
] as const

interface BoatTypeSelectorProps {
  value: string
  onChange: (value: string) => void
  error?: string
}

export function BoatTypeSelector({ value, onChange, error }: BoatTypeSelectorProps) {
  return (
    <div className="space-y-2">
      {/* 2-column grid on mobile → 4 columns on sm+ */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {BOAT_TYPE_OPTIONS.map((type) => {
          const isSelected = value === type.value
          return (
            <button
              key={type.value}
              type="button"
              onClick={() => onChange(type.value)}
              className={cn(
                "flex flex-col items-center justify-center gap-1.5",
                "rounded-lg border-2 p-3",          // rounded-lg — DS standard radius
                "min-h-16",                          // 64px tap target (Tailwind scale)
                "transition-colors duration-[var(--transition-duration-fast)]",
                // Unselected
                "border-border bg-card text-foreground hover:border-primary hover:bg-muted",
                // Selected — use bg-tag-bg (DS token for soft primary fill)
                isSelected && "border-primary bg-tag-bg text-primary"
              )}
              aria-pressed={isSelected}
            >
              <span className="text-2xl leading-none" role="img" aria-label={type.label}>
                {type.emoji}
              </span>
              <span className="text-xs font-semibold leading-tight text-center">
                {type.label}
              </span>
            </button>
          )
        })}
      </div>
      {error && (
        <p className="text-sm text-destructive mt-1">{error}</p>
      )}
    </div>
  )
}
```

---

## Task 2 — Create `LengthInput` component

**File:** `src/components/fsbo/LengthInput.tsx`

Number input with a ft/m toggle. Converts between units automatically.  
Internal storage is always in feet.

```tsx
"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface LengthInputProps {
  value: string | number
  onChange: (value: number) => void
  error?: string
  className?: string
}

type Unit = "ft" | "m"

const FT_TO_M = 0.3048

export function LengthInput({ value, onChange, error, className }: LengthInputProps) {
  const [unit, setUnit] = useState<Unit>("ft")

  // Display value in the currently selected unit
  const displayValue =
    value === "" || value === undefined || value === 0
      ? ""
      : unit === "ft"
      ? String(value)
      : String(Math.round(Number(value) * FT_TO_M * 10) / 10)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = parseFloat(e.target.value)
    if (isNaN(raw)) {
      onChange(0)
      return
    }
    // Always store in feet internally
    const inFeet = unit === "ft" ? raw : Math.round((raw / FT_TO_M) * 10) / 10
    onChange(inFeet)
  }

  return (
    <div className={cn("space-y-1", className)}>
      <div className="flex gap-2">
        {/* Number input — no height override, DS default h-11 */}
        <Input
          type="number"
          inputMode="decimal"
          placeholder={unit === "ft" ? "e.g. 32" : "e.g. 9.8"}
          value={displayValue}
          onChange={handleChange}
          min={unit === "ft" ? 5 : 1.5}
          max={unit === "ft" ? 200 : 61}
        />

        {/* Unit toggle — rounded-lg to match DS radius, border-input to match Input border */}
        <div className="flex rounded-lg border border-input overflow-hidden shrink-0">
          {(["ft", "m"] as Unit[]).map((u) => (
            <button
              key={u}
              type="button"
              onClick={() => setUnit(u)}
              className={cn(
                "px-4 h-11 text-sm font-semibold",    // h-11 = DS standard height
                "transition-colors duration-[var(--transition-duration-fast)]",
                u === unit
                  ? "bg-primary text-primary-foreground"
                  : "bg-card text-muted-foreground hover:bg-muted"
              )}
            >
              {u}
            </button>
          ))}
        </div>
      </div>
      {error && (
        <p className="text-sm text-destructive mt-1">{error}</p>
      )}
    </div>
  )
}
```

---

## Task 3 — Create `PriceInput` component

**File:** `src/components/fsbo/PriceInput.tsx`

Currency input with a leading £ symbol. Numeric keyboard on mobile.

```tsx
"use client"

import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface PriceInputProps {
  value: string | number
  onChange: (value: string) => void
  placeholder?: string
  error?: string
  className?: string
}

export function PriceInput({
  value,
  onChange,
  placeholder = "e.g. 24,500",
  error,
  className,
}: PriceInputProps) {
  return (
    <div className={cn("space-y-1", className)}>
      <div className="relative">
        {/* £ prefix — positioned to clear DS h-11 input */}
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-base font-semibold text-muted-foreground pointer-events-none select-none">
          £
        </span>
        {/* No height override — Input is h-11 by DS default */}
        <Input
          type="number"
          inputMode="numeric"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="pl-8"
          min={1000}
        />
      </div>
      {error && (
        <p className="text-sm text-destructive mt-1">{error}</p>
      )}
    </div>
  )
}
```

---

## Task 4 — Build `FSBOStep1YourBoat` — real content

**File:** `src/features/sell-boat/components/fsbo/FSBOStep1YourBoat.tsx`

Replace the Phase 2 placeholder with the full Step 1 form.

```tsx
"use client"

import { UseFormReturn, Controller } from "react-hook-form"
import { FSBOFormData } from "../../types-fsbo"
import { BoatTypeSelector } from "@/components/fsbo/BoatTypeSelector"
import { PillGroup } from "@/components/ui/pill-group"
import { LengthInput } from "@/components/fsbo/LengthInput"
import { PriceInput } from "@/components/fsbo/PriceInput"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

interface FSBOStep1YourBoatProps {
  form: UseFormReturn<FSBOFormData>
}

const CONDITION_OPTIONS = [
  { label: "Excellent", value: "Excellent" },
  { label: "Good",      value: "Good"      },
  { label: "Needs Work",value: "Needs Work" },
]

export function FSBOStep1YourBoat({ form }: FSBOStep1YourBoatProps) {
  const {
    register,
    control,
    formState: { errors },
    setValue,
    watch,
  } = form

  const listedElsewhere = watch("listedElsewhere")
  const brand = watch("brand")
  const model = watch("model")
  const year  = watch("year")

  return (
    <div className="space-y-7">

      {/* Pre-filled boat summary chip from LP step */}
      {(brand || model || year) && (
        <div className="inline-flex items-center gap-2 rounded-full bg-muted px-4 py-2 text-sm font-medium text-foreground">
          <span aria-hidden>🚤</span>
          <span>{[brand, model, year].filter(Boolean).join(" · ")}</span>
        </div>
      )}

      {/* Step intro */}
      <div className="space-y-1">
        <h2 className="text-xl font-bold tracking-tight">Tell us about your boat</h2>
        <p className="text-sm text-muted-foreground">
          The more detail you add, the more enquiries you&apos;ll get.
        </p>
      </div>

      {/* ── Boat Type ── */}
      <div className="space-y-2">
        <Label className="text-sm font-semibold">
          Boat Type <span className="text-destructive">*</span>
        </Label>
        <Controller
          name="boatType"
          control={control}
          render={({ field }) => (
            <BoatTypeSelector
              value={field.value}
              onChange={field.onChange}
              error={errors.boatType?.message}
            />
          )}
        />
      </div>

      {/* ── Condition ── */}
      <div className="space-y-2">
        <Label className="text-sm font-semibold">
          Condition <span className="text-destructive">*</span>
        </Label>
        <Controller
          name="condition"
          control={control}
          render={({ field }) => (
            <PillGroup
              options={CONDITION_OPTIONS}
              value={field.value}
              onChange={(val) => field.onChange(val)}
            />
          )}
        />
        {errors.condition && (
          <p className="text-sm text-destructive mt-1">{errors.condition.message}</p>
        )}
      </div>

      {/* ── Length ── */}
      <div className="space-y-2">
        <Label className="text-sm font-semibold">
          Length <span className="text-destructive">*</span>
        </Label>
        <Controller
          name="length"
          control={control}
          render={({ field }) => (
            <LengthInput
              value={field.value}
              onChange={field.onChange}
              error={errors.length?.message}
            />
          )}
        />
      </div>

      {/* ── Location ── */}
      <div className="space-y-2">
        <Label htmlFor="location" className="text-sm font-semibold">
          Location <span className="text-destructive">*</span>
        </Label>
        {/* No h override — Input is h-11 by DS default */}
        <Input
          id="location"
          placeholder="e.g. Brighton Marina, UK"
          {...register("location")}
        />
        {errors.location && (
          <p className="text-sm text-destructive mt-1">{errors.location.message}</p>
        )}
      </div>

      {/* ── Asking Price ── */}
      <div className="space-y-2">
        <Label className="text-sm font-semibold">
          Asking Price <span className="text-destructive">*</span>
        </Label>
        <Controller
          name="expectedPrice"
          control={control}
          render={({ field }) => (
            <PriceInput
              value={field.value as string}
              onChange={field.onChange}
              error={errors.expectedPrice?.message}
            />
          )}
        />
        <p className="text-xs text-muted-foreground">
          Not sure what to charge?{" "}
          <a
            href="/boats-for-sale"
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-primary hover:opacity-80 transition-opacity duration-[var(--transition-duration-fast)]"
          >
            See similar listings →
          </a>
        </p>
      </div>

      {/* ── Engine Hours (optional) ── */}
      <div className="space-y-2">
        <Label htmlFor="engineHours" className="text-sm font-semibold">
          Engine Hours{" "}
          <span className="text-muted-foreground font-normal text-xs">(optional)</span>
        </Label>
        {/* No h override — Input is h-11 by DS default */}
        <Input
          id="engineHours"
          type="number"
          inputMode="numeric"
          placeholder="e.g. 450"
          {...register("engineHours")}
        />
        <p className="text-xs text-muted-foreground">
          Engine hours help buyers assess wear.
        </p>
      </div>

      {/* ── Listed Elsewhere toggle ── */}
      {/* rounded-lg not rounded-xl — DS standard for surfaces */}
      <div className="flex items-center justify-between rounded-lg bg-muted px-4 py-4">
        <div>
          <Label htmlFor="listedElsewhere" className="text-sm font-semibold cursor-pointer">
            Listed on another platform?
          </Label>
          <p className="text-xs text-muted-foreground mt-0.5">
            Optional — no penalty, just useful data.
          </p>
        </div>
        <Switch
          id="listedElsewhere"
          checked={listedElsewhere}
          onCheckedChange={(v) => setValue("listedElsewhere", v)}
        />
      </div>

    </div>
  )
}
```

---

## Task 5 — Update `FSBO_STEPS` field validation list in `types-fsbo.ts`

In `src/features/sell-boat/types-fsbo.ts`, update Step 1 fields to the actual required fields for this step:

```ts
export const FSBO_STEPS = [
  {
    step: 1,
    name: "Your Boat",
    // Per-step validation: only these fields validated on "Continue" at step 1
    fields: ["boatType", "condition", "length", "location", "expectedPrice"],
  },
  { step: 2, name: "Photos",        fields: [] },
  { step: 3, name: "Your Details",  fields: ["fullName", "phone", "preferredContact", "gdprConsent"] },
  { step: 4, name: "Choose Plan",   fields: ["selectedPlan"] },
  { step: 5, name: "Payment",       fields: [] },
] as const
```

Also update `fsboFormSchema` to make `expectedPrice` required (not optional):

```ts
// In types-fsbo.ts — override expectedPrice to required in FSBO flow
export const fsboFormSchema = step1LPSchema
  .merge(wizardStep2Schema)
  .merge(wizardStep3Schema)
  .merge(fsboPlanSchema)
  .extend({
    expectedPrice: z.coerce.number({
      required_error: "Please enter an asking price",
      invalid_type_error: "Please enter a valid price",
    }).min(1000, "Minimum price is £1,000"),
  })
```

---

## Task 6 — Confirm `BoatFormFSBO` import path

In `src/features/sell-boat/components/BoatFormFSBO.tsx`, verify Step 1 imports from the correct path (already wired in Phase 2 as `<FSBOStep1YourBoat form={form} />`). If the import path needs updating:

```tsx
import { FSBOStep1YourBoat } from "./fsbo/FSBOStep1YourBoat"
```

No other changes needed if Phase 2 was completed correctly.

---

## Verification checklist

- [ ] `/fsbo/wizard` loads Step 1 with the title "Tell us about your boat"
- [ ] If Make/Model/Year exist in localStorage, the summary chip renders at top
- [ ] `BoatTypeSelector` shows 8 tiles in a 2-column grid on mobile (390px)
- [ ] Tapping a boat type tile selects it (border turns primary, bg fills with `bg-tag-bg`)
- [ ] `PillGroup` for Condition shows 3 pills: Excellent / Good / Needs Work
- [ ] `LengthInput` accepts a number and shows ft/m toggle at `h-11` height
- [ ] Toggling ft ↔ m converts the displayed value correctly
- [ ] `PriceInput` shows a £ prefix, Input is `h-11` (no taller)
- [ ] Engine Hours field visible with "optional" label, no height override
- [ ] Listed Elsewhere toggle works (default OFF), container has `rounded-lg` not `rounded-xl`
- [ ] "Continue →" is disabled until all 5 required fields are filled
- [ ] Tapping "Continue" with empty fields shows inline error messages (text only, no emoji)
- [ ] Tapping "Continue" with all fields valid advances to Step 2
- [ ] No `h-[52px]`, `rounded-xl` on controls, or hardcoded hex anywhere in new files
- [ ] No TypeScript errors: `npx tsc --noEmit`

---

## What is NOT in scope for Phase 3

- Google Places autocomplete for Location (plain text input for prototype)
- AI pre-fill for Step 1 fields — TBC with Joe (Q#11)
- Last Maintenance Year field — deprioritised
- Extras checkboxes — deprioritised
- Step 2 Photos — Phase 4
- Steps 3–5 — Phases 5–7
