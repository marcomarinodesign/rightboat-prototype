"use client"

import type { ReactNode } from "react"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"

type BdpRightPanelProps = {
  title: string
  summary?: string
  children?: ReactNode
}

export function BdpRightPanel({ title, summary, children }: BdpRightPanelProps) {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <div
        onClick={() => setOpen(true)}
        className="flex w-full items-center justify-between rounded-lg bg-background px-3 py-3 text-left shadow-sm ring-1 ring-border/60 transition hover:bg-muted/50"
      >
        <div className="space-y-1">
          <p className="text-sm font-semibold text-foreground">{title}</p>
          {summary ? (
            <p className="text-sm text-muted-foreground line-clamp-1">
              {summary}
            </p>
          ) : null}
        </div>
        <Button
          type="button"
          size="icon"
          className="h-8 w-8 rounded-full"
          aria-label={`Open ${title}`}
        >
          →
        </Button>
      </div>

      <SheetContent side="right" className="flex w-full max-w-xl flex-col gap-6">
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
        </SheetHeader>
        <div className="flex-1 overflow-y-auto text-sm text-muted-foreground">
          {children ?? (
            <p>
              Content for <span className="font-semibold">{title}</span> will be
              added here.
            </p>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}

