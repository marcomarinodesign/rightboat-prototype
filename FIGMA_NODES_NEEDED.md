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

**SRP existente (no modificar):** [SRP default](https://www.figma.com/design/VOCH4pGubqSYza7CbL30c7/El-Captain-DS?node-id=83-737)

**SRP split (Code Connect):** [SRP / Split view](https://www.figma.com/design/VOCH4pGubqSYza7CbL30c7/El-Captain-DS?node-id=279-1422)

---

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

## Flujo para completar la conexión

```
1. Crear nodo en Figma (ver estructura arriba)
2. Seleccionar el frame/componente → clic derecho → "Copy link to selection"
3. Abrir el .figma.tsx correspondiente
4. Reemplazar la URL placeholder (node-id=1-1) con la URL copiada
5. npm run figma:connect:publish
6. Verificar en Figma Dev Mode que aparece el snippet de código
```
