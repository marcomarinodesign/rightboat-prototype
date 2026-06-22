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
| `BoatCard`             | `src/components/boats/boat-card.figma.tsx`                    | Boat Card                  | Cards            | Variant: Grid / List              | Boat Name, Price, Year, Length, Location             |
| BDP — Active           | `src/components/boats/bdp/bdp-detail-page.figma.tsx`          | BDP / Active               | BDP              | State: Active                     | Boat Name, Price, Year, Length, Location             |
| BDP — Inactive         | `src/components/boats/bdp/bdp-detail-page-inactive.figma.tsx` | BDP / Inactive             | BDP              | State: Inactive (o frame separado)| Boat Name, Listed Price, Boat Type                   |

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

**Variantes en Figma:**
- `Variant = Grid` (default) — layout vertical, imagen arriba, detalles abajo
- `Variant = List` — layout horizontal, imagen izquierda (40%), detalles derecha

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
