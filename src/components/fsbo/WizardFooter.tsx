"use client"

import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export interface WizardFooterProps {
  /** Primary CTA label */
  label: string
  /** Called on primary CTA click. If type="submit" is needed, set isSubmit=true. */
  onClick?: () => void
  /** If true, renders as type="submit" (for the last step form submission) */
  isSubmit?: boolean
  /** Disables the primary CTA */
  disabled?: boolean
  /** Shows a loading spinner inside the button */
  isLoading?: boolean
  /** Optional secondary text link below the button */
  secondaryLabel?: string
  /** Called when secondary link is clicked */
  onSecondary?: () => void
  className?: string
}

export function WizardFooter({
  label,
  onClick,
  isSubmit = false,
  disabled = false,
  isLoading = false,
  secondaryLabel,
  onSecondary,
  className,
}: WizardFooterProps) {
  return (
    <div
      className={cn(
        // Sticky at bottom, full bleed (compensate parent padding)
        "sticky bottom-0 z-20 bg-background",
        "-mx-4 px-4 sm:-mx-6 sm:px-6 md:-mx-8 md:px-8 lg:-mx-[68px] lg:px-[68px]",
        "border-t border-border pt-4",
        className
      )}
      style={{
        paddingBottom: "max(1.5rem, env(safe-area-inset-bottom, 0px))",
      }}
    >
      <Button
        type={isSubmit ? "submit" : "button"}
        onClick={isSubmit ? undefined : onClick}
        disabled={disabled || isLoading}
        size="lg"
        className="w-full rounded-xl text-base font-semibold h-[52px]"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Please wait...
          </>
        ) : (
          label
        )}
      </Button>

      {secondaryLabel && onSecondary && (
        <button
          type="button"
          onClick={onSecondary}
          className="w-full mt-3 text-sm text-muted-foreground hover:text-foreground transition-colors text-center"
        >
          {secondaryLabel}
        </button>
      )}
    </div>
  )
}
