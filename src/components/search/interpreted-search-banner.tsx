"use client"

import { Loader2, X } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { SUGGESTED_SEARCHES } from "@/lib/conversational-search/examples"
import {
  broadenSuggestions,
  conversationalChipIsActive,
  type ConversationalParseResult,
} from "@/lib/conversational-search"
import type { InterpretedChip } from "@/lib/conversational-search/types"
import type { FiltersState } from "@/components/filters/types"
import { cn } from "@/lib/utils"

type InterpretedSearchBannerProps = {
  result: ConversationalParseResult
  filters: FiltersState
  resultCount: number
  processing?: boolean
  onRemoveChip: (chip: InterpretedChip) => void
  onSuggestedSearch: (query: string) => void
}

export function InterpretedSearchBanner({
  result,
  filters,
  resultCount,
  processing = false,
  onRemoveChip,
  onSuggestedSearch,
}: InterpretedSearchBannerProps) {
  const activeChips = result.chips.filter((chip) =>
    conversationalChipIsActive(chip, filters)
  )
  const listingCountLabel = `${resultCount} matching ${resultCount === 1 ? "boat" : "boats"}`

  if (processing) {
    return (
      <div
        className="flex items-center gap-3 rounded-lg border border-border/60 bg-tag-bg px-4 py-3"
        aria-live="polite"
      >
        <Loader2 className="h-4 w-4 animate-spin text-primary" aria-hidden />
        <p className="text-sm font-medium text-foreground">
          Understanding your search…
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-3 rounded-lg border border-border/60 bg-muted/20 px-4 py-4">
      <div className="space-y-2">
        <p className="text-sm font-semibold text-foreground">
          We understood your search as:
        </p>
        {activeChips.length > 0 ? (
          <div className="flex flex-wrap items-center gap-1.5">
            {activeChips.map((chip) => (
              <Badge
                key={chip.id}
                className={cn(
                  "gap-1.5 border border-primary bg-background pr-1 text-[13px] font-medium text-primary hover:bg-primary/5",
                  chip.source === "description" && "border-dashed"
                )}
              >
                <span>{chip.label}</span>
                <button
                  type="button"
                  onClick={() => onRemoveChip(chip)}
                  className="rounded-full p-1 text-primary/80 transition hover:bg-primary/10 hover:text-primary"
                  aria-label={`Remove ${chip.label}`}
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">
            Filters from this search were cleared. Adjust the sidebar or try a
            new description.
          </p>
        )}
      </div>

      {result.unmatched.length > 0 ? (
        <p className="text-sm text-muted-foreground">
          We couldn&apos;t interpret{" "}
          <span className="font-medium text-foreground">
            {result.unmatched.map((item) => `“${item}”`).join(", ")}
          </span>
          . Refine that part, or keep browsing with what we understood.
        </p>
      ) : null}

      <p className="text-sm font-medium text-foreground">
        Showing {listingCountLabel}
      </p>

      {result.hasDescriptionBased && activeChips.some((chip) => chip.source === "description") ? (
        <p className="text-xs text-muted-foreground">
          Some requirements are based on listing descriptions and specifications,
          not only standard filters.
        </p>
      ) : null}

      {resultCount === 0 ? (
        <div className="space-y-2 border-t border-border/60 pt-3">
          <p className="text-sm font-semibold text-foreground">
            No boats match this search
          </p>
          <p className="text-sm text-muted-foreground">
            Try broadening it:
          </p>
          <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
            {broadenSuggestions(result).map((suggestion) => (
              <li key={suggestion}>{suggestion}</li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-2 pt-1">
            {SUGGESTED_SEARCHES.slice(0, 3).map((example) => (
              <Button
                key={example}
                type="button"
                variant="outline"
                size="sm"
                className="h-auto whitespace-normal py-1.5 text-left text-xs"
                onClick={() => onSuggestedSearch(example)}
              >
                {example}
              </Button>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  )
}
