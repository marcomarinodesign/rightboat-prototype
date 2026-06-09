"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { listingBoats } from "@/data/boats"
import { cn } from "@/lib/utils"

interface FSBOSuccessScreenProps {
  plan: "basic" | "premium"
  /** e.g. "Bavaria 34 · 2018" — derived from brand/model/year */
  boatSummary: string
  onReset: () => void
}

const PLAN_LABEL = {
  basic: "Basic · $49/mo",
  premium: "Premium · $99/mo",
}

/** Prototype BDP — same active listing as site-map “Boat detail — active listing” */
const previewBoat = listingBoats[0]
const MOCK_LISTING_URL = `/boats-for-sale/${previewBoat.makeSlug}/${previewBoat.modelSlug}/${previewBoat.id}`

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
      text: boatSummary
        ? `${boatSummary} — for sale on Rightboat`
        : "My boat is for sale on Rightboat",
      url,
    }

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
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 220, damping: 16, delay: 0.15 }}
      >
        <CheckCircle2 className="w-20 h-20 text-primary" />
      </motion.div>

      <div className="space-y-2">
        <h2 className="text-2xl font-extrabold tracking-tight text-foreground">
          Your listing is live!
        </h2>
        <p className="text-sm text-muted-foreground max-w-xs mx-auto leading-relaxed">
          Buyers on Rightboat can find your boat right now.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-2">
        {boatSummary && (
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-muted text-sm font-medium text-foreground">
            <span aria-hidden>🚤</span>
            {boatSummary}
          </span>
        )}
        <span
          className={cn(
            "inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide",
            plan === "premium"
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-foreground"
          )}
        >
          {PLAN_LABEL[plan]}
        </span>
      </div>

      <div className="w-full max-w-sm rounded-lg bg-muted p-4 text-left space-y-3">
        <p className="text-sm font-semibold text-foreground">What happens next</p>
        <ul className="space-y-2.5">
          {[
            { icon: "✉️", text: "Check your email — listing confirmation sent" },
            { icon: "📊", text: "Track enquiries and views from your dashboard" },
            { icon: "💡", text: "Share your listing link for extra reach" },
          ].map(({ icon, text }) => (
            <li key={text} className="flex items-start gap-2.5 text-sm text-muted-foreground">
              <span className="shrink-0 mt-0.5" aria-hidden>
                {icon}
              </span>
              <span className="leading-snug">{text}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="w-full max-w-sm space-y-2.5">
        <Button
          size="lg"
          className="w-full"
          onClick={() => window.open(MOCK_LISTING_URL, "_blank")}
        >
          View my listing →
        </Button>

        <Button
          size="lg"
          variant="outline"
          className="w-full"
          onClick={handleShare}
        >
          {copied ? "Link copied!" : "Share listing"}
        </Button>
      </div>

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
