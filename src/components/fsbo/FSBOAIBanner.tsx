"use client"

import { cn } from "@/lib/utils"

interface FSBOAIBannerProps {
  filledFields: Set<string>
  onDismiss: () => void
  className?: string
}

const FIELD_LABELS: Record<string, string> = {
  boatType: "Boat type",
  length: "Length",
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
        <SparkleIcon className="shrink-0 mt-0.5 text-primary" />

        <div className="min-w-0">
          <p className="text-sm font-semibold text-primary leading-snug">
            AI pre-filled {fieldNames.length} field{fieldNames.length !== 1 ? "s" : ""}
          </p>
          <p className="text-xs text-primary/80 mt-0.5 leading-relaxed">
            Based on your Make, Model &amp; Year — we filled in{" "}
            <span className="font-medium">{fieldNames.join(", ")}</span>. Review and
            edit anything.
          </p>
        </div>
      </div>

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
      <path
        d="M1 1L9 9M9 1L1 9"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  )
}
