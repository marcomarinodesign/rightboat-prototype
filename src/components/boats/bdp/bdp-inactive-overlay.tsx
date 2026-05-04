"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { ChevronDown, ChevronUp } from "lucide-react"

import { BdpInactiveSimilarCarousel } from "@/components/boats/bdp/bdp-inactive-similar-carousel"
import { easeOutExpo } from "@/lib/motion-variants"

type BdpInactiveOverlayProps = {
  boatType?: string
  title?: string
  subtitle?: string
  stage?: "half" | "full"
  onPromoteToFull?: () => void
  onBackToHalf?: () => void
}

export function BdpInactiveOverlay({
  boatType = "Powerboats",
  title = "This boat has been sold",
  subtitle = "But we've found similar options that might interest you",
  stage = "half",
  onPromoteToFull,
  onBackToHalf,
}: BdpInactiveOverlayProps) {
  const isFull = stage === "full"

  const sheetHeightClass = isFull
    ? "max-h-[calc(100vh-5rem)]"
    : "h-[25vh] max-h-[25vh]"

  // When expanded, we want the page underneath to be non-scrollable.
  // In the half state, we intentionally allow normal page scroll.
  React.useEffect(() => {
    if (!isFull) return

    const body = document.body
    const prevOverflow = body.style.overflow
    const prevPaddingRight = body.style.paddingRight

    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth

    if (scrollbarWidth > 0) body.style.paddingRight = `${scrollbarWidth}px`
    body.style.overflow = "hidden"

    return () => {
      body.style.overflow = prevOverflow
      body.style.paddingRight = prevPaddingRight
    }
  }, [isFull])

  return (
    <div className={`fixed inset-0 z-50 ${isFull ? "" : "pointer-events-none"}`}>
      {isFull ? (
        <motion.div
          className="absolute inset-0 bg-black/20 backdrop-blur-[2px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.22, ease: easeOutExpo }}
        />
      ) : null}

      <div className="relative flex h-full w-full items-end">
        <motion.div
          className={`pointer-events-auto flex w-full flex-col overflow-hidden rounded-t-[40px] border border-border/60 bg-background shadow-[0_-10px_40px_rgba(0,0,0,0.15)] ${sheetHeightClass}`}
          key={isFull ? "bdp-modal-full" : "bdp-modal-half"}
          layout
          initial={isFull ? { opacity: 0, y: 12 } : { opacity: 1, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.28, ease: easeOutExpo }}
        >
          <div className="border-b border-border/60 bg-status-warning-100">
            <div className="flex items-center justify-between gap-4 px-6 py-2">
              <div className="min-w-0 space-y-1">
                <p className="text-base font-bold text-foreground">{title}</p>
                <p className="text-sm leading-normal text-muted-foreground">{subtitle}</p>
              </div>

              <button
                type="button"
                onClick={isFull ? onBackToHalf : onPromoteToFull}
                disabled={isFull ? !onBackToHalf : !onPromoteToFull}
                className="inline-flex shrink-0 items-center gap-1 text-sm font-medium text-primary hover:text-primary/80 disabled:opacity-40"
              >
                See similar boats{" "}
                {isFull ? (
                  <ChevronUp className="inline h-4 w-4" aria-hidden />
                ) : (
                  <ChevronDown className="inline h-4 w-4" aria-hidden />
                )}
              </button>
            </div>
          </div>

          <div
            className={
              isFull
                ? "flex max-h-[calc(100vh-5rem-88px)] flex-col overflow-y-auto bg-background px-6 py-5"
                : "flex min-h-0 flex-1 flex-col overflow-hidden bg-background px-6 py-3"
            }
          >
            <BdpInactiveSimilarCarousel boatType={boatType} />
          </div>
        </motion.div>
      </div>
    </div>
  )
}

