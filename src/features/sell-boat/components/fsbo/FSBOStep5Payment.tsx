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
      <div className="space-y-1">
        <h2 className="text-xl font-bold tracking-tight">Payment</h2>
        <p className="text-sm text-muted-foreground">
          Your listing goes live the moment payment is confirmed.
        </p>
      </div>

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
            ${plan.price}
            <span className="font-normal text-muted-foreground">/mo</span>
          </p>
        </div>
      </div>

      <MockCardForm />

      <div className="flex items-center justify-center gap-4 flex-wrap">
        <TrustBadge icon={<LockIcon />} label="SSL encrypted" />
        <TrustBadge icon={<ShieldIcon />} label="Secure checkout" />
        <TrustBadge icon={<StripeIcon />} label="Powered by Stripe" />
      </div>

      <p className="text-xs text-muted-foreground text-center leading-relaxed">
        By publishing you confirm your listing complies with Rightboat&apos;s{" "}
        <a
          href="/terms"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-foreground transition-colors duration-[var(--transition-duration-fast)]"
        >
          listing guidelines
        </a>
        . Your card will be charged ${plan.price} today, then monthly until cancelled.
      </p>
    </div>
  )
}

function TrustBadge({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
      {icon}
      <span>{label}</span>
    </div>
  )
}

function LockIcon() {
  return (
    <svg width="12" height="14" viewBox="0 0 12 14" fill="none" aria-hidden="true">
      <rect x="1" y="6" width="10" height="7.5" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
      <path
        d="M3.5 6V4.5a2.5 2.5 0 0 1 5 0V6"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  )
}

function ShieldIcon() {
  return (
    <svg width="12" height="14" viewBox="0 0 12 14" fill="none" aria-hidden="true">
      <path
        d="M6 1L1 3.5V7C1 9.8 3.2 12.4 6 13C8.8 12.4 11 9.8 11 7V3.5L6 1Z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <path
        d="M4 7L5.5 8.5L8.5 5.5"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function StripeIcon() {
  return (
    <svg width="28" height="12" viewBox="0 0 28 12" fill="none" aria-hidden="true">
      <text
        x="0"
        y="10"
        fontSize="10"
        fontWeight="700"
        fontFamily="system-ui, sans-serif"
        fill="currentColor"
        opacity="0.6"
      >
        stripe
      </text>
    </svg>
  )
}
