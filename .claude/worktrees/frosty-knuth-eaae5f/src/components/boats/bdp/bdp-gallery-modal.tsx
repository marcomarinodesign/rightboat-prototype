"use client"

import * as React from "react"
import { ChevronLeft } from "lucide-react"
import Image from "next/image"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog"
import { BdpGreyPlaceholder } from "@/components/boats/bdp/bdp-grey-placeholder"
import { cn } from "@/lib/utils"

export type BdpGalleryVideo = {
  youtubeId: string
  title?: string
}

export type BdpGalleryModalProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  images: string[]
  videos?: BdpGalleryVideo[]
  /** Used for `<Image alt>` on each photo */
  alt: string
  /** Shown in the modal header (defaults to `alt`) */
  title?: string
  initialIndex?: number
  initialTab?: "photos" | "videos"
  /** If false, render only placeholders (no remote images). */
  showImages?: boolean
}

export function BdpGalleryModal({
  open,
  onOpenChange,
  images,
  videos = [],
  alt,
  title,
  initialIndex = 0,
  initialTab = "photos",
  showImages = true,
}: BdpGalleryModalProps) {
  const headerTitle = title ?? alt
  const photoRefs = React.useRef<(HTMLDivElement | null)[]>([])
  const scrollRootRef = React.useRef<HTMLDivElement>(null)
  const [tab, setTab] = React.useState<"photos" | "videos">(initialTab)
  const [activePhotoIndex, setActivePhotoIndex] = React.useState(0)

  const safeImages = images.filter(Boolean)
  const photoCount = safeImages.length
  const videoCount = videos.length

  React.useEffect(() => {
    if (!open) return
    setTab(videoCount === 0 ? "photos" : initialTab)
    const start = Math.min(Math.max(0, initialIndex), Math.max(0, photoCount - 1))
    setActivePhotoIndex(start)
    const id = window.requestAnimationFrame(() => {
      photoRefs.current[start]?.scrollIntoView({ block: "start", behavior: "auto" })
    })
    return () => window.cancelAnimationFrame(id)
  }, [open, initialTab, initialIndex, photoCount, videoCount])

  React.useEffect(() => {
    if (!open || tab !== "photos" || photoCount === 0) return
    const root = scrollRootRef.current
    if (!root) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting && e.intersectionRatio >= 0.2)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible?.target) {
          const idx = Number((visible.target as HTMLElement).dataset.photoIndex)
          if (!Number.isNaN(idx)) setActivePhotoIndex(idx)
        }
      },
      { root, rootMargin: "-8% 0px -8% 0px", threshold: [0.15, 0.35, 0.55, 0.75] }
    )

    photoRefs.current.forEach((el) => {
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [open, tab, photoCount, images])

  React.useEffect(() => {
    if (!open || tab !== "photos") return
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault()
        const next = Math.max(0, activePhotoIndex - 1)
        photoRefs.current[next]?.scrollIntoView({ block: "start", behavior: "smooth" })
        setActivePhotoIndex(next)
      } else if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault()
        const next = Math.min(photoCount - 1, activePhotoIndex + 1)
        photoRefs.current[next]?.scrollIntoView({ block: "start", behavior: "smooth" })
        setActivePhotoIndex(next)
      }
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [open, tab, activePhotoIndex, photoCount])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className={cn(
          "fixed inset-0 left-0 top-0 z-50 flex h-[100dvh] max-h-[100dvh] w-full max-w-none translate-x-0 translate-y-0 flex-col rounded-none border-0 p-0 shadow-none",
          "data-[state=closed]:zoom-out-100 data-[state=open]:zoom-in-100"
        )}
        aria-describedby={undefined}
      >
        <DialogTitle className="sr-only">{headerTitle} — gallery</DialogTitle>
        <DialogDescription className="sr-only">
          Browse all photos and videos for this listing.
        </DialogDescription>

        <div className="border-b border-border bg-background">
          <div className="mx-auto flex h-14 max-w-5xl items-center gap-3 px-4">
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-foreground transition-colors hover:bg-muted"
              aria-label="Close gallery"
            >
              <ChevronLeft className="h-5 w-5" aria-hidden />
            </button>
            <p className="min-w-0 flex-1 truncate text-center text-sm font-semibold text-foreground md:text-base">
              {headerTitle}
            </p>
            {tab === "photos" && photoCount > 0 ? (
              <span className="shrink-0 tabular-nums text-sm text-muted-foreground">
                {activePhotoIndex + 1} / {photoCount}
              </span>
            ) : (
              <span className="w-10 shrink-0" aria-hidden />
            )}
          </div>

          {videoCount > 0 ? (
            <div className="mx-auto flex max-w-5xl gap-1 border-t border-border/60 px-4">
              <button
                type="button"
                role="tab"
                aria-selected={tab === "photos"}
                onClick={() => setTab("photos")}
                className={cn(
                  "relative px-4 py-3 text-sm font-medium transition-colors",
                  tab === "photos"
                    ? "text-foreground after:absolute after:inset-x-2 after:bottom-0 after:h-0.5 after:rounded-full after:bg-primary"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                Photos ({photoCount})
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={tab === "videos"}
                onClick={() => setTab("videos")}
                className={cn(
                  "relative px-4 py-3 text-sm font-medium transition-colors",
                  tab === "videos"
                    ? "text-foreground after:absolute after:inset-x-2 after:bottom-0 after:h-0.5 after:rounded-full after:bg-primary"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                Videos ({videoCount})
              </button>
            </div>
          ) : null}
        </div>

        {tab === "photos" ? (
          <div
            ref={scrollRootRef}
            className="min-h-0 flex-1 overflow-y-auto overscroll-contain bg-muted/30"
          >
            <div className="mx-auto max-w-3xl space-y-4 px-4 py-6">
              {safeImages.map((src, i) => (
                <div
                  key={`${src}-${i}`}
                  ref={(el) => {
                    photoRefs.current[i] = el
                  }}
                  data-photo-index={i}
                  className="relative aspect-[3/2] w-full overflow-hidden rounded-xl bg-muted"
                >
                  {showImages ? (
                    <Image
                      src={src}
                      alt={
                        photoCount > 1 ? `${alt} (${i + 1} of ${photoCount})` : alt
                      }
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 768px"
                      priority={i <= 1}
                    />
                  ) : (
                    <BdpGreyPlaceholder />
                  )}
                  <span className="pointer-events-none absolute bottom-3 right-3 rounded-md bg-black/70 px-2 py-1 text-xs font-medium text-white">
                    {i + 1} / {photoCount}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain bg-muted/30">
            <div className="mx-auto max-w-3xl space-y-6 px-4 py-6">
              {videos.map((v, i) => (
                <div key={`${v.youtubeId}-${i}`} className="space-y-2">
                  {v.title ? (
                    <p className="text-sm font-medium text-foreground">{v.title}</p>
                  ) : null}
                  <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-muted">
                    <iframe
                      title={v.title ?? `Video ${i + 1}`}
                      src={`https://www.youtube.com/embed/${v.youtubeId}`}
                      className="absolute inset-0 h-full w-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
