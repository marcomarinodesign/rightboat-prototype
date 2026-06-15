# FSBO Wizard — Cursor Prompt · Phase 3b: AI Pre-fill (Step 1)

## Context

Phase 3 built the real Step 1 form. The LP already captures Make, Model, Year, Email and stores them in `localStorage["rightboat-fsbo-v1"]`. `BoatFormFSBO` reads this and pre-fills the RHF form.

**Phase 3b adds the "AI pre-fill" layer**: on entering Step 1, the wizard infers BoatType, Length, and Condition from Make+Model, pre-fills those fields, and prominently communicates this to the user with an AI badge — they can review and edit anything.

This is a prototype — no API calls. The inference is client-side logic that simulates what an AI would return from a make/model lookup. The UX effect is identical to the final AI-powered version.

---

## ⚠️ DS Rules — same as all phases

- `rounded-lg` for all controls and cards
- `h-11` for buttons (use `Button size="lg"`)
- `transition-colors duration-[var(--transition-duration-fast)]`
- Tokens only: `bg-tag-bg`, `bg-muted`, `text-primary`, `text-muted-foreground`, `border-primary`, `text-destructive`
- No hardcoded hex, no `h-[52px]`, no `rounded-xl` on controls

---

## What gets pre-filled by "AI"

| Field | Inference method | Confidence |
|---|---|---|
| `boatType` | Brand → type lookup table | High (50+ brands covered) |
| `length` | Extract number from model name (e.g. "Bavaria 34" → 34ft) | Medium |
| `condition` | Default to "Good" when model year ≥ 5 years ago, "Excellent" if newer | Low — always editable |
| `location` | Cannot infer — left empty | — |
| `expectedPrice` | Cannot reliably infer — left empty | — |
| `engineHours` | Cannot infer — left empty | — |

---

## New files to create

| File | Purpose |
|---|---|
| `src/lib/fsbo/ai-prefill.ts` | Pure inference functions — no side effects |
| `src/components/fsbo/FSBOAIBanner.tsx` | "AI filled these for you" banner |

## Files to update

| File | Change |
|---|---|
| `src/features/sell-boat/types-fsbo.ts` | Add `AIPreFillResult` type |
| `src/features/sell-boat/components/BoatFormFSBO.tsx` | Run inference on mount, pass AI state to Step 1 |
| `src/features/sell-boat/components/fsbo/FSBOStep1YourBoat.tsx` | Show banner + AI field indicators |

---

## Task 1 — Create `src/lib/fsbo/ai-prefill.ts`

Pure utility. Takes LP data, returns inferred field values + which fields were filled.

```ts
// src/lib/fsbo/ai-prefill.ts

// ─── Brand → Boat Type mapping ──────────────────────────────────────────────
const BRAND_TYPE_MAP: Record<string, string> = {
  // Sailing
  Bavaria: "Sailboat", Beneteau: "Sailboat", Jeanneau: "Sailboat",
  Hallberg: "Sailboat", Catalina: "Sailboat", Hunter: "Sailboat",
  Dehler: "Sailboat", Hanse: "Sailboat", "X-Yachts": "Sailboat",
  Moody: "Sailboat", Westerly: "Sailboat", Contessa: "Sailboat",
  Dufour: "Sailboat", Elan: "Sailboat", Sirius: "Sailboat",
  Oyster: "Sailboat", Swan: "Sailboat", Amel: "Sailboat",
  Malo: "Sailboat", Najad: "Sailboat", Rival: "Sailboat",
  Southerly: "Sailboat", Island: "Sailboat",
  // Motorboats
  Sunseeker: "Motorboat", Princess: "Motorboat", Fairline: "Motorboat",
  Sealine: "Motorboat", Cobalt: "Motorboat", Regal: "Motorboat",
  Bayliner: "Motorboat", "Sea Ray": "Motorboat", "Four Winns": "Motorboat",
  Chaparral: "Motorboat", Broom: "Motorboat", Shetland: "Motorboat",
  Hardy: "Motorboat", Nimbus: "Motorboat", Aquastar: "Motorboat",
  Freeman: "Motorboat", Birchwood: "Motorboat", Fletcher: "Motorboat",
  // Rigid Inflatable Boats
  Ribeye: "RIB", Avon: "RIB", Zodiac: "RIB", Narwhal: "RIB",
  Humber: "RIB", Honwave: "RIB", Bombard: "RIB",
  // Catamarans
  Lagoon: "Catamaran", Leopard: "Catamaran", Fountaine: "Catamaran",
  Catana: "Catamaran", Privilege: "Catamaran",
  // Canal Boats
  Springer: "Canal Boat", "Liverpool Boats": "Canal Boat",
  "Heritage Narrowboats": "Canal Boat",
  // Fishing Boats
  Orkney: "Fishing Boat", "Boston Whaler": "Fishing Boat", Stabicraft: "Fishing Boat",
  // Yachts (large blue water)
}

function inferBoatType(brand: string): string | null {
  const b = brand.trim().toLowerCase()
  for (const [key, type] of Object.entries(BRAND_TYPE_MAP)) {
    if (b.includes(key.toLowerCase())) return type
  }
  return null
}

// ─── Extract length from model name ─────────────────────────────────────────
// Looks for a 2-digit number that is a plausible boat length (15–99 ft)
// Examples: "Bavaria 34 Cruiser" → 34, "Sunseeker 52" → 52, "Fairline 43" → 43
function inferLength(model: string): number | null {
  const matches = model.match(/\b(\d{1,3})\b/g)
  if (!matches) return null
  for (const m of matches) {
    const n = parseInt(m, 10)
    if (n >= 15 && n <= 120) return n  // reasonable boat length in feet
  }
  return null
}

// ─── Infer condition from year ───────────────────────────────────────────────
function inferCondition(year: number): string {
  const age = new Date().getFullYear() - year
  if (age <= 3)  return "Excellent"
  if (age <= 10) return "Good"
  return "Good"  // Default to Good even for older boats — sellers optimistic
}

// ─── Public API ──────────────────────────────────────────────────────────────
export interface AIPreFillInput {
  brand: string
  model: string
  year: number
}

export interface AIPreFillResult {
  /** The fields that were successfully inferred */
  filledFields: Set<string>
  /** Inferred values (only includes fields that were filled) */
  values: {
    boatType?: string
    length?: number
    condition?: string
  }
}

export function runAIPreFill(input: AIPreFillInput): AIPreFillResult {
  const filledFields = new Set<string>()
  const values: AIPreFillResult["values"] = {}

  const boatType = inferBoatType(input.brand)
  if (boatType) {
    values.boatType = boatType
    filledFields.add("boatType")
  }

  const length = inferLength(input.model)
  if (length) {
    values.length = length
    filledFields.add("length")
  }

  if (input.year && input.year > 1900) {
    values.condition = inferCondition(input.year)
    filledFields.add("condition")
  }

  return { filledFields, values }
}
```

---

## Task 2 — Create `src/components/fsbo/FSBOAIBanner.tsx`

The prominent "AI filled these for you" banner. Dismissible. Uses `bg-tag-bg` (DS light primary fill token).

```tsx
"use client"

import { cn } from "@/lib/utils"

interface FSBOAIBannerProps {
  filledFields: Set<string>
  onDismiss: () => void
  className?: string
}

// Human-readable field names for the banner
const FIELD_LABELS: Record<string, string> = {
  boatType:  "Boat type",
  length:    "Length",
  condition: "Condition",
}

export function FSBOAIBanner({ filledFields, onDismiss, className }: FSBOAIBannerProps) {
  const fieldNames = Array.from(filledFields)
    .map((f) => FIELD_LABELS[f])
    .filter(Boolean)

  if (fieldNames.length === 0) return null

  return (
    <div
      className={cn(
        "rounded-lg border border-primary/20 bg-tag-bg px-4 py-3",
        "flex items-start justify-between gap-3",
        className
      )}
      role="status"
      aria-live="polite"
    >
      <div className="flex items-start gap-2.5 min-w-0">
        {/* Sparkle icon */}
        <SparkleIcon className="shrink-0 mt-0.5 text-primary" />

        <div className="min-w-0">
          <p className="text-sm font-semibold text-primary leading-snug">
            AI pre-filled {fieldNames.length} field{fieldNames.length !== 1 ? "s" : ""}
          </p>
          <p className="text-xs text-primary/80 mt-0.5 leading-relaxed">
            Based on your Make, Model &amp; Year — we filled in{" "}
            <span className="font-medium">
              {fieldNames.join(", ")}
            </span>
            . Review and edit anything.
          </p>
        </div>
      </div>

      {/* Dismiss button */}
      <button
        type="button"
        onClick={onDismiss}
        aria-label="Dismiss AI banner"
        className={cn(
          "shrink-0 flex items-center justify-center w-6 h-6 rounded-lg",
          "text-primary/60 hover:text-primary hover:bg-primary/10",
          "transition-colors duration-[var(--transition-duration-fast)]"
        )}
      >
        <CloseIcon />
      </button>
    </div>
  )
}

function SparkleIcon({ className }: { className?: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M8 1L9.5 6H14.5L10.5 9L12 14L8 11L4 14L5.5 9L1.5 6H6.5L8 1Z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
        fill="currentColor"
        fillOpacity="0.15"
      />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
      <path d="M1 1L9 9M9 1L1 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}
```

---

## Task 3 — Add `AIPreFillResult` to `types-fsbo.ts`

```ts
// Add at the top of src/features/sell-boat/types-fsbo.ts:
export type { AIPreFillResult } from "@/lib/fsbo/ai-prefill"
```

---

## Task 4 — Update `BoatFormFSBO` — run inference on mount

**File:** `src/features/sell-boat/components/BoatFormFSBO.tsx`

Add AI pre-fill state and run inference once on mount (after LP data hydration):

```tsx
import { runAIPreFill, AIPreFillResult } from "@/lib/fsbo/ai-prefill"

// Inside BoatFormFSBO, alongside existing state:
const [aiResult, setAIResult] = useState<AIPreFillResult | null>(null)
const [aiBannerDismissed, setAIBannerDismissed] = useState(false)
// Tracks which AI-filled fields the user has manually edited
const [userEditedAIFields, setUserEditedAIFields] = useState<Set<string>>(new Set())

// Run AI pre-fill AFTER the localStorage hydration effect
// (The hydration effect in Phase 2 already calls form.setValue for brand/model/year)
// Add this effect AFTER the hydration useEffect:
useEffect(() => {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (!stored) return
  try {
    const data = JSON.parse(stored)
    const { brand, model, year } = data
    if (!brand && !model) return  // nothing to infer from

    const result = runAIPreFill({
      brand: brand ?? "",
      model: model ?? "",
      year:  typeof year === "number" ? year : parseInt(year ?? "0", 10),
    })

    if (result.filledFields.size === 0) return

    // Apply inferred values to the form
    if (result.values.boatType) form.setValue("boatType",  result.values.boatType,  { shouldValidate: false })
    if (result.values.length)   form.setValue("length",    result.values.length,    { shouldValidate: false })
    if (result.values.condition) form.setValue("condition", result.values.condition, { shouldValidate: false })

    setAIResult(result)
  } catch {
    // Silently ignore parse errors
  }
}, []) // run once on mount, after hydration

// Handler for when user manually edits an AI-filled field
const handleUserEditAIField = (fieldName: string) => {
  setUserEditedAIFields((prev) => {
    const next = new Set(prev)
    next.add(fieldName)
    return next
  })
}

// Compute which AI fields are still "active" (not yet manually edited)
const activeAIFields = aiResult
  ? new Set([...aiResult.filledFields].filter((f) => !userEditedAIFields.has(f)))
  : new Set<string>()

// Pass to Step 1:
case 1:
  return (
    <FSBOStep1YourBoat
      form={form}
      aiFields={activeAIFields}
      showAIBanner={!aiBannerDismissed && activeAIFields.size > 0}
      onDismissAIBanner={() => setAIBannerDismissed(true)}
      onUserEditAIField={handleUserEditAIField}
    />
  )
```

---

## Task 5 — Update `FSBOStep1YourBoat` — show banner + field indicators

**File:** `src/features/sell-boat/components/fsbo/FSBOStep1YourBoat.tsx`

Update props interface and add AI indicators:

```tsx
interface FSBOStep1YourBoatProps {
  form: UseFormReturn<FSBOFormData>
  // AI pre-fill props
  aiFields: Set<string>
  showAIBanner: boolean
  onDismissAIBanner: () => void
  onUserEditAIField: (field: string) => void
}
```

Add the banner import:
```tsx
import { FSBOAIBanner } from "@/components/fsbo/FSBOAIBanner"
```

**Insert the banner at the top of the returned JSX** (after the boat summary chip, before the step intro):

```tsx
{/* AI pre-fill banner */}
{showAIBanner && (
  <FSBOAIBanner
    filledFields={aiFields}
    onDismiss={onDismissAIBanner}
  />
)}
```

**Add AI indicator helper function** (inside the component, before the return):

```tsx
// Returns a small sparkle + "AI" label to show next to field labels that were AI-filled
function AIFilledTag() {
  return (
    <span className="inline-flex items-center gap-1 ml-1.5 px-1.5 py-0.5 rounded bg-tag-bg text-primary text-[10px] font-semibold leading-none align-middle">
      <svg width="8" height="8" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
        <path d="M8 1L9.5 6H14.5L10.5 9L12 14L8 11L4 14L5.5 9L1.5 6H6.5L8 1Z" />
      </svg>
      AI
    </span>
  )
}
```

**Update the three AI-fillable field labels** to show the tag and trigger `onUserEditAIField` on change:

### Boat Type field:
```tsx
<Label className="text-sm font-semibold">
  Boat Type <span className="text-destructive">*</span>
  {aiFields.has("boatType") && <AIFilledTag />}
</Label>
<Controller
  name="boatType"
  control={control}
  render={({ field }) => (
    <BoatTypeSelector
      value={field.value}
      onChange={(val) => {
        field.onChange(val)
        if (aiFields.has("boatType")) onUserEditAIField("boatType")
      }}
      error={errors.boatType?.message}
    />
  )}
/>
```

### Condition field:
```tsx
<Label className="text-sm font-semibold">
  Condition <span className="text-destructive">*</span>
  {aiFields.has("condition") && <AIFilledTag />}
</Label>
<Controller
  name="condition"
  control={control}
  render={({ field }) => (
    <PillGroup
      options={CONDITION_OPTIONS}
      value={field.value}
      onChange={(val) => {
        field.onChange(val)
        if (aiFields.has("condition")) onUserEditAIField("condition")
      }}
    />
  )}
/>
```

### Length field:
```tsx
<Label className="text-sm font-semibold">
  Length <span className="text-destructive">*</span>
  {aiFields.has("length") && <AIFilledTag />}
</Label>
<Controller
  name="length"
  control={control}
  render={({ field }) => (
    <LengthInput
      value={field.value}
      onChange={(val) => {
        field.onChange(val)
        if (aiFields.has("length")) onUserEditAIField("length")
      }}
      error={errors.length?.message}
    />
  )}
/>
```

---

## UX behaviour summary

| Scenario | Behaviour |
|---|---|
| Brand in lookup table | `boatType` pre-filled + AI tag shown on label |
| Model has a number (e.g. "Bavaria 34") | `length` pre-filled as 34 (ft) + AI tag |
| Year provided | `condition` pre-filled + AI tag |
| User edits a pre-filled field | AI tag disappears for that field only |
| All AI fields edited | Banner hides automatically (via `activeAIFields.size === 0`) |
| User dismisses banner | Banner gone, AI tags on labels remain until fields are edited |
| Brand unknown (e.g. "Other") | No AI pre-fill, banner not shown |

---

## Verification checklist

- [ ] Enter "Bavaria" + "Bavaria 34 Cruiser" + "2018" on LP → submit → arrive at Step 1
- [ ] Step 1 shows the blue AI banner: "AI pre-filled 3 fields"
- [ ] Boat Type tile is pre-selected: "Sailboat"
- [ ] Condition pill is pre-selected: "Good"
- [ ] Length field shows "34" with the ft/m toggle
- [ ] All 3 AI-filled labels have a ✦ AI chip next to them
- [ ] Editing Boat Type removes the AI chip from that label only
- [ ] Dismissing the banner hides it; AI chips on labels remain
- [ ] Enter "Sunseeker" + "Sunseeker 52" + "2020" → Motorboat pre-selected, length 52
- [ ] Enter "XYZ Unknown Brand" + any model → no banner shown, no pre-fill
- [ ] After pre-fill, tapping "Continue" still validates all required fields normally
- [ ] No TypeScript errors: `npx tsc --noEmit`
- [ ] No hardcoded hex, no `h-[52px]`, no `rounded-xl` in new files

---

## What is NOT in scope for Phase 3b

- Real AI API call (e.g., GPT-4 or Claude) — use this client-side simulation for the prototype
- Price estimation from market data — deferred
- Location inference — not possible from brand/model
- Engine hours inference — not possible
