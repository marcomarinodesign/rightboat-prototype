"use client"

import { UseFormReturn, Controller } from "react-hook-form"
import { FSBOFormData } from "../../types-fsbo"
import { PasswordInput } from "@/components/fsbo/PasswordInput"
import { PillGroup } from "@/components/ui/pill-group"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"

interface FSBOStep3YourDetailsProps {
  form: UseFormReturn<FSBOFormData>
}

const CONTACT_OPTIONS = [
  { label: "Phone", value: "phone" },
  { label: "Email", value: "email" },
  { label: "WhatsApp", value: "whatsapp" },
]

export function FSBOStep3YourDetails({ form }: FSBOStep3YourDetailsProps) {
  const {
    register,
    control,
    watch,
    formState: { errors },
  } = form

  const email = watch("email")

  return (
    <div className="space-y-7">
      {/* Step intro */}
      <div className="space-y-1">
        <h2 className="text-xl font-bold tracking-tight">Your details</h2>
        <p className="text-sm text-muted-foreground">
          So buyers can reach you — and to create your Rightboat account.
        </p>
      </div>

      {/* ── Email (read-only, pre-filled from LP) ── */}
      <div className="space-y-2">
        <Label htmlFor="email-display" className="text-sm font-semibold">
          Email
        </Label>
        <div className="flex items-center gap-2 h-11 px-3 rounded-lg border border-input bg-muted text-sm text-muted-foreground">
          <LockIcon />
          <span className="truncate">{email || "—"}</span>
        </div>
        <p className="text-xs text-muted-foreground">
          Entered at the start.{" "}
          <a
            href="/fsbo"
            className="underline text-primary hover:opacity-80 transition-opacity duration-[var(--transition-duration-fast)]"
          >
            Change
          </a>
        </p>
      </div>

      {/* ── Full Name ── */}
      <div className="space-y-2">
        <Label htmlFor="fullName" className="text-sm font-semibold">
          Full name <span className="text-destructive">*</span>
        </Label>
        <Input
          id="fullName"
          type="text"
          autoComplete="name"
          placeholder="e.g. James Taylor"
          {...register("fullName")}
        />
        {errors.fullName && (
          <p className="text-sm text-destructive mt-1">{errors.fullName.message}</p>
        )}
      </div>

      {/* ── Phone ── */}
      <div className="space-y-2">
        <Label htmlFor="phone" className="text-sm font-semibold">
          Phone number <span className="text-destructive">*</span>
        </Label>
        <Input
          id="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder="e.g. 07700 900123"
          {...register("phone")}
        />
        {errors.phone && (
          <p className="text-sm text-destructive mt-1">{errors.phone.message}</p>
        )}
        <p className="text-xs text-muted-foreground">
          Only shared with interested buyers — never displayed publicly.
        </p>
      </div>

      {/* ── Preferred Contact ── */}
      <div className="space-y-2">
        <Label className="text-sm font-semibold">
          Preferred contact method <span className="text-destructive">*</span>
        </Label>
        <Controller
          name="preferredContact"
          control={control}
          render={({ field }) => (
            <PillGroup
              options={CONTACT_OPTIONS}
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />
        {errors.preferredContact && (
          <p className="text-sm text-destructive mt-1">{errors.preferredContact.message}</p>
        )}
      </div>

      {/* ── Password ── */}
      <div className="space-y-2">
        <Label htmlFor="password" className="text-sm font-semibold">
          Create a password <span className="text-destructive">*</span>
        </Label>
        <PasswordInput
          id="password"
          placeholder="8+ characters"
          {...register("password")}
          error={errors.password?.message}
        />
        <p className="text-xs text-muted-foreground">
          This creates your Rightboat account so you can manage your listing.
        </p>
      </div>

      {/* ── GDPR Consent ── */}
      <div className="space-y-2">
        <Controller
          name="gdprConsent"
          control={control}
          render={({ field }) => (
            <div className="flex items-start gap-3">
              <Checkbox
                id="gdprConsent"
                checked={field.value === true}
                onCheckedChange={(checked) =>
                  field.onChange(checked === true ? true : false)
                }
                aria-describedby="gdpr-desc"
                className="mt-0.5 shrink-0"
              />
              <label
                htmlFor="gdprConsent"
                id="gdpr-desc"
                className="text-sm text-muted-foreground leading-relaxed cursor-pointer"
              >
                I agree to Rightboat&apos;s{" "}
                <a
                  href="/terms"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline text-foreground hover:text-primary transition-colors duration-[var(--transition-duration-fast)]"
                  onClick={(e) => e.stopPropagation()}
                >
                  Terms of Service
                </a>{" "}
                and{" "}
                <a
                  href="/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline text-foreground hover:text-primary transition-colors duration-[var(--transition-duration-fast)]"
                  onClick={(e) => e.stopPropagation()}
                >
                  Privacy Policy
                </a>
                . My contact details will only be shared with genuine buyers.
              </label>
            </div>
          )}
        />
        {errors.gdprConsent && (
          <p className="text-sm text-destructive mt-1">{errors.gdprConsent.message}</p>
        )}
      </div>
    </div>
  )
}

function LockIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden="true"
      className="shrink-0 text-muted-foreground"
    >
      <rect x="2" y="6" width="10" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
      <path
        d="M4.5 6V4.5a2.5 2.5 0 0 1 5 0V6"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  )
}
