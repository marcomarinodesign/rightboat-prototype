"use client"

import * as React from "react"
import { AnimatePresence, motion } from "framer-motion"

import { SegmentedControl } from "@/components/ui/segmented-control"
import { useHomeSurface } from "@/components/home/home-surface-context"
import {
  ClassicSearcher,
  ClassicSearcherSeoCopy,
} from "@/components/search/classic-searcher"
import { ConversationalSearchField } from "@/components/search/conversational-search-field"
import { easeOutExpo } from "@/lib/motion-variants"
import { cn } from "@/lib/utils"

const SEARCH_MODE_OPTIONS = [
  { label: "AI Search", value: "ai" },
  { label: "Make, model & location", value: "classic" },
] as const

type SearchMode = (typeof SEARCH_MODE_OPTIONS)[number]["value"]

const searchPanelClass =
  "w-full rounded-2xl border border-neutral-200 bg-card p-5 shadow-[0_2px_6px_rgba(0,0,0,0.06)]"

export function HeroSearch() {
  const surface = useHomeSurface()
  const isApp = surface === "app"
  const [mode, setMode] = React.useState<SearchMode>("classic")

  return (
    <div className="flex w-full flex-col items-center gap-4 md:gap-2">
      <SegmentedControl
        options={[...SEARCH_MODE_OPTIONS]}
        value={mode}
        onChange={(value) => setMode(value as SearchMode)}
        aria-label="Search mode"
      />

      <AnimatePresence mode="wait" initial={false}>
        {mode === "ai" ? (
          <motion.div
            key="ai"
            className={searchPanelClass}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: easeOutExpo }}
          >
            <ConversationalSearchField variant="hero" showHeading={false} />
          </motion.div>
        ) : (
          <motion.div
            key="classic"
            className={searchPanelClass}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: easeOutExpo }}
          >
            <ClassicSearcher />
            <ClassicSearcherSeoCopy />
          </motion.div>
        )}
      </AnimatePresence>

      {isApp ? null : (
        <div
          className={cn(
            "hidden w-full flex-col text-left text-sm leading-5 text-muted-foreground lg:flex"
          )}
        >
          <p>
            Rightboat is a global boat marketplace connecting buyers with
            trusted brokers and private sellers across the US, UK and
            international markets.
          </p>
          <p>
            Find boats for sale by type, manufacturer, condition, price or
            location using our advanced global boat search.
          </p>
        </div>
      )}
    </div>
  )
}
