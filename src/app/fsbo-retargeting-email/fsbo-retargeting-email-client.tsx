"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

type ViewMode = "desktop" | "mobile"

const VIEW_MODES: { id: ViewMode; label: string; width: number }[] = [
  { id: "desktop", label: "Desktop", width: 600 },
  { id: "mobile", label: "Mobile", width: 375 },
]

export function FsboRetargetingEmailPreviewClient() {
  const [viewMode, setViewMode] = React.useState<ViewMode>("desktop")

  const { width: previewWidth } =
    VIEW_MODES.find((m) => m.id === viewMode) ?? VIEW_MODES[0]

  return (
    <div className="min-h-screen bg-muted py-8">
      <div className="mx-auto max-w-[640px] space-y-6 px-4">
        <header className="space-y-2">
          <h1 className="text-lg font-bold text-foreground">
            FSBO Retargeting — Abandoned Wizard Email
          </h1>
          <p className="text-sm text-muted-foreground">
            Klaviyo / Mailchimp · HTML standalone · Handlebars variables
          </p>
        </header>

        {/* Controls */}
        <div className="flex items-center justify-between gap-3">
          {/* Subject line info */}
          <div className="space-y-1">
            <p className="text-xs font-medium text-foreground">Subject lines (A/B test)</p>
            <div className="space-y-0.5">
              <p className="text-xs text-muted-foreground">
                <span className="font-medium text-foreground">A:</span> Your boat listing is almost ready 🚤
              </p>
              <p className="text-xs text-muted-foreground">
                <span className="font-medium text-foreground">B:</span> {`{{first_name}}`}, you left something behind on Rightboat
              </p>
              <p className="text-xs text-muted-foreground">
                <span className="font-medium text-foreground">C:</span> {`Finish listing your {{boat_brand}} — buyers are waiting`}
              </p>
            </div>
          </div>

          {/* Desktop / Mobile toggle */}
          <div className="flex shrink-0 overflow-hidden rounded-md border border-border">
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
          Variables shown as{" "}
          <span className="font-mono font-medium text-foreground">{"{{placeholders}}"}</span>
          {" "}· Handlebars/Liquid syntax (Klaviyo-compatible) · Pure HTML, CSS inline
        </p>

        {/* Preview shell */}
        <div className="flex justify-center">
          <div
            style={{ width: previewWidth }}
            className="overflow-hidden rounded-lg border border-border bg-white shadow-md transition-[width] duration-300"
          >
            <iframe
              key={viewMode}
              title={`FSBO Retargeting Email preview (${viewMode})`}
              src="/emails/fsbo-retargeting-abandoned.html"
              style={{ width: previewWidth }}
              className="block min-h-[1800px] border-0"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
