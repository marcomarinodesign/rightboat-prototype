"use client"

import Image from "next/image"
import { RIGHTBOAT_LOGO } from "@/lib/brand"

export interface WizardProgressProps {
  step: number
  totalSteps: number
  stepName: string
  onClose?: () => void
  className?: string
}

export function WizardProgress({
  step,
  totalSteps,
  onClose,
}: WizardProgressProps) {
  return (
    <div className="flex flex-col gap-4 mb-0">
      {/* Logo row — logo left, Close right */}
      <div className="flex items-center justify-between">
        <Image
          src={RIGHTBOAT_LOGO.src}
          alt="Rightboat"
          width={RIGHTBOAT_LOGO.width}
          height={RIGHTBOAT_LOGO.height}
          className="h-[26px] w-auto object-contain"
          unoptimized
          priority
        />
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="text-base text-muted-foreground leading-[22px] hover:opacity-70 transition-opacity"
          >
            Close
          </button>
        )}
      </div>

      {/* 5-segment progress bar */}
      <div className="flex gap-1.5 h-1">
        {Array.from({ length: totalSteps }).map((_, i) => (
          <div
            key={i}
            className={[
              "flex-1 h-full rounded-sm transition-colors duration-300",
              i < step ? "bg-primary" : "bg-tag-bg",
            ].join(" ")}
          />
        ))}
      </div>

      {/* STEP X OF Y */}
      <p className="text-xs font-bold text-foreground leading-none">
        STEP {step} OF {totalSteps}
      </p>
    </div>
  )
}
