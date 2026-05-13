"use client"

import * as React from "react"
import { createPortal } from "react-dom"

import { BdpContactSeller } from "@/components/boats/bdp/bdp-contact-seller"
import { MobileContactManufacturerSheet } from "@/components/mobile-app/mobile-contact-manufacturer-sheet"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type AppBdpContactManufacturerCtaProps = {
  price: string
  boatName: string
  sellerName: string
  sellerLocation: string
}

export function AppBdpContactManufacturerCta({
  price,
  boatName,
  sellerName,
  sellerLocation,
}: AppBdpContactManufacturerCtaProps) {
  const [open, setOpen] = React.useState(false)
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const bar = (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-[120] w-full",
        // Solid bottom bar (no floating chrome)
        "border-t border-border/60 bg-background",
        "pt-4"
      )}
    >
      <div className="px-[var(--mobile-margin)] pb-4">
        <div className="grid w-full grid-cols-[1fr_auto] items-center gap-4">
          <div className="min-w-0">
            <p className="truncate text-[15px] font-semibold leading-snug text-foreground">
              {price}
            </p>
            <p className="truncate text-xs text-muted-foreground">{sellerName}</p>
          </div>
          <Button
            type="button"
            className="h-[48px] rounded-xl px-6 text-sm font-semibold"
            onClick={() => setOpen(true)}
          >
            Contact Manufacturer
          </Button>
        </div>
      </div>
      <div className="h-[env(safe-area-inset-bottom,0px)] bg-background" />
    </div>
  )

  return (
    <>
      {mounted ? createPortal(bar, document.body) : null}

      <MobileContactManufacturerSheet open={open} onOpenChange={setOpen} fullScreen>
        <BdpContactSeller
          price={price}
          boatName={boatName}
          sellerName={sellerName}
          sellerLocation={sellerLocation}
          showPrice={false}
        />
      </MobileContactManufacturerSheet>
    </>
  )
}

