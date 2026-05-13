"use client"

import * as React from "react"

import {
  mobileAppBelowTopbarGapClass,
  mobileAppGutterXClass,
  mobileAppHeaderAfterTrailingClass,
} from "@/components/mobile-app/mobile-app-layout"
import { cn } from "@/lib/utils"

export type MobileNativePageHeaderProps = {
  /** Large title (second row when `topTrailing` is set). */
  title: React.ReactNode
  /** Optional typography override (e.g. long article titles). */
  titleClassName?: string
  /** Full-width body copy under the title. */
  description?: React.ReactNode
  /**
   * First row under the topbar: actions aligned right (icon-only), e.g. filter/sort.
   * Topbar already provides global menu + optional back.
   */
  topTrailing?: React.ReactNode
  /** Block below description (e.g. search module). */
  children?: React.ReactNode
  className?: string
}

const defaultTitleClass =
  "text-[40px] font-bold leading-[1.05] tracking-[-0.8px] text-foreground"

/**
 * Page content header below the sticky topbar: consistent gutters + gap from topbar on every tab.
 */
export function MobileNativePageHeader({
  title,
  titleClassName,
  description,
  topTrailing,
  children,
  className,
}: MobileNativePageHeaderProps) {
  return (
    <header
      className={cn(
        "w-full text-left",
        mobileAppGutterXClass,
        mobileAppBelowTopbarGapClass,
        className
      )}
    >
      {topTrailing ? (
        <div
          className={cn(
            "flex w-full justify-end",
            mobileAppHeaderAfterTrailingClass
          )}
        >
          {topTrailing}
        </div>
      ) : null}

      <h1 className={cn(defaultTitleClass, titleClassName)}>{title}</h1>

      {description ? (
        <div className="mt-2 w-full max-w-none text-[16px] leading-snug tracking-[-0.24px] text-muted-foreground">
          {description}
        </div>
      ) : null}

      {children ? <div className="mt-6">{children}</div> : null}
    </header>
  )
}

/** Glass pill wrapper for icon-only actions (shared chrome with homepage / SRP). */
export function MobileNativeToolbarPill({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-2 rounded-full border border-black/5 bg-white/85 p-1 shadow-[0_10px_40px_rgba(0,0,0,0.12)] backdrop-blur-xl",
        className
      )}
    >
      {children}
    </div>
  )
}
