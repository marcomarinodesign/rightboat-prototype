"use client"

import Link from "next/link"
import * as React from "react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"

export function PropelExpertDialog({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  // UI-only form (no submission wiring yet)
  const [consent, setConsent] = React.useState(false)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-0">
        <div className="p-8">
          <DialogTitle className="text-2xl text-center">Contact Us to Switch and Save</DialogTitle>

          <div className="mt-6 space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <Input placeholder="First name" aria-label="First name" />
              <Input placeholder="Last name" aria-label="Last name" />
            </div>
            <Input placeholder="Company name" aria-label="Company name" />
            <Input placeholder="Email" aria-label="Email" type="email" />
            <Input placeholder="Phone number" aria-label="Phone number" />
            <Input placeholder="Country" aria-label="Country" />

            <p className="pt-2 text-sm leading-5 text-foreground">
              Rightboat Ltd is committed to protecting your privacy. We process and store your
              information to administer your account and provide the services you requested. We would
              also like to contact you about other services and content of interest. To consent,
              please tick below:
            </p>

            <div className="border-t border-border pt-4" />

            <label className="flex items-start gap-3">
              <Checkbox
                checked={consent}
                onCheckedChange={(v) => setConsent(Boolean(v))}
                aria-label="Consent"
              />
              <span className="text-sm leading-5 text-foreground">
                Yes, please keep me updated with news and special offers
              </span>
            </label>

            <p className="text-sm leading-5 text-foreground">
              You may unsubscribe at any time. To review our commitment to protecting your privacy,
              please visit our{" "}
              <Link className="underline" href="https://www.rightboat.com/privacy-policy" target="_blank">
                Privacy Policy
              </Link>
              .
            </p>

            <div className="pt-4 text-center">
              <Button className="h-12 w-full rounded-lg bg-[#0257fc] hover:bg-[#0257fc]/90 sm:w-[220px]">
                Talk to a Propel expert
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

