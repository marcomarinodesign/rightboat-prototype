"use client"

import { UseFormReturn, Controller } from "react-hook-form"
import { FSBOFormData } from "../../types-fsbo"
import { PasswordInput } from "@/components/fsbo/PasswordInput"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"

interface FSBOStep3YourDetailsProps {
  form: UseFormReturn<FSBOFormData>
}

export function FSBOStep3YourDetails({ form }: FSBOStep3YourDetailsProps) {
  const {
    register,
    control,
    watch,
    formState: { errors },
  } = form

  const email = watch("email")

  return (
    <div className="flex flex-col gap-4">
      {/* Title */}
      <h2 className="text-2xl font-bold tracking-tight text-foreground leading-8">Your details</h2>

      {/* Subtitle */}
      <p className="text-base text-foreground">
        So buyers can reach you — and to create your Rightboat account.
      </p>

      {/* ── Email (read-only) ── */}
      <div className="flex flex-col gap-1 pt-7">
        <Label className="text-sm font-bold text-foreground leading-5">Email</Label>
        <div className="flex items-center gap-2 h-11 px-3.5 rounded-xl border border-[#e4e5e9] bg-[#fafafa] text-sm">
          <LockIcon />
          <span className="truncate text-[#9699a0]">{email || "seller@example.com"}</span>
        </div>
        <p className="text-xs text-[#9699a0] pt-2">
          Entered at the start.{" "}
          <a
            href="/fsbo"
            className="text-primary hover:opacity-80 transition-opacity"
          >
            Change
          </a>
        </p>
      </div>

      {/* ── Full name ── */}
      <div className="flex flex-col gap-1 pt-7">
        <Label htmlFor="fullName" className="text-sm font-bold text-foreground leading-5">
          Full name
        </Label>
        <Input
          id="fullName"
          type="text"
          autoComplete="name"
          placeholder="e.g. James Taylor"
          {...register("fullName")}
        />
        {errors.fullName && (
          <p className="text-sm text-destructive">{errors.fullName.message}</p>
        )}
      </div>

      {/* ── Phone number ── */}
      <div className="flex flex-col gap-1 pt-7">
        <Label htmlFor="phone" className="text-sm font-bold text-foreground leading-5">
          Phone number
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
          <p className="text-sm text-destructive">{errors.phone.message}</p>
        )}
        <p className="text-xs text-[#9699a0] pt-2">
          Only shared with interested buyers — never displayed publicly.
        </p>
      </div>

      {/* ── Password ── */}
      <div className="flex flex-col gap-1 pt-7">
        <Label htmlFor="password" className="text-sm font-bold text-foreground leading-5">
          Create a password <span className="text-destructive">*</span>
        </Label>
        <PasswordInput
          id="password"
          placeholder="8+ characters"
          {...register("password")}
          error={errors.password?.message}
        />
        <p className="text-xs text-[#9699a0] pt-2">
          This creates your Rightboat account so you can manage your listing.
        </p>
      </div>

      {/* ── GDPR Consent ── */}
      <div className="pt-7">
        <Controller
          name="gdprConsent"
          control={control}
          render={({ field }) => (
            <div className="flex items-start gap-3">
              <Checkbox
                id="gdprConsent"
                checked={field.value === true}
                onCheckedChange={(checked) => field.onChange(checked === true)}
                className="mt-0.5 shrink-0"
              />
              <label
                htmlFor="gdprConsent"
                className="text-sm text-[#9699a0] leading-5 cursor-pointer"
              >
                I agree to Rightboat&apos;s{" "}
                <a
                  href="/terms"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline text-foreground hover:text-primary transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  Terms of Service
                </a>{" "}
                and{" "}
                <a
                  href="/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline text-foreground hover:text-primary transition-colors"
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
          <p className="text-sm text-destructive mt-2">{errors.gdprConsent.message}</p>
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
      className="shrink-0 text-[#9699a0]"
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
