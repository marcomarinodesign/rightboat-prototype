// FIGMA FILE: https://www.figma.com/design/VOCH4pGubqSYza7CbL30c7/El-Captain-DS
// PAGE: Mobile Overview (333-2055)
// LAST SYNC: 2026-05-27
//
// Mobile frames for /boats-for-sale (402×874 — split desktop; mobile uses drawer)

/**
 * Code Connect — BoatsForSaleListing mobile states (Mobile Overview)
 */
import figma from "@figma/code-connect/react"

import { BoatsForSaleListing } from "./boats-for-sale-listing"
import { listingBoats } from "@/data/boats"

function SrpMobileDefault() {
  return (
    <BoatsForSaleListing
      boats={listingBoats}
      layoutVariant="split"
      previewMode="mobile"
      figmaPreview="default"
    />
  )
}

function SrpMobileActiveFilters() {
  return (
    <BoatsForSaleListing
      boats={listingBoats}
      layoutVariant="split"
      previewMode="mobile"
      figmaPreview="active-filters"
    />
  )
}

function SrpMobileEmpty() {
  return (
    <BoatsForSaleListing
      boats={listingBoats}
      layoutVariant="split"
      previewMode="mobile"
      figmaPreview="empty"
    />
  )
}

function SrpMobileSortOpen() {
  return (
    <BoatsForSaleListing
      boats={listingBoats}
      layoutVariant="split"
      previewMode="mobile"
      figmaPreview="sort-open"
    />
  )
}

function SrpMobileSaveSearchToast() {
  return (
    <BoatsForSaleListing
      boats={listingBoats}
      layoutVariant="split"
      previewMode="mobile"
      figmaPreview="save-search-toast"
    />
  )
}

const MOBILE_IMPORTS = [
  "// Mobile: /boats-for-sale (402×874)",
  'import { BoatsForSaleListing } from "@/components/filters/boats-for-sale-listing"',
  'import { listingBoats } from "@/data/boats"',
]

// TODO(2026-08-30): frame "SRP / Mobile — Default" (333-2056) no longer exists in
// El-Captain-DS and no equivalent frame exists on ✅ SRP Split View. Recreate the
// frame (or capture it) and point this URL at it before publishing.
figma.connect(
  SrpMobileDefault,
  "https://www.figma.com/design/VOCH4pGubqSYza7CbL30c7/El-Captain-DS?node-id=333-2056",
  {
    imports: MOBILE_IMPORTS,
    example: () => <SrpMobileDefault />,
  }
)

figma.connect(
  SrpMobileActiveFilters,
  "https://www.figma.com/design/VOCH4pGubqSYza7CbL30c7/El-Captain-DS?node-id=558-8609",
  {
    imports: MOBILE_IMPORTS,
    example: () => <SrpMobileActiveFilters />,
  }
)

figma.connect(
  SrpMobileEmpty,
  "https://www.figma.com/design/VOCH4pGubqSYza7CbL30c7/El-Captain-DS?node-id=558-9568",
  {
    imports: MOBILE_IMPORTS,
    example: () => <SrpMobileEmpty />,
  }
)

figma.connect(
  SrpMobileSortOpen,
  "https://www.figma.com/design/VOCH4pGubqSYza7CbL30c7/El-Captain-DS?node-id=558-9795",
  {
    imports: MOBILE_IMPORTS,
    example: () => <SrpMobileSortOpen />,
  }
)

figma.connect(
  SrpMobileSaveSearchToast,
  "https://www.figma.com/design/VOCH4pGubqSYza7CbL30c7/El-Captain-DS?node-id=558-12098",
  {
    imports: MOBILE_IMPORTS,
    example: () => <SrpMobileSaveSearchToast />,
  }
)
