"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
  emailSegmentOptions,
  type EmailSegmentId,
} from "@/data/email-monetization-mock"
import { getSponsorCategories } from "@/lib/email-targeting"

type ViewMode = "desktop" | "mobile"

const VIEW_MODES: { id: ViewMode; label: string; width: number }[] = [
  { id: "desktop", label: "Desktop", width: 600 },
  { id: "mobile", label: "Mobile", width: 375 },
]

export function EmailPreviewClient() {
  const [activeSegment, setActiveSegment] =
    React.useState<EmailSegmentId>("center-console")
  const [viewMode, setViewMode] = React.useState<ViewMode>("desktop")

  const segment =
    emailSegmentOptions.find((option) => option.id === activeSegment) ??
    emailSegmentOptions[0]

  const categories = getSponsorCategories(segment.props.context.boatType)
  const { width: previewWidth } =
    VIEW_MODES.find((m) => m.id === viewMode) ?? VIEW_MODES[0]

  return (
    <div className="min-h-screen bg-muted py-8">
      <div className="mx-auto max-w-[640px] space-y-6 px-4">
        <header className="space-y-2">
          <h1 className="text-lg font-bold text-foreground">
            Saved Search Email — Monetization Preview
          </h1>
          <p className="text-sm text-muted-foreground">
            Q2 2026 · 5 ad slots · React Email render
          </p>
        </header>

        {/* Segment + view-mode controls */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-2">
            {emailSegmentOptions.map((option) => (
              <Button
                key={option.id}
                type="button"
                variant={activeSegment === option.id ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveSegment(option.id)}
              >
                {option.label}
              </Button>
            ))}
          </div>

          {/* Mobile / Desktop toggle */}
          <div className="flex rounded-md border border-border overflow-hidden">
            {VIEW_MODES.map((mode) => (
              <button
                key={mode.id}
                type="button"
                onClick={() => setViewMode(mode.id)}
                className={cn(
                  "px-3 py-1.5 text-xs font-medium transition-colors",
                  viewMode === mode.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-background text-muted-foreground hover:bg-muted"
                )}
              >
                {mode.label} — {mode.width}px
              </button>
            ))}
          </div>
        </div>

        <p className="text-xs text-muted-foreground">
          Targeting for{" "}
          <span className="font-medium text-foreground">{segment.label}</span>:{" "}
          {categories.join(" + ")} · rendered with{" "}
          <span className="font-medium text-foreground">@react-email/render</span>
        </p>

        {/* Preview shell — shrinks to mobile width when toggled */}
        <div className="flex justify-center">
          <div
            style={{ width: previewWidth }}
            className="overflow-hidden rounded-lg border border-border-card bg-neutral-white shadow-md transition-[width] duration-300"
          >
            <iframe
              key={`${activeSegment}-${viewMode}`}
              title={`Email render — ${segment.label} (${viewMode})`}
              src={`/api/email-preview?segment=${activeSegment}${viewMode === "mobile" ? "&mobile=1" : ""}`}
              style={{ width: previewWidth }}
              className="block min-h-[1600px] border-0"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
