# Nodos pendientes de crear en El-Captain-DS

**Figma file**: https://www.figma.com/design/VOCH4pGubqSYza7CbL30c7/El-Captain-DS

Una vez creados en Figma, copia el enlace al nodo (clic derecho → "Copy link to selection"),
reemplázalo en el `.figma.tsx` correspondiente y ejecuta:

```bash
npm run figma:connect:publish
```

---

## Tabla de nodos pendientes

| Componente             | Archivo Code Connect                                          | Nombre sugerido en Figma   | Página / sección | Variantes necesarias              | Props Figma                                          |
|------------------------|---------------------------------------------------------------|----------------------------|------------------|-----------------------------------|------------------------------------------------------|
| `BdpInactiveBanner`    | `src/components/boats/bdp/bdp-inactive-banner.figma.tsx`      | Status Banner / Inactive   | BDP              | —                                 | — (sin props externas; contenido fijo)               |
| BDP — Active           | `src/components/boats/bdp/bdp-detail-page.figma.tsx`          | BDP / Active               | BDP              | State: Active                     | Boat Name, Price, Year, Length, Location             |
| BDP — Inactive         | `src/components/boats/bdp/bdp-detail-page-inactive.figma.tsx` | BDP / Inactive             | BDP              | State: Inactive (o frame separado)| Boat Name, Listed Price, Boat Type                   |
| SRP — Split view       | `src/components/filters/boats-for-sale-listing.figma.tsx`     | SRP / Split view           | Test Cursor      | — (frame de pantalla)             | Hero, Filters panel, Results 3-col                   |
| SRP — Page Header      | `src/components/filters/boats-for-sale-page-header.figma.tsx` | SRP / Page Header          | Complex Components | breadcrumb, H1, intro           | [301-77](https://www.figma.com/design/VOCH4pGubqSYza7CbL30c7/El-Captain-DS?node-id=301-77) |
| SRP — Sort Select      | `src/components/filters/listing-sort-select.figma.tsx`        | SRP / Sort Select          | Complex Components | Label: Featured / price / newest | [296-81](https://www.figma.com/design/VOCH4pGubqSYza7CbL30c7/El-Captain-DS?node-id=296-81) |
| Filters — Select Field | `src/components/filters/filters-select-field.figma.tsx`       | Filters / Select Field     | Complex Components | placeholder, disabled           | [294-87](https://www.figma.com/design/VOCH4pGubqSYza7CbL30c7/El-Captain-DS?node-id=294-87) |
| `FiltersFormBody`      | `src/components/filters/filters-form-body.figma.tsx`          | Filters / Form Body        | Complex Components | —                               | [289-310](https://www.figma.com/design/VOCH4pGubqSYza7CbL30c7/El-Captain-DS?node-id=289-310) |
| `LocationFilter`       | `src/components/filters/location-filter.figma.tsx`            | Filters / Location Filter  | Complex Components | —                               | [289-102](https://www.figma.com/design/VOCH4pGubqSYza7CbL30c7/El-Captain-DS?node-id=289-102) |
| `PriceHistogram`       | `src/components/filters/price-histogram.figma.tsx`            | Filters / Price Histogram  | Complex Components | —                               | [289-161](https://www.figma.com/design/VOCH4pGubqSYza7CbL30c7/El-Captain-DS?node-id=289-161) |
| `BoatCard`             | `src/components/boats/boat-card.figma.tsx`                    | Boat Card                  | Components       | Simple / Sponsored / Manufacture + Alt* (SRP) | [80-65](https://www.figma.com/design/VOCH4pGubqSYza7CbL30c7/El-Captain-DS?node-id=80-65) — Alt* solo en SRP |
| SRP — Default          | `src/components/filters/boats-for-sale-listing.figma.tsx`     | SRP                        | Test Cursor      | 4-col grid + drawer (código)      | `SrpDefaultView` → node 83-737                       |
| `PremiumPartnerBanner` | `src/components/email/premium-partner-banner.figma.tsx`       | Email / Ad Slots / Premium Partner | Email      | —                                 | 600×150 hero · aspect 4:1                            |
| `ServiceSponsorCard`   | `src/components/email/service-sponsor-card.figma.tsx`         | Email / Ad Slots / Service Sponsor | Email    | slotIndex: 1, 2                   | Native card · 96×64 image                            |
| `TrustedPartnerBanner` | `src/components/email/trusted-partner-banner.figma.tsx`       | Email / Ad Slots / Trusted Partner | Email    | —                                 | 600×200 hero · aspect 3:1                            |
| `FooterSponsor`        | `src/components/email/footer-sponsor.figma.tsx`               | Email / Ad Slots / Footer Sponsor | Email     | slotIndex: 1, 2, 3                | Buyer Resources pill · ~16:9 image                   |
| `SavedSearchEmail`     | `src/components/email/saved-search-email.figma.tsx`           | Email / Templates / Saved Search | Email      | boatType: center-console, sailboat, yacht, catamaran | Full template · 7 ad slots · 600px max width |

**SRP existente (no modificar):** [SRP default](https://www.figma.com/design/VOCH4pGubqSYza7CbL30c7/El-Captain-DS?node-id=83-737)

**SRP split (Code Connect):** [SRP / Split view](https://www.figma.com/design/VOCH4pGubqSYza7CbL30c7/El-Captain-DS?node-id=279-1422)

---

## FSBO flow — Code Connect (FSBO-Page)

**Figma file:** [FSBO-Page](https://www.figma.com/design/1JdEElYI3kToAhnJwXedF0/FSBO-Page) (`fileKey: 1JdEElYI3kToAhnJwXedF0`)

**Página:** [Q2 Design Cursor](https://www.figma.com/design/1JdEElYI3kToAhnJwXedF0/FSBO-Page?node-id=71-1508) — sección `FSBO / Code Connect`

**Code Connect pantallas:** [`src/app/fsbo/fsbo-flow.figma.tsx`](src/app/fsbo/fsbo-flow.figma.tsx)

**Rutas prototipo:** `/fsbo`, `/fsbo/wizard`, `/fsbo/success-preview`

| Frame Figma | Node ID | Viewport | `figmaPreview` / wrapper |
|-------------|---------|----------|--------------------------|
| FSBO / Landing / Desktop | [74-14](https://www.figma.com/design/1JdEElYI3kToAhnJwXedF0/FSBO-Page?node-id=74-14) | 1440×900 | `FSBOLandingClient figmaPreview="desktop"` |
| FSBO / Landing / Mobile | [74-17](https://www.figma.com/design/1JdEElYI3kToAhnJwXedF0/FSBO-Page?node-id=74-17) | 402×874 | `figmaPreview="mobile"` |
| FSBO / Step 1 — Your Boat / Desktop | [74-20](https://www.figma.com/design/1JdEElYI3kToAhnJwXedF0/FSBO-Page?node-id=74-20) | 1440×900 | `BoatFormFSBO figmaPreview="step-1"` |
| FSBO / Step 1 — Your Boat / Mobile | [74-23](https://www.figma.com/design/1JdEElYI3kToAhnJwXedF0/FSBO-Page?node-id=74-23) | 402×874 | `previewMode="mobile"` |
| FSBO / Step 2 — Photos / Desktop | [74-26](https://www.figma.com/design/1JdEElYI3kToAhnJwXedF0/FSBO-Page?node-id=74-26) | 1440×900 | `figmaPreview="step-2"` |
| FSBO / Step 2 — Photos / Mobile | [74-29](https://www.figma.com/design/1JdEElYI3kToAhnJwXedF0/FSBO-Page?node-id=74-29) | 402×874 | `previewMode="mobile"` |
| FSBO / Step 3 — Your Details / Desktop | [74-32](https://www.figma.com/design/1JdEElYI3kToAhnJwXedF0/FSBO-Page?node-id=74-32) | 1440×900 | `figmaPreview="step-3"` |
| FSBO / Step 3 — Your Details / Mobile | [74-35](https://www.figma.com/design/1JdEElYI3kToAhnJwXedF0/FSBO-Page?node-id=74-35) | 402×874 | `previewMode="mobile"` |
| FSBO / Step 4 — Choose Plan / Desktop | [74-38](https://www.figma.com/design/1JdEElYI3kToAhnJwXedF0/FSBO-Page?node-id=74-38) | 1440×900 | `figmaPreview="step-4"` |
| FSBO / Step 4 — Choose Plan / Mobile | [74-41](https://www.figma.com/design/1JdEElYI3kToAhnJwXedF0/FSBO-Page?node-id=74-41) | 402×874 | `previewMode="mobile"` |
| FSBO / Step 5 — Payment / Desktop | [74-44](https://www.figma.com/design/1JdEElYI3kToAhnJwXedF0/FSBO-Page?node-id=74-44) | 1440×900 | `figmaPreview="step-5"` |
| FSBO / Step 5 — Payment / Mobile | [74-47](https://www.figma.com/design/1JdEElYI3kToAhnJwXedF0/FSBO-Page?node-id=74-47) | 402×874 | `previewMode="mobile"` |
| FSBO / Success / Desktop | [74-50](https://www.figma.com/design/1JdEElYI3kToAhnJwXedF0/FSBO-Page?node-id=74-50) | 1440×900 | `FSBOSuccessScreen` |
| FSBO / Success / Mobile | [74-53](https://www.figma.com/design/1JdEElYI3kToAhnJwXedF0/FSBO-Page?node-id=74-53) | 402×874 | mobile shell |

### Gaps DS — componentes FSBO (crear en El-Captain-DS)

| Componente código | Archivo Code Connect | Nodo provisional | Acción en Figma |
|-------------------|----------------------|------------------|-----------------|
| `PackageCard` | `src/components/fsbo/PackageCard.figma.tsx` | Card `32-2` | Crear **FSBO / Package Card** (Basic, Premium) |
| `BoatTypeSelector` | `src/components/fsbo/BoatTypeSelector.figma.tsx` | Filters Select `294-87` | Crear **FSBO / Boat Type Selector** (8 tiles) |
| `PillGroup` | `src/components/ui/pill-group.figma.tsx` | Select compact `294-93` | Crear **Pill Group** en DS |
| `FSBOPhotoGrid` | `src/components/fsbo/FSBOPhotoGrid.figma.tsx` | Gallery Mobile `188-1282` | Crear **FSBO / Photo Grid** |
| `MockCardForm` | `src/components/fsbo/MockCardForm.figma.tsx` | Input `28-8` | Crear **FSBO / Payment Form** |

### Primitivos DS — Code Connect (`src/components/ui/*.figma.tsx`)

| Componente | Node El-Captain-DS |
|------------|-------------------|
| Button | [24-2](https://www.figma.com/design/VOCH4pGubqSYza7CbL30c7/El-Captain-DS?node-id=24-2) |
| Badge | [26-8](https://www.figma.com/design/VOCH4pGubqSYza7CbL30c7/El-Captain-DS?node-id=26-8) |
| Input | [28-8](https://www.figma.com/design/VOCH4pGubqSYza7CbL30c7/El-Captain-DS?node-id=28-8) |
| Select | [29-14](https://www.figma.com/design/VOCH4pGubqSYza7CbL30c7/El-Captain-DS?node-id=29-14) |
| Checkbox | [30-16](https://www.figma.com/design/VOCH4pGubqSYza7CbL30c7/El-Captain-DS?node-id=30-16) |
| Switch | [31-14](https://www.figma.com/design/VOCH4pGubqSYza7CbL30c7/El-Captain-DS?node-id=31-14) |
| Card | [32-2](https://www.figma.com/design/VOCH4pGubqSYza7CbL30c7/El-Captain-DS?node-id=32-2) |
| Label | [39-9](https://www.figma.com/design/VOCH4pGubqSYza7CbL30c7/El-Captain-DS?node-id=39-9) |
| Progress | [40-8](https://www.figma.com/design/VOCH4pGubqSYza7CbL30c7/El-Captain-DS?node-id=40-8) |

---

## Mobile Overview / SRP Split (402×874)

Página Figma: [Mobile Overview](https://www.figma.com/design/VOCH4pGubqSYza7CbL30c7/El-Captain-DS?node-id=333-2055)

Ruta prototipo: `/boats-for-sale?layout=split` (+ `figmaPreview` para estados de captura).

| Frame Figma | Node ID | Code Connect | `figmaPreview` |
|-------------|---------|--------------|------------------|
| SRP / Mobile — Default | [333-2056](https://www.figma.com/design/VOCH4pGubqSYza7CbL30c7/El-Captain-DS?node-id=333-2056) | `boats-for-sale-listing-mobile.figma.tsx` | `default` |
| SRP / Mobile — Filters Open | [337-5](https://www.figma.com/design/VOCH4pGubqSYza7CbL30c7/El-Captain-DS?node-id=337-5) | `filters-drawer.figma.tsx` | `filters-open` |
| SRP / Mobile — Active Filters | [337-6](https://www.figma.com/design/VOCH4pGubqSYza7CbL30c7/El-Captain-DS?node-id=337-6) | `boats-for-sale-listing-mobile.figma.tsx` | `active-filters` |
| SRP / Mobile — Empty State | [337-7](https://www.figma.com/design/VOCH4pGubqSYza7CbL30c7/El-Captain-DS?node-id=337-7) | `boats-for-sale-listing-mobile.figma.tsx` | `empty` |
| SRP / Mobile — Sort Open | [337-8](https://www.figma.com/design/VOCH4pGubqSYza7CbL30c7/El-Captain-DS?node-id=337-8) | `boats-for-sale-listing-mobile.figma.tsx` | `sort-open` |
| SRP / Mobile — Filters Scrolled | [337-9](https://www.figma.com/design/VOCH4pGubqSYza7CbL30c7/El-Captain-DS?node-id=337-9) | `filters-drawer.figma.tsx` | `filters-scrolled` |
| SRP / Mobile — Save Search Toast | [337-10](https://www.figma.com/design/VOCH4pGubqSYza7CbL30c7/El-Captain-DS?node-id=337-10) | `boats-for-sale-listing-mobile.figma.tsx` | `save-search-toast` |
| SRP / Mobile — Marketing Footer | [337-11](https://www.figma.com/design/VOCH4pGubqSYza7CbL30c7/El-Captain-DS?node-id=337-11) | `boats-for-sale-page-mobile.figma.tsx` | `marketing-footer` |

Captura desde localhost (dev server + Figma MCP):

```bash
# Un estado
node scripts/figma-local-capture.cjs <captureId> srp-mobile filters-open

# Lote (7 estados; generar captureId por frame con generate_figma_design)
node scripts/figma-srp-mobile-batch-capture.cjs <id1> <id2> ... <id7>
```


## Notas de diseño para cada nodo

### 1. Status Banner / Inactive (`BdpInactiveBanner`)

Banner sticky que se muestra debajo del nav principal cuando un listing está vendido.

**Estructura sugerida en Figma:**
- Frame: `Status Banner / Inactive`, 100% width, min-height 56px
- Background: `Status/Info/100` (`#F4F9FF`)
- Border bottom: `Neutral/200`
- Contenido (layout horizontal, justify: space-between, padding 12px 32px):
  - Izquierda: icono Info (Blue/400) + columna de texto:
    - Headline: "This boat has been sold" — `text-sm font-semibold`
    - Subtext: "But we've found similar options that might interest you" — `text-sm text-muted-foreground`
  - Derecha: botón primario "See similar boats ↓", min-height 44px (WCAG 2.5.5)

---

### 2. Boat Card (`BoatCard`)

Tarjeta de listing usada en grids de búsqueda y en la sección "Similar boats" del BDP inactivo.

**Variantes en Figma (Property 1):**
- `Simple` / `Sponsored` / `Manufacture` — CTA full-width; homepage, carousels, BDP
- `AltSimple` / `AltSponsored` / `AltManufacture` — broker + CTA en fila; **solo grids SRP** (`83-737`, `279-1422`)

**Props del component set:**
- `Boat Name` (string)
- `Price` (string)
- `Year` (string)
- `Length` (string)
- `Location` (string)
- `Broker` (string)
- `Featured` (boolean) — muestra badge "Sponsored"

---

### 3. BDP / Active

Frame de pantalla completa del Boat Detail Page en estado activo (listing disponible).

**Elementos clave:**
- Breadcrumb
- Galería (carousel, 16:9, sin badge)
- H1 con año / marca / modelo
- Key specs card (precio activo, eslora, condición, año, broker)
- Contact Seller form en el aside derecho
- Sección "Similar boats" al pie (3 columnas)

---

### 4. BDP / Inactive

Frame o variante del BDP en estado inactivo (listing vendido/retirado).

**Diferencias respecto a BDP / Active:**
- `BdpInactiveBanner` sticky debajo del nav
- Badge "Sold" (pill, dark semi-transparent, top-left) sobre la primera imagen de la galería
- Precio → "Listed at £24,500" (etiqueta histórica, no activo)
- Contact form → **eliminado**
- Phone CTA → **eliminado**
- Aside → Card con precio histórico + link "Find similar Seacamper boats →"
- Sección "Similar boats" → título dinámico + subtítulo + 4 cards + "View all →"

**Demo route en el prototipo:** `/boats-for-sale/seacamper/24/rb226195`

---

## Email monetization (Saved Search)

**Demo route:** `/email-preview` — selector de 4 segmentos (Center Console, Sailboat, Yacht, Catamaran).

### 5. Email / Ad Slots / Premium Partner (`PremiumPartnerBanner`)

Hero full-bleed at top of email. **600×150px** (aspect 4:1).

- Frame width: 600px max
- Image fill + "Sponsored" badge bottom-right
- Optional dev label overlay (preview only)

### 6. Email / Ad Slots / Service Sponsor (`ServiceSponsorCard`)

Native card between listing rows. Variants: `slotIndex` 1 | 2.

- Horizontal layout: 96×64 thumbnail + sponsor name + tagline + CTA
- Uses `Card` + `border-border-card`

### 7. Email / Ad Slots / Trusted Partner (`TrustedPartnerBanner`)

Pre-footer hero banner. **600×200px** (aspect 3:1).

- Optional tagline overlay with `from-midnight/40` gradient

### 8. Email / Ad Slots / Footer Sponsor (`FooterSponsor`)

Buyer Resources pills in footer. Variants: `slotIndex` 1 | 2 | 3.

- ~16:9 image + title + tagline + Sponsored badge
- Grid: 3 columns desktop, 1 column mobile

### 9. Email / Templates / Saved Search (`SavedSearchEmail`)

Full email template assembly (7 ad slots + listings).

- Max width 600px, centered
- Variants by `boatType`: center-console, sailboat, yacht, catamaran
- Listings grid: 2 columns desktop, 1 column mobile

---

## Flujo para completar la conexión

```
1. Crear nodo en Figma (ver estructura arriba)
2. Seleccionar el frame/componente → clic derecho → "Copy link to selection"
3. Abrir el .figma.tsx correspondiente
4. Reemplazar la URL placeholder (node-id=1-1) con la URL copiada
5. npm run figma:connect:publish
6. Verificar en Figma Dev Mode que aparece el snippet de código
```
