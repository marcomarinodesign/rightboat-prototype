"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

function formatCardNumber(raw: string): string {
  const digits = raw.replace(/\D/g, "").slice(0, 16)
  return digits.replace(/(.{4})/g, "$1 ").trim()
}

function formatExpiry(raw: string): string {
  const digits = raw.replace(/\D/g, "").slice(0, 4)
  if (digits.length >= 3) return `${digits.slice(0, 2)}/${digits.slice(2)}`
  return digits
}

function detectCardBrand(number: string): "visa" | "mastercard" | null {
  const first = number.replace(/\s/g, "")[0]
  if (first === "4") return "visa"
  if (first === "5") return "mastercard"
  return null
}

export function MockCardForm() {
  const [cardNumber, setCardNumber] = useState("")
  const [expiry, setExpiry] = useState("")
  const [cvc, setCvc] = useState("")
  const [cardholderName, setCardholderName] = useState("")
  const [touched, setTouched] = useState<Record<string, boolean>>({})

  const brand = detectCardBrand(cardNumber)

  const touch = (field: string) =>
    setTouched((prev) => ({ ...prev, [field]: true }))

  const errors = {
    cardNumber:
      touched.cardNumber && cardNumber.replace(/\s/g, "").length < 16
        ? "Enter a valid 16-digit card number"
        : null,
    expiry:
      touched.expiry && expiry.length < 5
        ? "Enter a valid expiry date (MM/YY)"
        : null,
    cvc:
      touched.cvc && cvc.length < 3
        ? "Enter the 3-digit security code"
        : null,
    cardholderName:
      touched.cardholderName && cardholderName.trim().length < 2
        ? "Enter the name on your card"
        : null,
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="mock-card-number" className="text-sm font-semibold">
          Card number
        </Label>
        <div className="relative">
          <Input
            id="mock-card-number"
            type="text"
            inputMode="numeric"
            autoComplete="cc-number"
            placeholder="1234 5678 9012 3456"
            value={cardNumber}
            onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
            onBlur={() => touch("cardNumber")}
            className={cn(
              "pr-20",
              errors.cardNumber && "border-destructive focus-visible:ring-destructive"
            )}
          />
          {brand && (
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-muted-foreground uppercase tracking-wide">
              {brand === "visa" ? "VISA" : "MC"}
            </span>
          )}
        </div>
        {errors.cardNumber && (
          <p className="text-sm text-destructive mt-1">{errors.cardNumber}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-2">
          <Label htmlFor="mock-expiry" className="text-sm font-semibold">
            Expiry
          </Label>
          <Input
            id="mock-expiry"
            type="text"
            inputMode="numeric"
            autoComplete="cc-exp"
            placeholder="MM/YY"
            value={expiry}
            onChange={(e) => setExpiry(formatExpiry(e.target.value))}
            onBlur={() => touch("expiry")}
            className={cn(
              errors.expiry && "border-destructive focus-visible:ring-destructive"
            )}
          />
          {errors.expiry && (
            <p className="text-sm text-destructive mt-1">{errors.expiry}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="mock-cvc" className="text-sm font-semibold">
            CVC
          </Label>
          <Input
            id="mock-cvc"
            type="text"
            inputMode="numeric"
            autoComplete="cc-csc"
            placeholder="123"
            maxLength={4}
            value={cvc}
            onChange={(e) => setCvc(e.target.value.replace(/\D/g, "").slice(0, 4))}
            onBlur={() => touch("cvc")}
            className={cn(
              errors.cvc && "border-destructive focus-visible:ring-destructive"
            )}
          />
          {errors.cvc && (
            <p className="text-sm text-destructive mt-1">{errors.cvc}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="mock-name" className="text-sm font-semibold">
          Name on card
        </Label>
        <Input
          id="mock-name"
          type="text"
          autoComplete="cc-name"
          placeholder="James Taylor"
          value={cardholderName}
          onChange={(e) => setCardholderName(e.target.value)}
          onBlur={() => touch("cardholderName")}
          className={cn(
            errors.cardholderName && "border-destructive focus-visible:ring-destructive"
          )}
        />
        {errors.cardholderName && (
          <p className="text-sm text-destructive mt-1">{errors.cardholderName}</p>
        )}
      </div>
    </div>
  )
}
