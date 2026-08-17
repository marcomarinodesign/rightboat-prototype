"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { FiltersFormBody } from "@/components/filters/filters-form-body"
import { defaultFilters, type FiltersState } from "@/components/filters/types"
import { useIsMobile } from "@/lib/use-media-query"
import type { Boat } from "@/data/boats"

type FiltersDrawerProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  filters: FiltersState
  onFiltersChange: React.Dispatch<React.SetStateAction<FiltersState>>
  onClearAll: () => void
  resultCount: number
  boats: Boat[]
  previewMode?: "mobile" | "desktop"
  /** Scroll filter form to Location section when drawer opens (Figma capture). */
  scrollOnOpen?: boolean
  /** Opt-in Location → Region tab (prototype: /boats-for-sale/regions). */
  enableRegions?: boolean
  locationVariant?: "region-test"
}

export function FiltersDrawer({
  open,
  onOpenChange,
  filters,
  onFiltersChange,
  onClearAll,
  resultCount,
  boats,
  previewMode,
  scrollOnOpen = false,
  enableRegions = false,
  locationVariant,
}: FiltersDrawerProps) {
  const isMobileQuery = useIsMobile()
  const isMobile =
    previewMode === "mobile"
      ? true
      : previewMode === "desktop"
        ? false
        : isMobileQuery
  const [draft, setDraft] = React.useState<FiltersState>(filters)

  React.useEffect(() => {
    if (open) setDraft(filters)
  }, [open, filters])

  React.useEffect(() => {
    if (!open || !scrollOnOpen) return
    const id = window.setTimeout(() => {
      const scrollEl = document.getElementById("filters-form-scroll")
      if (scrollEl) {
        scrollEl.scrollTop = scrollEl.scrollHeight * 0.35
      }
    }, 300)
    return () => window.clearTimeout(id)
  }, [open, scrollOnOpen])

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

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side={isMobile ? "bottom" : "right"}
        hideClose
        className={
          isMobile
            ? "flex h-[100dvh] max-h-[100dvh] flex-col rounded-none p-0"
            : "flex w-full flex-col p-0 sm:max-w-[440px]"
        }
      >
        <SheetHeader className="shrink-0 border-b border-border/60 px-2 py-1">
          <div className="grid grid-cols-[44px_1fr_auto] items-center">
            <SheetClose className="flex h-11 w-11 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
              <X className="h-4 w-4" aria-hidden />
              <span className="sr-only">Close</span>
            </SheetClose>
            <SheetTitle className="text-center text-base font-semibold">
              Filters
            </SheetTitle>
            <button
              type="button"
              onClick={handleClearAll}
              className="flex h-11 items-center px-3 text-sm text-muted-foreground underline-offset-2 hover:text-foreground hover:underline"
            >
              Clear all
            </button>
          </div>
        </SheetHeader>

        <FiltersFormBody
          draft={draft}
          boats={boats}
          updateDraft={updateDraft}
          updateCondition={updateCondition}
          enableRegions={enableRegions}
          locationVariant={locationVariant}
        />

        <div
          className="shrink-0 border-t border-border/60 px-6 pt-4"
          style={{ paddingBottom: "max(1rem, env(safe-area-inset-bottom))" }}
        >
          <Button className="w-full" size="lg" onClick={handleApply}>
            Show {resultCount} results
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}
