"use client"

import { UseFormReturn } from "react-hook-form"
import { BoatFormData } from "../types"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { UserCircle, Shield, Award, ThumbsUp, Lock } from "lucide-react"

interface StepThreeProps {
  form: UseFormReturn<BoatFormData>
}

const CONTACT_METHODS = ["Phone", "Email", "WhatsApp"] as const

const TRUST_ITEMS = [
  { icon: Award, text: "Free valuation" },
  { icon: ThumbsUp, text: "No obligation" },
  { icon: Lock, text: "Secure process" },
  { icon: Shield, text: "Trusted by boat owners" },
]

const StepThree = ({ form }: StepThreeProps) => {
  const { register, formState: { errors }, setValue, watch } = form
  const preferredContact = watch("preferredContact")
  const gdprConsent = watch("gdprConsent")

  return (
    <div className="space-y-5">
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-muted mb-3">
          <UserCircle className="w-6 h-6 text-primary" />
        </div>
        <h2 className="text-2xl font-bold text-foreground">Your Contact Details</h2>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="fullName">Full Name</Label>
        <Input id="fullName" placeholder="John Doe" {...register("fullName")} />
        {errors.fullName && <p className="text-sm text-destructive">{errors.fullName.message}</p>}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" placeholder="john@example.com" {...register("email")} />
        {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="phone">Phone</Label>
        <Input id="phone" type="tel" placeholder="+34 600 000 000" {...register("phone")} />
        {errors.phone && <p className="text-sm text-destructive">{errors.phone.message}</p>}
      </div>

      <div className="space-y-1.5">
        <Label>Preferred Contact Method</Label>
        <div className="grid grid-cols-3 gap-2">
          {CONTACT_METHODS.map((method) => (
            <button
              key={method}
              type="button"
              onClick={() => setValue("preferredContact", method, { shouldValidate: true })}
              className={`p-3 rounded-lg border-2 text-sm font-medium transition-all ${
                preferredContact === method
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card text-foreground hover:border-primary/50"
              }`}
            >
              {method}
            </button>
          ))}
        </div>
        {errors.preferredContact && (
          <p className="text-sm text-destructive">{errors.preferredContact.message}</p>
        )}
      </div>

      <label className="flex items-start gap-3 p-4 rounded-lg bg-muted cursor-pointer">
        <Checkbox
          checked={gdprConsent === true}
          onCheckedChange={(v) =>
            setValue("gdprConsent", v === true ? true : (undefined as unknown as true), {
              shouldValidate: true,
            })
          }
          className="mt-0.5"
        />
        <span className="text-sm text-foreground">
          I agree to the processing of my personal data in accordance with the{" "}
          <span className="underline font-medium">Privacy Policy</span>. *
        </span>
      </label>
      {errors.gdprConsent && (
        <p className="text-sm text-destructive">{errors.gdprConsent.message}</p>
      )}

      <div className="grid grid-cols-2 gap-3 pt-4">
        {TRUST_ITEMS.map(({ icon: Icon, text }) => (
          <div key={text} className="flex items-center gap-2 p-3 rounded-lg bg-muted">
            <Icon className="w-4 h-4 text-primary shrink-0" />
            <span className="text-sm font-medium text-foreground">{text}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default StepThree
