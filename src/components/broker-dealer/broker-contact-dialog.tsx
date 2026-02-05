"use client"

import Link from "next/link"
import * as React from "react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"

export function BrokerContactDialog({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const [name, setName] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [company, setCompany] = React.useState("")
  const [consent, setConsent] = React.useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-0 max-w-md">
        <div className="p-8">
          <DialogTitle className="text-2xl text-center">
            Ask Us How to Switch and Save
          </DialogTitle>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div className="space-y-2">
              <Input
                placeholder="Your name"
                aria-label="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Input
                placeholder="Your email address"
                aria-label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Input
                placeholder="Your company name"
                aria-label="Company"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
              />
            </div>

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
              <Link
                className="underline text-primary"
                href="/privacy-policy"
                target="_blank"
              >
                Privacy Policy
              </Link>
              .
            </p>

            <div className="pt-4 text-center">
              <Button
                type="submit"
                className="h-12 w-full rounded-[12px] sm:w-[220px]"
              >
                Submit
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  )
}
