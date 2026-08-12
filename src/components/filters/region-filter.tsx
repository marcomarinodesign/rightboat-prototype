"use client"

import * as React from "react"
import { Check, ChevronDown, Plus, Search, X } from "lucide-react"

import { Checkbox } from "@/components/ui/checkbox"
import {
  getRegion,
  getRegionAddableLocations,
  getRegionLocation,
  REGION_GROUPS,
  type RegionLocation,
} from "@/components/filters/region-data"
import { cn } from "@/lib/utils"

export type RegionFilterProps = {
  region: string
  excluded: string[]
  added: string[]
  onRegionChange: (region: string) => void
  onExcludedChange: (excluded: string[]) => void
  onAddedChange: (added: string[]) => void
}

function RegionPicker({
  region,
  onRegionChange,
}: {
  region: string
  onRegionChange: (region: string) => void
}) {
  const [open, setOpen] = React.useState(false)
  const [query, setQuery] = React.useState("")
  const containerRef = React.useRef<HTMLDivElement>(null)
  const inputRef = React.useRef<HTMLInputElement>(null)

  const selected = getRegion(region)

  const groups = React.useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return REGION_GROUPS
    return REGION_GROUPS.map((group) => ({
      ...group,
      regions: group.regions.filter(
        (item) =>
          item.label.toLowerCase().includes(q) ||
          group.label.toLowerCase().includes(q) ||
          item.locations.some((location) =>
            location.label.toLowerCase().includes(q)
          )
      ),
    })).filter((group) => group.regions.length > 0)
  }, [query])

  const close = () => {
    setOpen(false)
    setQuery("")
  }

  React.useEffect(() => {
    if (!open) return
    const handler = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        close()
      }
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [open])

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => {
          if (open) {
            close()
            return
          }
          setOpen(true)
          requestAnimationFrame(() => inputRef.current?.focus())
        }}
        aria-expanded={open}
        aria-haspopup="listbox"
        className={cn(
          "flex h-11 w-full items-center justify-between rounded-lg border bg-background px-3.5 text-sm transition-colors",
          open
            ? "border-ring ring-2 ring-ring ring-offset-2"
            : "border-input hover:border-ring/60",
          selected ? "text-foreground" : "text-muted-foreground"
        )}
      >
        <span className="min-w-0 flex-1 truncate text-left">
          {selected?.label ?? "Select region"}
        </span>
        <span className="ml-2 flex shrink-0 items-center gap-1">
          {selected && (
            <span
              role="button"
              tabIndex={0}
              onClick={(event) => {
                event.stopPropagation()
                onRegionChange("")
                close()
              }}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault()
                  event.stopPropagation()
                  onRegionChange("")
                  close()
                }
              }}
              className="flex h-6 w-6 items-center justify-center rounded-full text-muted-foreground hover:bg-muted hover:text-foreground"
              aria-label="Clear region"
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

      {open && (
        <div
          role="listbox"
          aria-label="Region"
          className="absolute left-0 right-0 top-full z-50 mt-1 overflow-hidden rounded-lg border border-border bg-background shadow-md"
        >
          <div className="border-b border-border/50 p-2">
            <div className="relative">
              <Search
                className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                aria-hidden
              />
              <input
                ref={inputRef}
                type="search"
                autoComplete="off"
                spellCheck={false}
                placeholder="Search regions"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                className="h-11 w-full rounded-md border border-input bg-background pl-9 pr-3 text-base placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 md:text-sm"
                aria-label="Search regions"
              />
            </div>
          </div>

          <div className="max-h-64 overflow-y-auto">
            {groups.length === 0 ? (
              <p className="px-3.5 py-4 text-center text-sm text-muted-foreground">
                No regions found
              </p>
            ) : (
              groups.map((group) => (
                <div key={group.label} role="group" aria-label={group.label}>
                  <p className="sticky top-0 bg-muted/60 px-3.5 py-1.5 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                    {group.label}
                  </p>
                  {group.regions.map((item) => (
                    <button
                      key={item.value}
                      type="button"
                      role="option"
                      aria-selected={item.value === region}
                      onClick={() => {
                        onRegionChange(item.value)
                        close()
                      }}
                      className={cn(
                        "flex w-full items-start justify-between gap-2 px-3.5 py-2.5 text-left transition-colors hover:bg-muted",
                        item.value === region && "bg-muted/60"
                      )}
                    >
                      <span className="min-w-0">
                        <span
                          className={cn(
                            "block text-sm",
                            item.value === region &&
                              "font-medium text-primary"
                          )}
                        >
                          {item.label}
                        </span>
                        <span className="block text-xs text-muted-foreground">
                          {item.summary}
                        </span>
                      </span>
                      {item.value === region && (
                        <Check
                          className="mt-0.5 h-4 w-4 shrink-0 text-primary"
                          aria-hidden
                        />
                      )}
                    </button>
                  ))}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  )
}

function AddLocationPicker({
  regionValue,
  added,
  onAddedChange,
}: {
  regionValue: string
  added: string[]
  onAddedChange: (added: string[]) => void
}) {
  const [open, setOpen] = React.useState(false)
  const [query, setQuery] = React.useState("")

  const options = React.useMemo(() => {
    const addedSet = new Set(added)
    const all = getRegionAddableLocations(regionValue).filter(
      (location) => !addedSet.has(location.value)
    )
    const q = query.trim().toLowerCase()
    if (!q) return all
    return all.filter((location) => location.label.toLowerCase().includes(q))
  }, [regionValue, added, query])

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex items-center gap-1.5 text-sm font-medium text-primary underline-offset-4 hover:underline"
      >
        <Plus className="h-3.5 w-3.5" aria-hidden />
        Add another location
      </button>
    )
  }

  return (
    <div className="rounded-lg border border-border bg-background">
      <div className="border-b border-border/50 p-2">
        <div className="relative">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden
          />
          <input
            type="search"
            autoFocus
            autoComplete="off"
            placeholder="Search states and countries"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="h-11 w-full rounded-md border border-input bg-background pl-9 pr-3 text-base placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 md:text-sm"
            aria-label="Search states and countries"
          />
        </div>
      </div>
      <div className="max-h-44 overflow-y-auto">
        {options.length === 0 ? (
          <p className="px-3.5 py-4 text-center text-sm text-muted-foreground">
            No locations found
          </p>
        ) : (
          options.map((location) => (
            <button
              key={location.value}
              type="button"
              onClick={() => {
                onAddedChange([...added, location.value])
                setQuery("")
                setOpen(false)
              }}
              className="flex w-full items-center justify-between px-3.5 py-2.5 text-left text-sm transition-colors hover:bg-muted"
            >
              <span>{location.label}</span>
              <Plus className="h-3.5 w-3.5 text-muted-foreground" aria-hidden />
            </button>
          ))
        )}
      </div>
      <div className="border-t border-border/50 px-3 py-2">
        <button
          type="button"
          onClick={() => {
            setOpen(false)
            setQuery("")
          }}
          className="text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
        >
          Cancel
        </button>
      </div>
    </div>
  )
}

/**
 * Location → Region. Picking a region searches every location under it; the
 * list below can be expanded to exclude locations or add extra ones.
 */
export function RegionFilter({
  region,
  excluded,
  added,
  onRegionChange,
  onExcludedChange,
  onAddedChange,
}: RegionFilterProps) {
  const [expanded, setExpanded] = React.useState(false)
  const selected = getRegion(region)

  const addedLocations = React.useMemo(
    () =>
      added
        .map((value) => getRegionLocation(value))
        .filter((location): location is RegionLocation => Boolean(location)),
    [added]
  )

  const includedCount =
    (selected ? selected.locations.length - excluded.length : 0) +
    addedLocations.length

  React.useEffect(() => {
    if (!region) setExpanded(false)
  }, [region])

  const toggleExcluded = (value: string, include: boolean) => {
    onExcludedChange(
      include
        ? excluded.filter((item) => item !== value)
        : [...excluded, value]
    )
  }

  return (
    <div role="tabpanel" aria-label="Region" className="space-y-2">
      <RegionPicker region={region} onRegionChange={onRegionChange} />

      {selected && (
        <div className="rounded-lg border border-border/60 bg-muted/20">
          <button
            type="button"
            onClick={() => setExpanded((value) => !value)}
            aria-expanded={expanded}
            className="flex w-full items-center justify-between gap-2 px-3 py-2.5 text-left"
          >
            <span className="text-sm text-muted-foreground">
              {includedCount}{" "}
              {includedCount === 1 ? "location" : "locations"} included
            </span>
            <span className="flex items-center gap-1 text-sm font-medium text-primary">
              {expanded ? "Hide" : "View"}
              <ChevronDown
                className={cn(
                  "h-4 w-4 transition-transform duration-200",
                  expanded && "rotate-180"
                )}
                aria-hidden
              />
            </span>
          </button>

          {expanded && (
            <div className="space-y-3 border-t border-border/60 px-3 py-3">
              <div className="space-y-2">
                {selected.locations.map((location) => {
                  const included = !excluded.includes(location.value)
                  return (
                    <label
                      key={location.value}
                      className="flex cursor-pointer items-center gap-2.5 text-sm"
                    >
                      <Checkbox
                        checked={included}
                        onCheckedChange={(checked) =>
                          toggleExcluded(location.value, Boolean(checked))
                        }
                        aria-label={location.label}
                      />
                      <span
                        className={cn(
                          included ? "text-foreground" : "text-muted-foreground"
                        )}
                      >
                        {location.label}
                      </span>
                    </label>
                  )
                })}
              </div>

              {addedLocations.length > 0 && (
                <div className="space-y-2 border-t border-border/60 pt-3">
                  <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                    Added
                  </p>
                  {addedLocations.map((location) => (
                    <div
                      key={location.value}
                      className="flex items-center justify-between gap-2 text-sm"
                    >
                      <span>{location.label}</span>
                      <button
                        type="button"
                        onClick={() =>
                          onAddedChange(
                            added.filter((value) => value !== location.value)
                          )
                        }
                        className="rounded-full p-1 text-muted-foreground transition hover:bg-muted hover:text-foreground"
                        aria-label={`Remove ${location.label}`}
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <div className="border-t border-border/60 pt-3">
                <AddLocationPicker
                  regionValue={region}
                  added={added}
                  onAddedChange={onAddedChange}
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
