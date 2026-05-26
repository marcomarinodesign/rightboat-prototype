"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
  emailSegmentOptions,
  type EmailSegmentId,
} from "@/data/email-monetization-mock"
import { getSponsorCategories } from "@/lib/email-targeting"

export function EmailPreviewClient() {
  const [activeSegment, setActiveSegment] =
    React.useState<EmailSegmentId>("center-console")

  const segment =
    emailSegmentOptions.find((option) => option.id === activeSegment) ??
    emailSegmentOptions[0]

  const categories = getSponsorCategories(segment.props.context.boatType)

  return (
    <div className="min-h-screen bg-muted py-8">
      <div className="mx-auto max-w-[640px] space-y-6 px-4">
        <header className="space-y-2">
          <h1 className="text-lg font-bold text-foreground">
            Saved Search Email — Monetization Preview
          </h1>
          <p className="text-sm text-muted-foreground">
            Q2 2026 · 7 ad slots · React Email render
          </p>
        </header>

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

        <p className="text-xs text-muted-foreground">
          Targeting for{" "}
          <span className="font-medium text-foreground">{segment.label}</span>:{" "}
          {categories.join(" + ")} · rendered with{" "}
          <span className="font-medium text-foreground">@react-email/render</span>
        </p>

        <div
          className={cn(
            "overflow-hidden rounded-lg border border-border-card bg-neutral-white shadow-md"
          )}
        >
          <iframe
            key={activeSegment}
            title={`Email render — ${segment.label}`}
            src={`/api/email-preview?segment=${activeSegment}`}
            className="block w-full min-h-[1600px] border-0"
          />
        </div>
      </div>
    </div>
  )
}
