// FIGMA NODE: BDP / Inactive — Boat Detail Page (inactive/sold listing) in El-Captain-DS
// FIGMA FILE: https://www.figma.com/design/VOCH4pGubqSYza7CbL30c7/El-Captain-DS
// STATUS: pendiente de crear en Figma (ver FIGMA_NODES_NEEDED.md)
// LAST SYNC: 2026-04-27

/**
 * Code Connect — BDP Inactive (sold listing)
 *
 * Representa la composición completa del Boat Detail Page en estado inactivo/vendido.
 * Conecta al frame "BDP / Inactive" en El-Captain-DS (o variante "State=Inactive" del BDP).
 *
 * Elementos clave respecto al BDP activo:
 *   + BdpInactiveBanner  — banner sticky debajo del nav
 *   + Sold badge         — overlay en la primera imagen de la galería
 *   + Price label        — "Listed at £XX,XXX" (precio histórico, no activo)
 *   - Contact form       — eliminado
 *   - Phone CTA          — eliminado
 *   + Find similar link  — en el aside, reemplaza al formulario
 *   + BdpSimilarBoats    — sección de barcos similares al pie
 *
 * Demo route: /boats-for-sale/seacamper/24/rb226195
 *
 * Pasos para conectar:
 * 1. En El-Captain-DS, crea el frame "BDP / Inactive" o añade variante State=Inactive al BDP.
 * 2. Selecciona el frame → clic derecho → "Copy link to selection".
 * 3. Reemplaza la URL de abajo.
 * 4. Ejecuta: npm run figma:connect:publish
 */
import figma from "@figma/code-connect/react"

import { BdpInactiveBanner } from "./bdp-inactive-banner"
import { BdpBreadcrumb } from "./bdp-breadcrumb"
import { BdpDetails, getDefaultBdpDetails } from "./bdp-details"
import { BdpRightPanel } from "./bdp-right-panel"
import { BdpSimilarBoats } from "./bdp-similar-boats"
import { Card, CardContent } from "@/components/ui/card"

// Placeholder que representa la pantalla BDP en estado inactivo.
// En producción: src/app/boats-for-sale/seacamper/24/rb226195/page.tsx
function BoatDetailPageInactive({
  boatName = "2019 Seacamper 24",
  listedPrice = "£24,500",
  year = "2019",
  length = "7.3m",
  location = "United Kingdom",
  boatType = "Powerboats",
}: {
  boatName?: string
  listedPrice?: string
  year?: string
  length?: string
  location?: string
  boatType?: string
}) {
  return (
    <>
      <BdpInactiveBanner />
      <div className="mx-auto w-full max-w-7xl space-y-10 px-4 pb-6 pt-4 sm:px-6 lg:px-8">
        <BdpBreadcrumb make="Seacamper" model="24" />
        <section className="grid gap-8 lg:grid-cols-[1.4fr_0.6fr]">
          <div className="space-y-6">
            <BdpDetails sections={getDefaultBdpDetails()} />
            <div className="space-y-3">
              <BdpRightPanel title="Features" />
              <BdpRightPanel title="Specifications" />
            </div>
          </div>
          <aside className="space-y-6">
            <Card>
              <CardContent className="space-y-5 pt-6">
                <div className="space-y-1">
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Listed price
                  </p>
                  <p className="heading-sm text-muted-foreground">{listedPrice}</p>
                  <p className="text-sm text-muted-foreground">
                    This listing is no longer available.
                  </p>
                </div>
              </CardContent>
            </Card>
          </aside>
        </section>
        <BdpSimilarBoats boatType={boatType} />
      </div>
    </>
  )
}

figma.connect(
  BoatDetailPageInactive,
  "https://www.figma.com/design/VOCH4pGubqSYza7CbL30c7/El-Captain-DS?node-id=1-1",
  {
    imports: [
      '// Demo page: src/app/boats-for-sale/seacamper/24/rb226195/page.tsx',
      'import { BdpInactiveBanner } from "@/components/boats/bdp/bdp-inactive-banner"',
      'import { BdpSimilarBoats } from "@/components/boats/bdp/bdp-similar-boats"',
    ],
    props: {
      boatName: figma.string("Boat Name"),
      listedPrice: figma.string("Listed Price"),
      boatType: figma.string("Boat Type"),
    },
    example: ({ boatName, listedPrice, boatType }) => (
      <BoatDetailPageInactive
        boatName={boatName}
        listedPrice={listedPrice}
        boatType={boatType}
      />
    ),
  }
)
