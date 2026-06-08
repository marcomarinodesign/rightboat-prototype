// FIGMA FILE: https://www.figma.com/design/VOCH4pGubqSYza7CbL30c7/El-Captain-DS
// PAGE: Mobile Overview (333-2055)
// LAST SYNC: 2026-05-27

/**
 * Code Connect — Boats for sale page (marketing footer section, mobile viewport)
 */
import figma from "@figma/code-connect/react"

import { BoatsForSaleFigmaEffects } from "./boats-for-sale-figma-effects"
import { BoatsForSaleListing } from "./boats-for-sale-listing"
import { listingBoats } from "@/data/boats"
import {
  popularBrands,
  popularTypes,
} from "@/data/categories"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"

function BoatsForSalePageMobileMarketingFooter() {
  return (
    <div className="space-y-10">
      <BoatsForSaleFigmaEffects figmaPreview="marketing-footer" />
      <BoatsForSaleListing
        boats={listingBoats}
        layoutVariant="split"
        previewMode="mobile"
        figmaPreview="marketing-footer"
      />
      <section
        id="figma-marketing-footer"
        className="grid gap-6 rounded-2xl border border-border/60 bg-muted/20 p-6 lg:grid-cols-[1.1fr_0.9fr]"
      >
        <div className="space-y-3">
          <h2 className="heading-sm">Receive new listings</h2>
          <p className="text-sm text-muted-foreground">
            Get alerts for new boats that match your preferences.
          </p>
          <div className="flex flex-wrap gap-3">
            <Input placeholder="Your email address" className="max-w-xs" />
            <Button>Subscribe</Button>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">
              Search by manufacturer
            </h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {popularBrands.slice(0, 4).map((brand) => (
                <Link
                  key={brand}
                  href="/boats-for-sale"
                  className="rounded-full border border-border/60 px-3 py-1 text-xs text-muted-foreground"
                >
                  {brand}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">
              Search by type
            </h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {popularTypes.slice(0, 4).map((type) => (
                <Link
                  key={type}
                  href="/boats-for-sale"
                  className="rounded-full border border-border/60 px-3 py-1 text-xs text-muted-foreground"
                >
                  {type}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

figma.connect(
  BoatsForSalePageMobileMarketingFooter,
  "https://www.figma.com/design/VOCH4pGubqSYza7CbL30c7/El-Captain-DS?node-id=337-11",
  {
    imports: [
      "// src/app/boats-for-sale/page.tsx?layout=split&figmaPreview=marketing-footer",
      'import { BoatsForSaleListing } from "@/components/filters/boats-for-sale-listing"',
      'import { listingBoats } from "@/data/boats"',
    ],
    example: () => <BoatsForSalePageMobileMarketingFooter />,
  }
)
