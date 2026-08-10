"use client"

import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export interface WizardFooterProps {
  label: string
  onClick?: () => void
  isSubmit?: boolean
  disabled?: boolean
  isLoading?: boolean
  /** When provided, renders Back (left) + primary (right) layout */
  onBack?: () => void
  /** "Skip for now" link shown below the button row (step 2 only) */
  skipLabel?: string
  onSkip?: () => void
  /** Disclaimer text shown below the button row (step 4) */
  disclaimer?: string
  className?: string
}

export function WizardFooter({
  label,
  onClick,
  isSubmit = false,
  disabled = false,
  isLoading = false,
  onBack,
  skipLabel,
  onSkip,
  disclaimer,
  className,
}: WizardFooterProps) {
  const primaryButton = (
    <Button
      type={isSubmit ? "submit" : "button"}
      onClick={isSubmit ? undefined : onClick}
      disabled={disabled || isLoading}
      size="sm"
      className={onBack ? "flex-1" : "w-full"}
    >
      {isLoading ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          Please wait...
        </>
      ) : (
        label
      )}
    </Button>
  )

  return (
    <div className={cn("pt-7 flex flex-col gap-3", className)}>
      {onBack ? (
        <div className="flex justify-between items-center gap-4">
          <Button
            type="button"
            variant="tertiary"
            size="sm"
            onClick={onBack}
            className="flex-1"
          >
            Back
          </Button>
          {primaryButton}
        </div>
      ) : (
        primaryButton
      )}

      {skipLabel && onSkip && (
        <Button
          type="button"
          variant="link"
          size="sm"
          onClick={onSkip}
          className="w-full"
        >
          {skipLabel}
        </Button>
      )}

      {disclaimer && (
        <p className="text-sm text-muted-foreground text-center">{disclaimer}</p>
      )}
    </div>
  )
}
