# Registro de sincronización diseño ↔ código

Añade aquí una línea por **cambio grande** de UI (nueva plantilla, refactor visual amplio, nueva librería en Figma), para que quede historial en git junto al código.

Formato sugerido:

```text
- YYYY-MM-DD — Breve descripción — [Figma (selección)](https://www.figma.com/design/VOCH4pGubqSYza7CbL30c7/...?node-id=X-Y) — PR #N
```

## Entradas

- 2026-08-17 — Prueba de AI Conversational Search (Smart Filter): campo NL en homepage + SRP, chips interpretados sobre el listing split. Brief: [`docs/CONVERSATIONAL_SEARCH.md`](docs/CONVERSATIONAL_SEARCH.md).
- 2026-08-17 — SRP split view gana el experimento Q2 y queda como listing live (sidebar + grid 3 col). El grid 4 col + drawer se archiva en `/archive/srp-grid`. Figma: [Split view 279-1422](https://www.figma.com/design/VOCH4pGubqSYza7CbL30c7/El-Captain-DS?node-id=279-1422); archivo: [83-737](https://www.figma.com/design/VOCH4pGubqSYza7CbL30c7/El-Captain-DS?node-id=83-737).
- 2026-05-21 — Boat Card Alt CTA — SRP grid prioridad: **Manufacture** (mayoría, primeras posiciones) → Sponsored → Simple; ratio base 8/4/3 por 15 (`srp-grid-card-variant.ts`). Figma SRP alineado.
- 2026-05-21 — SRP page header (Boats for sale + intro) — [SRP / Page Header](https://www.figma.com/design/VOCH4pGubqSYza7CbL30c7/El-Captain-DS?node-id=301-77) en el SRP live (split) y en el grid archivado; Code Connect `boats-for-sale-page-header.figma.tsx`.
- 2026-05-21 — SRP hero + sort/filter selects — componentes DS: [SRP / Sort Select](https://www.figma.com/design/VOCH4pGubqSYza7CbL30c7/El-Captain-DS?node-id=296-81) (variantes Featured / precio / newest), [Filters / Select Field](https://www.figma.com/design/VOCH4pGubqSYza7CbL30c7/El-Captain-DS?node-id=294-87). Wireframe split actualizado (hero instancia + toolbar con sort 176px).
- 2026-05-21 — SRP split-view — panel filtros alineado a captura prototipo; componentes DS en **Complex Components**: Form Body (289-310), Location Filter (289-102), Price Histogram (289-161), Location Tabs, Filter Section, Divider, Save Search. Wireframe: [SRP / Split view](https://www.figma.com/design/VOCH4pGubqSYza7CbL30c7/El-Captain-DS?node-id=279-1422). Ref captura (opcional borrar): [284-1674](https://www.figma.com/design/VOCH4pGubqSYza7CbL30c7/El-Captain-DS?node-id=284-1674).
