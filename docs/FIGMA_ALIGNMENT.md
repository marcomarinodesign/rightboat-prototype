# Alineación con Figma — El Captain DS

**Brief para Claude Code.** Escrito el 17 ago 2026 tras reestructurar el design system en Figma.

Archivo Figma: `VOCH4pGubqSYza7CbL30c7` — El Captain DS
Backlog de diseño: `Second brain/Quantum Studio/Rightboat/DS Backlog.md`

---

## 0 · Contexto que necesitas antes de tocar nada

Hay **tres fuentes**, no dos:

| Fuente | Qué es | Stack |
|---|---|---|
| **rightboat.com** | Lo que existe hoy en producción | Ruby on Rails + Turbo, Tailwind compilado en un bundle de Sprockets |
| **este repo** | La propuesta, en construcción | Next.js + Tailwind + shadcn/ui + Radix |
| **Figma El Captain DS** | La fuente de verdad de diseño | — |

**Figma y este repo mandan.** Producción es el legado que migrará con el tiempo. Cuando encuentres una diferencia con producción, no es un bug: probablemente es la propuesta. Cuando encuentres una diferencia entre Figma y este repo, **Figma manda**, salvo en los puntos marcados como decisión pendiente al final.

En Figma hay una página `🔀 Production ↔ Proposal` con la comparación completa. Cada página de producto tiene un frame de spec con un panel final etiquetado `PROPOSAL` / `OPEN` / `DONE`. Léelos antes de decidir nada.

**SRP:** split view ganó el experimento de Q2. `/boats-for-sale` es sidebar + grid 3 col en desktop (drawer en mobile). El grid 4 col está archivado en `/archive/srp-grid` — no lo reactives ni lo alinees como si fuera el listing live.

---

## 1 · Tokens — verificar, no reescribir

Figma tiene ahora una colección `Semantic` con modos Light y Dark construida **a partir de `src/app/globals.css`**. El código ya era correcto; era Figma quien estaba desalineado.

**Tarea:** verificar que `globals.css` sigue conteniendo exactamente estos mapeos y corregir sólo si hay desviación.

```
--background        → --neutral-white      --border      → --neutral-200
--foreground        → --midnight           --input       → --neutral-200
--card              → --neutral-white      --border-card → --neutral-200
--card-foreground   → --midnight           --ring        → --blue-400
--primary           → --blue-400           --destructive → --status-error-200
--primary-foreground→ --neutral-white      --tag-bg      → --status-info-100
--secondary         → --blue-200
--secondary-foreground → --neutral-white
--muted             → --neutral-100
--muted-foreground  → --neutral-500        ← crítico, ver abajo
--accent            → --malibu-500
--accent-foreground → --neutral-white
```

⚠️ **`--muted-foreground` debe resolver a `--neutral-500` (#51545C).** En Figma estaba en #7181B4, que da 3,5:1 sobre blanco y falla AA para texto. Es el color de placeholders y textos de ayuda en todo el producto. Si en algún sitio del código hay un #7181B4 hardcodeado, sustitúyelo.

**Radius — no tocar.** La escala de este repo (`--radius: 0.75rem` = 12px, con offsets calc) es la que gana. Producción usa la escala por defecto de Tailwind, donde `rounded-lg` son 8px. Es una colisión de nombres conocida y documentada; la resolverá producción, no nosotros.

**Dark mode.** Figma ya tiene el modo Dark reflejando el bloque `.dark` de `globals.css`. Ocho valores no tienen primitivo y están como hex crudo: `card #1B0A38`, `muted #1F123F`, `muted-foreground #B9C4FF`, `border`/`input`/`border-card #2B1A52`, `destructive #E8645A`, `tag-bg #1F123F`. Si creas una rampa Midnight para ellos, dímelo para replicarla en Figma.

---

## 2 · Primitivos que faltan en código

Existen en Figma como componentes con estados y propiedades. Aquí no existen o están duplicados a mano.

### 2.1 · `Textarea` — crear
Hoy es un `<textarea>` crudo con las clases copiadas a mano en dos sitios:
- `src/components/boats/bdp/bdp-contact-seller.tsx`
- `src/features/sell-boat/components/fsbo/FSBOStep1YourBoat.tsx`

Crear `src/components/ui/textarea.tsx` siguiendo el patrón de `input.tsx`. Estados en Figma: Default, Filled, Focus, Disabled. Mismo borde, radio, padding y anillo de foco que Input; `min-h-24`; texto alineado arriba. El comportamiento de resize difiere a propósito por contexto: el formulario del BDP permite resize vertical, la descripción de FSBO va fija a 160px porque el contador de caracteres depende de una altura estable. Expón `resize` como prop.

### 2.2 · `Radio` — crear
Hoy sólo existe un `<input type="radio">` crudo dentro de `src/components/fsbo/PackageCard.tsx`. `@radix-ui/react-radio-group` **no está instalado**.

Instalarlo y crear `src/components/ui/radio-group.tsx`. Anatomía en Figma: círculo de 20px, borde Blue/400, punto interior de 10px cuando está seleccionado, gap de 8 a la etiqueta — deliberadamente igual que Checkbox para que apilen bien en el mismo formulario.

### 2.3 · `Input` y `Select` — añadir estado `invalid`
`SearchableSelect` ya tiene prop `invalid`; `Input` no. En Figma ambos tienen ahora variante Invalid (borde `--destructive`). Añadir la prop a `input.tsx` y al Select de `ui/select.tsx`.

### 2.4 · `Tab` — extraer
Hay **dos implementaciones distintas** del mismo patrón:
- `LocationFilter` / `LOCATION_TABS_WITH_REGION` en `src/components/filters/`
- Las pestañas Photos / Videos dentro de `src/components/boats/bdp/bdp-gallery-modal.tsx`

En Figma el componente es **la pestaña, no la barra** — una barra de N pestañas es una composición. Crear `src/components/ui/tab.tsx` con `variant: 'segmented' | 'underline'` y `state: 'default' | 'active'`, y recomponer los dos usos.

Segmented va dentro de una pista Neutral/100 con radio pill; la pestaña activa es blanca con `shadow-sm` y **mantiene el peso Regular** — la píldora sola transmite el estado, igual que en producción. Underline lleva subrayado de 2px en `--primary` y sí pasa a Semi Bold.

### 2.5 · `Chip` — extraer
`ActiveFiltersChips` construye los chips inline. En Figma es un componente con `Style: Active | Neutral`, propiedad de etiqueta y booleana de borrado.

Un chip **no es un Badge**: Badge es metadato de sólo lectura, un chip representa algo que el usuario eligió y puede deshacer. Crear `src/components/ui/chip.tsx`.

### 2.6 · `Menu item` — extraer
Es el elemento más repetido a mano de todo el sistema: unas 28 copias entre `searchable-select.tsx`, el picker de regiones y la lista de añadir localización. Crear `src/components/ui/menu-item.tsx` con `state: 'default' | 'hover' | 'selected'`, etiqueta, descripción opcional y check al seleccionar. El picker de regiones usa la descripción ("Washington and Oregon"), la lista plana de fabricantes no.

---

## 3 · Patterns que faltan en código

| Componente | Estado hoy | Qué hacer |
|---|---|---|
| **Disclosure** | La línea "2 locations included · View / Hide" está dibujada a mano 4 veces en el filtro de localización | Extraer. `state: collapsed \| expanded`, resumen + acción. La fila entera es el target, y el verbo va en la acción, no un chevron pelado |
| **Breadcrumb** | Markup suelto en cada plantilla; una lista en `blog-article-layout.tsx` | Crear componente. `<nav aria-label="Breadcrumb">` + lista ordenada + `aria-current="page"` en el último. **Producción tiene 6 niveles** incluyendo la categoría; el nuestro se salta ese nivel |
| **Pagination** | No existe | Crear. Producción pagina a 30 por página vía `?page=N`, hasta 1.029 páginas. Ver decisión D3 |
| **Toast** | `sonner` instalado y disparando en 5 sitios, sin componente propio | Envolver sonner con los estilos de Figma: 356px, radio lg, borde 1px, `shadow-lg`, icono tintado por tipo con las rampas Status |
| **Empty state** | No existe | Crear. La SRP puede devolver cero — excluir todas las localizaciones en el filtro de región es una búsqueda vacía deliberada, no un error |
| **Skeleton** | No existe | Crear. El histograma de precio recalcula en cada cambio de filtro sobre 28.810 listados, y los dos formularios envían sin estado ocupado |
| **Tooltip** | No existe | Crear, con la regla escrita: vale para nombrar un control de sólo icono y para explicar un valor truncado. **No** para nada que el usuario necesite para actuar, ni en móvil |
| **Currency & Units** | No existe | Producción lo tiene en la cabecera de cada página (USD/GBP/EUR y feet/meters). Ver decisión D4 |
| **Botón de sólo icono** | No existe | 10 usos en FSBO. `Button size="icon"` existe pero siempre reserva hueco de etiqueta |
| **Acordeón de sección del BDP** | No existe | 15 usos. Bloque de 841×92 con título — Features, Propulsion, Specifications |

---

## 4 · Iconos

Este repo usa `lucide-react` y **esa es la decisión**. Producción sirve Font Awesome 5 y 6 más SVGs propios en `/icons`; migrará. Figma ya tiene la librería oficial de lucide (1.509 componentes).

Alinear los iconos concretos que Figma usa en cada sitio:

| Dónde | Icono |
|---|---|
| Select, Searchable Select, Disclosure | `ChevronDown` |
| Checkbox, Menu item seleccionado | `Check` |
| Chip (quitar), cerrar diálogos | `X` |
| Nav móvil | `Menu` |
| Pagination, Carousel | `ChevronLeft` / `ChevronRight` |
| Toast Success / Error / Info | `Check` / `Info` |
| Empty state sin resultados / error | `Search` / `Info` |
| Galería del BDP | `Image` / `Play` |
| Save search | `Bookmark` |
| Añadir localización | `Plus` |

**Tamaños:** 16 dentro de botones e inline con texto, 20 para controles sueltos, 24 dentro de Icon Container. El trazo se queda en 2 a cualquier tamaño, que es lo que hace `lucide-react` por defecto. Si aparece un icono a 14px, normalízalo a 16.

**Color:** el icono hereda el color del texto que acompaña. Nunca le des color propio.

---

## 5 · Code Connect

`src/components/boats/boat-card.figma.tsx` **está roto**: mapea `Simple / Sponsored / Manufacture / AltSimple / AltSponsored / AltManufacture`, pero el set en Figma expone `Simple | Sponsored | Sponsored Alt | Manufacture`. Tres de seis claves no resuelven a nada. Regenerarlo.

Además, en Figma se renombraron propiedades de variante. Cualquier `.figma.tsx` que las referencie hay que actualizarlo:

- Boat Card: `Property 1` → **`Variant`**
- Page Header SRP: `Property 1` → **`Variant`**
- Gallery: `Property 1` → **`Breakpoint`**
- Searcher: `Property 1` → **`Breakpoint`**
- Hero Section: `Device` → **`Breakpoint`**

**Sin Code Connect y deberían tenerlo:** Gallery, Article Card, Pop Model Card, Boat Category card, Nav Header, Dialog, Sheet, y todos los patterns nuevos.

---

## 6 · Componentes que hay que extraer

Estos existen en el producto pero **no como componentes**, así que no se pueden reutilizar ni mapear con Code Connect:

- **Pop Model Card** — vive inline dentro de `src/components/home/popular-models.tsx`
- **Boat Category card** — vive inline dentro de `src/components/home/home-categories.tsx`

Extraerlos es prerrequisito para su Code Connect.

⚠️ **Pop Model Card está desactualizado en Figma respecto a este repo.** Aquí renderiza etiqueta de marca en mayúsculas, nombre, línea "Length — Type", divisor, y un footer con el rango de precio y un botón outline "View Model". En Figma va del nombre directo a un botón Secondary LG "Discover model". **Manda el repo en este caso** — avísame y lo reconstruyo en Figma.

---

## 7 · Decisiones — no las resuelvas tú

Si te topas con alguna, párate y pregunta.

| # | Decisión |
|---|---|
| **D1** | **Radio de las tarjetas.** Las cuatro tarjetas de producto usan `xl` (16) mientras que el primitivo Card usa `lg` (12), y `DESIGN_SYSTEM.md` dice `lg` para tarjetas. Hay que unificar |
| **D2** | **Badge `secondary`.** Figma usa Malibu/200 con texto Midnight; el código usa `bg-muted` con `muted-foreground`. Todo lo demás de Badge ya coincide |
| **D3** | **Paginación.** La SRP pagina en producción; `research-advice` usa "Load more". Dos patrones para lo mismo. Y el tamaño de página varía sin regla: SRP 30, marca 28, categoría 12 |
| **D4** | **Conversión de moneda.** Si el selector es real, alguien tiene que ser dueño de la conversión, el redondeo y el caso "Request price". Hoy todas las tarjetas reciben un precio ya formateado |
| **D5** | **Ratio de imagen.** Producción sirve 4:3 en todas las tarjetas e imágenes de galería vía imgproxy. El grid de la galería aquí está fijado a `aspect-[854/437]`. Figma tampoco cumple 4:3 y también hay que corregirlo |
| **D6** | **Casing de botones.** Producción mezcla — "Sell Your Boat" y "View Model" contra "Read article" y "Save search". Figma fija sentence case como regla |

---

## 8 · Accesibilidad — arreglar, no consultar

Verificados en el DOM de producción. Son defectos, no preferencias:

- Sin `<main>`, sin `<header>`, un solo `<nav>` sin `aria-label`
- Sin skip link. Seis links de nav antes del contenido en cada página
- Sin `aria-current` en ningún sitio
- `outline-style: none` en los links **sin reemplazo**, y `--tw-ring-color` sin personalizar

En este repo asegurar además: `role="tablist"` con foco itinerante en las pestañas · `role="combobox"` con `aria-expanded` en Searchable Select · `role="slider"` con `aria-valuenow` en el slider de precio y `aria-hidden` en las barras del histograma · nombre accesible que incluya el filtro en el botón de quitar de cada chip ("Remove Power: Center console", no "Remove") · región `aria-live` para el recuento de resultados.

---

## 9 · Verificación

Al terminar cada bloque:

1. `npm run build` y `npm run lint` limpios
2. Los componentes nuevos renderizan en `/design-system`
3. Diff visual de las páginas afectadas — sobre todo SRP y BDP
4. `npm run figma:connect:*` si tocaste Code Connect
5. **Contraste**: ningún texto por debajo de 4,5:1. Vigilar `muted-foreground` en particular

## Orden sugerido

1. Sección 1 — verificar tokens. Es rápido y desbloquea todo lo demás
2. Sección 4 — alinear iconos. Mecánico
3. Sección 2 — primitivos que faltan
4. Sección 5 — arreglar el Code Connect roto de Boat Card
5. Sección 6 — extraer los dos componentes inline
6. Sección 3 — patterns, empezando por Disclosure, Breadcrumb y Toast
7. Sección 8 — accesibilidad
