"use client"

import { cn } from "@/lib/utils"

interface FSBOAIBannerProps {
  filledFields: Set<string>
  onDismiss: () => void
  className?: string
}

export function FSBOAIBanner({ filledFields, onDismiss, className }: FSBOAIBannerProps) {
  const count = filledFields.size
  if (count === 0) return null

  return (
    <div
      className={cn(
        "rounded-xl bg-[#f4f9ff] flex items-center gap-3 px-3 py-2",
        className
      )}
      role="status"
      aria-live="polite"
    >
      <SparkleIcon className="shrink-0 text-primary size-4" />

      <p className="flex-1 text-xs font-bold text-primary leading-none">
        Rightboat AI pre-filled {count} field{count !== 1 ? "s" : ""}
      </p>

      <button
        type="button"
        onClick={onDismiss}
        aria-label="Dismiss AI banner"
        className="shrink-0 flex items-center justify-center w-6 h-6 rounded-lg text-primary/60 hover:text-primary hover:bg-primary/10 transition-colors"
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
