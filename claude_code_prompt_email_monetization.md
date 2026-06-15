# Cursor Prompt — Email Monetization: Saved Search Email Redesign
# Q2 2026 · PRD: Saved Search Email Monetization

---

## PHASE 0 — LEE EL CONTEXTO DEL PROYECTO PRIMERO

Antes de tocar nada, lee en este orden:

1. `CLAUDE.md` — fuente de verdad del proyecto.
2. `DESIGN_SYSTEM.md` — tokens, componentes, reglas de naming.
3. `figma.config.json` — fileKey de Figma (`VOCH4pGubqSYza7CbL30c7`, archivo `El-Captain-DS`).
4. `src/components/email/saved-search-email.tsx` — los componentes starter ya creados (HeroBanner, NativeAdCard, FooterSponsor, SavedSearchEmail).
5. `src/components/patterns/listing-card.tsx` — patrón de card existente que se reutiliza dentro del email.
6. `src/components/ui/` — primitives disponibles (Button, Card, Badge, Image, etc.).
7. Cualquier archivo `.figma.tsx` existente en `src/components/` para entender el patrón Code Connect.

**Antes de continuar, confirma:**
- ¿Están los tipos `SavedSearchContext`, `AdCreative`, `SearchListing` bien definidos en `saved-search-email.tsx`?
- ¿Usa los tokens del design system (`bg-primary`, `text-muted-foreground`, `border-border-card`, `rounded-lg`, `bg-midnight`, etc.)? No deben existir colores hex hardcodeados.
- ¿Existe ya una ruta de demo o Storybook story para este componente?

---

## PHASE 1 — REVISA Y COMPLETA LOS COMPONENTES

El archivo starter `src/components/email/saved-search-email.tsx` contiene los 5 componentes:

| Componente | Slot(s) | Descripción |
|---|---|---|
| `PremiumPartnerBanner` | #1 | Hero full-bleed, top del email |
| `ServiceSponsorCard` | #2, #3 | Native card entre listings |
| `TrustedPartnerBanner` | #4 | Hero full-bleed, pre-footer |
| `FooterSponsor` | #5, #6, #7 | Pills en sección Buyer Resources |
| `SavedSearchEmail` | Todos | Template assembly completo (7 slots) |

### Tareas de revisión y completado:

1. **Verifica tokens**: Asegúrate de que cada componente usa únicamente clases Tailwind semánticas del design system. Ningún `#hex` directo.

2. **Crea la ruta de demo**: `src/app/email-preview/page.tsx`
   - Renderiza `<SavedSearchEmail showDevLabels />` con datos mock.
   - Incluye datos mock realistas para los 4 segmentos de targeting (ver Phase 2).
   - Accesible en `/email-preview` durante desarrollo.

3. **Crea el mock data file**: `src/data/email-monetization-mock.ts`
   - Exporta `mockSavedSearchEmailProps` para cada uno de los 4 segmentos de targeting:
     - `centerConsoleProps` → sponsors: Insurance + Trailer
     - `sailboatProps` → sponsors: Insurance + Electronics
     - `yachtProps` → sponsors: Financing + Crew services
     - `catamaranProps` → sponsors: Transport
   - Usa imágenes de placeholder de `/public/` o URLs de `picsum.photos`.

4. **Crea el selector de segmentos** en `/email-preview`:
   - Un row de 4 botones (Center Console | Sailboat | Yacht | Catamaran) para cambiar el mock activo y verificar el targeting visualmente.

5. **Verifica el layout de 600px**:
   - El email debe ser `max-w-[600px]` centrado — estándar de email clients.
   - En pantallas más pequeñas, el grid de 2 columnas de listings y el grid de 3 footerSponsors deben colapsar a 1 columna (`grid-cols-1`).

6. **Fallback de ad slots vacíos**:
   - Cada componente de ad debe aceptar `creative?: AdCreative | null` y renderizar un placeholder `bg-muted rounded-lg` cuando no hay creative (house ad fallback, recomendado por GAM).

---

## PHASE 2 — TARGETING LOGIC HELPER

Crea `src/lib/email-targeting.ts`:

```typescript
import type { BoatType, AdCreative } from "@/components/email/saved-search-email"

/**
 * Returns the recommended sponsor category for a given boat type.
 * Based on PRD behavioral targeting examples.
 */
export function getSponsorCategories(boatType: BoatType): string[] {
  const map: Record<BoatType, string[]> = {
    "center-console": ["Insurance", "Trailer"],
    sailboat:         ["Insurance", "Electronics"],
    yacht:            ["Financing", "Crew services"],
    catamaran:        ["Transport"],
    other:            ["Insurance"],
  }
  return map[boatType] ?? map.other
}

/**
 * Picks the contextually relevant ad creatives for a saved search context.
 * In production this logic lives server-side (GAM targeting); this helper
 * is for prototype demo and Storybook stories only.
 */
export function pickAdsForContext(
  boatType: BoatType,
  allCreatives: Record<string, AdCreative>
): { premiumPartner: AdCreative; serviceSponsors: [AdCreative, AdCreative]; trustedPartner: AdCreative; footerSponsors: [AdCreative, AdCreative, AdCreative] } {
  // TODO: implement creative selection logic based on boatType
  // Stub implementation — replace with real logic
  const fallback: AdCreative = {
    imageUrl: "/brands/broker-placeholder.svg",
    altText: "Sponsored",
    clickUrl: "#",
    sponsorName: "Sponsor",
  }
  return {
    premiumPartner: allCreatives[boatType + "-premium"] ?? fallback,
    serviceSponsors: [
      allCreatives[boatType + "-service-1"] ?? fallback,
      allCreatives[boatType + "-service-2"] ?? fallback,
    ],
    trustedPartner: allCreatives[boatType + "-trusted"] ?? fallback,
    footerSponsors: [
      allCreatives[boatType + "-footer-1"] ?? fallback,
      allCreatives[boatType + "-footer-2"] ?? fallback,
      allCreatives[boatType + "-footer-3"] ?? fallback,
    ],
  }
}
```

---

## PHASE 3 — CODE CONNECT (Figma ↔ Code)

El Figma file es `El-Captain-DS`:
- **File URL**: `https://www.figma.com/design/VOCH4pGubqSYza7CbL30c7/El-Captain-DS`
- **File key**: `VOCH4pGubqSYza7CbL30c7`

### 3A — Crea los archivos Code Connect

Para cada componente, crea su `.figma.tsx` siguiendo el patrón de `button.figma.tsx` y `listing-card.figma.tsx`:

**`src/components/email/premium-partner-banner.figma.tsx`**
```typescript
// FIGMA NODE: Email / Ad Slots / Premium Partner Banner
// FIGMA FILE: https://www.figma.com/design/VOCH4pGubqSYza7CbL30c7/El-Captain-DS
// STATUS: pendiente de crear en Figma
// LAST SYNC: 2026-05-26
import figma from "@figma/code-connect/react"
import { PremiumPartnerBanner } from "./saved-search-email"

figma.connect(
  PremiumPartnerBanner,
  "https://www.figma.com/design/VOCH4pGubqSYza7CbL30c7/El-Captain-DS?node-id=TODO",
  {
    imports: ['import { PremiumPartnerBanner } from "@/components/email/saved-search-email"'],
    example: () => (
      <PremiumPartnerBanner
        creative={{
          imageUrl: "/brands/broker-placeholder.svg",
          altText: "Premium partner ad",
          clickUrl: "#",
          sponsorName: "Acme Insurance",
          tagline: "Get covered before you sail",
        }}
      />
    ),
  }
)
```

Repite el mismo patrón para:
- `service-sponsor-card.figma.tsx` → `ServiceSponsorCard`
- `trusted-partner-banner.figma.tsx` → `TrustedPartnerBanner`
- `footer-sponsor.figma.tsx` → `FooterSponsor`
- `saved-search-email.figma.tsx` → `SavedSearchEmail` (el template completo)

### 3B — Nodos a crear en El-Captain-DS

Si los nodos no existen aún en Figma, añádelos a `FIGMA_NODES_NEEDED.md`:

| Componente | Nombre en Figma | Página sugerida | Variantes |
|---|---|---|---|
| `PremiumPartnerBanner` | `Email / Ad Slots / Premium Partner` | Email | — |
| `ServiceSponsorCard` | `Email / Ad Slots / Service Sponsor` | Email | slotIndex: 1, 2 |
| `TrustedPartnerBanner` | `Email / Ad Slots / Trusted Partner` | Email | — |
| `FooterSponsor` | `Email / Ad Slots / Footer Sponsor` | Email | slotIndex: 1, 2, 3 |
| `SavedSearchEmail` | `Email / Templates / Saved Search` | Email | boatType: center-console, sailboat, yacht, catamaran |

### 3C — Publica a Figma

```bash
npx figma connect publish
```

Si falla por autenticación:
```bash
npx figma connect publish --token $FIGMA_ACCESS_TOKEN
```

---

## PHASE 4 — TECHNICAL NOTES (GAM Integration)

Estos son los constraints técnicos del PRD a tener en cuenta durante la implementación:

- **Solo static images**: GAM Newsletter Ads (beta) no soporta JavaScript ni animaciones. El prototipo puede usar componentes React, pero los creativos en producción deben ser imágenes estáticas.
- **Tagless ad serving**: En producción, los ads se sirven via `<a>` + `<img>` tags estándar (no hay tags de JavaScript de GAM en el email).
- **Tamaños recomendados para brief a Ad Ops / Omar Solis**:
  - `PremiumPartnerBanner`: 600×150px (aspect-ratio 4:1)
  - `TrustedPartnerBanner`: 600×200px (aspect-ratio 3:1)
  - `ServiceSponsorCard` image: 96×64px
  - `FooterSponsor` image: cualquier aspect-ratio ~16:9
- **House ad fallback**: Cada slot debe tener una house creative configurada en GAM para evitar espacios vacíos si no hay paid fill.
- **Targeting limitations**: Apple Mail Privacy Protection y Gmail image caching reducen precisión de geo/device targeting. El targeting contextual (por tipo de barco) es más fiable.

---

## DONE WHEN

- [ ] Phase 0 — contexto y tokens verificados, sin hex hardcodeados
- [ ] `src/components/email/saved-search-email.tsx` — los 5 componentes funcionan con props reales
- [ ] `src/app/email-preview/page.tsx` — demo route accesible en `/email-preview`
- [ ] `src/data/email-monetization-mock.ts` — 4 segmentos de targeting con datos mock
- [ ] `src/lib/email-targeting.ts` — helper de targeting creado
- [ ] Selector de segmentos funcional en `/email-preview`
- [ ] Fallback de ad slot vacío implementado en todos los componentes
- [ ] Layout 600px verificado, grid responsivo funciona en móvil
- [ ] `.figma.tsx` para los 5 componentes creados (con `// TODO: node-id` si no existen en Figma aún)
- [ ] `FIGMA_NODES_NEEDED.md` actualizado con los nodos del email
- [ ] `npx figma connect publish` ejecutado (o errores documentados)
- [ ] Sin errores de TypeScript (`npx tsc --noEmit`)

---

## REFERENCIA

- **PRD completo**: `~/Documents/Rightboat/Q2 2026 Product Roadmap/Product Requirements Document (PRD): Saved Search Email Monetization.pdf`
- **Componentes starter**: `src/components/email/saved-search-email.tsx`
- **Design system**: `DESIGN_SYSTEM.md`
- **Figma file**: `https://www.figma.com/design/VOCH4pGubqSYza7CbL30c7/El-Captain-DS`
- **Code Connect guide**: `docs/CODE_CONNECT.md`
- **Targeting summary** (del PRD):
  - Center Console → Insurance + Trailer
  - Sailboat → Insurance + Electronics
  - Yacht → Financing + Crew services
  - Catamaran → Transport
