"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Sparkles } from "lucide-react"

import {
  listingsHref,
  useHomeSurface,
} from "@/components/home/home-surface-context"
import { Input } from "@/components/ui/input"
import {
  searchBarRowClass,
  SearchSubmitButton,
} from "@/components/search/search-submit-button"
import {
  CONVERSATIONAL_SEARCH_HEADING,
  CONVERSATIONAL_SEARCH_PLACEHOLDER,
  ROTATING_PLACEHOLDERS,
  SUGGESTED_SEARCH_CHIPS,
  SUGGESTED_SEARCH_PROMPT,
} from "@/lib/conversational-search/examples"
import { cn } from "@/lib/utils"

type ConversationalSearchFieldProps = {
  variant?: "hero" | "srp"
  defaultQuery?: string
  showSuggestions?: boolean
  showHeading?: boolean
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
  showHeading,
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
  const headingVisible = showHeading ?? isHero
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
      {headingVisible ? (
        <p className="text-lg font-semibold leading-6 text-foreground">
          {CONVERSATIONAL_SEARCH_HEADING}
        </p>
      ) : null}
      <form
        className={searchBarRowClass}
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
            className="pl-10"
          />
        </div>
        <SearchSubmitButton submitting={submitting}>
          {isHero ? "Search boats" : "AI Search"}
        </SearchSubmitButton>
      </form>
      {suggestionsVisible ? (
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">
            {SUGGESTED_SEARCH_PROMPT}
          </p>
          <div className="flex flex-col gap-2">
            {SUGGESTED_SEARCH_CHIPS.map((example) => (
              <button
                key={example.query}
                type="button"
                onClick={() => {
                  setQuery(example.query)
                  submit(example.query)
                }}
                className="rounded-lg border border-border bg-background px-3.5 py-2.5 text-left text-sm leading-5 text-foreground transition-colors duration-[var(--transition-duration-normal)] hover:border-primary hover:bg-tag-bg"
              >
                {example.label}
              </button>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  )
}
