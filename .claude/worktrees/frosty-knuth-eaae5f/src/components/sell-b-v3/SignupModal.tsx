"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Step1LPData } from "@/features/sell-boat/types-v3"
import { cn } from "@/lib/utils"

const STORAGE_KEY = "sell-b-v3-step1"

export interface SignupModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  step1Data: Step1LPData
}

/** Prototype: no real auth. On submit, stores data and navigates to wizard. */
export function SignupModal({
  open,
  onOpenChange,
  step1Data,
}: SignupModalProps) {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [fullName, setFullName] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim() || !password.trim()) return

    setIsSubmitting(true)
    try {
      // Prototype: store step1 data + signup data for wizard
      sessionStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          ...step1Data,
          signupEmail: email.trim(),
          signupFullName: fullName.trim(),
        })
      )
      onOpenChange(false)
      router.push("/sell-b-v3/wizard")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          "max-w-[calc(100vw-2rem)] sm:max-w-md w-[calc(100vw-2rem)] p-4 sm:p-6"
        )}
        aria-describedby={undefined}
      >
        <DialogTitle className="text-lg sm:text-xl">
          Create your account to continue
        </DialogTitle>
        <p className="text-sm text-muted-foreground mt-1">
          Sign up to complete your boat listing.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="signup-fullName">Full Name (optional)</Label>
            <Input
              id="signup-fullName"
              placeholder="John Doe"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="signup-email">Email *</Label>
            <Input
              id="signup-email"
              type="email"
              placeholder="john@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="signup-password">Password *</Label>
            <Input
              id="signup-password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
            />
          </div>

          <Button
            type="submit"
            className="w-full rounded-lg py-3"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Creating account..." : "Create account"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export { STORAGE_KEY }
