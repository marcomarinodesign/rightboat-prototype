"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Loader2, Search, Sparkles } from "lucide-react"

import {
  listingsHref,
  useHomeSurface,
} from "@/components/home/home-surface-context"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  CONVERSATIONAL_SEARCH_HEADING,
  CONVERSATIONAL_SEARCH_PLACEHOLDER,
  ROTATING_PLACEHOLDERS,
  SUGGESTED_SEARCH_CHIPS,
} from "@/lib/conversational-search/examples"
import { cn } from "@/lib/utils"

type ConversationalSearchFieldProps = {
  variant?: "hero" | "srp"
  defaultQuery?: string
  showSuggestions?: boolean
  listingsBasePath?: string
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
  listingsBasePath,
  className,
}: ConversationalSearchFieldProps) {
  const router = useRouter()
  const surface = useHomeSurface()
  const listingsPath =
    listingsBasePath ?? listingsHref("/boats-for-sale", surface)
  const [query, setQuery] = React.useState(defaultQuery)
  const [placeholderIndex, setPlaceholderIndex] = React.useState(0)
  const [submitting, setSubmitting] = React.useState(false)
  const suggestionsVisible = showSuggestions ?? variant === "hero"
  const isHero = variant === "hero"
  const inputId = `conversational-search-${variant}`

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
        <p className="text-lg font-semibold leading-6 text-foreground">
          {CONVERSATIONAL_SEARCH_HEADING}
        </p>
      ) : null}
      <form
        className="flex flex-col gap-2 sm:flex-row sm:items-center"
        onSubmit={(event) => {
          event.preventDefault()
          submit(query)
        }}
      >
        <label className="sr-only" htmlFor={inputId}>
          {CONVERSATIONAL_SEARCH_PLACEHOLDER}
        </label>
        <div className="relative min-w-0 flex-1">
          <Sparkles
            className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-primary"
            aria-hidden
          />
          <Input
            id={inputId}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={placeholder}
            autoComplete="off"
            className={cn(
              "rounded-lg border-border bg-background pl-10 text-sm",
              isHero ? "h-12 md:h-14 md:text-base" : "h-12"
            )}
          />
        </div>
        <Button
          type="submit"
          className={cn(
            "gap-2 font-semibold",
            isHero
              ? "h-12 min-h-12 w-full sm:h-14 sm:min-h-14 sm:w-auto sm:px-6"
              : "h-12 min-h-12 w-full sm:w-auto"
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
          {SUGGESTED_SEARCH_CHIPS.map((example) => (
            <button
              key={example.query}
              type="button"
              title={example.query}
              onClick={() => {
                setQuery(example.query)
                submit(example.query)
              }}
            >
              <Badge
                variant="outline"
                className="cursor-pointer rounded-full bg-background px-3 py-1.5 text-xs font-medium text-foreground transition-colors duration-[var(--transition-duration-normal)] hover:border-primary hover:bg-tag-bg hover:text-primary"
              >
                {example.label}
              </Badge>
            </button>
          ))}
        </div>
      ) : null}
    </div>
  )
}
