"use client"

import type { ReactNode } from "react"
import { Loader2, Search, Sparkles } from "lucide-react"

import { Button } from "@/components/ui/button"

type SearchSubmitButtonProps = {
  submitting?: boolean
  children?: ReactNode
  icon?: "ai" | "search"
}

export const searchBarRowClass =
  "flex flex-col gap-2 md:flex-row md:items-center md:gap-4"

export function SearchSubmitButton({
  submitting = false,
  children = "Search boats",
  icon = "search",
}: SearchSubmitButtonProps) {
  const Icon = icon === "ai" ? Sparkles : Search

  return (
    <Button
      type="submit"
      size="lg"
      className="w-full shrink-0 md:w-auto"
      disabled={submitting}
    >
      {submitting ? (
        <Loader2 className="animate-spin" aria-hidden />
      ) : (
        <Icon aria-hidden />
      )}
      {children}
    </Button>
  )
}
