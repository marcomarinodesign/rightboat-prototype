# FSBO Wizard — Cursor Prompt · Phase 8: Success Screen

## Context

All 5 wizard steps complete. When `onSubmit` resolves, `BoatFormFSBO` sets `isSuccess = true` and renders `<SuccessScreen onReset={handleReset} />` — the old component designed for the expert-review flow (wrong for FSBO).

**FSBO is self-service.** The listing goes live instantly after payment — no review, no 24h wait.

This phase:
1. Creates `FSBOSuccessScreen` — a new component specific to the FSBO flow
2. Updates `BoatFormFSBO` to use it (one import swap + pass 2 extra props)
3. Does NOT touch the existing `SuccessScreen.tsx` — it's still used by `BoatFormV3`

---

## ⚠️ DS Rules

- `rounded-lg` for cards and containers
- `rounded-full` for badges/pills
- `h-11` for buttons via `Button size="lg"` — no custom heights
- `transition-colors duration-[var(--transition-duration-fast)]`
- Tokens: `bg-muted`, `text-muted-foreground`, `bg-primary`, `text-primary-foreground`, `bg-tag-bg`, `text-primary`
- No hardcoded hex

---

## New file to create

**`src/features/sell-boat/components/FSBOSuccessScreen.tsx`**

```tsx
"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface FSBOSuccessScreenProps {
  plan: "basic" | "premium"
  /** e.g. "Bavaria 34 · 2018" — derived from brand/model/year */
  boatSummary: string
  onReset: () => void
}

const PLAN_LABEL = {
  basic:   "Basic · $49/mo",
  premium: "Premium · $99/mo",
}

const MOCK_LISTING_URL = "/boats-for-sale/preview-listing"

export function FSBOSuccessScreen({
  plan,
  boatSummary,
  onReset,
}: FSBOSuccessScreenProps) {
  const [copied, setCopied] = useState(false)

  const handleShare = async () => {
    const url = `${window.location.origin}${MOCK_LISTING_URL}`
    const shareData = {
      title: "My boat is listed on Rightboat",
      text: boatSummary ? `${boatSummary} — for sale on Rightboat` : "My boat is for sale on Rightboat",
      url,
    }

    // Web Share API on mobile; copy-to-clipboard fallback on desktop
    if (navigator.share && navigator.canShare?.(shareData)) {
      try {
        await navigator.share(shareData)
      } catch {
        // User cancelled share — do nothing
      }
    } else {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="flex flex-col items-center text-center py-10 space-y-7 px-2"
    >
      {/* Animated checkmark */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 220, damping: 16, delay: 0.15 }}
      >
        <CheckCircle2 className="w-20 h-20 text-primary" />
      </motion.div>

      {/* Headline + subline */}
      <div className="space-y-2">
        <h2 className="text-2xl font-extrabold tracking-tight text-foreground">
          Your listing is live!
        </h2>
        <p className="text-sm text-muted-foreground max-w-xs mx-auto leading-relaxed">
          Buyers on Rightboat can find your boat right now.
        </p>
      </div>

      {/* Boat + plan chips */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {boatSummary && (
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-muted text-sm font-medium text-foreground">
            <span aria-hidden>🚤</span>
            {boatSummary}
          </span>
        )}
        <span className={cn(
          "inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide",
          plan === "premium"
            ? "bg-primary text-primary-foreground"
            : "bg-muted text-foreground"
        )}>
          {PLAN_LABEL[plan]}
        </span>
      </div>

      {/* Next steps card */}
      <div className="w-full max-w-sm rounded-lg bg-muted p-4 text-left space-y-3">
        <p className="text-sm font-semibold text-foreground">What happens next</p>
        <ul className="space-y-2.5">
          {[
            { icon: "✉️", text: "Check your email — listing confirmation sent" },
            { icon: "📊", text: "Track enquiries and views from your dashboard" },
            { icon: "💡", text: "Share your listing link for extra reach" },
          ].map(({ icon, text }) => (
            <li key={text} className="flex items-start gap-2.5 text-sm text-muted-foreground">
              <span className="shrink-0 mt-0.5" aria-hidden>{icon}</span>
              <span className="leading-snug">{text}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* CTAs */}
      <div className="w-full max-w-sm space-y-2.5">
        {/* Primary: view listing */}
        <Button
          size="lg"
          className="w-full"
          onClick={() => window.open(MOCK_LISTING_URL, "_blank")}
        >
          View my listing →
        </Button>

        {/* Secondary: share */}
        <Button
          size="lg"
          variant="outline"
          className="w-full"
          onClick={handleShare}
        >
          {copied ? "Link copied!" : "Share listing"}
        </Button>
      </div>

      {/* Tertiary: reset / list another */}
      <button
        type="button"
        onClick={onReset}
        className="text-sm text-muted-foreground underline hover:text-foreground transition-colors duration-[var(--transition-duration-fast)]"
      >
        List another boat
      </button>
    </motion.div>
  )
}
```

---

## Update `BoatFormFSBO` — swap to `FSBOSuccessScreen`

**File:** `src/features/sell-boat/components/BoatFormFSBO.tsx`

Three changes only:

**1. Replace the import:**
```tsx
// Remove:
import SuccessScreen from "./SuccessScreen"
// Add:
import { FSBOSuccessScreen } from "./FSBOSuccessScreen"
```

**2. Compute `boatSummary` inside the component body:**
```tsx
// Add alongside existing state declarations:
const boatSummary = [
  form.watch("brand"),
  form.watch("model"),
  form.watch("year"),
].filter(Boolean).join(" · ")
```

**3. Replace the success render (line ~224):**
```tsx
// Remove:
if (isSuccess) return <SuccessScreen onReset={handleReset} />

// Add:
if (isSuccess) return (
  <FSBOSuccessScreen
    plan={form.getValues("selectedPlan")}
    boatSummary={boatSummary}
    onReset={handleReset}
  />
)
```

---

## Verification checklist

- [ ] Complete all 5 wizard steps → "Publish my listing →" → 1.2s spinner → Success screen appears
- [ ] Animated checkmark springs in (Framer Motion spring)
- [ ] Headline: "Your listing is live!" (not "Your Boat Has Been Listed!")
- [ ] Boat summary chip shows Make · Model · Year from Step 1
- [ ] Plan chip: Premium shows as primary blue badge; Basic shows as muted
- [ ] "What happens next" card has 3 bullet items
- [ ] "View my listing →" button opens `MOCK_LISTING_URL` in a new tab
- [ ] "Share listing" on desktop copies URL to clipboard and shows "Link copied!" for 2s
- [ ] "List another boat" link calls `onReset` and returns to LP
- [ ] Old `SuccessScreen.tsx` is untouched — `BoatFormV3` still works
- [ ] No TypeScript errors: `npx tsc --noEmit`
