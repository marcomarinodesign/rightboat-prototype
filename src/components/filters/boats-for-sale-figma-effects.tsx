"use client"

import * as React from "react"
import { toast } from "sonner"

import type { FigmaPreviewState } from "@/components/filters/figma-preview"

type BoatsForSaleFigmaEffectsProps = {
  figmaPreview?: FigmaPreviewState
}

/** Scroll / toast side-effects for Figma Mobile Overview capture. */
export function BoatsForSaleFigmaEffects({
  figmaPreview,
}: BoatsForSaleFigmaEffectsProps) {
  React.useEffect(() => {
    if (figmaPreview === "marketing-footer") {
      const el = document.getElementById("figma-marketing-footer")
      el?.scrollIntoView({ block: "start" })
    }
    if (figmaPreview === "save-search-toast") {
      toast.success(
        "Search saved. We'll notify you when new listings match."
      )
    }
  }, [figmaPreview])

  return null
}
