# FSBO Wizard — Cursor Prompt · Phase 6: Step 4 — Choose Plan

## Context

Phases 1–5 complete. Steps 1–3 are working.

Phase 6 replaces the `FSBOStep4ChoosePlan` placeholder with the real plan selection UI.

**Pricing confirmed by Nick (CEO):**
- **Basic** — $49/mo
- **Premium** — $99/mo · Recommended

Both plans are paid. No free tier. Step 4 is always shown.

**Schema is ready:** `selectedPlan: z.enum(["basic", "premium"]).default("premium")` — Premium is pre-selected by default.

---

## ⚠️ DS Rules — no exceptions

- `rounded-lg` for cards and controls
- `rounded-full` for badges/pills (e.g. "Recommended" tag)
- No height overrides on inputs/buttons — use `Button size="lg"` from DS
- `transition-colors duration-[var(--transition-duration-fast)]`
- Tokens only: `bg-primary`, `text-primary-foreground`, `bg-muted`, `text-muted-foreground`, `border-border`, `border-primary`, `bg-tag-bg`, `text-primary`
- No `bg-primary/5`, no `bg-blue-50`, no hardcoded hex

---

## New components to build

| Component | File | Purpose |
|---|---|---|
| `PackageCard` | `src/components/fsbo/PackageCard.tsx` | Selectable plan card (Basic / Premium) |

## File to replace

| File | Change |
|---|---|
| `src/features/sell-boat/components/fsbo/FSBOStep4ChoosePlan.tsx` | Replace placeholder with real content |

---

## Task 1 — Create `PackageCard` component

**File:** `src/components/fsbo/PackageCard.tsx`

A full-width tappable card for a plan. Uses a hidden radio input for accessibility.  
Selected state: `border-primary` + checkmark in the top-right corner.

```tsx
"use client"

import { cn } from "@/lib/utils"

export interface PackageCardProps {
  /** "basic" | "premium" */
  plan: "basic" | "premium"
  name: string
  price: number
  /** e.g. "per month" */
  billing: string
  /** Optional badge text — shown in top-right next to price (e.g. "Recommended") */
  badge?: string
  features: string[]
  /** Features only in this plan vs Basic — shown with a star marker instead of check */
  premiumFeatures?: string[]
  selected: boolean
  onSelect: () => void
}

export function PackageCard({
  plan,
  name,
  price,
  billing,
  badge,
  features,
  selected,
  onSelect,
}: PackageCardProps) {
  const inputId = `plan-${plan}`

  return (
    <label
      htmlFor={inputId}
      className={cn(
        // Card base
        "relative block rounded-lg border-2 p-5 cursor-pointer",
        "transition-colors duration-[var(--transition-duration-fast)]",
        // Unselected
        "border-border bg-card hover:border-primary/60",
        // Selected
        selected && "border-primary bg-card"
      )}
    >
      {/* Hidden radio input for accessibility */}
      <input
        id={inputId}
        type="radio"
        name="selectedPlan"
        value={plan}
        checked={selected}
        onChange={onSelect}
        className="sr-only"
      />

      {/* Selected checkmark — top-right corner */}
      <div
        className={cn(
          "absolute top-4 right-4",
          "flex items-center justify-center w-5 h-5 rounded-full border-2",
          "transition-colors duration-[var(--transition-duration-fast)]",
          selected
            ? "border-primary bg-primary"
            : "border-border bg-transparent"
        )}
        aria-hidden="true"
      >
        {selected && (
          <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
            <path
              d="M1 4L3.5 6.5L9 1"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </div>

      {/* Plan header */}
      <div className="pr-8 space-y-2">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-base font-bold text-foreground">{name}</span>
          {badge && (
            <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold uppercase tracking-wide leading-none">
              {badge}
            </span>
          )}
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-1">
          <span className="text-3xl font-extrabold tracking-tight text-foreground">
            ${price}
          </span>
          <span className="text-sm text-muted-foreground font-medium">
            /{billing}
          </span>
        </div>
      </div>

      {/* Divider */}
      <div className="my-4 border-t border-border" />

      {/* Feature list */}
      <ul className="space-y-2.5">
        {features.map((feature) => (
          <li key={feature} className="flex items-start gap-2.5 text-sm">
            <CheckIcon className="shrink-0 mt-0.5 text-primary" />
            <span className="text-foreground leading-snug">{feature}</span>
          </li>
        ))}
      </ul>
    </label>
  )
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <circle cx="7" cy="7" r="6.5" stroke="currentColor" strokeWidth="1" opacity="0.3" />
      <path
        d="M4 7L6 9.5L10 4.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
```

---

## Task 2 — Replace `FSBOStep4ChoosePlan` with real content

**File:** `src/features/sell-boat/components/fsbo/FSBOStep4ChoosePlan.tsx`

Replace the entire file:

```tsx
"use client"

import { UseFormReturn, Controller } from "react-hook-form"
import { FSBOFormData } from "../../types-fsbo"
import { PackageCard } from "@/components/fsbo/PackageCard"

interface FSBOStep4ChoosePlanProps {
  form: UseFormReturn<FSBOFormData>
}

// Feature lists
const BASIC_FEATURES = [
  "Listed on Rightboat.com",
  "Up to 20 photos",
  "Email enquiries from buyers",
  "30-day listing period",
  "Basic listing analytics",
  "Renew or remove any time",
]

const PREMIUM_FEATURES = [
  "Everything in Basic",
  "Featured placement in search results",
  "Priority buyer matching",
  "Video walkthrough upload",
  "Listing health score & tips",
  "Premium analytics dashboard",
  "Dedicated seller support",
]

export function FSBOStep4ChoosePlan({ form }: FSBOStep4ChoosePlanProps) {
  const { control, watch } = form
  const selectedPlan = watch("selectedPlan")

  return (
    <div className="space-y-7">

      {/* Step intro */}
      <div className="space-y-1">
        <h2 className="text-xl font-bold tracking-tight">Choose your plan</h2>
        <p className="text-sm text-muted-foreground">
          Both plans include a live listing on Rightboat. Upgrade for more visibility.
        </p>
      </div>

      {/* Plan cards — stacked on mobile, side by side on md+ */}
      <Controller
        name="selectedPlan"
        control={control}
        render={({ field }) => (
          <div className="flex flex-col md:flex-row gap-3">

            {/* Premium first — it's the recommended default */}
            <div className="flex-1">
              <PackageCard
                plan="premium"
                name="Premium"
                price={99}
                billing="month"
                badge="Recommended"
                features={PREMIUM_FEATURES}
                selected={field.value === "premium"}
                onSelect={() => field.onChange("premium")}
              />
            </div>

            <div className="flex-1">
              <PackageCard
                plan="basic"
                name="Basic"
                price={49}
                billing="month"
                features={BASIC_FEATURES}
                selected={field.value === "basic"}
                onSelect={() => field.onChange("basic")}
              />
            </div>

          </div>
        )}
      />

      {/* Social proof / trust note */}
      <div className="rounded-lg bg-muted px-4 py-3">
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">78% of sellers</span> choose Premium —
          featured listings sell{" "}
          <span className="font-semibold text-foreground">2.4× faster</span> on average.
        </p>
      </div>

      {/* Cancel any time note */}
      <p className="text-xs text-muted-foreground text-center">
        Cancel or change plan any time from your dashboard. No long-term commitment.
      </p>

    </div>
  )
}
```

---

## Verification checklist

- [ ] `/fsbo/wizard` → complete Steps 1–3 → Step 4 shows two plan cards
- [ ] Premium card is pre-selected on arrival (default from schema)
- [ ] Premium card shows "Recommended" badge (primary bg, white text)
- [ ] Tapping Basic deselects Premium and selects Basic (radio behaviour)
- [ ] Tapping Premium re-selects it
- [ ] Selected card has `border-primary` and a filled checkmark in top-right
- [ ] Unselected card has `border-border` and an empty circle
- [ ] On mobile (390px): cards are stacked vertically, Premium first
- [ ] On desktop (md+): cards are side by side
- [ ] Price renders as `$99/month` and `$49/month` — correct sizing (3xl + sm)
- [ ] Feature list items have circle-check icon in `text-primary`
- [ ] Trust note and cancel note render below the cards
- [ ] "Continue to payment →" CTA is enabled regardless of which plan is selected (both are valid)
- [ ] Tapping "Continue to payment →" advances to Step 5
- [ ] No `h-[52px]`, no `rounded-xl` on controls, no hardcoded hex
- [ ] No TypeScript errors: `npx tsc --noEmit`

---

## What is NOT in scope for Phase 6

- Annual billing toggle (monthly only for prototype)
- Plan comparison table / expanded feature detail
- "Most popular" counter — static social proof text only
- Video upload for Premium — deferred
- Step 5 Payment — Phase 7
