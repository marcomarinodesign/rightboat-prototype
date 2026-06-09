"use client"

import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface PasswordInputProps
  extends Omit<React.ComponentProps<typeof Input>, "type"> {
  error?: string
}

export function PasswordInput({ error, className, ...props }: PasswordInputProps) {
  const [show, setShow] = useState(false)

  return (
    <div className="space-y-1">
      <div className="relative">
        <Input
          type={show ? "text" : "password"}
          autoComplete="new-password"
          className={cn("pr-11", className)}
          {...props}
        />

        <button
          type="button"
          onClick={() => setShow((v) => !v)}
          aria-label={show ? "Hide password" : "Show password"}
          className={cn(
            "absolute right-3 top-1/2 -translate-y-1/2",
            "flex items-center justify-center w-6 h-6 rounded-lg",
            "text-muted-foreground hover:text-foreground",
            "transition-colors duration-[var(--transition-duration-fast)]"
          )}
        >
          {show ? (
            <EyeOff size={16} aria-hidden="true" />
          ) : (
            <Eye size={16} aria-hidden="true" />
          )}
        </button>
      </div>

      {error && (
        <p className="text-sm text-destructive mt-1">{error}</p>
      )}
    </div>
  )
}
