"use client"

import * as React from "react"
import { AnimatePresence, motion } from "framer-motion"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"

const sheetTransition = {
  duration: 0.38,
  ease: [0.34, 1.56, 0.64, 1] as const,
}

type MobileContactManufacturerSheetProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  children: React.ReactNode
  fullScreen?: boolean
}

/** iOS-style full-screen sheet wrapper (same motion as `MobileFiltersSheet`). */
export function MobileContactManufacturerSheet({
  open,
  onOpenChange,
  children,
  fullScreen = false,
}: MobileContactManufacturerSheetProps) {
  const sheetRef = React.useRef<HTMLDivElement>(null)
  const [dragY, setDragY] = React.useState(0)
  const dragStart = React.useRef({ y: 0, origin: 0 })

  const handlePointerDown = (e: React.PointerEvent<HTMLButtonElement>) => {
    const el = e.currentTarget
    const pid = e.pointerId
    dragStart.current = { y: e.clientY, origin: dragY }
    el.setPointerCapture(pid)

    const onMove = (ev: PointerEvent) => {
      if (ev.pointerId !== pid) return
      const dy = ev.clientY - dragStart.current.y
      if (dy > 0) setDragY(dragStart.current.origin + dy)
    }
    const onUp = (ev: PointerEvent) => {
      if (ev.pointerId !== pid) return
      window.removeEventListener("pointermove", onMove)
      window.removeEventListener("pointerup", onUp)
      try {
        el.releasePointerCapture(pid)
      } catch {
        /* ignore */
      }
      const h = sheetRef.current?.getBoundingClientRect().height ?? 520
      const dy = ev.clientY - dragStart.current.y
      if (dy > h * 0.3) {
        setDragY(0)
        onOpenChange(false)
      } else {
        setDragY(0)
      }
    }
    window.addEventListener("pointermove", onMove)
    window.addEventListener("pointerup", onUp)
  }

  React.useEffect(() => {
    if (!open) setDragY(0)
  }, [open])

  return (
    <AnimatePresence>
      {open ? (
        <>
          <motion.button
            type="button"
            aria-label="Close contact form"
            className="fixed inset-0 z-[2200] bg-overlay-sheet backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => onOpenChange(false)}
          />
          <motion.div
            ref={sheetRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="mobile-contact-title"
            className={cn(
              "fixed inset-x-0 bottom-0 z-[2201] flex w-full flex-col overflow-hidden border border-border bg-card/95 text-foreground shadow-2xl backdrop-blur-xl backdrop-saturate-150",
              fullScreen ? "inset-y-0 rounded-none" : "rounded-t-[20px]"
            )}
            style={
              fullScreen ? { height: "100dvh", maxHeight: "100dvh" } : { height: "92%", maxHeight: "92vh" }
            }
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={sheetTransition}
          >
            <div
              className="flex min-h-0 flex-1 flex-col"
              style={
                dragY
                  ? { transform: `translateY(${dragY}px)`, willChange: "transform" }
                  : undefined
              }
            >
              <div className="flex shrink-0 flex-col items-center border-b border-border/60 pt-2">
                <button
                  type="button"
                  aria-label="Drag to close"
                  className="flex min-h-[44px] w-full flex-col items-center justify-center py-2"
                  onPointerDown={handlePointerDown}
                >
                  <span className="h-[5px] w-9 rounded-full bg-muted-foreground/35" />
                </button>
                <div className="grid w-full grid-cols-[44px_1fr_44px] items-center px-1 pb-2">
                  <button
                    type="button"
                    aria-label="Close"
                    className="flex h-11 w-11 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                    onClick={() => onOpenChange(false)}
                  >
                    <X className="h-4 w-4" aria-hidden />
                  </button>
                  <h2
                    id="mobile-contact-title"
                    className="text-center text-base font-semibold text-foreground"
                  >
                    Contact Manufacturer
                  </h2>
                  <span className="h-11 w-11" aria-hidden />
                </div>
              </div>

              <div className="min-h-0 flex-1 overflow-y-auto px-4 pb-4 pt-4 scrollbar-hide">
                {children}
              </div>
            </div>
          </motion.div>
        </>
      ) : null}
    </AnimatePresence>
  )
}

