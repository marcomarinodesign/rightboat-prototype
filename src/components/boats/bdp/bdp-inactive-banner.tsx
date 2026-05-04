"use client"

import { Info } from "lucide-react"

import { Button } from "@/components/ui/button"

export function BdpInactiveBanner() {
  function scrollToSimilar() {
    document.getElementById("similar-boats")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className="-mt-4 sticky top-16 z-40 border-b border-border/60 bg-status-warning-100 lg:top-[84px]">
      <div className="mx-auto flex min-h-14 w-full max-w-7xl flex-wrap items-center justify-between gap-x-4 gap-y-2 px-4 py-2 sm:px-6 lg:px-8">
        <div className="flex min-w-0 items-center gap-3">
          <Info className="h-5 w-5 shrink-0 text-primary" aria-hidden />
          <div className="min-w-0 space-y-1">
            <p className="text-base font-bold text-foreground">This boat has been sold</p>
            <p className="text-sm text-muted-foreground">
              But we&apos;ve found similar options that might interest you
            </p>
          </div>
        </div>
        <Button
          size="sm"
          variant="outline"
          className="min-h-[44px] shrink-0"
          onClick={scrollToSimilar}
        >
          See similar boats ↓
        </Button>
      </div>
    </div>
  )
}
