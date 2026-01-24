"use client"

import * as React from "react"

import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

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
  triggerClassName?: string
}

export function SearchableSelect({
  value,
  onValueChange,
  options,
  placeholder,
  searchPlaceholder = "Search",
  triggerClassName,
}: SearchableSelectProps) {
  const [query, setQuery] = React.useState("")

  const filteredOptions = React.useMemo(() => {
    const normalized = query.trim().toLowerCase()
    if (!normalized) return options
    return options.filter((option) =>
      option.label.toLowerCase().includes(normalized)
    )
  }, [options, query])

  return (
    <Select
      value={value || undefined}
      onValueChange={onValueChange}
      onOpenChange={(open) => {
        if (!open) setQuery("")
      }}
    >
      <SelectTrigger className={triggerClassName}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <div className="p-2">
          <Input
            placeholder={searchPlaceholder}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={(event) => {
              if (event.key !== "Escape") {
                event.stopPropagation()
              }
            }}
            className="h-8"
          />
        </div>
        {filteredOptions.length === 0 ? (
          <div className="px-3 pb-3 text-xs text-muted-foreground">
            No results found.
          </div>
        ) : (
          filteredOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))
        )}
      </SelectContent>
    </Select>
  )
}
