# FSBO Wizard — Cursor Prompt · Phase 7: Step 5 — Payment

## Context

Phases 1–6 complete. Steps 1–4 working. Step 5 is a placeholder.

Phase 7 replaces `FSBOStep5Payment` with a production-quality mock payment screen.

**This is prototype-only.** No real Stripe integration. The card form is visual — when the user taps "Publish my listing →", `BoatFormFSBO.onSubmit` fires, simulates 1.2s processing, clears localStorage, and shows `SuccessScreen`. The mock card fields do NOT need to be added to the Zod schema.

**`BoatFormFSBO` already handles:**
- `isSubmitting` → `WizardFooter` shows a loading spinner on "Publish my listing →"
- `onSubmit` → 1.2s delay → `setIsSuccess(true)` → `SuccessScreen`

---

## ⚠️ DS Rules — no exceptions

- `rounded-lg` for all cards, inputs, containers
- `rounded-full` for badges and trust pills
- No height overrides — `Input` is `h-11` by DS default, no `h-[52px]`
- `transition-colors duration-[var(--transition-duration-fast)]`
- Semantic tokens: `bg-muted`, `text-muted-foreground`, `border-input`, `border-border`, `bg-primary`, `text-primary-foreground`, `text-destructive`
- No hardcoded hex

---

## New components to build

| Component | File | Purpose |
|---|---|---|
| `MockCardForm` | `src/components/fsbo/MockCardForm.tsx` | Visual card entry form with formatting |

## File to replace

| File | Change |
|---|---|
| `src/features/sell-boat/components/fsbo/FSBOStep5Payment.tsx` | Replace placeholder with full screen |

---

## Task 1 — Create `MockCardForm`

**File:** `src/components/fsbo/MockCardForm.tsx`

Self-contained with local state. Formats card number as XXXX XXXX XXXX XXXX, expiry as MM/YY.  
Detects Visa (starts 4) / Mastercard (starts 5) and shows card brand label.  
Shows inline validation errors only after the user has interacted with a field (onBlur).

```tsx
"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

// ─── Formatters ──────────────────────────────────────────────────────────────
function formatCardNumber(raw: string): string {
  const digits = raw.replace(/\D/g, "").slice(0, 16)
  return digits.replace(/(.{4})/g, "$1 ").trim()
}

function formatExpiry(raw: string): string {
  const digits = raw.replace(/\D/g, "").slice(0, 4)
  if (digits.length >= 3) return `${digits.slice(0, 2)}/${digits.slice(2)}`
  return digits
}

function detectCardBrand(number: string): "visa" | "mastercard" | null {
  const first = number.replace(/\s/g, "")[0]
  if (first === "4") return "visa"
  if (first === "5") return "mastercard"
  return null
}

// ─── Component ───────────────────────────────────────────────────────────────
export function MockCardForm() {
  const [cardNumber,     setCardNumber]     = useState("")
  const [expiry,         setExpiry]         = useState("")
  const [cvc,            setCvc]            = useState("")
  const [cardholderName, setCardholderName] = useState("")
  // Track touched state per field to show errors only after interaction
  const [touched, setTouched] = useState<Record<string, boolean>>({})

  const brand = detectCardBrand(cardNumber)

  const touch = (field: string) =>
    setTouched((prev) => ({ ...prev, [field]: true }))

  // Basic validation (prototype only)
  const errors = {
    cardNumber:
      touched.cardNumber && cardNumber.replace(/\s/g, "").length < 16
        ? "Enter a valid 16-digit card number"
        : null,
    expiry:
      touched.expiry && expiry.length < 5
        ? "Enter a valid expiry date (MM/YY)"
        : null,
    cvc:
      touched.cvc && cvc.length < 3
        ? "Enter the 3-digit security code"
        : null,
    cardholderName:
      touched.cardholderName && cardholderName.trim().length < 2
        ? "Enter the name on your card"
        : null,
  }

  return (
    <div className="space-y-4">

      {/* ── Card Number ── */}
      <div className="space-y-2">
        <Label htmlFor="mock-card-number" className="text-sm font-semibold">
          Card number
        </Label>
        <div className="relative">
          <Input
            id="mock-card-number"
            type="text"
            inputMode="numeric"
            autoComplete="cc-number"
            placeholder="1234 5678 9012 3456"
            value={cardNumber}
            onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
            onBlur={() => touch("cardNumber")}
            className={cn(
              "pr-20",
              errors.cardNumber && "border-destructive focus-visible:ring-destructive"
            )}
          />
          {/* Card brand — right side of input */}
          {brand && (
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-muted-foreground uppercase tracking-wide">
              {brand === "visa" ? "VISA" : "MC"}
            </span>
          )}
        </div>
        {errors.cardNumber && (
          <p className="text-sm text-destructive mt-1">{errors.cardNumber}</p>
        )}
      </div>

      {/* ── Expiry + CVC — side by side ── */}
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-2">
          <Label htmlFor="mock-expiry" className="text-sm font-semibold">
            Expiry
          </Label>
          <Input
            id="mock-expiry"
            type="text"
            inputMode="numeric"
            autoComplete="cc-exp"
            placeholder="MM/YY"
            value={expiry}
            onChange={(e) => setExpiry(formatExpiry(e.target.value))}
            onBlur={() => touch("expiry")}
            className={cn(
              errors.expiry && "border-destructive focus-visible:ring-destructive"
            )}
          />
          {errors.expiry && (
            <p className="text-sm text-destructive mt-1">{errors.expiry}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="mock-cvc" className="text-sm font-semibold">
            CVC
          </Label>
          <Input
            id="mock-cvc"
            type="text"
            inputMode="numeric"
            autoComplete="cc-csc"
            placeholder="123"
            maxLength={4}
            value={cvc}
            onChange={(e) => setCvc(e.target.value.replace(/\D/g, "").slice(0, 4))}
            onBlur={() => touch("cvc")}
            className={cn(
              errors.cvc && "border-destructive focus-visible:ring-destructive"
            )}
          />
          {errors.cvc && (
            <p className="text-sm text-destructive mt-1">{errors.cvc}</p>
          )}
        </div>
      </div>

      {/* ── Cardholder Name ── */}
      <div className="space-y-2">
        <Label htmlFor="mock-name" className="text-sm font-semibold">
          Name on card
        </Label>
        <Input
          id="mock-name"
          type="text"
          autoComplete="cc-name"
          placeholder="James Taylor"
          value={cardholderName}
          onChange={(e) => setCardholderName(e.target.value)}
          onBlur={() => touch("cardholderName")}
          className={cn(
            errors.cardholderName && "border-destructive focus-visible:ring-destructive"
          )}
        />
        {errors.cardholderName && (
          <p className="text-sm text-destructive mt-1">{errors.cardholderName}</p>
        )}
      </div>

    </div>
  )
}
```

---

## Task 2 — Replace `FSBOStep5Payment` with full content

**File:** `src/features/sell-boat/components/fsbo/FSBOStep5Payment.tsx`

Replace the entire file:

```tsx
"use client"

import { UseFormReturn } from "react-hook-form"
import { FSBOFormData } from "../../types-fsbo"
import { MockCardForm } from "@/components/fsbo/MockCardForm"

interface FSBOStep5PaymentProps {
  form: UseFormReturn<FSBOFormData>
  selectedPlan: "basic" | "premium"
}

const PLAN_DETAILS = {
  basic: {
    name: "Basic",
    price: 49,
    highlight: "Live listing · 20 photos · Email enquiries",
  },
  premium: {
    name: "Premium",
    price: 99,
    highlight: "Featured placement · Priority matching · Premium analytics",
  },
}

export function FSBOStep5Payment({ selectedPlan }: FSBOStep5PaymentProps) {
  const plan = PLAN_DETAILS[selectedPlan]

  return (
    <div className="space-y-7">

      {/* Step intro */}
      <div className="space-y-1">
        <h2 className="text-xl font-bold tracking-tight">Payment</h2>
        <p className="text-sm text-muted-foreground">
          Your listing goes live the moment payment is confirmed.
        </p>
      </div>

      {/* ── Order summary ── */}
      <div className="rounded-lg border border-border bg-card p-4 space-y-3">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Order summary
        </p>

        <div className="flex items-start justify-between gap-4">
          <div className="space-y-0.5">
            <p className="text-base font-semibold text-foreground">
              Rightboat {plan.name}
            </p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {plan.highlight}
            </p>
          </div>
          <div className="text-right shrink-0">
            <p className="text-xl font-extrabold text-foreground">${plan.price}</p>
            <p className="text-xs text-muted-foreground">per month</p>
          </div>
        </div>

        <div className="border-t border-border pt-3 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">Billed monthly · Cancel any time</p>
          <p className="text-sm font-bold text-foreground">
            ${plan.price}<span className="font-normal text-muted-foreground">/mo</span>
          </p>
        </div>
      </div>

      {/* ── Mock card form ── */}
      <MockCardForm />

      {/* ── Trust badges ── */}
      <div className="flex items-center justify-center gap-4 flex-wrap">
        <TrustBadge icon={<LockIcon />} label="SSL encrypted" />
        <TrustBadge icon={<ShieldIcon />} label="Secure checkout" />
        <TrustBadge icon={<StripeIcon />} label="Powered by Stripe" />
      </div>

      {/* ── Fine print ── */}
      <p className="text-xs text-muted-foreground text-center leading-relaxed">
        By publishing you confirm your listing complies with Rightboat&apos;s{" "}
        <a href="/terms" target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground transition-colors duration-[var(--transition-duration-fast)]">
          listing guidelines
        </a>
        . Your card will be charged ${plan.price} today, then monthly until cancelled.
      </p>

    </div>
  )
}

// ─── Trust badge sub-component ────────────────────────────────────────────────
function TrustBadge({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
      {icon}
      <span>{label}</span>
    </div>
  )
}

// ─── Inline icons ─────────────────────────────────────────────────────────────
function LockIcon() {
  return (
    <svg width="12" height="14" viewBox="0 0 12 14" fill="none" aria-hidden="true">
      <rect x="1" y="6" width="10" height="7.5" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
      <path d="M3.5 6V4.5a2.5 2.5 0 0 1 5 0V6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  )
}

function ShieldIcon() {
  return (
    <svg width="12" height="14" viewBox="0 0 12 14" fill="none" aria-hidden="true">
      <path d="M6 1L1 3.5V7C1 9.8 3.2 12.4 6 13C8.8 12.4 11 9.8 11 7V3.5L6 1Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
      <path d="M4 7L5.5 8.5L8.5 5.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function StripeIcon() {
  return (
    <svg width="28" height="12" viewBox="0 0 28 12" fill="none" aria-hidden="true">
      <text x="0" y="10" fontSize="10" fontWeight="700" fontFamily="system-ui, sans-serif" fill="currentColor" opacity="0.6">stripe</text>
    </svg>
  )
}
```

---

## Verification checklist

- [ ] `/fsbo/wizard` → complete Steps 1–4 → Step 5 shows "Payment"
- [ ] Order summary shows the plan chosen in Step 4 (Basic $49 or Premium $99)
- [ ] Order summary shows plan highlights (one line summary)
- [ ] Total in the order summary footer matches the plan price
- [ ] Card number input formats as groups of 4: `1234 5678 9012 3456`
- [ ] Typing a number starting with 4 shows "VISA" label inside the input
- [ ] Typing a number starting with 5 shows "MC" label inside the input
- [ ] Expiry input formats as `MM/YY` automatically
- [ ] CVC input limits to 4 digits max
- [ ] Touching a field and leaving it empty shows inline error (no emoji)
- [ ] No errors shown until user has interacted with the field (onBlur)
- [ ] Three trust badges render below the form: SSL · Secure checkout · Stripe
- [ ] "Publish my listing →" button is the WizardFooter CTA (from `BoatFormFSBO`)
- [ ] Tapping "Publish my listing →" shows a loading spinner on the button (1.2s)
- [ ] After 1.2s → `SuccessScreen` is shown
- [ ] No `h-[52px]`, no `rounded-xl`, no hardcoded hex in new files
- [ ] No TypeScript errors: `npx tsc --noEmit`

---

## What is NOT in scope for Phase 7

- Real Stripe Elements or Stripe.js integration — deferred to production
- Payment intent creation on the backend — deferred
- 3D Secure / SCA flow — deferred
- Saved cards / wallet pay (Apple Pay, Google Pay) — deferred
- Invoice / receipt email — deferred (uses existing Rightboat transactional email system)
- Landing page SEO updates — Phase 8 (separate sprint)
