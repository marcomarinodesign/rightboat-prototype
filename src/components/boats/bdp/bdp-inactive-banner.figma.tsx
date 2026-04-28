// FIGMA NODE: Status Banner / Inactive — BDP section in El-Captain-DS
// FIGMA FILE: https://www.figma.com/design/VOCH4pGubqSYza7CbL30c7/El-Captain-DS
// STATUS: pendiente de crear en Figma (ver FIGMA_NODES_NEEDED.md)
// LAST SYNC: 2026-04-27

/**
 * Code Connect — BdpInactiveBanner
 *
 * Pasos para conectar:
 * 1. En El-Captain-DS, crea el componente "Status Banner / Inactive" en la sección BDP.
 * 2. Selecciona el componente en Figma → clic derecho → "Copy link to selection".
 * 3. Reemplaza la URL de abajo con el enlace copiado.
 * 4. Ejecuta: npm run figma:connect:publish
 */
import figma from "@figma/code-connect/react"

import { BdpInactiveBanner } from "./bdp-inactive-banner"

figma.connect(
  BdpInactiveBanner,
  "https://www.figma.com/design/VOCH4pGubqSYza7CbL30c7/El-Captain-DS?node-id=1-1",
  {
    imports: [
      'import { BdpInactiveBanner } from "@/components/boats/bdp/bdp-inactive-banner"',
    ],
    example: () => <BdpInactiveBanner />,
  }
)
