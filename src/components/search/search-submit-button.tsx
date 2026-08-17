"use client"

import type { ReactNode } from "react"
import { Loader2, Search } from "lucide-react"

import { Button } from "@/components/ui/button"

type SearchSubmitButtonProps = {
  submitting?: boolean
  children?: ReactNode
}

export const searchBarRowClass =
  "flex flex-col gap-3 md:flex-row md:items-center"

export function SearchSubmitButton({
  submitting = false,
  children = "Search boats",
}: SearchSubmitButtonProps) {
  return (
    <Button
      type="submit"
      className="w-full shrink-0 md:w-auto"
      disabled={submitting}
    >
      {submitting ? (
        <Loader2 className="animate-spin" aria-hidden />
      ) : (
        <Search aria-hidden />
      )}
      {children}
    </Button>
  )
}
