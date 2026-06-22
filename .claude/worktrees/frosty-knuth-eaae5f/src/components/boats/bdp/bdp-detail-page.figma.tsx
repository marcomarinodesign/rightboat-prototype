// FIGMA NODE: BDP / Active — Boat Detail Page (active listing) in El-Captain-DS
// FIGMA FILE: https://www.figma.com/design/VOCH4pGubqSYza7CbL30c7/El-Captain-DS
// STATUS: pendiente de crear en Figma (ver FIGMA_NODES_NEEDED.md)
// LAST SYNC: 2026-04-27

/**
 * Code Connect — BDP (active listing)
 *
 * Representa la composición completa del Boat Detail Page en estado activo.
 * Conecta al frame BDP / Active en El-Captain-DS.
 *
 * Pasos para conectar:
 * 1. En El-Captain-DS, localiza o crea el frame "BDP / Active" en la sección BDP.
 * 2. Selecciona el frame → clic derecho → "Copy link to selection".
 * 3. Reemplaza la URL de abajo y ajusta los props mapping.
 * 4. Ejecuta: npm run figma:connect:publish
 *
 * Props de Figma recomendados para el component set:
 *   - Boat Name (string)
 *   - Price (string)
 *   - Year (string)
 *   - Length (string)
 *   - Location (string)
 *   - State: "Active" | "Inactive"
 */
import figma from "@figma/code-connect/react"

import { BdpBreadcrumb } from "./bdp-breadcrumb"
import { BdpContactSeller } from "./bdp-contact-seller"
import { BdpDetails, getDefaultBdpDetails } from "./bdp-details"
import { BdpRightPanel } from "./bdp-right-panel"

// Placeholder — esta función representa el screen BDP activo.
// En producción la página es src/app/boats-for-sale/[make]/[model]/[id]/page.tsx
function BoatDetailPage({
  boatName = "2026 Formula 500 SuperSport",
  price = "Request price",
  year = "2026",
  length = "50.0 ft",
  location = "Fort Lauderdale, Florida",
}: {
  boatName?: string
  price?: string
  year?: string
  length?: string
  location?: string
}) {
  return (
    <div className="mx-auto w-full max-w-7xl space-y-10 px-4 pb-6 pt-4 sm:px-6 lg:px-8">
      <BdpBreadcrumb make="Formula" model="500 SuperSport" />
      <section className="grid gap-8 lg:grid-cols-[1.4fr_0.6fr]">
        <div className="space-y-6">
          <BdpDetails sections={getDefaultBdpDetails()} />
          <div className="space-y-3">
            <BdpRightPanel title="Features" />
            <BdpRightPanel title="Specifications" />
          </div>
        </div>
        <aside className="space-y-6">
          <BdpContactSeller
            price={price}
            boatName={boatName}
            sellerName="Formula Boats"
            sellerLocation={location}
          />
        </aside>
      </section>
    </div>
  )
}

figma.connect(
  BoatDetailPage,
  "https://www.figma.com/design/VOCH4pGubqSYza7CbL30c7/El-Captain-DS?node-id=1-1",
  {
    imports: [
      '// Page: src/app/boats-for-sale/[make]/[model]/[id]/page.tsx',
      'import { BdpBreadcrumb } from "@/components/boats/bdp/bdp-breadcrumb"',
      'import { BdpContactSeller } from "@/components/boats/bdp/bdp-contact-seller"',
      'import { BdpDetails } from "@/components/boats/bdp/bdp-details"',
    ],
    props: {
      boatName: figma.string("Boat Name"),
      price: figma.string("Price"),
      year: figma.string("Year"),
      length: figma.string("Length"),
      location: figma.string("Location"),
    },
    example: ({ boatName, price, year, length, location }) => (
      <BoatDetailPage
        boatName={boatName}
        price={price}
        year={year}
        length={length}
        location={location}
      />
    ),
  }
)
