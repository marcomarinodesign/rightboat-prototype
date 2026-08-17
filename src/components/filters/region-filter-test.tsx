"use client"

import * as React from "react"
import { ChevronDown, ChevronUp, Plus, X } from "lucide-react"

import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import {
  LOCATION_BY_ID,
  LOCATION_REGION_GROUPS,
  getLocationLabel,
  getSelectedRegionLocationIds,
} from "@/components/filters/location-regions"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"

type RegionFilterTestProps = {
  selectedRegionIds: string[]
  includedLocationIds: string[]
  excludedLocationIds: string[]
  onSelectedRegionIdsChange: (ids: string[]) => void
  onIncludedLocationIdsChange: (ids: string[]) => void
  onExcludedLocationIdsChange: (ids: string[]) => void
}

const allLocations = Array.from(LOCATION_BY_ID.values()).sort((a, b) =>
  a.label.localeCompare(b.label)
)

function toggleId(ids: string[], id: string, checked: boolean): string[] {
  if (checked) return ids.includes(id) ? ids : [...ids, id]
  return ids.filter((value) => value !== id)
}

/** Experimental multi-region selector for `?locationVariant=region-test`. */
export function RegionFilterTest({
  selectedRegionIds,
  includedLocationIds,
  excludedLocationIds,
  onSelectedRegionIdsChange,
  onIncludedLocationIdsChange,
  onExcludedLocationIdsChange,
}: RegionFilterTestProps) {
  const [expandedRegionIds, setExpandedRegionIds] = React.useState<string[]>([])
  const [locationToAdd, setLocationToAdd] = React.useState("")

  const selectedRegionLocationIds = React.useMemo(
    () => getSelectedRegionLocationIds(selectedRegionIds),
    [selectedRegionIds]
  )
  const selectedRegionLocationIdSet = React.useMemo(
    () => new Set(selectedRegionLocationIds),
    [selectedRegionLocationIds]
  )
  const availableLocations = React.useMemo(
    () =>
      allLocations.filter(
        (location) =>
          !selectedRegionLocationIdSet.has(location.id) &&
          !includedLocationIds.includes(location.id)
      ),
    [includedLocationIds, selectedRegionLocationIdSet]
  )

  const handleRegionChange = (regionId: string, checked: boolean) => {
    const nextRegionIds = toggleId(selectedRegionIds, regionId, checked)
    const nextRegionLocationIds = new Set(
      getSelectedRegionLocationIds(nextRegionIds)
    )
    onSelectedRegionIdsChange(nextRegionIds)

    if (!checked) {
      setExpandedRegionIds((ids) => ids.filter((id) => id !== regionId))
      // An exclusion has meaning only while its location remains in a selected
      // region. Retain it when another selected region still contains it.
      onExcludedLocationIdsChange(
        excludedLocationIds.filter((id) => nextRegionLocationIds.has(id))
      )
    }
  }

  const handleAddLocation = () => {
    if (!locationToAdd || includedLocationIds.includes(locationToAdd)) return
    onIncludedLocationIdsChange([...includedLocationIds, locationToAdd])
    setLocationToAdd("")
  }

  return (
    <div className="space-y-3" role="tabpanel" aria-label="Region">
      <p className="text-xs leading-5 text-muted-foreground">
        Select one or more regions. Results combine selected regions and added
        locations; exclusions are removed from the result.
      </p>

      <div className="space-y-3">
        {LOCATION_REGION_GROUPS.map((group) => (
          <fieldset key={group.id} className="space-y-1.5">
            <legend className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {group.label}
            </legend>
            {group.regions.map((region) => {
              const selected = selectedRegionIds.includes(region.id)
              const expanded = expandedRegionIds.includes(region.id)
              return (
                <div
                  key={region.id}
                  className={cn(
                    "rounded-lg border p-2.5 transition-colors",
                    selected
                      ? "border-primary/40 bg-primary/5"
                      : "border-border/70 bg-background"
                  )}
                >
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id={`region-${region.id}`}
                      checked={selected}
                      onCheckedChange={(checked) =>
                        handleRegionChange(region.id, Boolean(checked))
                      }
                    />
                    <label
                      htmlFor={`region-${region.id}`}
                      className="min-w-0 flex-1 cursor-pointer text-sm font-medium text-foreground"
                    >
                      {region.label}
                    </label>
                    {selected ? (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="h-8 px-2 text-xs"
                        aria-expanded={expanded}
                        aria-controls={`region-locations-${region.id}`}
                        onClick={() =>
                          setExpandedRegionIds((ids) =>
                            expanded
                              ? ids.filter((id) => id !== region.id)
                              : [...ids, region.id]
                          )
                        }
                      >
                        {expanded ? "Collapse" : "Expand"}
                        {expanded ? (
                          <ChevronUp aria-hidden className="h-3.5 w-3.5" />
                        ) : (
                          <ChevronDown aria-hidden className="h-3.5 w-3.5" />
                        )}
                      </Button>
                    ) : null}
                  </div>

                  {selected && expanded ? (
                    <div
                      id={`region-locations-${region.id}`}
                      className="mt-2 space-y-1 border-t border-primary/15 pt-2"
                    >
                      <p className="text-xs text-muted-foreground">
                        Included locations — select to exclude
                      </p>
                      {region.locations.map((location) => {
                        const excluded = excludedLocationIds.includes(location.id)
                        const checkboxId = `exclude-${region.id}-${location.id}`
                        return (
                          <div
                            key={location.id}
                            className={cn(
                              "flex items-center justify-between gap-2 rounded-md px-1.5 py-1.5 text-sm",
                              excluded
                                ? "bg-destructive/8 text-muted-foreground"
                                : "bg-background/70 text-foreground"
                            )}
                          >
                            <div className="flex min-w-0 items-center gap-2">
                              <Checkbox
                                id={checkboxId}
                                checked={excluded}
                                onCheckedChange={(checked) =>
                                  onExcludedLocationIdsChange(
                                    toggleId(
                                      excludedLocationIds,
                                      location.id,
                                      Boolean(checked)
                                    )
                                  )
                                }
                              />
                              <label
                                htmlFor={checkboxId}
                                className="cursor-pointer"
                              >
                                {location.label}
                              </label>
                            </div>
                            <span
                              className={cn(
                                "shrink-0 text-xs",
                                excluded
                                  ? "text-destructive"
                                  : "text-muted-foreground"
                              )}
                            >
                              {excluded ? "Excluded" : "Included"}
                            </span>
                          </div>
                        )
                      })}
                    </div>
                  ) : null}
                </div>
              )
            })}
          </fieldset>
        ))}
      </div>

      <div className="space-y-2 rounded-lg border border-dashed border-border p-2.5">
        <p className="text-sm font-medium text-foreground">Add a location</p>
        <div className="flex gap-2">
          <Select value={locationToAdd} onValueChange={setLocationToAdd}>
            <SelectTrigger aria-label="Location to add" className="min-w-0 flex-1">
              <SelectValue placeholder="Select a location" />
            </SelectTrigger>
            <SelectContent>
              {availableLocations.map((location) => (
                <SelectItem key={location.id} value={location.id}>
                  {location.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            type="button"
            variant="secondary"
            size="sm"
            className="shrink-0"
            disabled={!locationToAdd}
            onClick={handleAddLocation}
          >
            <Plus aria-hidden />
            Add
          </Button>
        </div>
      </div>

      {includedLocationIds.length > 0 ? (
        <div className="space-y-1.5" aria-label="Added locations">
          <p className="text-xs font-medium text-muted-foreground">
            Added locations
          </p>
          {includedLocationIds.map((locationId) => (
            <div
              key={locationId}
              className="flex items-center justify-between rounded-md bg-secondary/60 px-2.5 py-2 text-sm"
            >
              <span>{getLocationLabel(locationId)}</span>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-7 w-7 p-0"
                aria-label={`Remove ${getLocationLabel(locationId)}`}
                onClick={() =>
                  onIncludedLocationIdsChange(
                    includedLocationIds.filter((id) => id !== locationId)
                  )
                }
              >
                <X aria-hidden className="h-3.5 w-3.5" />
              </Button>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  )
}
