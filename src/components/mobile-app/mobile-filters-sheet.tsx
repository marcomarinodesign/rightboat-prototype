"use client"

import * as React from "react"
import { AnimatePresence, motion } from "framer-motion"
import { X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { FiltersFormBody } from "@/components/filters/filters-form-body"
import { defaultFilters, type FiltersState } from "@/components/filters/types"
import type { Boat } from "@/data/boats"

const sheetTransition = {
  duration: 0.38,
  ease: [0.34, 1.56, 0.64, 1] as const,
}

type MobileFiltersSheetProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  filters: FiltersState
  onFiltersChange: React.Dispatch<React.SetStateAction<FiltersState>>
  onClearAll: () => void
  resultCount: number
  boats: Boat[]
  locationVariant?: "region-test"
}

/** App-only presentation: full-screen sheet + drag handle. Same filter fields as web `FiltersDrawer`. */
export function MobileFiltersSheet({
  open,
  onOpenChange,
  filters,
  onFiltersChange,
  onClearAll,
  resultCount,
  boats,
  locationVariant,
}: MobileFiltersSheetProps) {
  const sheetRef = React.useRef<HTMLDivElement>(null)
  const [dragY, setDragY] = React.useState(0)
  const dragStart = React.useRef({ y: 0, origin: 0 })
  const [draft, setDraft] = React.useState<FiltersState>(filters)

  React.useEffect(() => {
    if (open) setDraft(filters)
  }, [open, filters])

  const updateDraft = (field: keyof FiltersState, value: string | string[]) => {
    setDraft((prev) => ({ ...prev, [field]: value }))
  }

  const updateCondition = (key: "new" | "used", checked: boolean) => {
    setDraft((prev) => ({
      ...prev,
      condition: { ...prev.condition, [key]: checked },
    }))
  }

  const handleApply = () => {
    onFiltersChange(draft)
    onOpenChange(false)
  }

  const handleClearAll = () => {
    const cleared = { ...defaultFilters, condition: { ...defaultFilters.condition } }
    setDraft(cleared)
    onFiltersChange(cleared)
    onClearAll()
  }

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
            aria-label="Close filters"
            className="fixed inset-0 z-[2000] bg-overlay-sheet backdrop-blur-sm"
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
            aria-labelledby="mobile-filters-title"
            className={cn(
              "fixed inset-x-0 bottom-0 z-[2001] flex w-full flex-col overflow-hidden rounded-t-[20px] border border-border bg-card/95 text-foreground shadow-2xl backdrop-blur-xl backdrop-saturate-150"
            )}
            style={{ height: "88%", maxHeight: "88vh" }}
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
                <div className="grid w-full grid-cols-[44px_1fr_auto] items-center px-1 pb-2">
                  <button
                    type="button"
                    aria-label="Close"
                    className="flex h-11 w-11 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                    onClick={() => onOpenChange(false)}
                  >
                    <X className="h-4 w-4" aria-hidden />
                  </button>
                  <h2
                    id="mobile-filters-title"
                    className="text-center text-base font-semibold text-foreground"
                  >
                    Filters
                  </h2>
                  <button
                    type="button"
                    onClick={handleClearAll}
                    className="flex h-11 items-center px-2 text-sm text-muted-foreground underline-offset-2 hover:text-foreground hover:underline"
                  >
                    Clear all
                  </button>
                </div>
              </div>

              <FiltersFormBody
                draft={draft}
                boats={boats}
                updateDraft={updateDraft}
                updateCondition={updateCondition}
                scrollClassName="min-h-0 flex-1 overflow-y-auto px-4 pb-2 scrollbar-hide"
                locationVariant={locationVariant}
              />

              <div
                className="flex shrink-0 border-t border-border/60 bg-background/90 px-4 pt-3 backdrop-blur-md supports-[backdrop-filter]:bg-background/80"
                style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
              >
                <Button
                  type="button"
                  className="min-h-[52px] w-full font-bold"
                  onClick={handleApply}
                >
                  Show {resultCount} results
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      ) : null}
    </AnimatePresence>
  )
}
