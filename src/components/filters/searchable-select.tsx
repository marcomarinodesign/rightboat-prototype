"use client"

import * as React from "react"
import { ChevronDown, X, Search, Check } from "lucide-react"

import { cn } from "@/lib/utils"

type SelectOption = {
  label: string
  value: string
}

type SearchableSelectProps = {
  value?: string
  onValueChange: (value: string) => void
  options: SelectOption[]
  placeholder: string
  searchPlaceholder?: string
  /** @deprecated no longer applied; kept for API compatibility */
  triggerClassName?: string
}

/**
 * Inline combobox — renders a searchable list directly in the document flow
 * (no Radix portal / floating popover). Safe to use inside Sheet bottom-sheets
 * on mobile because it doesn't conflict with the virtual keyboard or focus traps.
 */
export function SearchableSelect({
  value,
  onValueChange,
  options,
  placeholder,
  searchPlaceholder = "Search",
}: SearchableSelectProps) {
  const [open, setOpen] = React.useState(false)
  const [query, setQuery] = React.useState("")
  const containerRef = React.useRef<HTMLDivElement>(null)
  const inputRef = React.useRef<HTMLInputElement>(null)

  const selectedOption = options.find((o) => o.value === value)

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return options
    return options.filter((o) => o.label.toLowerCase().includes(q))
  }, [options, query])

  const handleClose = () => {
    setOpen(false)
    setQuery("")
  }

  const handleOpen = () => {
    setOpen(true)
    // After the dropdown renders, focus the input and scroll it into view
    // so it stays visible even when the virtual keyboard is open.
    requestAnimationFrame(() => {
      inputRef.current?.focus()
      setTimeout(() => {
        inputRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" })
      }, 60)
    })
  }

  const handleSelect = (opt: SelectOption) => {
    onValueChange(opt.value)
    handleClose()
  }

  const handleClear = (e: React.MouseEvent | React.KeyboardEvent) => {
    e.stopPropagation()
    onValueChange("")
    handleClose()
  }

  // Close when clicking outside
  React.useEffect(() => {
    if (!open) return
    const handler = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        handleClose()
      }
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [open]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div ref={containerRef} className="relative">
      {/* ── Trigger ────────────────────────────────────────────────── */}
      <button
        type="button"
        onClick={() => (open ? handleClose() : handleOpen())}
        aria-expanded={open}
        aria-haspopup="listbox"
        className={cn(
          "flex h-11 w-full items-center justify-between rounded-lg border bg-background px-3.5 text-sm transition-colors",
          open
            ? "border-ring ring-2 ring-ring ring-offset-2"
            : "border-input hover:border-ring/60",
          selectedOption ? "text-foreground" : "text-muted-foreground"
        )}
      >
        <span className="truncate">{selectedOption?.label ?? placeholder}</span>

        <span className="ml-2 flex shrink-0 items-center gap-1">
          {selectedOption && (
            <span
              role="button"
              tabIndex={0}
              onClick={handleClear}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault()
                  handleClear(e)
                }
              }}
              className="flex h-6 w-6 items-center justify-center rounded-full text-muted-foreground hover:bg-muted hover:text-foreground"
              aria-label="Clear selection"
            >
              <X className="h-3.5 w-3.5" />
            </span>
          )}
          <ChevronDown
            className={cn(
              "h-4 w-4 text-muted-foreground transition-transform duration-200",
              open && "rotate-180"
            )}
            aria-hidden
          />
        </span>
      </button>

      {/* ── Inline dropdown (no portal) ─────────────────────────────── */}
      {open && (
        <div
          role="listbox"
          aria-label={placeholder}
          className="mt-1 overflow-hidden rounded-lg border border-border bg-background shadow-md"
        >
          {/* Search input */}
          <div className="border-b border-border/50 p-2">
            <div className="relative">
              <Search
                className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                aria-hidden
              />
              <input
                ref={inputRef}
                type="search"
                inputMode="search"
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck={false}
                placeholder={searchPlaceholder}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="h-11 w-full rounded-md border border-input bg-background pl-9 pr-3 text-base placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 md:text-sm"
                aria-label={searchPlaceholder}
              />
            </div>
          </div>

          {/* Options list */}
          <div className="max-h-52 overflow-y-auto" role="group">
            {filtered.length === 0 ? (
              <p className="px-3.5 py-4 text-center text-sm text-muted-foreground">
                No results found
              </p>
            ) : (
              filtered.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  role="option"
                  aria-selected={opt.value === value}
                  onClick={() => handleSelect(opt)}
                  className={cn(
                    "flex w-full items-center justify-between px-3.5 py-3 text-left text-sm transition-colors hover:bg-muted",
                    opt.value === value && "bg-muted/60 font-medium text-primary"
                  )}
                >
                  <span>{opt.label}</span>
                  {opt.value === value && (
                    <Check className="h-4 w-4 shrink-0 text-primary" aria-hidden />
                  )}
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  )
}
