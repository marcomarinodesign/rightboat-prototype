"use client"

import * as React from "react"
import Link from "next/link"
import { AnimatePresence, motion } from "framer-motion"
import { X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const sheetTransition = {
  duration: 0.38,
  ease: [0.34, 1.56, 0.64, 1] as const,
}

type MenuItem = { name: string; href: string }

const primaryNav: MenuItem[] = [
  { name: "Boats for sale", href: "/app/boats-for-sale" },
  { name: "Power", href: "/app/boats-for-sale?type=power" },
  { name: "Sail", href: "/app/boats-for-sale?type=sail" },
  { name: "Research", href: "/app/research" },
]

const secondaryNav: MenuItem[] = [
  { name: "Propel Program", href: "/propel" },
  { name: "Membership", href: "/broker-dealer" },
]

type MobileMenuSheetProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

/** App-only nav: iOS-style full-screen sheet (same motion as `MobileFiltersSheet`). */
export function MobileMenuSheet({ open, onOpenChange }: MobileMenuSheetProps) {
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
            aria-label="Close menu"
            className="fixed inset-0 z-[2100] bg-overlay-sheet backdrop-blur-sm"
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
            aria-labelledby="mobile-menu-title"
            className={cn(
              "fixed inset-x-0 bottom-0 z-[2101] flex w-full flex-col overflow-hidden rounded-t-[20px] border border-border bg-card/95 text-foreground shadow-2xl backdrop-blur-xl backdrop-saturate-150"
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
                    id="mobile-menu-title"
                    className="text-center text-base font-semibold text-foreground"
                  >
                    Menu
                  </h2>
                  <span className="h-11 w-11" aria-hidden />
                </div>
              </div>

              <nav className="min-h-0 flex-1 overflow-y-auto px-4 pb-2 scrollbar-hide">
                <div className="py-4">
                  {primaryNav.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="block rounded-xl px-3 py-3 text-[17px] font-semibold text-foreground active:bg-muted/50 [-webkit-tap-highlight-color:transparent]"
                      onClick={() => onOpenChange(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>

                <div className="border-t border-border/60 py-4">
                  <p className="px-3 pb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    More
                  </p>
                  {secondaryNav.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="block rounded-xl px-3 py-3 text-[17px] font-semibold text-foreground active:bg-muted/50 [-webkit-tap-highlight-color:transparent]"
                      onClick={() => onOpenChange(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </nav>

              <div
                className="flex shrink-0 border-t border-border/60 bg-background/90 px-4 pt-3 backdrop-blur-md supports-[backdrop-filter]:bg-background/80"
                style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
              >
                <Button
                  asChild
                  className="min-h-[52px] w-full font-bold"
                  onClick={() => onOpenChange(false)}
                >
                  <Link href="/app/sell">Sell your boat</Link>
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      ) : null}
    </AnimatePresence>
  )
}

