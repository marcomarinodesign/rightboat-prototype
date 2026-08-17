"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Loader2, Search, Sparkles } from "lucide-react"

import {
  listingsHref,
  useHomeSurface,
} from "@/components/home/home-surface-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  CONVERSATIONAL_SEARCH_PLACEHOLDER,
  ROTATING_PLACEHOLDERS,
  SUGGESTED_SEARCHES,
} from "@/lib/conversational-search/examples"
import { cn } from "@/lib/utils"

type ConversationalSearchFieldProps = {
  variant?: "hero" | "srp"
  defaultQuery?: string
  showSuggestions?: boolean
  className?: string
}

export function conversationalSearchHref(query: string, basePath: string) {
  const trimmed = query.trim()
  if (!trimmed) return basePath
  const params = new URLSearchParams({ q: trimmed })
  return `${basePath}?${params.toString()}`
}

export function ConversationalSearchField({
  variant = "hero",
  defaultQuery = "",
  showSuggestions,
  className,
}: ConversationalSearchFieldProps) {
  const router = useRouter()
  const surface = useHomeSurface()
  const listingsPath = listingsHref("/boats-for-sale", surface)
  const [query, setQuery] = React.useState(defaultQuery)
  const [placeholderIndex, setPlaceholderIndex] = React.useState(0)
  const [submitting, setSubmitting] = React.useState(false)
  const suggestionsVisible = showSuggestions ?? variant === "hero"
  const isHero = variant === "hero"

  React.useEffect(() => {
    setQuery(defaultQuery)
  }, [defaultQuery])

  React.useEffect(() => {
    if (query.trim()) return
    const timer = window.setInterval(() => {
      setPlaceholderIndex((index) => (index + 1) % ROTATING_PLACEHOLDERS.length)
    }, 4000)
    return () => window.clearInterval(timer)
  }, [query])

  const placeholder = query.trim()
    ? CONVERSATIONAL_SEARCH_PLACEHOLDER
    : ROTATING_PLACEHOLDERS[placeholderIndex]

  const submit = (value: string) => {
    const trimmed = value.trim()
    if (!trimmed || submitting) return
    setSubmitting(true)
    router.push(conversationalSearchHref(trimmed, listingsPath))
  }

  return (
    <div className={cn("space-y-3 text-left", className)}>
      {isHero ? (
        <p className="text-sm font-semibold text-foreground">
          What kind of boat are you looking for?
        </p>
      ) : null}
      <form
        className={cn(
          "flex flex-col gap-2",
          isHero ? "sm:flex-row sm:items-center" : "sm:flex-row"
        )}
        onSubmit={(event) => {
          event.preventDefault()
          submit(query)
        }}
      >
        <label className="sr-only" htmlFor={`conversational-search-${variant}`}>
          Describe the boat you are looking for
        </label>
        <div className="relative min-w-0 flex-1">
          <Sparkles
            className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-primary"
            aria-hidden
          />
          <Input
            id={`conversational-search-${variant}`}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={placeholder}
            autoComplete="off"
            className={cn(
              "h-12 rounded-lg border-border bg-background pl-10 text-sm",
              isHero && "h-12 md:h-12"
            )}
          />
        </div>
        <Button
          type="submit"
          className={cn(
            "h-12 min-h-12 gap-2 font-semibold",
            isHero ? "w-full sm:w-auto sm:px-6" : "w-full sm:w-auto"
          )}
          disabled={submitting}
        >
          {submitting ? (
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
          ) : (
            <Search className="h-4 w-4" aria-hidden />
          )}
          {isHero ? "Search boats" : "AI Search"}
        </Button>
      </form>
      {suggestionsVisible ? (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs text-muted-foreground">Try:</span>
          {SUGGESTED_SEARCHES.map((example) => (
            <button
              key={example}
              type="button"
              onClick={() => {
                setQuery(example)
                submit(example)
              }}
              className="rounded-full border border-border bg-background px-3 py-1 text-left text-xs text-foreground transition-colors duration-[var(--transition-duration-normal)] hover:border-primary hover:bg-tag-bg"
            >
              {example}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  )
}
