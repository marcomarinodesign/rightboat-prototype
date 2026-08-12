"use client"

import * as React from "react"

import {
  getCityOptions,
  isUnitedStatesCountry,
  LOCATION_COUNTRY_OPTIONS,
  US_STATE_OPTIONS,
} from "@/components/filters/location-geo-data"
import {
  LOCATION_RADIUS_OPTIONS_BY_RADIUS,
  LOCATION_RADIUS_OPTIONS_ZIP_CITY,
  LOCATION_TABS,
  LOCATION_TABS_WITH_REGION,
} from "@/components/filters/location-filter-helpers"
import { RegionFilter } from "@/components/filters/region-filter"
import { SearchableSelect } from "@/components/filters/searchable-select"
import type { LocationTab } from "@/components/filters/types"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"

const fieldInputClass =
  "h-10 w-full rounded-lg border border-input bg-background px-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"

type LocationFilterProps = {
  locationTab: LocationTab
  locationRadius: string
  locationZip: string
  locationCountry: string
  locationState: string
  locationCity: string
  onTabChange: (tab: LocationTab) => void
  onRadiusChange: (value: string) => void
  onZipChange: (value: string) => void
  onCountryChange: (value: string) => void
  onStateChange: (value: string) => void
  onCityChange: (value: string) => void
  /** Opt-in Region tab (prototype: /boats-for-sale/regions). */
  enableRegions?: boolean
  locationRegion?: string
  locationRegionExcluded?: string[]
  locationRegionAdded?: string[]
  onRegionChange?: (value: string) => void
  onRegionExcludedChange?: (values: string[]) => void
  onRegionAddedChange?: (values: string[]) => void
}

function LocationSegmentedControl({
  value,
  tabs,
  onChange,
}: {
  value: LocationTab
  tabs: { id: LocationTab; label: string }[]
  onChange: (tab: LocationTab) => void
}) {
  return (
    <div
      role="tablist"
      aria-label="Location search type"
      className="flex gap-0.5 rounded-full bg-muted/80 p-1"
    >
      {tabs.map((tab) => {
        const active = value === tab.id
        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(tab.id)}
            className={cn(
              "min-w-0 flex-1 rounded-full px-2 py-1.5 text-center text-xs font-medium transition-colors",
              active
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {tab.label}
          </button>
        )
      })}
    </div>
  )
}

function RadiusSelect({
  value,
  onValueChange,
  options,
  className,
  "aria-label": ariaLabel,
}: {
  value: string
  onValueChange: (value: string) => void
  options: readonly { label: string; value: string }[]
  className?: string
  "aria-label"?: string
}) {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className={className} aria-label={ariaLabel}>
        <SelectValue placeholder="Radius" />
      </SelectTrigger>
      <SelectContent>
        {options.map((opt) => (
          <SelectItem key={opt.value} value={opt.value}>
            {opt.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

function CityStateFields({
  locationRadius,
  locationCountry,
  locationState,
  locationCity,
  onRadiusChange,
  onCountryChange,
  onStateChange,
  onCityChange,
}: {
  locationRadius: string
  locationCountry: string
  locationState: string
  locationCity: string
  onRadiusChange: (value: string) => void
  onCountryChange: (value: string) => void
  onStateChange: (value: string) => void
  onCityChange: (value: string) => void
}) {
  const isUS = isUnitedStatesCountry(locationCountry)
  const hasCountry = Boolean(locationCountry)
  const cityOptions = React.useMemo(
    () => getCityOptions(locationCountry, locationState),
    [locationCountry, locationState]
  )

  const stateDisabled = !hasCountry
  const cityDisabled = !hasCountry || (isUS ? !locationState : false)

  return (
    <div role="tabpanel" aria-label="City or State" className="space-y-2">
      <RadiusSelect
        value={locationRadius}
        onValueChange={onRadiusChange}
        options={LOCATION_RADIUS_OPTIONS_ZIP_CITY}
        className="w-full"
        aria-label="Search radius"
      />
      <SearchableSelect
        value={locationCountry}
        onValueChange={onCountryChange}
        options={LOCATION_COUNTRY_OPTIONS}
        placeholder="Country"
        searchPlaceholder="Search countries"
        clearable={false}
      />
      {isUS ? (
        <SearchableSelect
          value={locationState}
          onValueChange={onStateChange}
          options={US_STATE_OPTIONS}
          placeholder="State"
          searchPlaceholder="Search states"
          disabled={stateDisabled}
        />
      ) : null}
      <SearchableSelect
        value={locationCity}
        onValueChange={onCityChange}
        options={cityOptions}
        placeholder="City"
        searchPlaceholder="Search cities"
        disabled={cityDisabled}
      />
    </div>
  )
}

export function LocationFilter({
  locationTab,
  locationRadius,
  locationZip,
  locationCountry,
  locationState,
  locationCity,
  onTabChange,
  onRadiusChange,
  onZipChange,
  onCountryChange,
  onStateChange,
  onCityChange,
  enableRegions = false,
  locationRegion = "",
  locationRegionExcluded = [],
  locationRegionAdded = [],
  onRegionChange,
  onRegionExcludedChange,
  onRegionAddedChange,
}: LocationFilterProps) {
  const tabs = enableRegions ? LOCATION_TABS_WITH_REGION : LOCATION_TABS

  const handleTabChange = (tab: LocationTab) => {
    onTabChange(tab)
    if (tab === "radius") {
      const valid = LOCATION_RADIUS_OPTIONS_BY_RADIUS.some(
        (o) => o.value === locationRadius
      )
      if (!valid) onRadiusChange("25")
    } else {
      const valid = LOCATION_RADIUS_OPTIONS_ZIP_CITY.some(
        (o) => o.value === locationRadius
      )
      if (!valid) onRadiusChange("25")
    }
  }

  return (
    <div className="space-y-3">
      <LocationSegmentedControl
        value={locationTab}
        tabs={tabs}
        onChange={handleTabChange}
      />

      {enableRegions && locationTab === "region" && (
        <RegionFilter
          region={locationRegion}
          excluded={locationRegionExcluded}
          added={locationRegionAdded}
          onRegionChange={(value) => onRegionChange?.(value)}
          onExcludedChange={(values) => onRegionExcludedChange?.(values)}
          onAddedChange={(values) => onRegionAddedChange?.(values)}
        />
      )}

      {locationTab === "zip" && (
        <div
          role="tabpanel"
          aria-label="Zip Code"
          className="grid grid-cols-[minmax(7.5rem,38%)_1fr] items-center gap-2"
        >
          <RadiusSelect
            value={locationRadius}
            onValueChange={onRadiusChange}
            options={LOCATION_RADIUS_OPTIONS_ZIP_CITY}
            aria-label="Search radius"
          />
          <input
            type="text"
            inputMode="numeric"
            autoComplete="postal-code"
            placeholder="Zip Code"
            value={locationZip}
            onChange={(e) => onZipChange(e.target.value)}
            aria-label="Zip Code"
            className={fieldInputClass}
          />
        </div>
      )}

      {locationTab === "city-state" && (
        <CityStateFields
          locationRadius={locationRadius}
          locationCountry={locationCountry}
          locationState={locationState}
          locationCity={locationCity}
          onRadiusChange={onRadiusChange}
          onCountryChange={onCountryChange}
          onStateChange={onStateChange}
          onCityChange={onCityChange}
        />
      )}

      {locationTab === "radius" && (
        <div role="tabpanel" aria-label="By Radius">
          <RadiusSelect
            value={locationRadius}
            onValueChange={onRadiusChange}
            options={LOCATION_RADIUS_OPTIONS_BY_RADIUS}
            className="w-full"
            aria-label="Search radius"
          />
        </div>
      )}
    </div>
  )
}
