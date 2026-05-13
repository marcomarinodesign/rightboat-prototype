"use client"

import Link from "next/link"
import { ChevronLeft, Menu } from "lucide-react"

import {
  mobileAppGutterXClass,
  mobileAppTopbarRowClass,
  mobileAppTopbarSafeTopClass,
} from "@/components/mobile-app/mobile-app-layout"
import { cn } from "@/lib/utils"

export type MobileNavBarProps = {
  /** Screen name for assistive tech (always present; not shown visually). */
  ariaTitle: string
  showBack?: boolean
  backHref?: string
  backLabel?: string
  onMenuClick?: () => void
  className?: string
}

/**
 * Unified app topbar: same safe-area, gutters, row height, and scroll chrome on every route.
 * Visual hierarchy lives in `MobileNativePageHeader` below; this bar only handles wayfinding.
 */
export function MobileNavBar({
  ariaTitle,
  showBack = false,
  backHref,
  backLabel,
  onMenuClick,
  className,
}: MobileNavBarProps) {
  return (
    <header
      className={cn(
        // Not fixed/sticky — scrolls with page content.
        "relative z-[10] w-full [-webkit-tap-highlight-color:transparent]",
        mobileAppTopbarSafeTopClass,
        "bg-transparent border-b border-transparent",
        className
      )}
    >
      <span className="sr-only">{ariaTitle}</span>
      <div
        className={cn(
          "flex w-full items-center justify-between gap-2",
          mobileAppGutterXClass,
          mobileAppTopbarRowClass
        )}
      >
        <div className="flex min-h-11 min-w-0 flex-1 items-center justify-start">
          {showBack && backHref && backLabel ? (
            <Link
              href={backHref}
              className="inline-flex min-h-11 min-w-11 max-w-[min(200px,55vw)] items-center gap-0.5 text-[17px] font-normal leading-snug tracking-tight text-primary [-webkit-tap-highlight-color:transparent] active:opacity-70"
            >
              <ChevronLeft className="size-6 shrink-0" aria-hidden />
              <span className="truncate">{backLabel}</span>
            </Link>
          ) : (
            <span className="min-h-11 min-w-11 shrink-0" aria-hidden />
          )}
        </div>

        <div className="flex min-h-11 shrink-0 items-center justify-end">
          <button
            type="button"
            aria-label="Menu"
            className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-sm transition-transform active:scale-[0.97] [-webkit-tap-highlight-color:transparent]"
            onClick={onMenuClick}
          >
            <Menu className="size-[18px]" aria-hidden />
          </button>
        </div>
      </div>
    </header>
  )
}
