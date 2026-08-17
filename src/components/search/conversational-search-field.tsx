"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"

import {
  listingsHref,
  useHomeSurface,
} from "@/components/home/home-surface-context"
import { Input } from "@/components/ui/input"
import {
  searchBarRowClass,
  SearchSubmitButton,
} from "@/components/search/search-submit-button"
import { SuggestedSearchCarousel } from "@/components/search/suggested-search-carousel"
import {
  CONVERSATIONAL_SEARCH_HEADING,
  CONVERSATIONAL_SEARCH_PLACEHOLDER,
  ROTATING_PLACEHOLDERS,
  SUGGESTED_SEARCH_PROMPT,
} from "@/lib/conversational-search/examples"
import { cn } from "@/lib/utils"

const HERO_PROCESSING_DELAY_MS = 650

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
    if (query.trim() || submitting) return
    const timer = window.setInterval(() => {
      setPlaceholderIndex((index) => (index + 1) % ROTATING_PLACEHOLDERS.length)
    }, 4000)
    return () => window.clearInterval(timer)
  }, [query, submitting])

  const placeholder = query.trim()
    ? CONVERSATIONAL_SEARCH_PLACEHOLDER
    : ROTATING_PLACEHOLDERS[placeholderIndex]

  const submit = (value: string) => {
    const trimmed = value.trim()
    if (!trimmed || submitting) return
    setSubmitting(true)
    const href = conversationalSearchHref(trimmed, listingsPath)
    if (!isHero) {
      router.push(href)
      return
    }
    window.setTimeout(() => {
      router.push(href)
    }, HERO_PROCESSING_DELAY_MS)
  }

  return (
    <div className={cn("space-y-4 text-left", className)}>
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
        <Input
          id={inputId}
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={placeholder}
          autoComplete="off"
          disabled={submitting}
          className="min-w-0 flex-1 truncate"
        />
        <SearchSubmitButton submitting={submitting} icon="ai">
          {submitting ? "Loading" : isHero ? "Search boats" : "AI Search"}
        </SearchSubmitButton>
      </form>
      {submitting && isHero ? (
        <div
          className="flex w-full items-center justify-center gap-6 rounded-lg border border-border bg-tag-bg px-6 py-4 md:px-16"
          aria-live="polite"
        >
          <Loader2 className="size-4 animate-spin text-foreground" aria-hidden />
          <p className="text-sm font-bold leading-5 text-foreground">
            Understanding your search…
          </p>
        </div>
      ) : suggestionsVisible ? (
        <div className="flex flex-col items-center gap-4">
          <p className="text-center text-xs leading-4 text-muted-foreground">
            {SUGGESTED_SEARCH_PROMPT}
          </p>
          <SuggestedSearchCarousel
            onSelect={(exampleQuery) => {
              setQuery(exampleQuery)
              submit(exampleQuery)
            }}
          />
        </div>
      ) : null}
    </div>
  )
}
