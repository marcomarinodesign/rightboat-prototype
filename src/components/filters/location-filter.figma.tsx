// FIGMA NODE: Location filter section — SRP / Split view → Filters panel
// FIGMA FILE: https://www.figma.com/design/VOCH4pGubqSYza7CbL30c7/El-Captain-DS
// COMPONENT: https://www.figma.com/design/VOCH4pGubqSYza7CbL30c7/El-Captain-DS?node-id=289-102
// STATUS: conectado al frame de sección (refinar a componente publicado si hace falta)
// LAST SYNC: 2026-05-21

/**
 * Code Connect — LocationFilter (3 tabs: Zip Code, City / State, By Radius)
 *
 * Usado dentro de FiltersFormBody → SRP split sidebar y drawer móvil.
 */
import figma from "@figma/code-connect/react"

import { LocationFilter } from "./location-filter"
import type { LocationTab } from "./types"

const noop = () => undefined

function LocationFilterPreview({
  locationTab = "zip" as LocationTab,
}: {
  locationTab?: LocationTab
}) {
  return (
    <LocationFilter
      locationTab={locationTab}
      locationRadius="25"
      locationZip=""
      locationCountry=""
      locationState=""
      locationCity=""
      onTabChange={noop}
      onRadiusChange={noop}
      onZipChange={noop}
      onCountryChange={noop}
      onStateChange={noop}
      onCityChange={noop}
    />
  )
}

figma.connect(
  LocationFilterPreview,
  "https://www.figma.com/design/VOCH4pGubqSYza7CbL30c7/El-Captain-DS?node-id=289-102",
  {
    imports: [
      'import { LocationFilter } from "@/components/filters/location-filter"',
    ],
    example: () => <LocationFilterPreview locationTab="zip" />,
  }
)
