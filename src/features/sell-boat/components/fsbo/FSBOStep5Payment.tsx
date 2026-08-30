"use client"

import { UseFormReturn } from "react-hook-form"
import { FSBOFormData, PLANS } from "../../types-fsbo"
import { MockCardForm } from "@/components/fsbo/MockCardForm"

interface FSBOStep5PaymentProps {
  form: UseFormReturn<FSBOFormData>
  selectedPlan: "basic" | "premium"
}

const PLAN_HIGHLIGHTS: Record<"basic" | "premium", string> = {
  premium: "Featured placement · Priority matching · Premium analytics",
  basic: "Listed on Rightboat.com · Up to 20 photos · Email enquiries",
}

export function FSBOStep5Payment({ selectedPlan }: FSBOStep5PaymentProps) {
  const plan = PLANS[selectedPlan]
  const highlight = PLAN_HIGHLIGHTS[selectedPlan]

  return (
    <div className="flex flex-col gap-4">
      {/* Title */}
      <h2 className="text-2xl font-bold tracking-tight text-foreground leading-8">Payment</h2>

      {/* Subtitle */}
      <p className="text-sm text-foreground">
        Your listing goes live the moment payment is confirmed.
      </p>

      {/* Order summary */}
      <div className="pt-7">
        <div className="rounded-xl border border-border p-[17px] flex flex-col gap-3">
          <p className="text-xs font-semibold uppercase tracking-[1.2px] text-neutral-400">
            Order summary
          </p>

          <div className="flex items-start justify-between gap-4">
            <div className="flex flex-col gap-0.5">
              <p className="text-base font-semibold text-foreground">
                Rightboat {plan.name}
              </p>
              <p className="text-xs text-neutral-400 leading-5">{highlight}</p>
            </div>
            <div className="text-right shrink-0">
              <p className="text-[20px] font-extrabold text-foreground leading-7">${plan.price}</p>
              <p className="text-xs text-neutral-400">per month</p>
            </div>
          </div>

          <div className="border-t border-border pt-[13px] flex items-center justify-between">
            <p className="text-sm text-neutral-400">Billed monthly · Cancel any time</p>
            <p className="text-sm font-bold text-foreground">
              ${plan.price}
              <span className="font-normal text-neutral-400">/mo</span>
            </p>
          </div>
        </div>
      </div>

      {/* Card form */}
      <div className="pt-7">
        <MockCardForm />
      </div>

      {/* Trust row */}
      <div className="flex items-center justify-center gap-4 flex-wrap pt-3">
        <TrustBadge icon={<LockIcon />} label="SSL encrypted" />
        <TrustBadge icon={<ShieldIcon />} label="Secure checkout" />
        <TrustBadge icon={<StripeWordmark />} label="Powered by Stripe" />
      </div>

      {/* Legal */}
      <p className="text-xs text-neutral-400 text-center leading-5">
        By publishing you confirm your listing complies with Rightboat&apos;s{" "}
        <a
          href="/terms"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:opacity-80 transition-opacity"
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
    <div className="flex items-center gap-1.5 text-xs text-status-info-200">
      {icon}
      <span>{label}</span>
    </div>
  )
}

function LockIcon() {
  return (
    <svg width="12" height="14" viewBox="0 0 12 14" fill="none" aria-hidden="true" className="text-status-info-200">
      <rect x="1" y="6" width="10" height="7.5" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
      <path d="M3.5 6V4.5a2.5 2.5 0 0 1 5 0V6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  )
}

function ShieldIcon() {
  return (
    <svg width="12" height="14" viewBox="0 0 12 14" fill="none" aria-hidden="true" className="text-status-info-200">
      <path
        d="M6 1L1 3.5V7C1 9.8 3.2 12.4 6 13C8.8 12.4 11 9.8 11 7V3.5L6 1Z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <path d="M4 7L5.5 8.5L8.5 5.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function StripeWordmark() {
  return (
    <span className="text-[10px] font-bold text-status-info-200 italic tracking-wide">stripe</span>
  )
}
