"use client"

import { AnimatePresence, motion } from "framer-motion"
import { Loader2, Pencil, X } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { FiltersState } from "@/components/filters/types"
import { SUGGESTED_SEARCH_CHIPS } from "@/lib/conversational-search/examples"
import {
  broadenActions,
  conversationalChipIsActive,
  type ConversationalParseResult,
} from "@/lib/conversational-search"
import type { BroadenAction } from "@/lib/conversational-search/parse-query"
import type { InterpretedChip } from "@/lib/conversational-search/types"
import { easeOutExpo } from "@/lib/motion-variants"
import { cn } from "@/lib/utils"

type InterpretedSearchBannerProps = {
  result: ConversationalParseResult
  filters: FiltersState
  resultCount: number
  processing?: boolean
  onRemoveChip: (chip: InterpretedChip) => void
  onEditChip?: (chip: InterpretedChip) => void
  onBroaden?: (action: BroadenAction) => void
  onSuggestedSearch: (query: string) => void
}

export function InterpretedSearchBanner({
  result,
  filters,
  resultCount,
  processing = false,
  onRemoveChip,
  onEditChip,
  onBroaden,
  onSuggestedSearch,
}: InterpretedSearchBannerProps) {
  const activeChips = result.chips.filter((chip) =>
    conversationalChipIsActive(chip, filters)
  )
  const listingCountLabel = `${resultCount} matching ${resultCount === 1 ? "boat" : "boats"}`
  const actions = broadenActions(filters)

  return (
    <AnimatePresence mode="wait">
      {processing ? (
        <motion.div
          key="processing"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.28, ease: easeOutExpo }}
          className="flex items-center gap-3 rounded-lg border border-border/60 bg-tag-bg px-4 py-3"
          aria-live="polite"
        >
          <Loader2 className="h-4 w-4 animate-spin text-primary" aria-hidden />
          <p className="text-sm font-medium text-foreground">
            Understanding your search…
          </p>
        </motion.div>
      ) : (
        <motion.div
          key="results"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.32, ease: easeOutExpo }}
          className="space-y-3 rounded-lg border border-border/60 bg-muted/20 px-4 py-4"
        >
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
                      "gap-1 border border-primary bg-background py-1 pr-1 pl-2.5 text-[13px] font-medium text-primary hover:bg-primary/5",
                      chip.source === "description" && "border-dashed"
                    )}
                  >
                    <button
                      type="button"
                      onClick={() => onEditChip?.(chip)}
                      className="inline-flex items-center gap-1.5 rounded-sm text-left"
                      aria-label={`Edit ${chip.label} filter`}
                    >
                      <span>{chip.label}</span>
                      {onEditChip ? (
                        <Pencil className="h-3 w-3 opacity-70" aria-hidden />
                      ) : null}
                    </button>
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
                Filters from this search were cleared. Adjust the sidebar or try
                a new description.
              </p>
            )}
          </div>

          {result.unmatched.length > 0 ? (
            <p className="text-sm text-muted-foreground">
              We couldn&apos;t interpret{" "}
              <span className="font-medium text-foreground">
                {result.unmatched.map((item) => `“${item}”`).join(", ")}
              </span>
              . Refine that part in the search field, or keep browsing with what
              we understood.
            </p>
          ) : null}

          <p className="text-sm font-medium text-foreground">
            Showing {listingCountLabel}
          </p>

          {result.hasDescriptionBased &&
          activeChips.some((chip) => chip.source === "description") ? (
            <p className="text-xs text-muted-foreground">
              Some requirements are based on listing descriptions and
              specifications, not only standard filters.
            </p>
          ) : null}

          {resultCount === 0 ? (
            <div className="space-y-3 border-t border-border/60 pt-3">
              <div>
                <p className="text-sm font-semibold text-foreground">
                  No boats match this search
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Try broadening it:
                </p>
              </div>
              {actions.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {actions.map((action) => (
                    <Button
                      key={action.id}
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => onBroaden?.(action)}
                    >
                      {action.label}
                    </Button>
                  ))}
                </div>
              ) : null}
              <div className="flex flex-wrap gap-2">
                {SUGGESTED_SEARCH_CHIPS.slice(0, 3).map((example) => (
                  <Button
                    key={example.query}
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-auto whitespace-normal py-1.5 text-left text-xs"
                    onClick={() => onSuggestedSearch(example.query)}
                  >
                    {example.label}
                  </Button>
                ))}
              </div>
            </div>
          ) : null}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
