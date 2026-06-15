# FSBO Wizard — Cursor Prompt · Phase 5: Step 3 — Your Details

## Context

Phases 1–4 complete. `/fsbo/wizard` has working Steps 1 and 2.

Phase 5 replaces the `FSBOStep3YourDetails` placeholder with the real form.

**Step 3 goal:** Capture seller identity (name, phone, preferred contact) + create their account (password) + GDPR consent. Email was already captured on the LP — show it as a read-only confirmation, not a re-editable field.

**Schema already has all required fields** via `wizardStep3Schema` in `types-v3.ts`:
`fullName`, `email`, `phone`, `preferredContact`, `gdprConsent`

---

## ⚠️ DS Rules — no exceptions

- `rounded-lg` on all controls — never `rounded-xl` on controls
- No height overrides — `Input` is `h-11` by DS default. Do NOT add `className="h-[52px]"`
- `transition-colors duration-[var(--transition-duration-fast)]` for state changes
- Semantic tokens only: `bg-muted`, `text-muted-foreground`, `border-input`, `border-primary`, `text-destructive`, `bg-primary`, `text-primary-foreground`
- No hardcoded hex

---

## Existing DS components to use

These are already in `src/components/ui/` — import them directly, do NOT recreate:

| Component | Import |
|---|---|
| `Input` | `@/components/ui/input` |
| `Label` | `@/components/ui/label` |
| `Checkbox` | `@/components/ui/checkbox` |
| `PillGroup` | `@/components/ui/pill-group` |
| `Button` | `@/components/ui/button` |

---

## New components to build

| Component | File | Purpose |
|---|---|---|
| `PasswordInput` | `src/components/fsbo/PasswordInput.tsx` | Password field with show/hide toggle |

## File to replace

| File | Change |
|---|---|
| `src/features/sell-boat/components/fsbo/FSBOStep3YourDetails.tsx` | Replace placeholder with full form |

---

## Task 1 — Create `PasswordInput` component

**File:** `src/components/fsbo/PasswordInput.tsx`

Wraps the DS `Input` with a show/hide toggle button. Uses Eye/EyeOff from lucide-react.

```tsx
"use client"

import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface PasswordInputProps
  extends Omit<React.ComponentProps<typeof Input>, "type"> {
  error?: string
}

export function PasswordInput({ error, className, ...props }: PasswordInputProps) {
  const [show, setShow] = useState(false)

  return (
    <div className="space-y-1">
      <div className="relative">
        {/* DS Input — no height override (h-11 by default). Add pr-11 for toggle clearance. */}
        <Input
          type={show ? "text" : "password"}
          autoComplete="new-password"
          className={cn("pr-11", className)}
          {...props}
        />

        {/* Show/hide toggle — right-aligned inside the input */}
        <button
          type="button"
          onClick={() => setShow((v) => !v)}
          aria-label={show ? "Hide password" : "Show password"}
          className={cn(
            "absolute right-3 top-1/2 -translate-y-1/2",
            "flex items-center justify-center w-6 h-6 rounded-lg",
            "text-muted-foreground hover:text-foreground",
            "transition-colors duration-[var(--transition-duration-fast)]"
          )}
        >
          {show ? (
            <EyeOff size={16} aria-hidden="true" />
          ) : (
            <Eye size={16} aria-hidden="true" />
          )}
        </button>
      </div>

      {error && (
        <p className="text-sm text-destructive mt-1">{error}</p>
      )}
    </div>
  )
}
```

---

## Task 2 — Replace `FSBOStep3YourDetails` with real content

**File:** `src/features/sell-boat/components/fsbo/FSBOStep3YourDetails.tsx`

Replace the entire file:

```tsx
"use client"

import { UseFormReturn, Controller } from "react-hook-form"
import { FSBOFormData } from "../../types-fsbo"
import { PasswordInput } from "@/components/fsbo/PasswordInput"
import { PillGroup } from "@/components/ui/pill-group"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"

interface FSBOStep3YourDetailsProps {
  form: UseFormReturn<FSBOFormData>
}

const CONTACT_OPTIONS = [
  { label: "Phone",     value: "phone"     },
  { label: "Email",     value: "email"     },
  { label: "WhatsApp",  value: "whatsapp"  },
]

export function FSBOStep3YourDetails({ form }: FSBOStep3YourDetailsProps) {
  const {
    register,
    control,
    watch,
    formState: { errors },
  } = form

  const email = watch("email")

  return (
    <div className="space-y-7">

      {/* Step intro */}
      <div className="space-y-1">
        <h2 className="text-xl font-bold tracking-tight">Your details</h2>
        <p className="text-sm text-muted-foreground">
          So buyers can reach you — and to create your Rightboat account.
        </p>
      </div>

      {/* ── Email (read-only, pre-filled from LP) ── */}
      <div className="space-y-2">
        <Label htmlFor="email-display" className="text-sm font-semibold">
          Email
        </Label>
        {/* Read-only display — not a form field, just a confirmation */}
        <div className="flex items-center gap-2 h-11 px-3 rounded-lg border border-input bg-muted text-sm text-muted-foreground">
          <LockIcon />
          <span className="truncate">{email || "—"}</span>
        </div>
        <p className="text-xs text-muted-foreground">
          Entered at the start.{" "}
          <a href="/fsbo" className="underline text-primary hover:opacity-80 transition-opacity duration-[var(--transition-duration-fast)]">
            Change
          </a>
        </p>
      </div>

      {/* ── Full Name ── */}
      <div className="space-y-2">
        <Label htmlFor="fullName" className="text-sm font-semibold">
          Full name <span className="text-destructive">*</span>
        </Label>
        <Input
          id="fullName"
          type="text"
          autoComplete="name"
          placeholder="e.g. James Taylor"
          {...register("fullName")}
        />
        {errors.fullName && (
          <p className="text-sm text-destructive mt-1">{errors.fullName.message}</p>
        )}
      </div>

      {/* ── Phone ── */}
      <div className="space-y-2">
        <Label htmlFor="phone" className="text-sm font-semibold">
          Phone number <span className="text-destructive">*</span>
        </Label>
        <Input
          id="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder="e.g. 07700 900123"
          {...register("phone")}
        />
        {errors.phone && (
          <p className="text-sm text-destructive mt-1">{errors.phone.message}</p>
        )}
        <p className="text-xs text-muted-foreground">
          Only shared with interested buyers — never displayed publicly.
        </p>
      </div>

      {/* ── Preferred Contact ── */}
      <div className="space-y-2">
        <Label className="text-sm font-semibold">
          Preferred contact method <span className="text-destructive">*</span>
        </Label>
        <Controller
          name="preferredContact"
          control={control}
          render={({ field }) => (
            <PillGroup
              options={CONTACT_OPTIONS}
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />
        {errors.preferredContact && (
          <p className="text-sm text-destructive mt-1">{errors.preferredContact.message}</p>
        )}
      </div>

      {/* ── Password ── */}
      <div className="space-y-2">
        <Label htmlFor="password" className="text-sm font-semibold">
          Create a password <span className="text-destructive">*</span>
        </Label>
        <PasswordInput
          id="password"
          placeholder="8+ characters"
          {...register("password")}
          error={errors.password?.message}
        />
        <p className="text-xs text-muted-foreground">
          This creates your Rightboat account so you can manage your listing.
        </p>
      </div>

      {/* ── GDPR Consent ── */}
      <div className="space-y-2">
        <Controller
          name="gdprConsent"
          control={control}
          render={({ field }) => (
            <div className="flex items-start gap-3">
              <Checkbox
                id="gdprConsent"
                checked={field.value === true}
                onCheckedChange={(checked) =>
                  field.onChange(checked === true ? true : false)
                }
                aria-describedby="gdpr-desc"
                className="mt-0.5 shrink-0"
              />
              <label
                htmlFor="gdprConsent"
                id="gdpr-desc"
                className="text-sm text-muted-foreground leading-relaxed cursor-pointer"
              >
                I agree to Rightboat&apos;s{" "}
                <a
                  href="/terms"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline text-foreground hover:text-primary transition-colors duration-[var(--transition-duration-fast)]"
                  onClick={(e) => e.stopPropagation()}
                >
                  Terms of Service
                </a>{" "}
                and{" "}
                <a
                  href="/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline text-foreground hover:text-primary transition-colors duration-[var(--transition-duration-fast)]"
                  onClick={(e) => e.stopPropagation()}
                >
                  Privacy Policy
                </a>
                . My contact details will only be shared with genuine buyers.
              </label>
            </div>
          )}
        />
        {errors.gdprConsent && (
          <p className="text-sm text-destructive mt-1">{errors.gdprConsent.message}</p>
        )}
      </div>

    </div>
  )
}

// Minimal inline lock icon — no external dependency
function LockIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden="true"
      className="shrink-0 text-muted-foreground"
    >
      <rect x="2" y="6" width="10" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
      <path d="M4.5 6V4.5a2.5 2.5 0 0 1 5 0V6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  )
}
```

---

## Task 3 — Add `password` field to the schema

**File:** `src/features/sell-boat/types-fsbo.ts`

The `wizardStep3Schema` (in `types-v3.ts`) does not include `password`. Add it to `fsboFormSchema` via `.extend()`:

```ts
// In the fsboFormSchema .extend({}) block, add alongside expectedPrice and photoCount:
password: z.string()
  .min(8, "Password must be at least 8 characters")
  .max(128, "Password is too long"),
```

Also update `FSBO_STEPS` Step 3 fields to include password:

```ts
{ step: 3, name: "Your Details", fields: ["fullName", "phone", "preferredContact", "gdprConsent", "password"] },
```

And update `BoatFormFSBO` default values to add `password: ""`.

---

## Task 4 — Confirm `BoatFormFSBO` wires Step 3 with updated props

**File:** `src/features/sell-boat/components/BoatFormFSBO.tsx`

The Step 3 case should already be wired. Verify it uses the right component and no extra props are needed (Step 3 doesn't need AI pre-fill props):

```tsx
case 3:
  return <FSBOStep3YourDetails form={form} />
```

No changes needed if Phase 2 was done correctly.

---

## Verification checklist

- [ ] `/fsbo/wizard` → complete Steps 1 & 2 → Step 3 shows "Your details"
- [ ] Email field shows the email from LP as read-only (lock icon + muted text)
- [ ] "Change" link goes to `/fsbo` (the LP)
- [ ] Full Name input has `autocomplete="name"`, placeholder "e.g. James Taylor"
- [ ] Phone input has `type="tel"` and `inputMode="tel"`
- [ ] Preferred contact shows 3 pills: Phone / Email / WhatsApp
- [ ] Tapping a contact pill selects it
- [ ] Password field shows `type="password"` by default (dots, not plain text)
- [ ] Tapping the eye icon toggles between visible and hidden
- [ ] Eye/EyeOff icon size is correct (16px, not oversized)
- [ ] GDPR checkbox is unticked by default
- [ ] Terms and Privacy links open in new tab and don't tick the checkbox
- [ ] Tapping "Continue" with empty required fields shows inline errors (no emoji)
- [ ] Tapping "Continue" with all valid → advances to Step 4
- [ ] Short password (< 8 chars) shows "Password must be at least 8 characters"
- [ ] Unticked GDPR shows "You must accept the privacy policy"
- [ ] No `h-[52px]`, no `rounded-xl` on controls, no hardcoded hex
- [ ] No TypeScript errors: `npx tsc --noEmit`

---

## What is NOT in scope for Phase 5

- Real auth integration (Supabase `signUp`) — deferred to production
- Password strength meter / entropy check — prototype uses min-8 only
- Phone number formatting or country picker — plain text for prototype
- "Already have an account? Sign in" — deferred
- Step 4 Choose Plan — Phase 6
