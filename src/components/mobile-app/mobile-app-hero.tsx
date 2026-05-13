"use client"

import * as React from "react"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"

import { cn } from "@/lib/utils"
import { useMobileFrameScroll } from "@/components/mobile-app/mobile-frame-scroll-context"

export type AppBreadcrumbItem = {
  label: string
  href?: string
}

export type MobileAppHeroProps = {
  /** Hierarchy trail; segments with `href` are links, without are plain text (often the current section). */
  breadcrumb?: AppBreadcrumbItem[]
  title: React.ReactNode
  subtitle?: React.ReactNode
  /** Homepage / marketing variant: no card chrome, looser spacing. */
  variant?: "default" | "home"
  /** Optional row under subtitle (e.g. Filters / Sort). */
  accessories?: React.ReactNode
  /** iOS-style back control (leading navigation). */
  back?: { label: string; href: string }
  /** Shrink large title after scroll (list-style screens). */
  collapsibleTitle?: boolean
  /** Collapse threshold in px (frame scroll container). */
  collapseScrollPx?: number
  className?: string
  children?: React.ReactNode
}

/**
 * Top-of-screen hero: back link, breadcrumb, large title, subtitle, and accessories
 * in one region (Apple HIG–aligned hierarchy; large title optional collapse on scroll).
 */
export function MobileAppHero({
  breadcrumb,
  title,
  subtitle,
  variant = "default",
  accessories,
  back,
  collapsibleTitle = false,
  collapseScrollPx = 28,
  className,
  children,
}: MobileAppHeroProps) {
  const { scrollTop } = useMobileFrameScroll()
  const compact = collapsibleTitle && scrollTop > collapseScrollPx
  const trail = breadcrumb ?? []

  return (
    <header
      className={cn(
        variant === "home"
          ? "px-0 pb-0 pt-4"
          : "rounded-2xl border border-border/60 bg-muted/20 px-4 pb-4 pt-3 shadow-sm backdrop-blur-md backdrop-saturate-150",
        className
      )}
    >
      {back ? (
        <div className="mb-2">
          <Link
            href={back.href}
            className="inline-flex min-h-[44px] min-w-[44px] items-center gap-0.5 py-1 text-[17px] font-normal leading-snug tracking-[-0.41px] text-primary [-webkit-tap-highlight-color:transparent] active:opacity-65"
          >
            <ChevronLeft className="size-[22px] shrink-0 opacity-90" strokeWidth={2.25} aria-hidden />
            <span className="max-w-[min(240px,70vw)] truncate">{back.label}</span>
          </Link>
        </div>
      ) : null}

      {trail.length > 0 ? (
        <nav aria-label="Breadcrumb" className="mb-2">
          <ol className="flex flex-wrap items-center gap-x-1 gap-y-0.5 text-[13px] leading-5 tracking-[-0.08px] text-muted-foreground">
            {trail.map((item, i) => {
              const isLast = i === trail.length - 1
              const content = item.href ? (
                <Link
                  href={item.href}
                  className="font-medium text-primary/90 underline-offset-2 [-webkit-tap-highlight-color:transparent] hover:underline active:opacity-70"
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  className={cn(
                    "font-medium",
                    isLast ? "text-foreground/85" : "text-muted-foreground"
                  )}
                  aria-current={isLast ? "page" : undefined}
                >
                  {item.label}
                </span>
              )
              return (
                <li key={`${item.label}-${i}`} className="flex items-center gap-x-1">
                  {i > 0 ? (
                    <span className="text-muted-foreground/50" aria-hidden>
                      /
                    </span>
                  ) : null}
                  {content}
                </li>
              )
            })}
          </ol>
        </nav>
      ) : null}

      <h1
        className={cn(
          "font-bold tracking-[-0.6px] text-foreground transition-[font-size,line-height] duration-200 ease-out",
          compact
            ? "text-[22px] leading-[1.2]"
            : variant === "home"
              ? "text-[40px] leading-[1.05] tracking-[-0.8px]"
              : "text-[28px] leading-[1.15] sm:text-[30px]"
        )}
      >
        {title}
      </h1>

      {subtitle ? (
        <div
          className={cn(
            variant === "home"
              ? "mt-2 text-[16px] leading-snug tracking-[-0.24px] text-muted-foreground"
              : "mt-1.5 text-[15px] leading-snug tracking-[-0.24px] text-muted-foreground transition-opacity duration-200",
            compact ? "opacity-90" : "opacity-100"
          )}
        >
          {subtitle}
        </div>
      ) : null}

      {accessories ? <div className="mt-4 flex flex-wrap items-center gap-2">{accessories}</div> : null}

      {children ? (
        <div className={cn(variant === "home" ? "mt-6" : "mt-4")}>{children}</div>
      ) : null}
    </header>
  )
}
